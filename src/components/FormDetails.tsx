import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getAccessToken } from '../lib/firebase';
import { motion } from 'motion/react';
import { ArrowLeft, Loader2, Users, FileText, CheckCircle2 } from 'lucide-react';

export default function FormDetails() {
  const { formId } = useParams<{ formId: string }>();
  const navigate = useNavigate();
  
  const [form, setForm] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFormData();
  }, [formId]);

  const fetchFormData = async () => {
    setLoading(true);
    setError(null);
    try {
      const token = await getAccessToken();
      if (!token) {
        navigate('/admin');
        return;
      }

      // Fetch Form Metadata
      const formRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!formRes.ok) throw new Error('Failed to fetch form data');
      const formData = await formRes.json();
      setForm(formData);

      // Fetch Form Responses
      const responsesRes = await fetch(`https://forms.googleapis.com/v1/forms/${formId}/responses`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      
      if (!responsesRes.ok) throw new Error('Failed to fetch responses');
      const responsesData = await responsesRes.json();
      
      if (responsesData.responses) {
        setResponses(responsesData.responses);
      }
      
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An error occurred while fetching form data.');
    } finally {
      setLoading(false);
    }
  };

  // Helper to get question title by question ID
  const getQuestionTitle = (questionId: string) => {
    if (!form || !form.items) return 'Unknown Question';
    for (const item of form.items) {
      if (item.questionItem && item.questionItem.question.questionId === questionId) {
        return item.title;
      }
    }
    return 'Question';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030712] flex items-center justify-center">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-500" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#030712] flex flex-col items-center justify-center text-center p-6">
        <div className="bg-red-500/10 text-red-500 p-6 rounded-2xl max-w-lg mb-6 border border-red-500/20">
           <h3 className="text-xl font-bold mb-2">Error Loading Form</h3>
           <p>{error}</p>
        </div>
        <button onClick={() => navigate('/admin')} className="text-indigo-400 hover:text-indigo-300 font-semibold flex items-center gap-2">
           <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 selection:bg-indigo-500/30">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-slate-800">
        <div className="max-w-5xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
             <button onClick={() => navigate('/admin')} className="text-slate-400 hover:text-white transition-colors bg-slate-800 p-2 rounded-lg">
                <ArrowLeft className="w-5 h-5" />
             </button>
             <div>
               <h1 className="text-xl font-bold text-white line-clamp-1">{form?.info?.title || 'Form'}</h1>
             </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <div className="grid md:grid-cols-3 gap-6 mb-10">
           <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-indigo-500/20 text-indigo-400 p-4 rounded-xl">
                 <Users className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Total Responses</p>
                <p className="text-3xl font-bold text-white">{responses.length}</p>
              </div>
           </div>
           
           <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex items-center gap-4">
              <div className="bg-green-500/20 text-green-400 p-4 rounded-xl">
                 <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <p className="text-sm text-slate-400 font-medium">Status</p>
                <p className="text-xl font-bold text-white">Active</p>
              </div>
           </div>
        </div>

        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-3">
          <FileText className="w-6 h-6 text-indigo-400" />
          Responses
        </h2>

        {responses.length === 0 ? (
          <div className="text-center py-20 bg-slate-900 border border-slate-800 rounded-3xl">
             <Users className="w-12 h-12 text-slate-600 mx-auto mb-4" />
             <p className="text-slate-400 text-lg">No responses collected yet.</p>
          </div>
        ) : (
          <div className="space-y-6">
            {responses.map((response, idx) => (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                key={response.responseId} 
                className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl"
              >
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800 text-sm">
                   <div className="flex items-center gap-2">
                     <div className="w-8 h-8 bg-indigo-500/20 text-indigo-400 font-bold rounded-full flex items-center justify-center">
                       {idx + 1}
                     </div>
                     <span className="font-mono text-slate-400">{response.responseId.slice(0, 8)}...</span>
                   </div>
                   <div className="text-slate-500">
                     {new Date(response.createTime).toLocaleString()}
                   </div>
                </div>

                <div className="space-y-6">
                  {Object.entries(response.answers || {}).map(([questionId, answerObj]: [string, any]) => (
                    <div key={questionId} className="bg-slate-800/50 p-4 rounded-xl border border-slate-800/50">
                      <h4 className="text-sm font-semibold text-indigo-300 mb-2">{getQuestionTitle(questionId)}</h4>
                      <div className="text-slate-200">
                        {answerObj.textAnswers?.answers?.map((ans: any, i: number) => (
                           <p key={i}>{ans.value}</p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
