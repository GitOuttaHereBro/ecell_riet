import React, { useState } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ArrowRight, CheckCircle, Clock, Target, Users, Zap, ChevronRight, ExternalLink, Phone, MessageCircle, Instagram, Quote, Mail, Lightbulb, Globe, User, Calendar, DollarSign, AlertCircle, Linkedin, ChevronDown, Info, TestTube, Hammer, Rocket } from 'lucide-react';

import { InteractiveParticles } from './InteractiveParticles';
import { useLenis } from 'lenis/react';

const GOOGLE_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdKRM7wXrG_F-mQyrAdKOM6A8FRKgH3ydPtQXiWaf3u01L0JQ/viewform?usp=publish-editor";

const INSTAGRAM_LINK = "https://www.instagram.com/ecell_riet?igsh=MThvZHdlOThwbXJxeQ==";
const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/ENTpUc2WWwiLRuabTSoRVj/";
const LINKEDIN_LINK = "https://www.linkedin.com/in/ecell-riet?utm_source=share_via&utm_content=profile&utm_medium=member_android";

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={`fill-current ${className}`} xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y: 40, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ type: "spring", stiffness: 60, damping: 20, delay, mass: 1 }}
    className={className}
  >
    {children}
  </motion.div>
);

interface FAQItemProps {
  faq: {
    icon: React.ElementType;
    q: string;
    a: string;
  };
  index: number;
}

const FAQItem: React.FC<FAQItemProps> = ({ faq, index }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <FadeIn delay={index * 0.1}>
      <motion.div 
        layout
        transition={{ layout: { duration: 0.3, ease: "easeInOut" }, type: "spring", stiffness: 300, damping: 20 }}
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ y: -5, borderColor: "rgba(99, 102, 241, 0.5)" }}
        className={`bg-slate-900/40 p-8 rounded-2xl border ${isOpen ? 'border-indigo-500/50 bg-slate-800/40' : 'border-slate-800'} transition-colors duration-300 cursor-pointer overflow-hidden relative`}
      >
        <motion.div layout="position" className="flex items-start gap-4 mb-3 relative z-10">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0">
            <motion.div
              animate={{ scale: [1, 1.15, 1], opacity: [0.8, 1, 0.8] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
            >
              <faq.icon className="w-5 h-5" />
            </motion.div>
          </div>
          <h3 className={`text-lg font-bold pt-1 flex-1 transition-colors ${isOpen ? 'text-indigo-300' : 'text-indigo-200'}`}>{faq.q}</h3>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.3 }}
            className="text-slate-500 mt-1"
          >
            <ChevronDown className="w-5 h-5" />
          </motion.div>
        </motion.div>
        <AnimatePresence initial={false} mode="sync">
          {isOpen && (
            <motion.div
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <p className="text-slate-400 leading-relaxed pl-[52px] pt-2">{faq.a}</p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </FadeIn>
  );
};

const SectionTitle = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <motion.h2
    initial={{ opacity: 0, y: 30, scale: 0.95 }}
    whileInView={{ opacity: 1, y: 0, scale: 1 }}
    viewport={{ once: false, margin: "-10%" }}
    transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1 }}
    className={className}
  >
    {children}
  </motion.h2>
);

const Section = ({ className, children, id }: { className?: string; children: React.ReactNode; id?: string }) => (
  <motion.section
    id={id}
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.1 }}
    transition={{ type: "spring", stiffness: 40, damping: 20, mass: 1.2 }}
    className={`py-24 px-6 md:px-12 max-w-7xl mx-auto ${className}`}
  >
    {children}
  </motion.section>
);

