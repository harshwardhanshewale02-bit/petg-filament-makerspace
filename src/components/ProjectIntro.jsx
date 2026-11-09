import React from 'react';
import { ArrowRight, Recycle, Flame, Layers, Sparkles, Check, ChevronRight } from 'lucide-react';
import { introductionData } from '../data/projectData';

export default function ProjectIntro() {
  return (
    <section id="about" className="py-24 bg-slate-950/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <span>Project Introduction</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {introductionData.heading}
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Introduction Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch mb-20">
          
          {/* Card 1: The Challenge */}
          <div className="p-8 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mb-6">
                <Recycle className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                The Ecological Challenge of PET Waste
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Polyethylene Terephthalate (PET) beverage bottles are lightweight, transparent, and ubiquitous. However, massive global consumption generates millions of tons of single-use post-consumer waste annually.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                Most bottles end up in landfills or open incinerators. Rather than discarding this refined thermoplastic, our project recognizes PET's intrinsic engineering value: high tensile strength, chemical stability, and heat resistance.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-emerald-400">
              <Check className="w-4 h-4" />
              <span>Target: Upcycling discarded campus bottles into additive manufacturing feedstocks</span>
            </div>
          </div>

          {/* Card 2: The Makerspace Solution */}
          <div className="p-8 rounded-2xl bg-gradient-to-br from-slate-900/90 to-slate-900/50 border border-emerald-500/30 hover:border-emerald-500/50 transition-all flex flex-col justify-between shadow-xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <div>
              <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-6">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-4">
                Our Small-Scale Mechanical Recycling System
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-4">
                Our Makerspace project investigates a compact, self-contained system that processes PET bottles into continuous 3D printing filament.
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">
                By integrating mechanical ribbon slicing with thermal pultrusion drawing, the flat PET wall is safely reformed through a calibrated nozzle into a solid 1.75mm diameter filament suitable for testing on open-source FDM 3D printers.
              </p>
            </div>

            <div className="mt-6 pt-6 border-t border-slate-800/80 flex items-center gap-2 text-xs font-mono text-cyan-400">
              <Sparkles className="w-4 h-4" />
              <span>Outcome: Economical, zero-waste experimental prototyping in the university lab</span>
            </div>
          </div>

        </div>

        {/* Visual Process Flow: PET Bottle → ... → 3D Printing */}
        <div className="bg-slate-900/90 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 mb-8 border-b border-slate-800 gap-2">
            <div>
              <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider block">End-to-End Methodology</span>
              <h3 className="text-xl font-bold text-white">Continuous Recycling & Extrusion Process Chain</h3>
            </div>
            <div className="text-xs font-mono text-slate-400">
              8-STAGE ENGINEERING SEQUENCE
            </div>
          </div>

          {/* Process Chain Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 relative">
            {introductionData.processChain.map((item, index) => (
              <div
                key={item.step}
                className="group p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 hover:border-emerald-500/50 hover:bg-slate-900 transition-all flex flex-col justify-between text-left relative"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono font-bold text-emerald-400 px-1.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/20">
                      #{item.step}
                    </span>
                    {index < introductionData.processChain.length - 1 && (
                      <ChevronRight className="w-3.5 h-3.5 text-slate-600 hidden lg:block group-hover:text-emerald-400 transition-colors" />
                    )}
                  </div>
                  <h4 className="text-xs font-bold text-white mb-1 leading-snug">
                    {item.label}
                  </h4>
                  <p className="text-[11px] text-slate-400 leading-tight">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 p-4 rounded-xl bg-slate-950/60 border border-slate-800 flex flex-wrap items-center justify-between gap-4 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Full lifecycle from campus collection to final printed prototype</span>
            </div>
            <span className="font-mono text-emerald-400">
              PET Bottle ➔ Cleaning ➔ Cutting ➔ Heating ➔ Extrusion ➔ Cooling ➔ Filament Formation ➔ 3D Printing
            </span>
          </div>

        </div>

      </div>
    </section>
  );
}
