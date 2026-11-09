import React from 'react';
import {
  Recycle,
  Cog,
  Gauge,
  Compass,
  Layers,
  ShieldCheck,
  Zap
} from 'lucide-react';
import { technicalHighlights } from '../data/projectData';

const iconMap = {
  Recycle,
  Cog,
  Gauge,
  Compass,
  Layers,
  ShieldCheck
};

export default function TechnicalHighlights() {
  return (
    <section className="py-24 bg-slate-950/70 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Zap className="w-3.5 h-3.5" />
            <span>Core Competencies</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Technical Highlights
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Rigorous engineering methods applied across material science, kinematics, thermodynamics, and additive manufacturing.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* 6 Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {technicalHighlights.map((item, idx) => {
            const IconComponent = iconMap[item.icon] || Cog;
            return (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/30 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-500">
                      PILLAR 0{idx + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Makerspace Verification</span>
                  <span className="text-cyan-400">Validated</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