export default function LandingPage() {
  const lenis = useLenis();
  const { scrollY } = useScroll();
  const [navHidden, setNavHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setNavHidden(true);
    } else {
      setNavHidden(false);
    }
  });

  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const y3 = useTransform(scrollY, [0, 500], [0, 400]);
  const y4 = useTransform(scrollY, [0, 500], [0, -350]);
  const [hoveredGraphPoint, setHoveredGraphPoint] = useState<number | null>(null);
  const [activeTimelineStage, setActiveTimelineStage] = useState<number>(0);

  const timelineStages = [
    {
      id: "ideation",
      phase: "01",
      title: "Ideation",
      icon: <Lightbulb className="w-5 h-5" />,
      milestones: [
        { title: "Problem Discovery", desc: "Identify and define a real, painful problem worth solving." },
        { title: "User Interviews", desc: "Talk to potential users to validate the problem's existence." },
        { title: "Solution Thesis", desc: "Formulate a hypothesis on how you will solve this problem uniquely." },
      ]
    },
    {
      id: "validation",
      phase: "02",
      title: "Validation",
      icon: <TestTube className="w-5 h-5" />,
      milestones: [
        { title: "MVP Creation", desc: "Build the simplest possible version to test your hypothesis." },
        { title: "Initial Launch", desc: "Put the product in the hands of early adopters." },
        { title: "Feedback Loop", desc: "Gather data, measure usage, and ruthlessly iterate." },
      ]
    },
    {
      id: "building",
      phase: "03",
      title: "Building",
      icon: <Hammer className="w-5 h-5" />,
      milestones: [
        { title: "Core Architecture", desc: "Solidify the product's foundations for scale and stability." },
        { title: "Mentorship", desc: "Work with advisors to refine business models and operations." },
        { title: "Growth Engine", desc: "Identify reproducible channels for user acquisition." },
      ]
    },
    {
      id: "execution",
      phase: "04",
      title: "Execution",
      icon: <Rocket className="w-5 h-5" />,
      milestones: [
        { title: "Demo Day", desc: "Present traction and vision to a panel of experts and investors." },
        { title: "Market Launch", desc: "Go to market with a comprehensive scaling strategy." },
        { title: "Traction", desc: "Achieve asymmetric advantage and dominate the identified niche." },
      ]
    }
  ];

  const graphPoints = [
    { x: 50, y: 260, label: "Day 1", desc: "The Idea Phase. Excitement is high, but validation is zero." },
    { x: 140, y: 300, label: "The Trough", desc: "The 'Valley of Death'. Most give up here. Real builders persist." },
    { x: 242, y: 185, label: "Product-Market Fit", desc: "Traction begins. The market pulls the product out of you." },
    { x: 360, y: 70, label: "Unicorn Status", desc: "Asymmetric Advantage achieved. Market dominance." }
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    if (lenis) {
      lenis.scrollTo(`#${targetId}`, { offset: -80, duration: 1.5, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    } else {
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] text-slate-200 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 overflow-x-hidden !scroll-smooth">
      
      {/* NAVBAR */}
      <motion.nav 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: navHidden ? -100 : 0, opacity: navHidden ? 0 : 1 }}
        transition={{ type: "spring", stiffness: 50, damping: 20, mass: 1 }}
        className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[90%] max-w-5xl bg-white/[0.02] backdrop-blur-3xl border border-white/5 shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] rounded-full"
      >
        <div className="px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
             <motion.div 
               whileHover={{ rotate: 180 }}
               transition={{ duration: 0.6, type: "spring" }}
               className="relative flex items-center justify-center w-10 h-10 rounded-full overflow-hidden"
             >
                <img src="https://i.pinimg.com/originals/21/1b/14/211b146f35a794e359b1fbee0bf3ef93.png" alt="E-CELL RIET" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.opacity = '0')} />
             </motion.div>
             <div className="flex flex-col">
               <span className="text-sm font-bold text-white tracking-wider leading-tight">E-CELL</span>
               <span className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Riet</span>
             </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
             <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} className="hover:text-white transition-colors">Program</a>
             <a href="#voices" onClick={(e) => handleSmoothScroll(e, 'voices')} className="hover:text-white transition-colors">Voices</a>
             <a href="#contact" onClick={(e) => handleSmoothScroll(e, 'contact')} className="hover:text-white transition-colors">Contact</a>
          </div>

          <div className="flex flex-row items-center gap-4">
             <motion.a 
               href={GOOGLE_FORM_LINK}
               target="_blank"
               rel="noopener noreferrer"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
               className="bg-white/10 hover:bg-white/20 border border-white/10 text-white px-5 py-2 rounded-full text-sm font-semibold transition-colors hidden sm:flex"
             >
               Apply Now
             </motion.a>
             {/* Mobile Menu Icon Fallback */}
             <button className="md:hidden text-slate-300 p-2">
                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>
             </button>
          </div>
        </div>
      </motion.nav>

      {/* 1. HERO SECTION */}
      <header className="relative min-h-screen flex flex-col justify-center pt-20">
        {/* Immersive Background */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <motion.div style={{ y: y1 }} className="absolute inset-0 will-change-transform">
            <motion.div 
              animate={{ scale: [1, 1.05, 1], opacity: [0.2, 0.3, 0.2] }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-900/20 rounded-full blur-[80px]"
            ></motion.div>
          </motion.div>
          
          <motion.div style={{ y: y2 }} className="absolute inset-0 will-change-transform">
            <motion.div 
              animate={{ x: [0, 30, 0], y: [0, -30, 0], opacity: [0.1, 0.2, 0.1] }}
              transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
              className="absolute bottom-0 right-0 w-[800px] h-[600px] bg-blue-900/10 rounded-full blur-[80px]"
            ></motion.div>
          </motion.div>

          {/* Additional Subtle Parallax Elements */}
          <motion.div style={{ y: y3 }} className="absolute select-none pointer-events-none top-40 left-[10%] opacity-20">
            <motion.div 
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
              className="w-32 h-32 rounded-3xl border border-indigo-500/30"
            ></motion.div>
          </motion.div>
          
          <motion.div style={{ y: y4 }} className="absolute select-none pointer-events-none bottom-40 right-[15%] opacity-10">
            <motion.div 
              animate={{ rotate: -360 }}
              transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
              className="w-48 h-48 rounded-full border border-slate-500/30"
            ></motion.div>
          </motion.div>
          
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay"></div>
          
          <InteractiveParticles />
        </div>

        <div className="px-6 md:px-12 max-w-7xl mx-auto w-full z-10 relative">
          <FadeIn delay={0.1}>
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-700/50 backdrop-blur-md text-indigo-300 text-xs font-mono tracking-widest mb-8 shadow-2xl shadow-indigo-900/20 transition-all duration-500 hover:bg-slate-800/80 hover:border-indigo-500/40 hover:shadow-indigo-500/10 cursor-default">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              E-CELL RIET STARTUP PROGRAM
            </div>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter leading-[0.95] mb-8 text-white">
              Building RIET’s <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-200 to-slate-400 animate-gradient-x drop-shadow-sm">
                First Unicorn.
              </span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.3}>
            <p className="text-xl md:text-2xl max-w-3xl font-light text-slate-300 mb-8 tracking-wide italic">
              "Great companies don’t start with funding. They start with disciplined builders."
            </p>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <p className="text-lg text-slate-500 max-w-xl mb-12 leading-relaxed border-l-2 border-indigo-500/30 pl-6">
              A disciplined system to turn ideas into execution-ready startups. 
              Join the movement to build the future.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.5}>
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.a 
                href={GOOGLE_FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="group inline-flex items-center justify-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-8 py-4 rounded-full text-lg font-bold hover:from-indigo-500 hover:to-blue-600 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_30px_rgba(79,70,229,0.6)] border border-white/10"
              >
                Join E-cell
                <motion.div
                  animate={{ x: [0, 3, 0], y: [0, -3, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ExternalLink className="w-5 h-5" />
                </motion.div>
              </motion.a>
              <motion.a 
                href="#how-it-works"
                onClick={(e) => handleSmoothScroll(e, 'how-it-works')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full text-lg font-medium text-slate-300 hover:text-white hover:bg-white/5 transition-all border border-slate-700 hover:border-slate-500"
              >
                Explore the Program
              </motion.a>
            </div>
          </FadeIn>
        </div>
      </header>

      {/* 2. OUR MISSION */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-indigo-950/20 to-transparent -z-10 blur-3xl"></div>
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <SectionTitle className="text-4xl md:text-5xl font-bold tracking-tight mb-6 text-white">Our Mission</SectionTitle>
            <FadeIn delay={0.2}>
              <p className="text-2xl md:text-3xl font-light leading-relaxed text-slate-300">
                We build founders who can <span className="text-indigo-400 font-normal">identify real problems</span>, validate ideas with discipline, and execute with accountability.
              </p>
            </FadeIn>
          </div>
          <FadeIn delay={0.2}>
            <div className="space-y-10 relative">
              <div className="absolute left-0 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/0 via-indigo-500/50 to-indigo-500/0"></div>
              
              <div className="pl-8 relative">
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                <h3 className="text-sm font-mono uppercase text-indigo-400 mb-4 tracking-wider font-semibold">1-Year Vision</h3>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3 group">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    >
                      <CheckCircle className="w-6 h-6 mt-0.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </motion.div>
                    <span className="text-lg text-slate-300 group-hover:text-white transition-colors">Multiple validated startups launching from campus.</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
                    >
                      <CheckCircle className="w-6 h-6 mt-0.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </motion.div>
                    <span className="text-lg text-slate-300 group-hover:text-white transition-colors">Investment-ready teams pitching to real VCs.</span>
                  </li>
                  <li className="flex items-start gap-3 group">
                    <motion.div
                      animate={{ scale: [1, 1.1, 1] }}
                      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
                    >
                      <CheckCircle className="w-6 h-6 mt-0.5 text-slate-500 group-hover:text-indigo-400 transition-colors" />
                    </motion.div>
                    <span className="text-lg text-slate-300 group-hover:text-white transition-colors">A recognized, startup-active campus ecosystem.</span>
                  </li>
                </ul>
              </div>
              
              <div className="pl-8 relative">
                <div className="absolute left-[-4px] top-2 w-2 h-2 rounded-full bg-white shadow-[0_0_10px_rgba(255,255,255,0.8)]"></div>
                <h3 className="text-sm font-mono uppercase text-slate-500 mb-2">Long-term Ambition</h3>
                <p className="text-2xl font-bold text-white tracking-tight">RIET’s first unicorn.</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 2.5 WHY THIS MATTERS */}
      <Section className="border-t border-slate-800/50">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionTitle className="text-3xl font-bold mb-6 text-white">Why This Matters</SectionTitle>
            <FadeIn delay={0.2}>
              <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
                <div className="flex items-start gap-3 group relative">
                  <p>
                    India’s startup ecosystem is growing rapidly. Students who build early gain asymmetric advantage.
                  </p>
                  <div className="relative shrink-0 mt-1">
                    <Info className="w-5 h-5 text-slate-600 hover:text-indigo-400 cursor-help transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      India has over 100 unicorns and is the 3rd largest startup ecosystem globally.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start gap-3 group relative">
                  <p>
                    Campuses that build companies outperform those that only place graduates.
                  </p>
                  <div className="relative shrink-0 mt-1">
                    <Info className="w-5 h-5 text-slate-600 hover:text-indigo-400 cursor-help transition-colors" />
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-64 p-3 bg-slate-800 border border-slate-700 rounded-lg text-xs text-slate-300 shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                      Top institutes like IITs and BITS are defined by their alumni founders, not just placements.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                    </div>
                  </div>
                </div>

                <p className="text-xl text-indigo-300 font-medium border-l-2 border-indigo-500 pl-4">
                  "RIET must not only prepare students for jobs. It must prepare them to create them."
                </p>
              </div>
            </FadeIn>
          </div>
          <FadeIn delay={0.2} className="h-full">
             <div className="relative h-full min-h-[400px] rounded-2xl overflow-hidden bg-slate-900/30 border border-slate-800 group flex flex-col">
                {/* Dynamic Background Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-transparent to-blue-500/5 pointer-events-none z-0"></div>
                <motion.div 
                  className="absolute -top-20 -right-20 w-64 h-64 bg-indigo-500/20 rounded-full blur-[80px] z-0 pointer-events-none"
                  animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                  transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div 
                  className="absolute bottom-0 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] z-0 pointer-events-none"
                  animate={{ scale: [1, 1.3, 1], opacity: [0.2, 0.5, 0.2] }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
                
                {/* Grid Background */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)] z-0 pointer-events-none"></div>

                {/* Graph Visualization */}
                <div className="relative z-10 flex-1 flex items-center justify-center opacity-80 group-hover:opacity-100 transition-opacity duration-700 w-full pt-8 pb-4 min-h-[250px]">
                   <svg width="100%" height="100%" viewBox="0 -80 400 400" className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
                      <defs>
                        <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.5" />
                          <stop offset="40%" stopColor="#818cf8" stopOpacity="1" />
                          <stop offset="100%" stopColor="#a5b4fc" stopOpacity="1" />
                        </linearGradient>
                        <linearGradient id="areaGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#6366f1" stopOpacity="0.15" />
                          <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
                        </linearGradient>
                        <filter id="glow">
                          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                          <feMerge>
                            <feMergeNode in="coloredBlur"/>
                            <feMergeNode in="SourceGraphic"/>
                          </feMerge>
                        </filter>
                      </defs>

                      {/* Axes */}
                      <line x1="50" y1="320" x2="380" y2="320" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" />
                      <line x1="50" y1="320" x2="50" y2="50" stroke="rgba(148, 163, 184, 0.3)" strokeWidth="1" />
                      
                      {/* Grid Lines */}
                      <line x1="50" y1="260" x2="380" y2="260" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1" />
                      <line x1="50" y1="200" x2="380" y2="200" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1" />
                      <line x1="50" y1="140" x2="380" y2="140" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1" />
                      <line x1="50" y1="80" x2="380" y2="80" stroke="rgba(148, 163, 184, 0.05)" strokeWidth="1" />
                      
                      {/* Standard Path (Linear Career) */}
                      <motion.path
                        d="M 50 260 L 360 180"
                        fill="transparent"
                        stroke="rgba(255, 255, 255, 0.15)"
                        strokeWidth="2"
                        strokeDasharray="6 6"
                        initial={{ pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "linear" }}
                      />

                      {/* Founder Path (J-Curve) */}
                      
                      {/* Area under the curve */}
                      <motion.path
                        d="M 50 260 C 90 260 110 300 140 300 C 200 300 280 70 360 70 L 360 320 L 50 320 Z"
                        fill="url(#areaGradient)"
                        stroke="none"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.5 }}
                      />

                      {/* The J-Curve Line */}
                      <motion.path
                        d="M 50 260 C 90 260 110 300 140 300 C 200 300 280 70 360 70"
                        fill="transparent"
                        stroke="url(#lineGradient)"
                        strokeWidth="4"
                        strokeLinecap="round"
                        filter="url(#glow)"
                        initial={{ pathLength: 0, opacity: 0.5 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        transition={{ duration: 2, ease: "easeInOut", delay: 0.2 }}
                      />
                      
                      {/* Valley of Death Marker */}
                      <motion.circle
                        cx="140" cy="300" r="3"
                        fill="#ef4444"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 1.2 }}
                      />

                      {/* Moving Particle */}
                      <circle r="4" fill="#fff" filter="url(#glow)">
                        <animateMotion
                           dur="3s"
                           repeatCount="indefinite"
                           path="M 50 260 C 90 260 110 300 140 300 C 200 300 280 70 360 70"
                           calcMode="spline"
                           keyTimes="0;1"
                           keySplines="0.4 0 0.2 1"
                        />
                        <animate attributeName="r" values="4;5;4" dur="1s" repeatCount="indefinite" />
                      </circle>
                      
                      {/* Advantage Gap Line */}
                      <motion.line
                        x1="360" y1="180" x2="360" y2="70"
                        stroke="#818cf8"
                        strokeWidth="1"
                        strokeDasharray="4 4"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 0.5 }}
                        transition={{ delay: 2.2, duration: 1 }}
                      />

                      {/* Advantage Label with Tooltip */}
                      <g className="group/tooltip">
                        <motion.text
                          x="372" y="130"
                          transform="rotate(-90 372 130)"
                          textAnchor="middle"
                          fill="#818cf8"
                          fontSize="9"
                          fontWeight="bold"
                          fontFamily="monospace"
                          initial={{ opacity: 0 }}
                          whileInView={{ opacity: 1 }}
                          transition={{ delay: 2.5, duration: 1 }}
                          className="cursor-help uppercase tracking-wider"
                        >
                          Asymmetric Advantage
                        </motion.text>
                        {/* Hit area */}
                        <rect x="364" y="85" width="20" height="90" fill="transparent" className="cursor-help" />
                        
                        <foreignObject x="140" y="40" width="200" height="100" className="opacity-0 group-hover/tooltip:opacity-100 transition-opacity duration-300 pointer-events-none z-50">
                          <div xmlns="http://www.w3.org/1999/xhtml" className="w-full h-full flex items-end justify-end pb-2">
                             <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-[10px] leading-tight text-slate-300 shadow-xl text-center w-full relative">
                                Early execution creates a compounding lead that credentials alone cannot match.
                                <div className="absolute top-full right-6 -mt-1 border-4 border-transparent border-t-slate-800"></div>
                             </div>
                          </div>
                        </foreignObject>
                      </g>
                      
                      {/* End Marker (Unicorn) */}
                      <motion.g
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ delay: 2.2, type: "spring" }}
                        style={{ transformOrigin: "360px 70px" }}
                      >
                        <motion.circle 
                          cx="360" cy="70" r="6" 
                          fill="#818cf8" 
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        />
                        <motion.circle 
                          cx="360" cy="70" r="12" 
                          stroke="#818cf8" strokeWidth="1" fill="none"
                          animate={{ scale: [1, 2.5], opacity: [0.8, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut" }}
                        />
                        <motion.circle 
                          cx="360" cy="70" r="12" 
                          stroke="#818cf8" strokeWidth="1" fill="none"
                          animate={{ scale: [1, 4], opacity: [0.6, 0] }}
                          transition={{ duration: 2, repeat: Infinity, ease: "easeOut", delay: 0.6 }}
                        />
                      </motion.g>
                      {/* Interactive Data Points */}
                      {graphPoints.map((point, index) => (
                        <g 
                          key={index} 
                          onMouseEnter={() => setHoveredGraphPoint(index)}
                          onMouseLeave={() => setHoveredGraphPoint(null)}
                          className="cursor-pointer"
                        >
                          {/* Visible Dot (only if not already visually represented by complex markers) */}
                          {index !== 3 && (
                            <motion.circle
                              cx={point.x}
                              cy={point.y}
                              r="4"
                              fill="#0f172a"
                              stroke={index === 1 ? "#ef4444" : "#818cf8"}
                              strokeWidth="2"
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              transition={{ delay: 1 + index * 0.2 }}
                              whileHover={{ scale: 1.5 }}
                            />
                          )}
                          
                          {/* Invisible Hit Area */}
                          <circle cx={point.x} cy={point.y} r="15" fill="transparent" />
                        </g>
                      ))}

                      {/* Tooltip Overlay */}
                      <AnimatePresence>
                        {hoveredGraphPoint !== null && (
                          <foreignObject 
                            x={graphPoints[hoveredGraphPoint].x > 300 ? graphPoints[hoveredGraphPoint].x - 220 : graphPoints[hoveredGraphPoint].x - 110} 
                            y={graphPoints[hoveredGraphPoint].y - 110} 
                            width="240" 
                            height="110" 
                            className="pointer-events-none overflow-visible"
                          >
                            <div xmlns="http://www.w3.org/1999/xhtml" className="flex flex-col items-center justify-end h-full pb-4 relative">
                              <motion.div
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                                className="bg-slate-900/90 backdrop-blur-md border border-slate-700 p-3 rounded-xl shadow-2xl text-center min-w-[200px] w-[200px]"
                              >
                                <h4 className={`text-[11px] font-bold uppercase tracking-wider mb-1 ${hoveredGraphPoint === 1 ? 'text-red-400' : 'text-indigo-400'}`}>
                                  {graphPoints[hoveredGraphPoint].label}
                                </h4>
                                <p className="text-[10px] text-slate-300 leading-tight">
                                  {graphPoints[hoveredGraphPoint].desc}
                                </p>
                                <div className={`absolute top-full -mt-px border-4 border-transparent border-t-slate-700 ${graphPoints[hoveredGraphPoint].x > 300 ? 'right-[20px]' : 'left-1/2 -translate-x-1/2'}`}></div>
                              </motion.div>
                            </div>
                          </foreignObject>
                        )}
                      </AnimatePresence>
                   </svg>
                </div>

                {/* Content Area */}
                <div className="relative z-10 p-8 border-t border-white/5 bg-slate-900/40 backdrop-blur-sm mt-auto">
                   <div className="flex items-center gap-4 mb-3">
                      <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center border border-indigo-500/30 backdrop-blur-sm shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                         <Zap className="w-5 h-5 text-indigo-400" />
                      </div>
                      <h3 className="text-xl font-bold text-white">Asymmetric Advantage</h3>
                   </div>
                   <p className="text-slate-400 text-sm leading-relaxed">
                      Building a startup is the ultimate credential. It proves you can solve problems, lead teams, and handle uncertainty—skills that standard paths don't teach.
                   </p>
                </div>
             </div>
          </FadeIn>
        </div>
      </Section>

      {/* 3. HOW IT WORKS */}
      <Section id="how-it-works">
        <SectionTitle className="text-4xl md:text-5xl font-bold tracking-tight mb-20 text-center">From Idea to Execution</SectionTitle>
        
        <div className="max-w-5xl mx-auto w-full">
            {/* Timeline Selection Bar */}
            <div className="flex flex-col md:flex-row mb-12 relative border border-slate-800 rounded-2xl bg-slate-900/30 overflow-hidden shadow-2xl">
              {timelineStages.map((stage, idx) => (
                <button
                  key={stage.id}
                  onClick={() => setActiveTimelineStage(idx)}
                  className={`flex-1 flex items-center justify-center gap-3 p-6 transition-all duration-300 relative border-b md:border-b-0 md:border-r border-slate-800 last:border-none group ${activeTimelineStage === idx ? 'bg-indigo-500/10 text-white' : 'hover:bg-slate-800/50 text-slate-400'}`}
                >
                  <div className={`p-2 rounded-lg transition-colors ${activeTimelineStage === idx ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 group-hover:text-slate-300'}`}>
                    {stage.icon}
                  </div>
                  <div className="text-left w-full max-w-[120px]">
                    <div className="text-[10px] font-mono text-indigo-400 opacity-80 mb-0.5">{stage.phase}</div>
                    <div className="font-bold whitespace-nowrap">{stage.title}</div>
                  </div>
                  
                  {activeTimelineStage === idx && (
                    <motion.div
                      layoutId="active-stage-indicator"
                      className="absolute bottom-0 left-0 w-full md:w-auto md:top-0 md:bottom-0 md:left-0 md:w-1 h-1 md:h-full bg-indigo-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]"
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Timeline Content */}
            <div className="relative overflow-hidden min-h-[250px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTimelineStage}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="grid md:grid-cols-3 gap-6"
                >
                  {timelineStages[activeTimelineStage].milestones.map((milestone, idx) => (
                    <motion.div 
                      key={idx} 
                      initial={{ opacity: 0, y: 30, scale: 0.95 }}
                      whileInView={{ opacity: 1, y: 0, scale: 1 }}
                      viewport={{ once: false, margin: "-10%" }}
                      transition={{ type: "spring", stiffness: 60, damping: 20, delay: idx * 0.1 }}
                      className="bg-slate-900/40 border border-slate-800 rounded-2xl p-8 backdrop-blur-sm shadow-xl hover:border-indigo-500/30 hover:bg-slate-800/60 transition-all group hover:-translate-y-2 hover:shadow-indigo-500/10"
                    >
                      <div className="w-10 h-10 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-xs font-bold mb-6 group-hover:bg-indigo-500/20 group-hover:text-indigo-300 transition-colors">
                        {idx + 1}
                      </div>
                      <h4 className="text-xl font-bold text-white mb-3">
                        {milestone.title}
                      </h4>
                      <p className="text-slate-400 text-sm leading-relaxed">
                        {milestone.desc}
                      </p>
                    </motion.div>
                  ))}
                </motion.div>
              </AnimatePresence>
            </div>
         </div>
      </Section>

      {/* 4. WHO SHOULD APPLY */}
      <Section className="relative overflow-hidden">
         {/* Abstract shapes */}
         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <SectionTitle className="text-4xl font-bold tracking-tight mb-6">Who Should Apply</SectionTitle>
            <FadeIn delay={0.2}>
              <p className="text-lg text-slate-300 mb-12 leading-relaxed">
                This program is designed for serious builders who care about execution over certificates.
              </p>
              
              <div className="space-y-6">
                {[
                  { icon: Target, title: "Goal Oriented", desc: "Want to build real startups before graduation.", color: "blue", animation: { rotate: [0, 10, 0, -10, 0], transition: { duration: 4, repeat: Infinity, ease: "easeInOut" } } },
                  { icon: Clock, title: "Committed", desc: "Willing to prioritize consistent progress every week.", color: "indigo", animation: { rotate: [0, 15, 0, -15, 0], transition: { duration: 3, repeat: Infinity, ease: "easeInOut" } } },
                  { icon: Zap, title: "Action Takers", desc: "Ready for accountability and rapid execution.", color: "violet", animation: { scale: [1, 1.2, 1], opacity: [1, 0.8, 1], transition: { duration: 1.5, repeat: Infinity, ease: "easeInOut" } } }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ x: 10 }}
                    className="flex gap-6 group cursor-default"
                  >
                    <div className={`w-14 h-14 bg-gradient-to-br from-${item.color}-500/20 to-${item.color}-600/20 border border-${item.color}-500/30 text-${item.color}-400 flex items-center justify-center rounded-2xl shrink-0 group-hover:scale-110 transition-transform duration-300`}>
                      <motion.div
                        animate={item.animation}
                      >
                        <item.icon className="w-7 h-7" />
                      </motion.div>
                    </div>
                    <div>
                      <h4 className="text-xl font-bold mb-1 text-white group-hover:text-indigo-300 transition-colors">{item.title}</h4>
                      <p className="text-slate-400">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </FadeIn>
          </div>

          <FadeIn delay={0.2}>
            <div className="bg-slate-900/50 backdrop-blur-md border border-slate-800 p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-2xl">
              
              <h3 className="text-2xl font-bold mb-8 text-slate-200 flex items-center gap-3">
                This Program Is Not Designed For:
              </h3>
              <ul className="space-y-6 font-medium text-slate-400">
                {["Passive membership", "Attendance-based participation", "Certificate collection"].map((item, i) => (
                  <li key={i} className="flex items-center gap-4">
                    <span className="w-1.5 h-1.5 bg-slate-500 rounded-full"></span>
                    <span className="text-lg">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 5. EXPECTATIONS */}
      <Section className="border-y border-slate-800 bg-slate-900/20">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div>
            <SectionTitle className="text-3xl font-bold mb-4 text-white">Expectations & Accountability</SectionTitle>
            <FadeIn delay={0.2}>
              <p className="text-slate-400 text-lg">We hold high standards to ensure high quality output.</p>
              <p className="text-indigo-400 mt-2 font-medium">"High standards are not restrictions. They are accelerators."</p>
            </FadeIn>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Weekly Reviews", desc: "Mandatory milestone check-ins." },
            { title: "Progress Tracking", desc: "Transparent logging of all activities." },
            { title: "Performance Based", desc: "Continuation depends on execution." },
            { title: "Active Status", desc: "Inactive teams may be removed." }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <motion.div 
                whileHover={{ y: -8, borderColor: "rgba(99, 102, 241, 0.5)" }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="bg-slate-900/40 p-8 rounded-2xl border border-slate-800 h-full transition-all duration-300 group"
              >
                <h3 className="font-bold text-lg mb-3 text-white group-hover:text-indigo-300 transition-colors">{item.title}</h3>
                <p className="text-slate-400 leading-relaxed">{item.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 5.5 OPERATING PRINCIPLES */}
      <Section className="bg-slate-900/30 border-y border-slate-800">
        <div>
          <div className="text-center mb-12">
            <SectionTitle className="text-3xl font-bold mb-4 text-white">Our Operating Principles</SectionTitle>
            <FadeIn delay={0.2}>
              <p className="text-slate-400">The mindset that separates builders from dreamers.</p>
            </FadeIn>
          </div>
          <FadeIn delay={0.4}>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Execution over Excitement", desc: "Ideas are cheap. Execution is everything." },
                { title: "Validation before Scaling", desc: "Don't build what nobody wants." },
                { title: "Accountability over Attendance", desc: "Show up with progress, not just presence." },
                { title: "Long-term over Short-term", desc: "Build for the decade, not the weekend." }
              ].map((principle, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ scale: 1.03 }}
                  className="p-6 rounded-xl bg-slate-950 border border-slate-800 hover:border-indigo-500/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-indigo-500/10 flex items-center justify-center mb-4 text-indigo-400 font-bold text-lg">
                    {i + 1}
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">{principle.title}</h3>
                  <p className="text-sm text-slate-400">{principle.desc}</p>
                </motion.div>
              ))}
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* TESTIMONIALS SECTION */}
      <Section>
        <div className="text-center mb-16">
          <div>
            <SectionTitle className="text-3xl md:text-4xl font-bold mb-6">Voices of Leadership</SectionTitle>
            <FadeIn delay={0.2}>
              <p className="text-slate-400 max-w-2xl mx-auto">
                Insights from mentors and industry experts supporting the E-Cell initiative.
              </p>
            </FadeIn>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "The structured approach of this program is exactly what early-stage student founders need to bridge the gap between idea and execution.",
              author: "Dulari Ma'am",
              role: "Mentor",
              initials: "DM"
            },
            {
              quote: "E-Cell RIET is creating a culture of innovation that will define the next decade of the institute. This is where the future is built.",
              author: "Industry Mentor",
              role: "Startup Consultant",
              initials: "IM"
            },
            {
              quote: "A disciplined system for startups was missing. This cohort is the answer for anyone serious about building a real company.",
              author: "Alumni Founder",
              role: "Tech Entrepreneur",
              initials: "AF"
            }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-2xl relative h-full hover:bg-slate-800/60 transition-colors flex flex-col">
                <motion.div 
                  className="absolute top-6 right-6"
                  animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.3, 0.2] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <Quote className="w-10 h-10 text-indigo-500" />
                </motion.div>
                <p className="text-slate-300 mb-8 leading-relaxed relative z-10 flex-grow italic">"{item.quote}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <div className="w-8 h-8 rounded-full bg-indigo-900/30 border border-indigo-500/30 flex items-center justify-center text-indigo-300 font-bold text-xs shrink-0">
                    {item.initials}
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-sm leading-tight">{item.author}</h4>
                    <p className="text-[10px] text-indigo-400 uppercase tracking-wider">{item.role}</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* 6. FOUNDING COHORT */}
      <Section className="relative">
        <div className="absolute inset-0 bg-gradient-to-b from-indigo-950/30 to-slate-950 rounded-3xl border border-slate-800 overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10"></div>
          <motion.div 
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.7, 0.4] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)]"
          ></motion.div>
          <motion.div
            className="absolute inset-0 bg-gradient-to-tr from-indigo-500/5 via-transparent to-transparent"
            animate={{ opacity: [0, 0.3, 0] }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        
        <div className="text-center py-20 relative z-10 px-6">
          <div>
            <FadeIn>
              <div className="inline-block border border-indigo-400/30 bg-indigo-500/10 px-6 py-2 rounded-full text-sm font-mono text-indigo-300 mb-8 shadow-[0_0_20px_rgba(99,102,241,0.15)]">
                BATCH 01 • APPLICATIONS OPEN
              </div>
            </FadeIn>
            <SectionTitle className="text-5xl md:text-7xl font-bold mb-8 tracking-tight text-white drop-shadow-2xl">
              Founding Cohort
            </SectionTitle>
            <FadeIn delay={0.2}>
              <p className="text-xl text-slate-300 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
                The first builders. The culture setters. <br/>The ones who define RIET’s startup future.
              </p>
              
              <div className="flex flex-col md:flex-row justify-center gap-8 text-sm font-mono text-slate-400 mb-8">
                <span className="flex items-center gap-2 justify-center">
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Users className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                   LIMITED SEATS
                </span>
                <span className="flex items-center gap-2 justify-center">
                  <motion.div
                    animate={{ rotate: [0, 360] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  >
                    <Target className="w-4 h-4 text-indigo-400" />
                  </motion.div>
                   SELECTION-BASED ENTRY
                </span>
              </div>

              <p className="text-slate-500 text-sm max-w-lg mx-auto mb-12 italic">
                "A small cohort ensures focused mentorship and measurable progress."
              </p>
              
              <motion.a 
                href={GOOGLE_FORM_LINK}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="inline-flex items-center gap-3 bg-gradient-to-r from-indigo-600 to-blue-700 text-white px-10 py-5 rounded-full text-xl font-bold hover:from-indigo-500 hover:to-blue-600 transition-all duration-300 shadow-[0_0_30px_rgba(79,70,229,0.4)] hover:shadow-[0_0_40px_rgba(79,70,229,0.6)] border border-white/10"
              >
                JOIN NOW
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                >
                  <ArrowRight className="w-6 h-6" />
                </motion.div>
              </motion.a>
            </FadeIn>
          </div>
        </div>
      </Section>

      {/* FAQ SECTION */}
      <Section>
        <SectionTitle className="text-4xl font-bold tracking-tight mb-12 text-white">Frequently Asked Questions</SectionTitle>
        
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10">
          {[
            { icon: Lightbulb, q: "Do I need a fully formed startup idea?", a: "You need a clear problem statement. Phase 1 is dedicated to validating that problem. You don't need a full business plan yet, but you must have a direction." },
            { icon: Globe, q: "Is this open to all branches?", a: "Yes. We believe great founders come from every discipline. We actively encourage cross-disciplinary teams." },
            { icon: User, q: "Can I apply as a solo founder?", a: "Yes. While teams can execute faster, solo founders with high drive are welcome. You might even find potential co-founders within the cohort." },
            { icon: Calendar, q: "What is the time commitment?", a: "Consistent execution, weekly reviews, and measurable progress are expected." },
            { icon: DollarSign, q: "Does the program provide funding?", a: "We focus on making you investment-ready. Top teams from the Advanced Track will have opportunities to pitch to external investors and VCs." },
            { icon: AlertCircle, q: "What if I miss the weekly reviews?", a: "Attendance is mandatory. This program is modeled after high-performance accelerators. Inactive or absent teams will be removed." }
          ].map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </Section>

      {/* LEADERSHIP & CONTACT SECTION */}
      <Section id="contact" className="mb-12">
        <div className="text-center mb-16">
          <div>
            <SectionTitle className="text-3xl font-bold mb-4">Leadership & Contact</SectionTitle>
            <FadeIn delay={0.2}>
              <p className="text-slate-400">Connect with the team driving E-Cell RIET.</p>
            </FadeIn>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Founder 1 */}
          <FadeIn delay={0.1}>
            <motion.div 
              whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gradient-to-b from-white/[0.05] to-transparent p-10 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-colors duration-300 text-center group relative overflow-hidden h-full"
            >
              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Pulsing Background */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-500/20 rounded-full blur-[60px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />

              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="w-24 h-24 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_20px_rgba(99,102,241,0.3)] relative overflow-hidden bg-slate-800"
                >
                  <img src="https://i.pinimg.com/originals/25/0d/51/250d51aa644ad81810d1d7908838e7f5.jpg" alt="Alok Gupta" className="absolute inset-0 w-full h-full object-cover" />
                </motion.div>
                <h3 className="text-2xl font-bold mb-1 text-white">Alok Gupta</h3>
                <p className="text-indigo-400 font-mono text-sm mb-8 tracking-widest uppercase">Founder</p>
                
                <div className="flex flex-col gap-4 items-center">
                  <a href="tel:9451901542" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5 w-full justify-center group">
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <Phone className="w-5 h-5" />
                    </motion.div>
                    9451901542
                  </a>
                  <a 
                    href="https://wa.me/919451901542" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-slate-800 hover:border-indigo-500 transition-all shadow-lg shadow-indigo-900/10 w-full justify-center group"
                  >
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <WhatsAppIcon className="w-5 h-5 text-green-500" />
                    </motion.div>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Founder 2 */}
          <FadeIn delay={0.2}>
            <motion.div 
              whileHover={{ y: -10 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gradient-to-b from-white/[0.05] to-transparent p-10 rounded-3xl border border-white/10 hover:border-indigo-500/50 transition-colors duration-300 text-center group relative overflow-hidden h-full"
            >
              <div className="absolute inset-0 bg-indigo-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Pulsing Background */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-violet-500/20 rounded-full blur-[60px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: -5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="w-24 h-24 bg-gradient-to-br from-violet-500 to-purple-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_20px_rgba(139,92,246,0.3)] relative"
                >
                  LK
                </motion.div>
                <h3 className="text-2xl font-bold mb-1 text-white">Lakshya Khatri</h3>
                <p className="text-violet-400 font-mono text-sm mb-8 tracking-widest uppercase">Co-Founder</p>
                
                <div className="flex flex-col gap-4 items-center">
                  <a href="tel:9251072575" className="flex items-center gap-3 text-slate-300 hover:text-white transition-colors px-4 py-2 rounded-lg hover:bg-white/5 w-full justify-center group">
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <Phone className="w-5 h-5" />
                    </motion.div>
                    9251072575
                  </a>
                  <a 
                    href="https://wa.me/919251072575" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-slate-900 border border-slate-700 text-white px-6 py-3 rounded-full text-sm font-bold hover:bg-slate-800 hover:border-indigo-500 transition-all shadow-lg shadow-indigo-900/10 w-full justify-center group"
                  >
                    <motion.div whileHover={{ scale: 1.2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                      <WhatsAppIcon className="w-5 h-5 text-green-500" />
                    </motion.div>
                    Chat on WhatsApp
                  </a>
                </div>
              </div>
            </motion.div>
          </FadeIn>

          {/* Mentor */}
          <FadeIn delay={0.4}>
            <motion.div 
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="bg-gradient-to-b from-white/[0.05] to-transparent p-10 rounded-3xl border border-white/10 hover:border-rose-500/50 transition-colors duration-300 text-center group relative overflow-hidden h-full"
            >
              <div className="absolute inset-0 bg-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              
              {/* Pulsing Background */}
              <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-rose-500/20 rounded-full blur-[60px]"
                animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.5, 0.2] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
              />

              <div className="relative z-10">
                <motion.div 
                  whileHover={{ scale: 1.15, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300, damping: 10 }}
                  className="w-24 h-24 bg-gradient-to-br from-rose-500 to-red-600 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl font-bold text-white shadow-[0_0_20px_rgba(244,63,94,0.3)] relative"
                >
                  DM
                </motion.div>
                <h3 className="text-2xl font-bold mb-1 text-white">Dulari Ma'am</h3>
                <p className="text-rose-400 font-mono text-sm mb-8 tracking-widest uppercase">Mentor</p>
              </div>
            </motion.div>
          </FadeIn>
        </div>

        {/* Social Connect */}
        <FadeIn delay={0.5}>
            <div className="mt-16 pt-10 border-t border-white/10 text-center">
              <h3 className="text-2xl font-bold mb-8 text-white">Connect with E-Cell RIET</h3>
              <div className="flex flex-wrap justify-center gap-6">
                <motion.a 
                  href={INSTAGRAM_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 w-56 py-4 rounded-full text-slate-400 hover:text-white hover:bg-white/10 hover:border-indigo-200/30 transition-all duration-300 group"
                >
                  <motion.div whileHover={{ rotate: 15, scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Instagram className="w-5 h-5 group-hover:text-pink-500 transition-colors" />
                  </motion.div>
                  <span className="font-medium">Instagram</span>
                </motion.a>
                <motion.a 
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 w-56 py-4 rounded-full text-slate-400 hover:text-white hover:bg-white/10 hover:border-indigo-200/30 transition-all duration-300 group"
                >
                  <motion.div whileHover={{ rotate: -10, scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <WhatsAppIcon className="w-5 h-5 group-hover:text-green-500 transition-colors" />
                  </motion.div>
                  <span className="font-medium">WhatsApp Group</span>
                </motion.a>
                <motion.a 
                  href={LINKEDIN_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 w-56 py-4 rounded-full text-slate-400 hover:text-white hover:bg-white/10 hover:border-indigo-200/30 transition-all duration-300 group"
                >
                  <motion.div whileHover={{ rotate: 10, scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Linkedin className="w-5 h-5 group-hover:text-blue-500 transition-colors" />
                  </motion.div>
                  <span className="font-medium">LinkedIn</span>
                </motion.a>
                <motion.a 
                  href="mailto:riet.ecell@gmail.com"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}
                  className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 w-56 py-4 rounded-full text-slate-400 hover:text-white hover:bg-white/10 hover:border-indigo-200/30 transition-all duration-300 group"
                >
                  <motion.div whileHover={{ scale: 1.1 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                    <Mail className="w-5 h-5 group-hover:text-indigo-500 transition-colors" />
                  </motion.div>
                  <span className="font-medium">Email Us</span>
                </motion.a>
              </div>
            </div>
          </FadeIn>
      </Section>

      {/* 8. FOOTER */}
      <footer className="py-16 border-t border-white/10 text-center bg-[#020617] relative">
        <div className="absolute inset-0 bg-gradient-to-t from-indigo-950/20 to-transparent pointer-events-none"></div>
        <div className="space-y-6 text-sm text-slate-500 relative z-10 flex flex-col items-center">
          <div className="mb-4 flex flex-col items-center">
            <motion.div 
              whileHover={{ scale: 1.15, rotate: [0, -5, 5, -5, 0] }}
              transition={{ duration: 0.5 }}
              className="relative flex items-center justify-center w-16 h-16 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.3)] overflow-hidden p-1.5 mb-4"
            >
                <img src="https://i.pinimg.com/originals/21/1b/14/211b146f35a794e359b1fbee0bf3ef93.png" alt="E-CELL RIET Logo" className="w-full h-full object-cover rounded-xl" onError={(e) => (e.currentTarget.style.opacity = '0')} />
            </motion.div>
            <p className="font-bold text-white text-2xl tracking-tight mb-2">E-Cell RIET</p>
            <p className="text-slate-400">Rajasthan Institute of Engineering & Technology, Jaipur</p>
          </div>
          
          <div className="flex justify-center gap-8 mb-8">
            <a href="#how-it-works" onClick={(e) => handleSmoothScroll(e, 'how-it-works')} className="hover:text-indigo-400 transition-colors">Program</a>
            <a href="#mission" onClick={(e) => handleSmoothScroll(e, 'mission')} className="hover:text-indigo-400 transition-colors">Mission</a>
            <a href="#faq" onClick={(e) => handleSmoothScroll(e, 'faq')} className="hover:text-indigo-400 transition-colors">FAQ</a>
          </div>

          <p className="text-indigo-400 font-mono text-xs tracking-widest uppercase mb-8">Innovation • Execution • Growth</p>

          <div className="pt-8 border-t border-white/5 max-w-md mx-auto px-6 w-full">
            <p className="text-xs opacity-40">© {new Date().getFullYear()} E-Cell RIET. All Rights Reserved.</p>
            <p className="text-xs opacity-30 mt-2">Built by builders, for builders.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
