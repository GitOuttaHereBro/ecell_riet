import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Calendar, 
  MapPin, 
  Users, 
  Award, 
  CheckCircle2, 
  ExternalLink, 
  Sparkles, 
  X, 
  ChevronRight, 
  Quote, 
  Terminal, 
  Code2, 
  Briefcase, 
  Mic2, 
  Compass, 
  ArrowUpRight, 
  ShieldCheck, 
  BellRing,
  Camera
} from 'lucide-react';
import { IntraxGallery } from './IntraxGallery';

const WHATSAPP_GROUP_LINK = "https://chat.whatsapp.com/ENTpUc2WWwiLRuabTSoRVj/";
const GOOGLE_FORM_LINK = "https://docs.google.com/forms/d/e/1FAIpQLSdKRM7wXrG_F-mQyrAdKOM6A8FRKgH3ydPtQXiWaf3u01L0JQ/viewform?usp=publish-editor";

interface GuestSpeaker {
  name: string;
  role: string;
  company: string;
  tagline: string;
  stats: string[];
  achievements: string[];
  highlightColor: string;
}

const CHIEF_GUESTS: GuestSpeaker[] = [
  {
    name: 'Keshav Bhatt',
    role: 'Founder of Kailshians X & Public Speaker',
    company: 'Manager at Kailshians Web Services',
    tagline: '6+ Years Industry Experience • 10x National Hackathon Judge • SIH 2026 Judge',
    stats: [
      '9x Hackathon Winner',
      '14x Hackathon Mentor',
      '10x National Judge',
      '6+ Yrs Industry Exp'
    ],
    achievements: [
      'Founder of Kailshians X & Manager at Kailshians Web Services',
      '9x Hackathon Winner & 14x Mentor to student builder teams',
      '10x Judge in National Level Hackathons',
      'SIH 2026 Judge at Chandigarh University',
      'Public Speaker with 6+ years of hands-on industry experience',
      'Lead Organiser of premier initiatives: RaibarX, NirmanX, and PadharoX'
    ],
    highlightColor: 'from-amber-400/20 via-indigo-500/10 to-transparent'
  },
  {
    name: 'Aarav Saini',
    role: 'Junior Software Engineer at Kailshians',
    company: 'Competitive Hacker & Builder',
    tagline: '9x Hackathon Winner • 25x Hackathon Finalist',
    stats: [
      '9x Hackathon Winner',
      '25x Hackathon Finalist',
      'Software Engineer',
      'Competitive Builder'
    ],
    achievements: [
      'Junior Software Engineer at Kailshians',
      '9x Hackathon Winner across prominent tech sprints',
      '25x Hackathon Finalist with unmatched competitive track record',
      'Mentored aspiring student programmers on fast-paced prototyping and code validation',
      'Practical masterclass on architecting submission-ready MVPs in under 24 hours'
    ],
    highlightColor: 'from-sky-400/20 via-indigo-500/10 to-transparent'
  }
];

