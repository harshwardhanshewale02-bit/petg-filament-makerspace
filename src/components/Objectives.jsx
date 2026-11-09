import React from 'react';
import {
  Recycle,
  Layers,
  TrendingDown,
  Flame,
  Cpu,
  Wrench,
  Leaf,
  Target
} from 'lucide-react';
import { projectObjectives } from '../data/projectData';

const iconMap = {
  Recycle,
  Layers,
  TrendingDown,
  Flame,
  Cpu,
  Wrench,
  Leaf
};

export default function Objectives() {
  return (
    <section id="objectives" className="py-24 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Target className="w-3.5 h-3.5" />
            <span>Goals & Vision</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Project Objectives
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Strategic engineering aims driving the design, fabrication, and thermal testing of our Makerspace PET filament recycling system.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Objectives Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectObjectives.map((obj, index) => {
            const IconComponent = iconMap[obj.icon] || Recycle;
            return (
              <div
                key={obj.id}
                className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between shadow-lg relative overflow-hidden"
              >
                {/* Glow accent */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 group-hover:bg-emerald-500/10 rounded-full blur-2xl transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:border-emerald-500/40 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <span className="font-mono text-xs text-slate-500 font-semibold">
                      OBJ-0{index + 1}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {obj.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {obj.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500 font-mono">
                  <span>Makerspace Metric</span>
                  <span className="text-emerald-400">Target Aligned ✓</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
