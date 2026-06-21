import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User } from 'firebase/auth';
import { initAuth, googleSignIn, logout, getAccessToken } from '../lib/firebase';
import { motion } from 'motion/react';
import { LogOut, ArrowLeft, FileText, Loader2, ArrowRight } from 'lucide-react';

export default function AdminDashboard() {
  const [needsAuth, setNeedsAuth] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [forms, setForms] = useState<any[]>([]);
  const [loadingForms, setLoadingForms] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = initAuth(
      (currentUser, currentToken) => {
        setUser(currentUser);
        setToken(currentToken);
        setNeedsAuth(false);
        fetchForms(currentToken);
      },
      () => {
        setNeedsAuth(true);
        setUser(null);
        setToken(null);
      }
    );
    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    setIsLoggingIn(true);
    try {
      const result = await googleSignIn();
      if (result) {
        setToken(result.accessToken);
        setUser(result.user);
        setNeedsAuth(false);
        fetchForms(result.accessToken);
      }
    } catch (err) {
      console.error('Login failed:', err);
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    setNeedsAuth(true);
    setUser(null);
    setToken(null);
    setForms([]);
  };

  const fetchForms = async (accessToken: string) => {
    setLoadingForms(true);
    try {
      // Find files of type 'application/vnd.google-apps.form' using Google Drive API
      const res = await fetch('https://www.googleapis.com/drive/v3/files?q=mimeType=\'application/vnd.google-apps.form\' and trashed=false&fields=files(id,name,createdTime,webViewLink)', {
        headers: { Authorization: `Bearer ${accessToken}` }
      });
      const data = await res.json();
      if (data.files) {
        setForms(data.files);
      }
    } catch (error) {
      console.error("Error fetching forms:", error);
    } finally {
      setLoadingForms(false);
    }
  };

  if (needsAuth) {
    return (
      <div className="min-h-screen bg-[#030712] text-slate-200 flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
        <button onClick={() => navigate(-1)} className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-white transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back
        </button>
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-slate-900 border border-slate-800 rounded-3xl p-10 max-w-md w-full shadow-2xl text-center"
        >
          <div className="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center text-indigo-400 mx-auto mb-6">
            <FileText className="w-8 h-8" />
          </div>
          <h1 className="text-3xl font-bold mb-3 text-white">Forms Admin</h1>
          <p className="text-slate-400 mb-10 text-sm">Sign in with your Google Workspace account to view and manage your E-Cell application forms.</p>
          
          <button 
            disabled={isLoggingIn}
            onClick={handleLogin}
            className="w-full flex items-center justify-center bg-white text-[#030712] px-6 py-4 rounded-xl font-bold hover:bg-slate-200 transition-all disabled:opacity-50 group shadow-[0_0_20px_rgba(255,255,255,0.1)]"
          >
            {isLoggingIn ? <Loader2 className="w-6 h-6 animate-spin" /> : (
              <>
                <svg className="w-5 h-5 mr-3" viewBox="0 0 48 48">
                  <path fill="#EA4335" d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"></path>
                  <path fill="#4285F4" d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"></path>
                  <path fill="#FBBC05" d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"></path>
                  <path fill="#34A853" d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"></path>
                  <path fill="none" d="M0 0h48v48H0z"></path>
                </svg>
                Sign in with Google
              </>
            )}
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={() => navigate('/')} className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
             </button>
             <h1 className="text-xl font-bold text-white flex items-center gap-2">
               <FileText className="w-5 h-5 text-indigo-400" />
               Google Forms Dashboard
             </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-3">
              <img src={user?.photoURL || ''} alt="" className="w-8 h-8 rounded-full border border-slate-700" />
              <span className="text-sm font-medium text-slate-300">{user?.displayName}</span>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-400 transition-colors p-2 rounded-lg bg-slate-800 hover:bg-slate-800/80">
               <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-8">
           <h2 className="text-3xl font-bold">Your Forms</h2>
           <button onClick={() => fetchForms(token!)} className="bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
              Refresh
           </button>
        </div>

        {loadingForms ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
          </div>
        ) : forms.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
            <div className="w-16 h-16 mx-auto bg-slate-800 rounded-full flex items-center justify-center text-slate-500 mb-4">
               <FileText className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-medium text-white mb-2">No Forms Found</h3>
            <p className="text-slate-400 max-w-md mx-auto">We couldn't find any Google Forms in your Drive. Please ensure you have created forms using this Google account.</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map(form => (
               <motion.div 
                 key={form.id}
                 initial={{ opacity: 0, y: 20 }}
                 animate={{ opacity: 1, y: 0 }}
                 className="bg-slate-900 border border-slate-800 rounded-2xl p-6 hover:border-indigo-500/50 transition-all hover:shadow-[0_0_30px_rgba(99,102,241,0.1)] group flex flex-col"
               >
                 <div className="flex items-start justify-between mb-4">
                   <div className="bg-purple-500/20 text-purple-400 p-3 rounded-xl">
                      <FileText className="w-6 h-6" />
                   </div>
                 </div>
                 <h3 className="text-lg font-bold text-white mb-2 line-clamp-1">{form.name}</h3>
                 <p className="text-xs text-slate-500 mb-6 flex-1">
                   Created: {new Date(form.createdTime).toLocaleDateString()}
                 </p>
                 
                 <div className="flex items-center gap-3 pt-4 border-t border-slate-800 mt-auto">
                    <button 
                      onClick={() => navigate(`/admin/form/${form.id}`)}
                      className="flex-1 bg-indigo-500/10 hover:bg-indigo-500/20 text-indigo-400 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center gap-2"
                    >
                      View Responses <ArrowRight className="w-4 h-4" />
                    </button>
                    <a 
                      href={form.webViewLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2.5 rounded-xl text-sm font-semibold transition-colors flex items-center justify-center"
                    >
                      Open Form
                    </a>
                 </div>
               </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