export const EventsSection: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGuest, setSelectedGuest] = useState<GuestSpeaker | null>(null);

  return (
    <section id="events" className="relative py-28 px-6 md:px-12 max-w-7xl mx-auto scroll-mt-24">
      {/* Background glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[850px] h-[500px] bg-indigo-900/15 rounded-full blur-[140px] pointer-events-none -z-10" />

      {/* Header */}
      <div className="text-center mb-16">
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 text-xs font-mono text-indigo-400 tracking-widest uppercase mb-4"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Events Organised by E-Cell RIET</span>
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span>Official Archive</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white mb-6"
        >
          Events Organised by <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 via-indigo-400 to-sky-400">E-Cell</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-slate-400 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed"
        >
          Real sessions engineered by the E-Cell leadership to connect students with industry titans, hackathon champions, and real startup builders.
        </motion.p>
      </div>

      {/* FEATURED EVENT: INTRAX */}
      <motion.div
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.7 }}
        className="relative bg-gradient-to-b from-slate-900/90 via-slate-950/95 to-slate-900/80 border border-indigo-500/30 hover:border-indigo-500/50 rounded-3xl p-8 sm:p-12 shadow-[0_0_50px_rgba(99,102,241,0.12)] transition-all duration-300 overflow-hidden mb-16"
      >
        {/* Ambient decorative glow inside card */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Top Badges / Organised Status */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-white/10">
          <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-slate-300">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Successfully Organised
            </span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-indigo-400 font-semibold uppercase tracking-wider">Inaugural Flagship</span>
            <span aria-hidden="true" className="text-slate-600">·</span>
            <span className="text-slate-400">RIET Campus Auditorium</span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-300 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1 rounded-full">
            <Users className="w-4 h-4 text-indigo-400" />
            <span className="font-semibold text-white">170+ First Year Students Attended</span>
          </div>
        </div>

        {/* Event Title & Subheading */}
        <div className="max-w-4xl mb-10">
          <div className="inline-block px-3 py-1 rounded-md bg-indigo-500/10 text-indigo-300 text-xs font-mono uppercase tracking-widest mb-3">
            Introductory Session of E-Cell
          </div>
          <h3 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4 flex items-baseline gap-3 flex-wrap">
            <span>INTRAX</span>
            <span className="text-lg sm:text-2xl font-normal text-slate-400">
              — The Genesis of E-Cell RIET
            </span>
          </h3>
          <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
            The benchmark inaugural orientation and induction event organized by the <strong className="text-white">E-Cell President</strong>, <strong className="text-white">Vice Presidents</strong>, and student <strong className="text-white">entrepreneurs & founders</strong>. Attended by <strong className="text-white">more than 170 first-year engineering students</strong>, INTRAX was designed to ignite the spirit of innovation, demystify national-level hackathons, and lay down the year-long execution roadmap for aspiring campus builders.
          </p>
        </div>

        {/* Organizers Ribbon */}
        <div className="bg-slate-950/70 border border-slate-800/80 rounded-2xl p-6 mb-10">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
            <Compass className="w-4 h-4 text-indigo-400" />
            <span>Organised & Hosted By</span>
          </div>
          <p className="text-white font-medium text-sm sm:text-base leading-relaxed">
            Led directly by the <span className="text-indigo-300 font-semibold">E-Cell President</span>, <span className="text-indigo-300 font-semibold">Vice Presidents</span>, and our core student founders & entrepreneurs team to foster an unapologetic culture of shipping real software and ventures at RIET.
          </p>
        </div>

        {/* CHIEF GUESTS SPOTLIGHT */}
        <div className="mb-10">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 uppercase tracking-widest mb-1">
                <Sparkles className="w-4 h-4 text-indigo-400" />
                <span>Distinguished Chief Guests</span>
              </div>
              <h4 className="text-2xl font-bold text-white tracking-tight">
                Keynote Speakers & Industry Mentors
              </h4>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {CHIEF_GUESTS.map((guest, idx) => (
              <motion.div
                key={guest.name}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="relative bg-slate-950/80 border border-slate-800/90 hover:border-indigo-500/50 rounded-2xl p-7 flex flex-col justify-between transition-all group overflow-hidden"
              >
                {/* Accent glow corner */}
                <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${guest.highlightColor} rounded-full blur-2xl pointer-events-none`} />

                <div>
                  {/* Guest Header */}
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-1">
                        <span>Chief Guest #{idx + 1}</span>
                      </div>
                      <h5 className="text-2xl font-bold text-white group-hover:text-indigo-300 transition-colors">
                        {guest.name}
                      </h5>
                      <p className="text-indigo-400 text-sm font-medium">
                        {guest.role}
                      </p>
                      <p className="text-slate-400 text-xs mt-0.5">
                        {guest.company}
                      </p>
                    </div>

                    <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-300 shrink-0">
                      {idx === 0 ? <Mic2 className="w-6 h-6" /> : <Terminal className="w-6 h-6" />}
                    </div>
                  </div>

                  {/* Fast Stats Bar */}
                  <div className="grid grid-cols-2 gap-2 my-4 pt-3 border-t border-slate-800/80">
                    {guest.stats.map((stat, sIdx) => (
                      <div key={sIdx} className="bg-slate-900/60 border border-slate-800/60 rounded-lg px-2.5 py-1.5 text-center">
                        <span className="text-xs font-mono text-slate-200 font-semibold block truncate">{stat}</span>
                      </div>
                    ))}
                  </div>

                  {/* Accomplishments List */}
                  <div className="space-y-2 mt-4 text-xs text-slate-300">
                    {guest.achievements.map((item, aIdx) => (
                      <div key={aIdx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400 shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center justify-between">
                  <span className="text-xs font-mono text-slate-500">
                    Delivered Keynote at INTRAX
                  </span>
                  <button
                    onClick={() => setSelectedGuest(guest)}
                    className="text-xs font-semibold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 cursor-pointer transition-colors"
                  >
                    <span>View Profile</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* INTRAX KEY SESSIONS & TAKEAWAYS */}
        <div className="bg-slate-950/60 border border-slate-800/80 rounded-2xl p-6 sm:p-8 mb-8">
          <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" />
            <span>Key Takeaways & Core Agenda Covered at INTRAX</span>
          </h4>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                01
              </div>
              <h5 className="text-base font-semibold text-white mb-2">E-Cell Mission Unveiled</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Welcoming 170+ first-year innovators, the President and Vice Presidents laid out the structured journey from idea to deployment with continuous mentorship, resources, and incubation.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                02
              </div>
              <h5 className="text-base font-semibold text-white mb-2">Hackathon Winning Playbook</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Aarav Saini and Keshav Bhatt broke down how to consistently win national hackathons, ideate rapid MVPs, stand out in SIH, and pitch technical solutions with confidence.
              </p>
            </div>

            <div className="bg-slate-900/50 border border-slate-800/60 rounded-xl p-5">
              <div className="w-8 h-8 rounded-lg bg-indigo-500/10 text-indigo-400 flex items-center justify-center font-mono text-xs font-bold mb-3">
                03
              </div>
              <h5 className="text-base font-semibold text-white mb-2">Founder Mindset & Ventures</h5>
              <p className="text-xs text-slate-400 leading-relaxed">
                Keshav Bhatt shared 6+ years of tech industry and community leadership wisdom (RaibarX, NirmanX, PadharoX) on transitioning from student builders into full-fledged entrepreneurs.
              </p>
            </div>
          </div>
        </div>

        {/* INTRAX EVENT HIGHLIGHTS & MEDIA GALLERY */}
        <IntraxGallery />

        {/* Action Row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 mt-4 border-t border-slate-800/80">
          <div className="text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Successfully completed on campus with overwhelming student response.</span>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-5 py-2.5 rounded-full border border-slate-700 hover:border-slate-500 text-slate-200 hover:text-white text-xs font-semibold transition-all cursor-pointer"
            >
              View Full Event Recap
            </button>
            <a
              href={WHATSAPP_GROUP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
            >
              <span>Join E-Cell Community</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* UPCOMING EVENTS PIPELINE CALLOUT */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="bg-gradient-to-r from-slate-900/90 via-indigo-950/40 to-slate-900/90 border border-white/10 rounded-3xl p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="text-left">
          <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 mb-2">
            <BellRing className="w-4 h-4 text-indigo-400" />
            <span>MORE EVENTS IN THE PIPELINE</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Upcoming Hackathons, Summits & Founder Sprints
          </h3>
          <p className="text-slate-400 text-sm sm:text-base max-w-2xl leading-relaxed">
            Following the monumental success of INTRAX, the E-Cell leadership is curating upcoming buildathons, investor pitch challenges, and exclusive masterclasses. Join our official community to stay notified before registrations open.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0 w-full md:w-auto">
          <a
            href={WHATSAPP_GROUP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-6 py-3 rounded-full text-sm font-bold transition-all shadow-lg shadow-emerald-900/30"
          >
            <span>Get Event Updates on WhatsApp</span>
            <ExternalLink className="w-4 h-4" />
          </a>
          <a
            href={GOOGLE_FORM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-slate-800/80 border border-slate-700 hover:border-slate-500 text-slate-200 px-6 py-3 rounded-full text-sm font-medium hover:text-white transition-all"
          >
            <span>Apply to E-Cell</span>
          </a>
        </div>
      </motion.div>

      {/* FULL INTRAX RECAP MODAL */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            {/* Modal Content */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: 'spring', stiffness: 350, damping: 25 }}
              className="relative w-full max-w-3xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 max-h-[90vh] flex flex-col text-left"
            >
              {/* Modal Header */}
              <div className="p-6 sm:p-8 border-b border-slate-800/80 bg-slate-900/60 relative">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  aria-label="Close dialog"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 mb-2">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Concluded Event Archive</span>
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-300">E-Cell RIET</span>
                </div>

                <h3 className="text-3xl sm:text-4xl font-black text-white mb-2 pr-10">
                  INTRAX · Full Session Overview
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Introductory Session of E-Cell RIET conducted by the E-Cell President, Vice Presidents, campus entrepreneurs, and distinguished chief guests.
                </p>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8 space-y-8 overflow-y-auto max-h-[calc(90vh-220px)]">
                {/* Event Summary */}
                <div>
                  <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
                    Event Background & Objective
                  </h4>
                  <p className="text-slate-300 text-sm leading-relaxed">
                    INTRAX was conceived as the foundational milestone of E-Cell RIET to shatter passive learning and install an active building culture on campus. More than 170 first-year engineering students attended the session to interact directly with proven builders, national hackathon champions, and college leadership.
                  </p>
                </div>

                {/* Chief Guests Highlights */}
                <div>
                  <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-3">
                    Chief Guests & Mentors
                  </h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {CHIEF_GUESTS.map((g) => (
                      <div key={g.name} className="bg-slate-900/60 border border-slate-800/90 rounded-2xl p-5">
                        <h5 className="text-lg font-bold text-white mb-1">{g.name}</h5>
                        <p className="text-indigo-400 text-xs font-medium mb-3">{g.role}</p>
                        <ul className="space-y-1.5 text-xs text-slate-300">
                          {g.achievements.slice(0, 4).map((ach, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <span className="text-indigo-400 font-bold">›</span>
                              <span>{ach}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leadership Team Contribution */}
                <div className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-5">
                  <h4 className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
                    Hosted by E-Cell Leadership
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-3">
                    The E-Cell President and Vice Presidents introduced the ecosystem framework: structured stages spanning Ideation, Validation, Building, and Execution. Students were invited to form squads, participate in upcoming hackathons, and receive continuous backing from E-Cell mentors.
                  </p>
                  <div className="flex flex-wrap gap-2 text-xs font-mono text-slate-300">
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300">President Address</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300">Vice Presidents Roadmap</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300">Student Founders Panel</span>
                    <span className="px-2.5 py-1 rounded-md bg-slate-800 text-indigo-300">Open Q&A</span>
                  </div>
                </div>
              </div>

              {/* Modal Footer */}
              <div className="p-6 border-t border-slate-800 bg-slate-900/80 flex items-center justify-between gap-4">
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="px-5 py-2.5 rounded-xl border border-slate-700 text-slate-300 hover:text-white text-xs font-medium transition-colors cursor-pointer"
                >
                  Close
                </button>

                <a
                  href={WHATSAPP_GROUP_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
                >
                  <span>Connect with Attendees</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* SINGLE GUEST DETAIL MODAL */}
      <AnimatePresence>
        {selectedGuest && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedGuest(null)}
              className="fixed inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-xl bg-slate-950 border border-slate-800 rounded-3xl shadow-2xl overflow-hidden z-10 p-6 sm:p-8 text-left"
            >
              <button
                onClick={() => setSelectedGuest(null)}
                className="absolute top-6 right-6 p-2 rounded-full text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                aria-label="Close dialog"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="text-xs font-mono text-indigo-400 uppercase tracking-wider mb-2">
                Chief Guest Spotlight · INTRAX
              </div>
              <h3 className="text-3xl font-bold text-white mb-1">
                {selectedGuest.name}
              </h3>
              <p className="text-indigo-400 text-sm font-semibold mb-1">
                {selectedGuest.role}
              </p>
              <p className="text-slate-400 text-xs mb-6">
                {selectedGuest.company}
              </p>

              <div className="grid grid-cols-2 gap-2 mb-6">
                {selectedGuest.stats.map((stat, i) => (
                  <div key={i} className="bg-slate-900/80 border border-slate-800 p-2.5 rounded-xl text-center">
                    <span className="text-xs font-mono text-slate-200 font-bold">{stat}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-2.5 mb-8">
                <h4 className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2">
                  Recognitions & Career Credentials
                </h4>
                {selectedGuest.achievements.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-300">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>

              <button
                onClick={() => setSelectedGuest(null)}
                className="w-full py-3 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold transition-all shadow-lg shadow-indigo-600/30"
              >
                Done
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
