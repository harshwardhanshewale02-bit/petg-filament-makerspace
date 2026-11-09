import React from 'react';
import {
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  CheckCircle,
  ArrowUpRight
} from 'lucide-react';
import { futureScope } from '../data/projectData';

export default function FutureScope() {
  return (
    <section id="future-scope" className="py-24 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Next-Generation Iterations</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Future Scope & Roadmap
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Strategic mechanical and automation upgrades planned to transition the experimental benchtop prototype into a robust automated production station.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* 7 Future Scope Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {futureScope.map((item, idx) => (
            <div
              key={item.title}
              className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between shadow-xl"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/20">
                    PHASE 2.0 // 0{idx + 1}
                  </span>
                  <ArrowUpRight className="w-4 h-4 text-slate-600 group-hover:text-emerald-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>

                <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                  {item.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-slate-500 flex items-center justify-between">
                <span>R&D Status</span>
                <span className="text-cyan-400">Planned Feature</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
