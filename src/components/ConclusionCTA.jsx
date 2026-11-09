import React from 'react';
import { Sparkles, ArrowRight, Recycle, Layers, ShieldCheck, Heart } from 'lucide-react';
import { conclusionData, projectMeta } from '../data/projectData';

export default function ConclusionCTA() {
  return (
    <section className="py-24 bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 relative border-t border-slate-900 overflow-hidden">
      {/* Background glow rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Subtle pill */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-6">
          <Recycle className="w-3.5 h-3.5" />
          <span>Makerspace Project Conclusion</span>
        </div>

        {/* Strong Final Heading */}
        <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-6">
          “{conclusionData.quoteHeading}”
        </h2>

        {/* Conclusion Body */}
        <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
          {conclusionData.text}
        </p>

        {/* Big Final CTA */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-emerald-500/30 shadow-2xl relative overflow-hidden mb-12">
          <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-3">
            MAKER CULTURE & ENGINEERING ETHOS
          </div>
          <div className="text-2xl sm:text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 tracking-tight mb-8">
            “{conclusionData.finalCta}”
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <a
              href="#about"
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all flex items-center gap-2"
            >
              <span>Review Complete Project Overview</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#gallery"
              className="px-6 py-3 rounded-xl font-semibold text-xs sm:text-sm bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all"
            >
              Inspect Prototype Gallery
            </a>
          </div>
        </div>

        {/* Institutional Stamp */}
        <div className="inline-flex items-center gap-2 text-xs font-mono text-slate-400 bg-slate-900/80 px-4 py-2 rounded-full border border-slate-800">
          <ShieldCheck className="w-4 h-4 text-emerald-400" />
          <span>Sanjivani University • Department of Mechanical Engineering • Makerspace</span>
        </div>

      </div>
    </section>
  );
}
