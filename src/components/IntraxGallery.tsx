import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  Pause,
  X, 
  ChevronLeft, 
  ChevronRight, 
  Maximize2, 
  Sparkles, 
  Users, 
  Mic2, 
  Award, 
  Film,
  LayoutGrid,
  Grid3X3,
  Volume2,
  VolumeX,
  RotateCcw,
  CheckCircle2,
  FolderSync,
  Trash2
} from 'lucide-react';
import { 
  StoredMediaItem, 
  saveMediaItemToDB, 
  getAllMediaItemsFromDB, 
  clearAllMediaFromDB 
} from '../lib/galleryStorage';

export interface GalleryMediaItem {
  id: string;
  title: string;
  caption: string;
  type: 'image' | 'video';
  category: 'speakers' | 'audience' | 'felicitation' | 'videos';
  categoryLabel: string;
  timestampStr: string;
  duration?: string;
  url?: string;
  speakerTag: string;
  keyTakeaway?: string;
  badge: string;
  featured?: boolean;
  visualType: 'keynote-slide' | 'dual-speakers' | 'auditorium' | 'felicitation' | 'council' | 'video-reel';
  quoteExcerpt?: string;
  videoNumber?: number;
}

// Curated authentic highlights based on the INTRAX session
const CURATED_HIGHLIGHTS: GalleryMediaItem[] = [
  {
    id: 'highlight-slide-keynote',
    title: 'Hackathon Mode: 24 Hours Can Teach You More Than Months of Tutorials',
    caption: 'Chief Guest Keshav Bhatt on stage delivering the keynote on rapid MVP iteration, breaking down the 01 Build · 03 Fail · 04 Pivot · 05 Pitch · 07 Repeat cycle.',
    type: 'image',
    category: 'speakers',
    categoryLabel: 'Keynote & Presentation',
    timestampStr: '12:35 PM · Main Stage',
    speakerTag: 'Keshav Bhatt · Founder Kailshians X',
    keyTakeaway: 'Why building a working prototype under pressure beats months of passive tutorial watching.',
    badge: 'Keynote Slide',
    featured: true,
    visualType: 'keynote-slide',
    quoteExcerpt: '24 hours in a hackathon forces you to solve real architecture bottlenecks rather than passively copying code.'
  },
  {
    id: 'highlight-dual-speakers',
    title: 'Dual Mentorship: Industry Leadership & Competitive Hacking',
    caption: 'Keshav Bhatt and Aarav Saini sharing stage in front of the RIET banner, giving unfiltered answers to student queries about hiring, hackathons, and tech roadmaps.',
    type: 'image',
    category: 'speakers',
    categoryLabel: 'Chief Guests on Stage',
    timestampStr: '12:37 PM · Stage Front',
    speakerTag: 'Keshav Bhatt & Aarav Saini',
    keyTakeaway: 'The symbiotic path between winning hackathons and transitioning into software ventures.',
    badge: 'Stage Address',
    featured: true,
    visualType: 'dual-speakers',
    quoteExcerpt: 'From 9x hackathon wins to building products at Kailshians: practical roadmaps for college engineers.'
  },
  {
    id: 'highlight-auditorium-packed',
    title: '170+ First-Year Students Packed the Seminar Hall',
    caption: 'Unprecedented turnout of more than 170 first-year engineering students attending INTRAX at the RIET seminar hall, wearing navy polos and raising victory signs in unison alongside the core E-Cell council.',
    type: 'image',
    category: 'audience',
    categoryLabel: 'Campus Turnout',
    timestampStr: '12:40 PM · Auditorium Floor',
    speakerTag: '170+ First-Year Students & Attendees',
    keyTakeaway: 'Over 170 first-year engineering students attended, setting an energetic new milestone for E-Cell RIET.',
    badge: '170+ First Years',
    featured: false,
    visualType: 'auditorium',
    quoteExcerpt: 'Over 170 aspiring first-year developers, designers, and innovators packing every bench of the hall.'
  },
  {
    id: 'highlight-felicitation',
    title: 'Felicitation & Memento Presentation Ceremony',
    caption: 'Chief Guests Keshav Bhatt and Aarav Saini presenting the commemorative recognition box to student organizers and coordinators for their execution of INTRAX.',
    type: 'image',
    category: 'felicitation',
    categoryLabel: 'Felicitation Ceremony',
    timestampStr: '12:45 PM · Stage Center',
    speakerTag: 'E-Cell Leadership & Guests',
    keyTakeaway: 'Acknowledging student grit and the organizational teamwork behind INTRAX.',
    badge: 'Memento Handover',
    featured: false,
    visualType: 'felicitation',
    quoteExcerpt: 'Honoring exceptional industry mentors who dedicated their weekend to ignite RIET student founders.'
  },
  {
    id: 'highlight-council-founders',
    title: 'E-Cell President, Vice Presidents & Student Founders',
    caption: 'The founding executive council of E-Cell RIET standing proudly with guest speakers, unveiling the vision to turn RIET into an incubation hub.',
    type: 'image',
    category: 'audience',
    categoryLabel: 'Executive Council',
    timestampStr: '12:50 PM · Stage Front',
    speakerTag: 'President, VPs & Mentors',
    keyTakeaway: 'The leadership commitment towards continuous hackathon backing and venture mentorship.',
    badge: 'Core Council',
    featured: false,
    visualType: 'council',
    quoteExcerpt: 'Founding council unveiling the 2024-2025 incubation roadmap and student venture fund.'
  },
  {
    id: 'video-snippet-1',
    title: 'Clip 01 · 24 Hours vs Months of Tutorials (Speech Excerpt)',
    caption: 'Keshav Bhatt passionately explaining to students how real-world hackathons force instant learning and why tutorial purgatory holds builders back.',
    type: 'video',
    category: 'videos',
    categoryLabel: 'Event Video Snippet',
    duration: '0:03',
    timestampStr: 'Live Reel · Speech Excerpt',
    speakerTag: 'Keshav Bhatt on Mic',
    keyTakeaway: '"24 hours in a hackathon will teach you more than months of tutorials."',
    badge: 'Video Highlight',
    featured: true,
    visualType: 'video-reel',
    videoNumber: 1,
    quoteExcerpt: 'Don\'t wait until you feel "ready" to build. You only learn architecture when the hackathon clock is ticking!'
  },
  {
    id: 'video-snippet-2',
    title: 'Clip 02 · Auditorium Energy & Interactive Dialogue',
    caption: 'Wide panning video showcasing the crowded auditorium benches, attentive student faces, and real-time interaction during the speaker session.',
    type: 'video',
    category: 'videos',
    categoryLabel: 'Event Video Snippet',
    duration: '0:03',
    timestampStr: 'Live Reel · Hall Pan',
    speakerTag: 'Auditorium Atmosphere',
    keyTakeaway: 'Capturing the candid energy and audience engagement of the hall.',
    badge: 'Video Highlight',
    featured: false,
    visualType: 'video-reel',
    videoNumber: 2,
    quoteExcerpt: 'The packed seminar hall reacting and taking notes during the live Q&A session with Kailshians engineers.'
  },
  {
    id: 'video-snippet-3',
    title: 'Clip 03 · Aarav Saini on Competitive Hackathon Roadmaps',
    caption: 'Aarav Saini detailing how entering 25+ hackathons shaped his engineering career at Kailshians and how RIET students can form winning squads.',
    type: 'video',
    category: 'videos',
    categoryLabel: 'Event Video Snippet',
    duration: '0:04',
    timestampStr: 'Live Reel · Speaker Spotlight',
    speakerTag: 'Aarav Saini on Mic',
    keyTakeaway: 'Deconstructing the technical stack and pitching cadence that judges look for.',
    badge: 'Video Highlight',
    featured: false,
    visualType: 'video-reel',
    videoNumber: 3,
    quoteExcerpt: 'How 9 national wins and 25 finals taught me to dissect problem statements in the first 2 hours.'
  },
  {
    id: 'video-snippet-4',
    title: 'Clip 04 · Stage Interaction & Felicitation Applause',
    caption: 'The hall erupts in applause as mementos are exchanged and the President thanks our esteemed chief guests for their invaluable time.',
    type: 'video',
    category: 'videos',
    categoryLabel: 'Event Video Snippet',
    duration: '0:04',
    timestampStr: 'Live Reel · Memento Applause',
    speakerTag: 'Stage Felicitation',
    keyTakeaway: 'The celebratory moment concluding the keynote segment of INTRAX.',
    badge: 'Video Highlight',
    featured: false,
    visualType: 'video-reel',
    videoNumber: 4,
    quoteExcerpt: 'Auditorium applause echoing as the commemorative mementos are presented to our guests.'
  },
  {
    id: 'video-snippet-5',
    title: 'Clip 05 · Student Victory Cheer & Open Networking Wrap-up',
    caption: 'Students standing in rows giving victory signs, engaging in one-on-one conversations with the speakers and exchanging contacts.',
    type: 'video',
    category: 'videos',
    categoryLabel: 'Event Video Snippet',
    duration: '0:05',
    timestampStr: 'Live Reel · Victory Signs',
    speakerTag: 'Grand Finale Cheer',
    keyTakeaway: 'Students celebrating the launch of E-Cell RIET community.',
    badge: 'Video Highlight',
    featured: false,
    visualType: 'video-reel',
    videoNumber: 5,
    quoteExcerpt: 'Victory signs in the air! Over 170 first-year engineers united under the E-Cell RIET banner.'
  }
];

