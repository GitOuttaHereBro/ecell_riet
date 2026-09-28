import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
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
  Grid3X3
} from 'lucide-react';

export interface GalleryMediaItem {
  id: string;
  title: string;
  caption: string;
  type: 'image' | 'video';
  category: 'speakers' | 'audience' | 'felicitation' | 'videos';
  categoryLabel: string;
  timestampStr: string;
  duration?: string;
  customThumbCss?: string;
  url?: string;
  speakerTag: string;
  keyTakeaway?: string;
  badge: string;
  featured?: boolean;
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
    customThumbCss: 'from-amber-600/35 via-slate-900 to-indigo-950/90'
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
    customThumbCss: 'from-indigo-600/35 via-slate-900 to-sky-950/90'
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
    customThumbCss: 'from-emerald-600/30 via-slate-900 to-slate-950'
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
    customThumbCss: 'from-purple-600/30 via-slate-900 to-indigo-950'
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
    customThumbCss: 'from-blue-600/30 via-slate-900 to-indigo-950'
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
    customThumbCss: 'from-rose-600/35 via-slate-900 to-indigo-950'
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
    customThumbCss: 'from-amber-600/30 via-slate-900 to-slate-950'
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
    customThumbCss: 'from-sky-600/30 via-slate-900 to-slate-950'
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
    customThumbCss: 'from-purple-600/30 via-slate-900 to-slate-950'
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
    customThumbCss: 'from-emerald-600/30 via-slate-900 to-slate-950'
  }
];

