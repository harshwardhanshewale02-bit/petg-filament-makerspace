import React from 'react';
import {
  Recycle,
  Layers,
  Cpu,
  Leaf,
  RotateCw,
  Sparkles,
  ArrowRight,
  TrendingDown,
  Globe2
} from 'lucide-react';
import { sustainabilityData } from '../data/projectData';

export default function Sustainability() {
  return (
    <section id="sustainability" className="py-24 bg-slate-950/80 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Leaf className="w-3.5 h-3.5" />
            <span>Circular Economy Paradigm</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {sustainabilityData.heading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            {sustainabilityData.lead}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* 4 Pillars of Convergence */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {sustainabilityData.pillars.map((pillar, idx) => {
            const icons = [Recycle, Cpu, Layers, Leaf];
            const IconComp = icons[idx % icons.length];
            return (
              <div
                key={pillar.title}
                className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center mb-4">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-white mb-2">
                    {pillar.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-slate-800/80 text-[11px] font-mono text-emerald-400">
                  PILLAR 0{idx + 1} • CONVERGENCE
                </div>
              </div>
            );
          })}
        </div>

        {/* Circular-Flow Graphic: Waste PET → Recycling → Filament → 3D Printed Object → Reuse */}
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900/90 to-slate-950 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-10 border-b border-slate-800 gap-4">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider block">Closed-Loop Architecture</span>
              <h3 className="text-xl sm:text-2xl font-extrabold text-white">
                The Zero-Waste Circular Lifecycle
              </h3>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <RotateCw className="w-3.5 h-3.5 animate-spin-slow" />
              <span>100% CLOSED LOOP RECOVERY</span>
            </div>
          </div>

          {/* Graphical Pipeline Layout */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 relative items-center">
            {sustainabilityData.circularFlow.map((stage, i) => (
              <div
                key={stage.stage}
                className="group relative p-5 rounded-2xl bg-slate-950/90 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between min-h-[170px]"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                      STEP {stage.stage}
                    </span>
                    {i < sustainabilityData.circularFlow.length - 1 && (
                      <ArrowRight className="w-4 h-4 text-slate-600 hidden lg:block group-hover:text-emerald-400 group-hover:translate-x-1 transition-all" />
                    )}
                  </div>
                  <h4 className="text-sm font-bold text-white mb-1.5 group-hover:text-emerald-400 transition-colors">
                    {stage.title}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {stage.desc}
                  </p>
                </div>

                <div className="mt-3 pt-2 border-t border-slate-800/80 text-[10px] font-mono text-slate-500 flex items-center justify-between">
                  <span>Lifecycle Phase</span>
                  <span className="text-emerald-400">Active</span>
                </div>
              </div>
            ))}
          </div>

          {/* Loop Return Banner */}
          <div className="mt-8 p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400 font-mono">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <RotateCw className="w-4 h-4" />
              <span>Full Lifecycle Re-entry:</span>
              <span className="text-slate-300 font-normal">Discarded print artifacts & failed prints can be reground and blended into new filament batches.</span>
            </div>
            <span className="text-cyan-400">Waste PET ➔ Recycling ➔ Filament ➔ 3D Printed Object ➔ Reuse</span>
          </div>

        </div>

      </div>
    </section>
  );
}
