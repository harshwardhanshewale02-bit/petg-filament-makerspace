import React from 'react';
import {
  Cog,
  Scissors,
  Flame,
  Gauge,
  Layers,
  Cpu,
  Wind,
  Disc,
  Wrench,
  HelpCircle
} from 'lucide-react';
import { systemComponents } from '../data/projectData';

const componentIcons = [
  Layers,
  Scissors,
  Flame,
  Gauge,
  Cog,
  Wrench,
  Wind,
  Disc,
  Cpu
];

export default function SystemComponents() {
  return (
    <section id="components" className="py-24 bg-slate-900/50 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Cog className="w-3.5 h-3.5" />
            <span>Hardware Architecture</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Project System & Components
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Comprehensive mechanical and electro-thermal subsystem breakdown engineered for experimental PET filament pultrusion.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Note on Specifications */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center gap-3 text-xs text-slate-400 max-w-3xl mx-auto">
          <HelpCircle className="w-5 h-5 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-slate-200">Engineering Note:</strong> Component specifications below reflect the experimental Makerspace prototype architecture. Values marked with brackets indicate editable parameter placeholders for live testing.
          </span>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {systemComponents.map((comp, index) => {
            const IconComponent = componentIcons[index % componentIcons.length];
            return (
              <div
                key={comp.name}
                className="group p-6 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between shadow-xl relative overflow-hidden"
              >
                {/* Subtle technical corner tag */}
                <div className="absolute top-3 right-3 text-[10px] font-mono text-slate-500 uppercase">
                  SUB-SYS 0{index + 1}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-cyan-400 flex items-center justify-center group-hover:bg-cyan-500/20 group-hover:border-cyan-500/40 transition-all">
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white group-hover:text-cyan-400 transition-colors">
                        {comp.name}
                      </h3>
                      <span className="text-xs font-mono text-emerald-400">
                        {comp.role}
                      </span>
                    </div>
                  </div>

                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed mb-4">
                    {comp.description}
                  </p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800/80 mt-2">
                  <div className="text-[10px] font-mono uppercase text-slate-400 mb-1">
                    Technical Specification
                  </div>
                  <div className="text-xs font-mono text-slate-200 leading-tight">
                    {comp.specPlaceholder}
                  </div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
