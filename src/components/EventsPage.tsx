import React, { useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import { EventsSection } from './EventsSection';
import { InteractiveParticles } from './InteractiveParticles';

const GOOGLE_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdKRM7wXrG_F-mQyrAdKOM6A8FRKgH3ydPtQXiWaf3u01L0JQ/viewform?usp=publish-editor";

export default function EventsPage() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 relative overflow-x-hidden">
      {/* Background Interactive Particles & Lighting */}
      <InteractiveParticles />
      <div className="fixed inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-950/20 via-[#030712]/50 to-[#030712] pointer-events-none -z-10" />

      {/* TOP HEADER */}
      <header className="sticky top-0 z-40 bg-[#030712]/80 backdrop-blur-xl border-b border-white/10 px-4 sm:px-8 py-4 transition-all">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo & Sub-tag */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden bg-white/5 border border-white/10 group-hover:border-indigo-500/50 transition-colors">
              <img 
                src="https://i.pinimg.com/originals/21/1b/14/211b146f35a794e359b1fbee0bf3ef93.png" 
                alt="E-CELL RIET" 
                className="w-full h-full object-cover" 
                onError={(e) => (e.currentTarget.style.opacity = '0')} 
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-wider group-hover:text-indigo-300 transition-colors">E-CELL RIET</span>
                <span className="text-[10px] font-mono uppercase bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 px-2 py-0.5 rounded-full flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" />
                  Events
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">Official Campus Sessions & Archive</p>
            </div>
          </Link>

          {/* Navigation Controls */}
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer shadow-sm group"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-slate-400 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Home</span>
            </Link>

            <a
              href={GOOGLE_FORM_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
            >
              <span>Apply Now</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </header>

      {/* MAIN CONTENT AREA */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <EventsSection />
      </main>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 text-center bg-[#020617] relative z-10">
        <div className="max-w-md mx-auto px-6 flex flex-col items-center gap-4">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Main Landing Page</span>
          </Link>
          <p className="text-xs text-slate-500 mt-2">© {new Date().getFullYear()} E-Cell RIET. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
}