export const IntraxGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'speakers' | 'audience' | 'felicitation' | 'videos'>('all');
  const [layoutMode, setLayoutMode] = useState<'bento' | 'grid'>('bento');
  const [currentModalIndex, setCurrentModalIndex] = useState<number | null>(null);

  const filteredItems = CURATED_HIGHLIGHTS.filter(item => {
    if (activeTab === 'all') return true;
    return item.category === activeTab;
  });

  const selectedItem: GalleryMediaItem | null = currentModalIndex !== null && filteredItems[currentModalIndex]
    ? filteredItems[currentModalIndex]
    : null;

  // Keyboard navigation for lightbox
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (currentModalIndex === null) return;
    if (e.key === 'ArrowRight') {
      setCurrentModalIndex((prev) => (prev !== null && prev < filteredItems.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowLeft') {
      setCurrentModalIndex((prev) => (prev !== null && prev > 0 ? prev - 1 : filteredItems.length - 1));
    } else if (e.key === 'Escape') {
      setCurrentModalIndex(null);
    }
  }, [currentModalIndex, filteredItems.length]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

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

        {/* Gallery Controls: Grid View Toggle */}
        <div className="flex items-center gap-3">
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
        </div>
      </div>

      {/* Filter Tabs (Segmented controls) */}
      <div className="flex items-center gap-1.5 overflow-x-auto p-1.5 bg-slate-900/80 border border-slate-800 rounded-xl mb-8 scrollbar-none">
        {[
          { id: 'all', label: 'All Highlights', count: CURATED_HIGHLIGHTS.length },
          { id: 'speakers', label: 'Keynote & Stage', count: CURATED_HIGHLIGHTS.filter(i => i.category === 'speakers').length, icon: Mic2 },
          { id: 'audience', label: 'Audience & Hall', count: CURATED_HIGHLIGHTS.filter(i => i.category === 'audience').length, icon: Users },
          { id: 'felicitation', label: 'Felicitation', count: CURATED_HIGHLIGHTS.filter(i => i.category === 'felicitation').length, icon: Award },
          { id: 'videos', label: 'Video Snippets & Reels', count: CURATED_HIGHLIGHTS.filter(i => i.category === 'videos').length, icon: Film }
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
            ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-[280px]"
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
              className={`group relative bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-[0_0_30px_rgba(99,102,241,0.18)] hover:-translate-y-1 flex flex-col justify-between ${
                isFeaturedBento ? 'sm:col-span-2' : ''
              }`}
            >
              {/* Media Container / Visual Canvas */}
              <div className="relative w-full h-full min-h-[170px] overflow-hidden bg-slate-900 flex-1">
                {/* Curated High-Fidelity Snapshot Canvas */}
                <div className={`w-full h-full bg-gradient-to-br ${item.customThumbCss || 'from-indigo-900/40 via-slate-900 to-slate-950'} p-6 flex flex-col justify-between relative`}>
                  {/* Top tags */}
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono uppercase tracking-widest text-indigo-300 bg-slate-950/80 border border-white/10 px-2.5 py-1 rounded-md backdrop-blur-sm">
                      {item.badge}
                    </span>
                    {item.type === 'video' ? (
                      <div className="flex items-center gap-1.5">
                        {item.duration && (
                          <span className="text-[10px] font-mono bg-black/60 px-2 py-0.5 rounded text-white border border-white/10">
                            {item.duration}
                          </span>
                        )}
                        <span className="w-8 h-8 rounded-full bg-rose-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                          <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                        </span>
                      </div>
                    ) : (
                      <span className="w-8 h-8 rounded-full bg-slate-800/80 text-indigo-300 flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                        <Maximize2 className="w-3.5 h-3.5" />
                      </span>
                    )}
                  </div>

                  {/* Middle / Bottom Typography Showcase */}
                  <div>
                    <span className="text-[10px] font-mono text-indigo-300/80 block mb-1">
                      {item.timestampStr}
                    </span>
                    <h6 className="text-white text-base sm:text-lg font-bold leading-tight line-clamp-2">
                      {item.title}
                    </h6>
                    {isFeaturedBento && item.keyTakeaway && (
                      <p className="text-xs text-indigo-200/90 mt-2 line-clamp-2 bg-slate-950/60 p-2 rounded-lg border border-white/5">
                        {item.keyTakeaway}
                      </p>
                    )}
                  </div>
                </div>

                {/* Hover Play / Expand Indicator */}
                <div className="absolute inset-0 bg-indigo-950/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <span className="px-3.5 py-1.5 rounded-full bg-slate-950/90 border border-white/20 text-white text-xs font-semibold backdrop-blur-md flex items-center gap-1.5 shadow-xl">
                    {item.type === 'video' ? <Play className="w-3.5 h-3.5 fill-current" /> : <Maximize2 className="w-3.5 h-3.5" />}
                    <span>{item.type === 'video' ? 'Play Video Reel' : 'View Full Highlight'}</span>
                  </span>
                </div>
              </div>

              {/* Information Row */}
              <div className="p-4 bg-slate-950/90 border-t border-slate-800/80 flex flex-col justify-between">
                <div className="flex items-center justify-between text-[11px] text-slate-400 font-mono mb-1">
                  <span className="text-indigo-400">{item.categoryLabel}</span>
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
                <div className={`w-full h-full bg-gradient-to-br ${selectedItem.customThumbCss || 'from-indigo-950 via-slate-950 to-slate-900'} p-8 sm:p-12 flex flex-col justify-between text-white relative`}>
                  <div className="flex items-center justify-between text-xs font-mono text-indigo-400">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-indigo-400" />
                      <span>INTRAX HIGHLIGHT ARCHIVE</span>
                      <span aria-hidden="true">·</span>
                      <span>RIET AUDITORIUM</span>
                    </div>
                    <span className="text-[11px] font-mono px-2.5 py-1 rounded bg-black/40 border border-white/10 text-indigo-200">
                      {selectedItem.badge}
                    </span>
                  </div>

                  <div className="max-w-2xl my-auto py-6">
                    <span className="text-xs font-mono text-amber-300 uppercase tracking-widest block mb-2">
                      {selectedItem.timestampStr || 'Keynote Presentation'}
                    </span>
                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight mb-4 text-white">
                      {selectedItem.title}
                    </h3>
                    {selectedItem.keyTakeaway && (
                      <div className="p-4 rounded-xl bg-slate-900/80 border border-indigo-500/30 text-indigo-200 text-sm leading-relaxed mb-4">
                        <strong className="text-white block font-semibold mb-1">Key Insight:</strong>
                        {selectedItem.keyTakeaway}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-400 pt-4 border-t border-white/10">
                    <span className="font-mono text-slate-300">{selectedItem.speakerTag}</span>
                    <span className="text-emerald-400 font-mono flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                      Concluded Live Session
                    </span>
                  </div>
                </div>
              </div>

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
                    Use Left / Right arrow keys or buttons to navigate
                  </span>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