/* =========================================================================
   CUSTOM EVENT VISUAL CANVAS COMPONENTS
   Provides authentic visual depictions of every key moment from the event
   ========================================================================= */

const KeynoteSlideVisual: React.FC<{ isExpanded?: boolean }> = ({ isExpanded }) => (
  <div className="w-full h-full bg-[#0a0f1d] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none border border-amber-500/20">
    {/* Slide Projection Frame */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-500/15 via-indigo-950/40 to-slate-950 pointer-events-none" />
    
    {/* Projection Header Bar */}
    <div className="relative z-10 flex items-center justify-between border-b border-amber-500/20 pb-2.5">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse" />
        <span className="text-[10px] sm:text-xs font-mono font-bold text-amber-300 tracking-wider uppercase">
          PRESENTATION SLIDE · RIET AUDITORIUM
        </span>
      </div>
      <span className="text-[10px] font-mono text-slate-400 bg-black/50 px-2 py-0.5 rounded border border-white/10">
        STAGE SCREEN
      </span>
    </div>

    {/* Slide Content Body */}
    <div className="relative z-10 my-auto py-2">
      <div className="inline-block px-2.5 py-0.5 rounded bg-amber-500/20 border border-amber-400/40 text-amber-300 font-mono text-[10px] sm:text-xs font-semibold mb-2 uppercase tracking-widest">
        HACKATHON MODE
      </div>
      <h3 className={`font-black text-white tracking-tight leading-tight mb-3 ${isExpanded ? 'text-2xl sm:text-4xl' : 'text-lg sm:text-xl'}`}>
        "24 Hours Can Teach You More Than Months of Tutorials"
      </h3>

      {/* MVP Loop Diagram */}
      <div className="grid grid-cols-5 gap-1.5 sm:gap-2 pt-2 border-t border-white/10">
        {[
          { step: '01', label: 'BUILD', color: 'text-indigo-400' },
          { step: '03', label: 'FAIL', color: 'text-rose-400' },
          { step: '04', label: 'PIVOT', color: 'text-amber-400' },
          { step: '05', label: 'PITCH', color: 'text-sky-400' },
          { step: '07', label: 'REPEAT', color: 'text-emerald-400' }
        ].map((item, i) => (
          <div key={i} className="bg-slate-900/80 border border-white/10 rounded-lg p-1.5 sm:p-2 text-center">
            <span className="text-[9px] font-mono text-slate-500 block">{item.step}</span>
            <span className={`text-[10px] sm:text-xs font-black tracking-wider ${item.color}`}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>

    {/* Slide Footer */}
    <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 border-t border-white/10 pt-2 font-mono">
      <span className="text-amber-300/90 font-medium">Speaker: Keshav Bhatt (Founder Kailshians X)</span>
      <span className="text-slate-500">Slide 04 of 18</span>
    </div>
  </div>
);

const DualSpeakersVisual: React.FC<{ isExpanded?: boolean }> = ({ isExpanded }) => (
  <div className="w-full h-full bg-[#070b14] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none border border-indigo-500/20">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-600/20 via-slate-950 to-slate-950 pointer-events-none" />

    {/* Stage Lighting & Banner Representation */}
    <div className="relative z-10 flex items-center justify-between border-b border-indigo-500/20 pb-2.5">
      <div className="flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
        <span className="text-[10px] sm:text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
          E-CELL RIET · STAGE SPOTLIGHT
        </span>
      </div>
      <span className="text-[10px] font-mono text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
        CHIEF GUEST DUO
      </span>
    </div>

    {/* Dual Speaker Visual Graphic */}
    <div className="relative z-10 my-auto py-2">
      <div className="grid grid-cols-2 gap-3 sm:gap-4">
        {/* Speaker 1: Keshav Bhatt */}
        <div className="bg-slate-900/90 border border-indigo-500/30 rounded-xl p-3 sm:p-4 text-left relative overflow-hidden">
          <div className="w-2 h-full absolute left-0 top-0 bg-indigo-500" />
          <div className="flex items-center gap-2 mb-1.5">
            <Mic2 className="w-4 h-4 text-indigo-400" />
            <span className="text-[10px] font-mono text-indigo-300 uppercase tracking-wider">KEYNOTE</span>
          </div>
          <h4 className="text-sm sm:text-lg font-black text-white leading-tight">Keshav Bhatt</h4>
          <p className="text-[11px] text-slate-300 font-mono mt-0.5">Founder @ Kailshians X</p>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex flex-wrap gap-1">
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-200">9x Winner</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-indigo-200">10x Judge</span>
          </div>
        </div>

        {/* Speaker 2: Aarav Saini */}
        <div className="bg-slate-900/90 border border-sky-500/30 rounded-xl p-3 sm:p-4 text-left relative overflow-hidden">
          <div className="w-2 h-full absolute left-0 top-0 bg-sky-500" />
          <div className="flex items-center gap-2 mb-1.5">
            <Mic2 className="w-4 h-4 text-sky-400" />
            <span className="text-[10px] font-mono text-sky-300 uppercase tracking-wider">HACKER</span>
          </div>
          <h4 className="text-sm sm:text-lg font-black text-white leading-tight">Aarav Saini</h4>
          <p className="text-[11px] text-slate-300 font-mono mt-0.5">Jr. Software Engineer</p>
          <div className="mt-2 text-[10px] text-slate-400 font-mono flex flex-wrap gap-1">
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-200">9x Winner</span>
            <span className="bg-slate-800 px-1.5 py-0.5 rounded text-sky-200">25x Finalist</span>
          </div>
        </div>
      </div>

      {isExpanded && (
        <p className="text-xs text-slate-300 mt-3 bg-black/40 p-2.5 rounded-lg border border-white/10 font-mono">
          "The unfiltered roadmap on transforming student engineering teams into high-velocity hackathon squads."
        </p>
      )}
    </div>

    {/* Stage Footer */}
    <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 border-t border-white/10 pt-2 font-mono">
      <span>Official Banner: E-Cell RIET Introductory Session</span>
      <span className="text-indigo-400">Live Stage Session</span>
    </div>
  </div>
);

const AuditoriumTurnoutVisual: React.FC<{ isExpanded?: boolean }> = ({ isExpanded }) => (
  <div className="w-full h-full bg-[#061019] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none border border-emerald-500/20">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-emerald-600/15 via-slate-950 to-slate-950 pointer-events-none" />

    {/* Hall Header Bar */}
    <div className="relative z-10 flex items-center justify-between border-b border-emerald-500/20 pb-2.5">
      <div className="flex items-center gap-2">
        <Users className="w-3.5 h-3.5 text-emerald-400" />
        <span className="text-[10px] sm:text-xs font-mono font-bold text-emerald-300 uppercase tracking-wider">
          SEMINAR HALL TURNOUT RECORD
        </span>
      </div>
      <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-500/40">
        170+ ATTENDEES
      </span>
    </div>

    {/* Audience Rows Representation */}
    <div className="relative z-10 my-auto py-2">
      <div className="bg-slate-900/80 border border-emerald-500/30 rounded-2xl p-4 text-center">
        <div className="text-3xl sm:text-5xl font-black text-white tracking-tight flex items-center justify-center gap-2">
          <span>170+</span>
          <span className="text-xl sm:text-2xl text-emerald-400 font-mono">FIRST YEARS</span>
        </div>
        <p className="text-xs sm:text-sm text-emerald-200/90 font-medium mt-1">
          Benches Packed with First-Year Engineers in Navy Polos
        </p>

        {/* Visual Dots Grid Representing Packed Hall */}
        <div className="grid grid-cols-12 gap-1 max-w-xs mx-auto my-3 opacity-80">
          {Array.from({ length: 36 }).map((_, i) => (
            <span 
              key={i} 
              className={`h-1.5 rounded-full ${
                i % 4 === 0 ? 'bg-emerald-400 animate-pulse' : 'bg-indigo-400/70'
              }`} 
            />
          ))}
        </div>

        <div className="inline-flex items-center gap-2 text-[10px] sm:text-xs font-mono text-slate-300 bg-black/50 px-3 py-1 rounded-full border border-white/10">
          <span>✌️ Victory Signs Raised in Unison</span>
          <span>·</span>
          <span className="text-emerald-300">100% Full House</span>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 border-t border-white/10 pt-2 font-mono">
      <span>Location: RIET Seminar Hall Floor</span>
      <span className="text-emerald-400">Record First-Year Turnout</span>
    </div>
  </div>
);

const FelicitationVisual: React.FC<{ isExpanded?: boolean }> = ({ isExpanded }) => (
  <div className="w-full h-full bg-[#0e0717] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none border border-purple-500/20">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-600/15 via-slate-950 to-slate-950 pointer-events-none" />

    {/* Felicitation Header */}
    <div className="relative z-10 flex items-center justify-between border-b border-purple-500/20 pb-2.5">
      <div className="flex items-center gap-2">
        <Award className="w-3.5 h-3.5 text-purple-400" />
        <span className="text-[10px] sm:text-xs font-mono font-bold text-purple-300 uppercase tracking-wider">
          FELICITATION CEREMONY
        </span>
      </div>
      <span className="text-[10px] font-mono text-purple-300 bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/40">
        MEMENTO PRESENTATION
      </span>
    </div>

    {/* Memento Box Representation */}
    <div className="relative z-10 my-auto py-2">
      <div className="bg-slate-900/90 border border-purple-500/30 rounded-2xl p-4 sm:p-5 text-center max-w-sm mx-auto shadow-xl">
        <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-400/30 flex items-center justify-center mx-auto mb-2">
          <Award className="w-6 h-6" />
        </div>
        <h4 className="text-base sm:text-xl font-bold text-white leading-tight">
          Commemorative Honor Memento
        </h4>
        <p className="text-xs text-purple-200/80 font-mono mt-1">
          Presented by E-Cell RIET Leadership to Chief Guests
        </p>
        <div className="mt-3 py-1.5 px-3 rounded-lg bg-black/60 border border-purple-500/20 text-[11px] font-mono text-slate-300">
          Honoring <strong className="text-white">Keshav Bhatt</strong> & <strong className="text-white">Aarav Saini</strong>
        </div>
      </div>
    </div>

    {/* Footer */}
    <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 border-t border-white/10 pt-2 font-mono">
      <span>Awarded at INTRAX Grand Finale</span>
      <span className="text-purple-300">Memento Handover</span>
    </div>
  </div>
);

const CouncilVisual: React.FC<{ isExpanded?: boolean }> = ({ isExpanded }) => (
  <div className="w-full h-full bg-[#070d1a] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none border border-blue-500/20">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-600/15 via-slate-950 to-slate-950 pointer-events-none" />

    <div className="relative z-10 flex items-center justify-between border-b border-blue-500/20 pb-2.5">
      <div className="flex items-center gap-2">
        <Users className="w-3.5 h-3.5 text-blue-400" />
        <span className="text-[10px] sm:text-xs font-mono font-bold text-blue-300 uppercase tracking-wider">
          EXECUTIVE COUNCIL
        </span>
      </div>
      <span className="text-[10px] font-mono text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/40">
        CORE ORGANIZERS
      </span>
    </div>

    <div className="relative z-10 my-auto py-2">
      <div className="bg-slate-900/90 border border-blue-500/30 rounded-xl p-4 text-center">
        <span className="text-[10px] font-mono text-blue-300 uppercase tracking-widest block mb-1">
          E-CELL RIET · FOUNDING TEAM
        </span>
        <h4 className="text-base sm:text-xl font-bold text-white leading-tight">
          President, Vice Presidents & Student Founders
        </h4>
        <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
          The student leadership team that architected INTRAX and set the incubation foundation for 2024–2025.
        </p>
        <div className="mt-3 flex items-center justify-center gap-2 text-[10px] font-mono text-slate-400">
          <span className="bg-slate-800 px-2 py-0.5 rounded text-blue-200">Council Session</span>
          <span className="bg-slate-800 px-2 py-0.5 rounded text-blue-200">Incubation Roadmap</span>
        </div>
      </div>
    </div>

    <div className="relative z-10 flex items-center justify-between text-[10px] sm:text-xs text-slate-400 border-t border-white/10 pt-2 font-mono">
      <span>Official Stage Photo Session</span>
      <span className="text-blue-300">E-Cell Executive Team</span>
    </div>
  </div>
);

const VideoReelVisual: React.FC<{ 
  item: GalleryMediaItem;
  isExpanded?: boolean;
  isPlaying?: boolean;
  onTogglePlay?: () => void;
  progressPercent?: number;
}> = ({ item, isExpanded, isPlaying, onTogglePlay, progressPercent = 0 }) => (
  <div className="w-full h-full bg-[#0a060d] p-5 sm:p-7 flex flex-col justify-between relative overflow-hidden select-none border border-rose-500/20 group">
    {/* Video Viewfinder Background */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-rose-600/15 via-slate-950 to-slate-950 pointer-events-none" />

    {/* Video Viewfinder Header */}
    <div className="relative z-10 flex items-center justify-between border-b border-rose-500/20 pb-2.5">
      <div className="flex items-center gap-2">
        <span className={`w-2.5 h-2.5 rounded-full ${isPlaying ? 'bg-rose-500 animate-ping' : 'bg-rose-500'}`} />
        <span className="text-[10px] sm:text-xs font-mono font-bold text-rose-300 uppercase tracking-wider flex items-center gap-1.5">
          <span>● REC</span>
          <span>[{item.duration || '00:03'}]</span>
        </span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-[10px] font-mono text-white bg-black/60 px-2 py-0.5 rounded border border-white/10">
          4K REEL
        </span>
      </div>
    </div>

    {/* Center Playhead & Live Waveform Indicator */}
    <div className="relative z-10 my-auto py-2 flex flex-col items-center justify-center text-center">
      <button 
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          onTogglePlay?.();
        }}
        className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-tr from-rose-600 to-indigo-600 text-white flex items-center justify-center shadow-xl shadow-rose-600/30 group-hover:scale-110 transition-transform cursor-pointer mb-3"
      >
        {isPlaying ? (
          <Pause className="w-6 h-6 fill-current" />
        ) : (
          <Play className="w-6 h-6 fill-current ml-1" />
        )}
      </button>

      <h4 className="text-white text-sm sm:text-base font-bold leading-tight max-w-sm line-clamp-2">
        {item.title}
      </h4>

      {/* Simulated Live Audio Equalizer Waveform */}
      <div className="flex items-end justify-center gap-1 h-6 mt-3">
        {[40, 75, 55, 90, 65, 30, 85, 95, 50, 70, 45, 80, 60, 90, 35].map((h, i) => (
          <span 
            key={i} 
            className={`w-1 rounded-full transition-all ${
              isPlaying ? 'bg-rose-400 animate-pulse' : 'bg-slate-700'
            }`}
            style={{ 
              height: isPlaying ? `${Math.max(20, (h * (i % 2 === 0 ? 1 : 0.8)))}%` : '20%',
              animationDuration: `${0.3 + (i % 5) * 0.15}s`
            }} 
          />
        ))}
      </div>

      {item.quoteExcerpt && isExpanded && (
        <p className="text-xs text-rose-200/90 font-mono mt-3 max-w-md bg-black/50 p-2.5 rounded-lg border border-rose-500/20">
          "{item.quoteExcerpt}"
        </p>
      )}
    </div>

    {/* Video Progress Bar & Timecode */}
    <div className="relative z-10 space-y-1.5 border-t border-white/10 pt-2">
      <div className="w-full bg-slate-800 rounded-full h-1 overflow-hidden">
        <div 
          className="bg-gradient-to-r from-rose-500 to-indigo-500 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        />
      </div>
      <div className="flex items-center justify-between text-[10px] sm:text-xs text-slate-400 font-mono">
        <span className="text-rose-300 font-semibold">{item.speakerTag}</span>
        <span>{isPlaying ? 'Playing Live Reel' : `Clip ${item.videoNumber || 1} of 5`}</span>
      </div>
    </div>
  </div>
);

/* =========================================================================
   MAIN INTRAX GALLERY COMPONENT
   ========================================================================= */

export const IntraxGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'speakers' | 'audience' | 'felicitation' | 'videos'>('all');
  const [layoutMode, setLayoutMode] = useState<'bento' | 'grid'>('bento');
  const [currentModalIndex, setCurrentModalIndex] = useState<number | null>(null);

  // Local media sync state for organizers
  const [userMedia, setUserMedia] = useState<StoredMediaItem[]>([]);
  const [isSyncModalOpen, setIsSyncModalOpen] = useState(false);
  const [isProcessingSync, setIsProcessingSync] = useState(false);
  const [syncStatusText, setSyncStatusText] = useState('');
  const syncInputRef = useRef<HTMLInputElement>(null);

  // Interactive video simulation state inside modal
  const [isPlayingSimulated, setIsPlayingSimulated] = useState(false);
  const [simulatedProgress, setSimulatedProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  // Load any previously synced media on mount
  useEffect(() => {
    let isMounted = true;
    getAllMediaItemsFromDB().then((items) => {
      if (isMounted && items.length > 0) {
        setUserMedia(items);
      }
    });
    return () => {
      isMounted = false;
    };
  }, []);

  // Convert synced local media into display items
  const syncedItems: GalleryMediaItem[] = userMedia.map((m, idx) => ({
    id: m.id,
    title: m.name,
    caption: m.caption,
    type: m.type,
    category: m.category,
    categoryLabel: m.categoryLabel,
    timestampStr: m.sizeFormatted,
    url: m.url,
    speakerTag: 'Captured at INTRAX',
    badge: m.type === 'video' ? 'Original Reel' : 'Original Photo',
    visualType: m.type === 'video' ? 'video-reel' : 'auditorium',
    featured: idx === 0
  }));

  const allDisplayItems = [...syncedItems, ...CURATED_HIGHLIGHTS];

  // Filter items based on active segmented tab
  const filteredItems = allDisplayItems.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const selectedItem: GalleryMediaItem | null = currentModalIndex !== null && filteredItems[currentModalIndex]
    ? filteredItems[currentModalIndex]
    : null;

  // Handle simulated video playback progress
  useEffect(() => {
    let interval: any = null;
    if (isPlayingSimulated && selectedItem?.type === 'video') {
      interval = setInterval(() => {
        setSimulatedProgress((prev) => {
          if (prev >= 100) {
            setIsPlayingSimulated(false);
            return 0;
          }
          return prev + 5;
        });
      }, 150);
    } else {
      if (!isPlayingSimulated) {
        clearInterval(interval);
      }
    }
    return () => clearInterval(interval);
  }, [isPlayingSimulated, selectedItem]);

  // Reset video state when modal item changes
  useEffect(() => {
    setIsPlayingSimulated(false);
    setSimulatedProgress(0);
  }, [currentModalIndex]);

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (currentModalIndex === null) return;
    if (e.key === 'ArrowRight') {
      setCurrentModalIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowLeft') {
      setCurrentModalIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Escape') {
      setCurrentModalIndex(null);
    } else if (e.key === ' ') {
      e.preventDefault();
      setIsPlayingSimulated(prev => !prev);
    }
  }, [currentModalIndex, filteredItems.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  // Organizer file sync handler
  const handleSyncFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files: File[] = Array.from(e.target.files);

    setIsProcessingSync(true);
    setSyncStatusText(`Processing ${files.length} event captures...`);

    try {
      let heic2anyModule: any = null;
      const newItems: StoredMediaItem[] = [];

      for (let i = 0; i < files.length; i++) {
        const file: File = files[i];
        setSyncStatusText(`Optimizing ${file.name} (${i + 1}/${files.length})...`);

        const isHeic = file.name.toLowerCase().endsWith('.heic') || file.type.includes('heic') || file.type.includes('heif');
        const isVid = file.type.startsWith('video/') || file.name.toLowerCase().endsWith('.mov') || file.name.toLowerCase().endsWith('.mp4');

        let finalBlob: Blob = file;

        if (isHeic) {
          try {
            if (!heic2anyModule) {
              const mod = await import('heic2any');
              heic2anyModule = mod.default || mod;
            }
            const converted = await heic2anyModule({
              blob: file,
              toType: 'image/jpeg',
              quality: 0.85
            });
            finalBlob = (Array.isArray(converted) ? converted[0] : converted) as Blob;
          } catch (err) {
            console.warn('HEIC fallback for', file.name, err);
            finalBlob = file;
          }
        }

        const category: StoredMediaItem['category'] = isVid ? 'videos' : 'audience';
        const formattedSize = `${(file.size / (1024 * 1024)).toFixed(1)} MB`;

        const saved = await saveMediaItemToDB({
          id: `media-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
          name: file.name,
          type: isVid ? 'video' : 'image',
          caption: `INTRAX Event Capture · ${file.name}`,
          category,
          categoryLabel: isVid ? 'Live Reel' : 'Photo Highlight',
          timestamp: Date.now(),
          sizeFormatted: formattedSize,
          blob: finalBlob
        });

        newItems.push(saved);
      }

      setUserMedia(prev => [...newItems, ...prev]);
      setSyncStatusText(`Successfully connected ${files.length} captures!`);
      setTimeout(() => {
        setIsSyncModalOpen(false);
        setSyncStatusText('');
      }, 1200);
    } catch (err) {
      console.error('Error syncing media:', err);
      setSyncStatusText('Failed to sync files. Please retry.');
    } finally {
      setIsProcessingSync(false);
      if (syncInputRef.current) {
        syncInputRef.current.value = '';
      }
    }
  };

  const handleClearSyncedMedia = async () => {
    await clearAllMediaFromDB();
    setUserMedia([]);
    setIsSyncModalOpen(false);
  };

  // Helper to render the visual scene corresponding to an item
  const renderVisualCard = (item: GalleryMediaItem, isExpanded = false) => {
    if (item.url) {
      if (item.type === 'video') {
        return isExpanded ? (
          <video 
            src={item.url} 
            controls 
            autoPlay 
            playsInline 
            className="w-full h-full object-contain" 
          />
        ) : (
          <div className="relative w-full h-full">
            <video 
              src={item.url} 
              muted 
              playsInline 
              className="w-full h-full object-cover" 
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <span className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg">
                <Play className="w-5 h-5 fill-current ml-0.5" />
              </span>
            </div>
          </div>
        );
      } else {
        return (
          <img 
            src={item.url} 
            alt={item.title} 
            referrerPolicy="no-referrer"
            className={`w-full h-full ${
              isExpanded ? 'object-contain' : 'object-cover group-hover:scale-105 transition-transform duration-500'
            }`} 
          />
        );
      }
    }

    switch (item.visualType) {
      case 'keynote-slide':
        return <KeynoteSlideVisual isExpanded={isExpanded} />;
      case 'dual-speakers':
        return <DualSpeakersVisual isExpanded={isExpanded} />;
      case 'auditorium':
        return <AuditoriumTurnoutVisual isExpanded={isExpanded} />;
      case 'felicitation':
        return <FelicitationVisual isExpanded={isExpanded} />;
      case 'council':
        return <CouncilVisual isExpanded={isExpanded} />;
      case 'video-reel':
        return (
          <VideoReelVisual 
            item={item} 
            isExpanded={isExpanded}
            isPlaying={isPlayingSimulated}
            onTogglePlay={() => setIsPlayingSimulated(prev => !prev)}
            progressPercent={simulatedProgress}
          />
        );
      default:
        return <KeynoteSlideVisual isExpanded={isExpanded} />;
    }
  };

  return (
    <div className="mt-16 pt-12 border-t border-slate-800/90 text-left">
      {/* Top Header & Overview */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Event Highlight Gallery</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span>INTRAX Archive</span>
          </div>
          <h4 className="text-2xl sm:text-3xl lg:text-4xl font-black text-white tracking-tight">
            Visual Highlights & Media Gallery
          </h4>
          <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-2xl leading-relaxed">
            A structured visual chronicle of INTRAX—spanning keynote presentation slides, speaker moments with Keshav Bhatt & Aarav Saini, more than 170 attending first-year students, and live video reels.
          </p>
        </div>

        {/* Gallery Controls: Grid View Toggle & Organizer Sync Button */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Layout Mode Toggle */}
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-xl p-1 text-slate-400">
            <button
              onClick={() => setLayoutMode('bento')}
              title="Bento Highlight Grid"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                layoutMode === 'bento' ? 'bg-indigo-600 text-white' : 'hover:text-white'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" />
              <span>Bento</span>
            </button>
            <button
              onClick={() => setLayoutMode('grid')}
              title="Uniform Grid"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
                layoutMode === 'grid' ? 'bg-indigo-600 text-white' : 'hover:text-white'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Grid</span>
            </button>
          </div>

          {/* Organizer Media Link / Sync Tool */}
          <button
            onClick={() => setIsSyncModalOpen(true)}
            title="Organizer Media Connect"
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
          >
            <FolderSync className="w-3.5 h-3.5 text-indigo-400" />
            <span>Connect Media</span>
            {userMedia.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-emerald-400 ml-0.5" />
            )}
          </button>
        </div>
      </div>

      {/* Filter Tabs (Segmented controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl mb-8 scrollbar-none">
        {[
          { id: 'all', label: 'All Highlights', count: allDisplayItems.length },
          { id: 'speakers', label: 'Keynote & Stage', count: allDisplayItems.filter(i => i.category === 'speakers').length, icon: Mic2 },
          { id: 'audience', label: 'Audience & Hall', count: allDisplayItems.filter(i => i.category === 'audience').length, icon: Users },
          { id: 'felicitation', label: 'Felicitation', count: allDisplayItems.filter(i => i.category === 'felicitation').length, icon: Award },
          { id: 'videos', label: 'Video Snippets & Reels', count: allDisplayItems.filter(i => i.category === 'videos').length, icon: Film }
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              setActiveTab(tab.id as any);
              setCurrentModalIndex(null);
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg whitespace-nowrap transition-all duration-200 cursor-pointer flex items-center gap-2 ${
              activeTab === tab.id
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
            }`}
          >
            {tab.icon && <tab.icon className="w-3.5 h-3.5" />}
            <span>{tab.label}</span>
            <span className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono ${
              activeTab === tab.id ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-400'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Structured Responsive Grid */}
      <div 
        className={
          layoutMode === 'bento'
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[310px]"
            : "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        }
      >
        {filteredItems.map((item, idx) => {
          const isFeaturedBento = layoutMode === 'bento' && (item.featured || idx === 0);

          return (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-20px' }}
              transition={{ duration: 0.4, delay: idx * 0.04 }}
              onClick={() => setCurrentModalIndex(idx)}
              className={`group relative bg-slate-950/90 border border-slate-800 hover:border-indigo-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.2)] hover:-translate-y-1 flex flex-col justify-between ${
                isFeaturedBento ? 'sm:col-span-2' : ''
              }`}
            >
              {/* Media Visual Canvas */}
              <div className="relative w-full h-full min-h-[200px] overflow-hidden bg-slate-900 flex-1">
                {renderVisualCard(item, false)}

                {/* Hover Play / Expand Indicator */}
                <div className="absolute inset-0 bg-indigo-950/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none z-20">
                  <span className="px-4 py-2 rounded-full bg-slate-950/95 border border-white/20 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-2 shadow-2xl">
                    {item.type === 'video' ? <Play className="w-3.5 h-3.5 fill-current" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    <span>{item.type === 'video' ? 'Play Video Reel' : 'View Full Highlight'}</span>
                  </span>
                </div>
              </div>

              {/* Information Row */}
              <div className="p-4 bg-slate-950 border-t border-slate-800/90 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span className="text-indigo-400 font-semibold">{item.categoryLabel}</span>
                  <span>{item.timestampStr}</span>
                </div>
                <h5 className="text-sm font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                  {item.title}
                </h5>
                <div className="mt-2 pt-2 border-t border-slate-800/60 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="truncate">{item.speakerTag}</span>
                  <span className="text-indigo-400 font-bold group-hover:translate-x-1 transition-transform">›</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* FULLSCREEN LIGHTBOX & MEDIA VIEWER */}
      <AnimatePresence>
        {selectedItem && currentModalIndex !== null && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCurrentModalIndex(null)}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl"
            />

            {/* Modal Dialog Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 flex flex-col text-left"
            >
              {/* Header Bar */}
              <div className="p-4 sm:p-5 border-b border-slate-800 flex items-center justify-between bg-slate-900/60">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
                  <span className="text-indigo-400 font-semibold">{selectedItem.categoryLabel}</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span>{currentModalIndex + 1} of {filteredItems.length}</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setCurrentModalIndex(prev => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1))}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Previous (Left arrow)"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentModalIndex(prev => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0))}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors cursor-pointer"
                    title="Next (Right arrow)"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setCurrentModalIndex(null)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-rose-600 text-slate-300 hover:text-white transition-colors ml-2 cursor-pointer"
                    title="Close (Esc)"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Media Viewing Canvas */}
              <div className="relative aspect-video sm:aspect-[16/9] w-full bg-black flex items-center justify-center overflow-hidden">
                {renderVisualCard(selectedItem, true)}
              </div>

              {/* Interactive Player Controls (For Video Snippets) */}
              {selectedItem.type === 'video' && (
                <div className="p-3 bg-slate-900/90 border-t border-slate-800 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => setIsPlayingSimulated(prev => !prev)}
                      className="p-2 rounded-lg bg-rose-600 hover:bg-rose-500 text-white transition-colors flex items-center gap-1.5 text-xs font-semibold cursor-pointer"
                    >
                      {isPlayingSimulated ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                      <span>{isPlayingSimulated ? 'Pause' : 'Play Video Snippet'}</span>
                    </button>
                    <button
                      onClick={() => {
                        setSimulatedProgress(0);
                        setIsPlayingSimulated(true);
                      }}
                      className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors text-xs cursor-pointer"
                      title="Replay from beginning"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <div className="flex-1 mx-4">
                    <div 
                      onClick={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        const clickX = e.clientX - rect.left;
                        const newPct = (clickX / rect.width) * 100;
                        setSimulatedProgress(Math.min(100, Math.max(0, newPct)));
                      }}
                      className="w-full bg-slate-800 h-2 rounded-full overflow-hidden cursor-pointer relative"
                    >
                      <div 
                        className="bg-rose-500 h-full rounded-full transition-all duration-150"
                        style={{ width: `${simulatedProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                    <span>{selectedItem.duration || '0:03'}</span>
                    <button
                      onClick={() => setIsMuted(prev => !prev)}
                      className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
                      title={isMuted ? 'Unmute' : 'Mute'}
                    >
                      {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4 text-emerald-400" />}
                    </button>
                  </div>
                </div>
              )}

              {/* Information Drawer */}
              <div className="p-6 bg-slate-950 border-t border-slate-800">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <h4 className="text-lg font-bold text-white">
                    {selectedItem.title}
                  </h4>
                  <span className="text-xs font-mono text-indigo-400">
                    {selectedItem.timestampStr}
                  </span>
                </div>

                <p className="text-slate-300 text-sm leading-relaxed mb-4">
                  {selectedItem.caption}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-400 font-mono">
                    <span className="text-slate-500">FEATURED:</span>
                    <span className="text-slate-200">{selectedItem.speakerTag}</span>
                  </div>

                  <span className="text-slate-500 font-mono text-[11px]">
                    Use Left / Right arrow keys or Spacebar to control playback
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ORGANIZER MEDIA CONNECT MODAL */}
      <AnimatePresence>
        {isSyncModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSyncModalOpen(false)}
              className="fixed inset-0 bg-black/85 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="relative w-full max-w-lg bg-slate-950 border border-slate-800 rounded-3xl p-6 sm:p-8 z-10 shadow-2xl text-left"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-indigo-400 text-xs font-mono">
                  <FolderSync className="w-4 h-4" />
                  <span>ORGANIZER MEDIA MANAGER</span>
                </div>
                <button
                  onClick={() => setIsSyncModalOpen(false)}
                  className="p-1 rounded-lg text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <h4 className="text-xl font-bold text-white mb-2">
                Connect High-Resolution Event Media
              </h4>
              <p className="text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                In AI Studio, chat attachments are sent to the AI assistant for analysis and aren't automatically written to the server's disk. You can attach your local INTRAX photos (.HEIC, JPG, PNG) and videos (.MOV, MP4) directly into your browser's private vault here.
              </p>

              {/* Hidden file input */}
              <input 
                type="file"
                ref={syncInputRef}
                onChange={handleSyncFiles}
                multiple
                accept="image/*,video/*,.heic,.HEIC,.mov,.mp4"
                className="hidden"
              />

              {isProcessingSync ? (
                <div className="p-4 rounded-xl bg-indigo-950/60 border border-indigo-500/40 text-center mb-6">
                  <div className="w-6 h-6 border-2 border-indigo-400 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
                  <p className="text-xs font-mono text-indigo-200">{syncStatusText}</p>
                </div>
              ) : (
                <div className="space-y-4 mb-6">
                  <button
                    onClick={() => syncInputRef.current?.click()}
                    className="w-full py-3.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-600/30 cursor-pointer"
                  >
                    <FolderSync className="w-4 h-4" />
                    <span>Select Event Photos & Videos from Device</span>
                  </button>

                  {userMedia.length > 0 && (
                    <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs">
                      <span className="text-emerald-300 font-mono flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{userMedia.length} capture(s) currently stored</span>
                      </span>
                      <button
                        onClick={handleClearSyncedMedia}
                        className="text-rose-400 hover:text-rose-300 text-[11px] font-mono flex items-center gap-1 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>Clear</span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              <div className="p-3.5 rounded-xl bg-slate-900 border border-white/5 text-[11px] text-slate-400 font-mono space-y-1">
                <span className="text-slate-300 block font-semibold">Features Supported:</span>
                <p>• Automatic iPhone Apple HEIC to JPEG conversion.</p>
                <p>• MP4 & MOV instant video preview and timeline playback.</p>
                <p>• Persisted in client IndexedDB storage across reloads.</p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
