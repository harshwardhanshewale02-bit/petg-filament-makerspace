import React from 'react';
import { ArrowRight, Users, Sparkles, Building2, Layers, Flame, Recycle, CheckCircle } from 'lucide-react';
import { heroData, projectMeta } from '../data/projectData';
import SmartImage from './SmartImage';

export default function Hero() {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Background radial glow & technical grid */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-emerald-500/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-cyan-500/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Decorative mechanical grid / filament curves */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top University Recognition Bar */}
        <div className="flex flex-col items-center justify-center mb-8 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-900/90 border border-slate-700/80 shadow-inner backdrop-blur-md">
            <div className="w-6 h-6 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Building2 className="w-3.5 h-3.5" />
            </div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-wide text-slate-200">
              <span>{projectMeta.university}</span>
              <span className="text-slate-600">•</span>
              <span className="text-emerald-400 font-mono text-[11px]">{projectMeta.location}</span>
            </div>
          </div>
        </div>

        {/* Central Titles */}
        <div className="text-center max-w-4xl mx-auto">
          {/* Makerspace Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono tracking-wider uppercase mb-5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>Makerspace Engineering Project</span>
          </div>

          {/* Main Heading */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.15] mb-6">
            Turning Waste PET Bottles into <br className="hidden sm:inline" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 drop-shadow-sm">
              3D Printing Filament
            </span>
          </h1>

          {/* Official Project Title */}
          <div className="mb-6 inline-block bg-slate-900/60 border border-slate-800 px-4 py-2 rounded-xl backdrop-blur-sm">
            <span className="text-xs uppercase tracking-wider text-slate-400 font-mono block mb-0.5">Project Title</span>
            <span className="text-sm sm:text-base font-semibold text-slate-200">
              “{heroData.projectTitle}”
            </span>
          </div>

          {/* Short Introduction */}
          <p className="text-base sm:text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed mb-10 font-normal">
            {heroData.shortIntro}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-3.5 mb-16">
            <a
              href="#about"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/25 transition-all transform hover:-translate-y-0.5 flex items-center gap-2"
            >
              <span>Explore Our Project</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href="#model-3d"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition-all flex items-center gap-2"
            >
              <Layers className="w-4 h-4 text-cyan-400" />
              <span>Interactive 3D Model</span>
            </a>
            <a
              href="#work-done"
              className="px-6 py-3.5 rounded-xl font-semibold text-sm bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700/80 transition-all flex items-center gap-2"
            >
              <Flame className="w-4 h-4 text-emerald-400" />
              <span>Project Work Log</span>
            </a>
            <a
              href="#team"
              className="px-5 py-3.5 rounded-xl font-semibold text-sm text-slate-400 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Users className="w-4 h-4 text-slate-400" />
              <span>Team</span>
            </a>
          </div>
        </div>

        {/* Hero Visual Presentation: Prototype + Animated Transformation Pipeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Outer glowing frame */}
          <div className="p-1 rounded-3xl bg-gradient-to-b from-slate-700/60 via-slate-800/40 to-slate-900/90 shadow-2xl">
            <div className="relative bg-slate-950/90 rounded-[22px] overflow-hidden p-6 sm:p-8 backdrop-blur-xl border border-slate-800">
              
              {/* Header bar of prototype frame */}
              <div className="flex flex-wrap items-center justify-between pb-6 mb-6 border-b border-slate-800 gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/80" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                  </div>
                  <span className="text-xs font-mono text-slate-400">
                    prototype_rig://sanjivani-makerspace/pet-extruder-v1
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  SYSTEM STATUS: OPERATIONAL
                </div>
              </div>

              {/* Grid: Left is Prototype Photo Display, Right is Animated Concept Pipeline */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                
                {/* Prototype Image Container */}
                <div className="lg:col-span-7">
                  <div className="relative group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/70 shadow-2xl">
                    <SmartImage
                      src={heroData.heroImage}
                      alt="Actual PET Filament Extrusion Prototype"
                      type="prototype"
                      placeholderText="Upload prototype photo to public/images/prototype/hero-prototype.jpg"
                      aspectRatio="aspect-[16/10]"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    
                    {/* Overlay Tag */}
                    <div className="absolute bottom-3 left-3 right-3 p-3 bg-slate-950/85 backdrop-blur-md rounded-xl border border-slate-700/60 flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Recycle className="w-4 h-4 text-emerald-400" />
                        <span className="font-semibold text-white">Makerspace Experimental Setup</span>
                      </div>
                      <span className="font-mono text-slate-400 text-[11px]">1.75mm Nozzle Die</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Animated Concept Transformation Pipeline */}
                <div className="lg:col-span-5 flex flex-col justify-center space-y-4">
                  <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider font-mono flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-cyan-400" />
                    <span>Conversion Cycle</span>
                  </h3>

                  {/* Flow Stages */}
                  <div className="space-y-3">
                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 transition-colors flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold text-sm shrink-0">
                        1
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Waste PET Bottle</div>
                        <div className="text-[11px] text-slate-400">Post-consumer beverage bottles collected on campus</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/40 transition-colors flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-500/15 text-cyan-400 flex items-center justify-center font-bold text-sm shrink-0">
                        2
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Precision Slitting</div>
                        <div className="text-[11px] text-slate-400">Continuous 9mm plastic ribbon cutting</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-amber-500/40 transition-colors flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-amber-500/15 text-amber-400 flex items-center justify-center font-bold text-sm shrink-0">
                        3
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">Thermal Pultrusion</div>
                        <div className="text-[11px] text-slate-400">Heating & drawing through a 1.75mm brass die</div>
                      </div>
                    </div>

                    <div className="p-3 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-teal-500/40 transition-colors flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-teal-500/15 text-teal-400 flex items-center justify-center font-bold text-sm shrink-0">
                        4
                      </div>
                      <div>
                        <div className="text-xs font-bold text-white">3D Printing Filament</div>
                        <div className="text-[11px] text-slate-400">Solid round spool ready for functional printing</div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-2 text-[11px] text-slate-400 font-mono flex items-center gap-2">
                    <CheckCircle className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Closed-loop campus recycling system</span>
                  </div>
                </div>

              </div>

              {/* Bottom Quick Stats Strip */}
              <div className="mt-8 pt-6 border-t border-slate-800 grid grid-cols-2 sm:grid-cols-4 gap-4">
                {heroData.stats.map((stat, idx) => (
                  <div key={idx} className="text-center sm:text-left">
                    <div className="text-xs text-slate-400 uppercase font-mono">{stat.label}</div>
                    <div className="text-lg sm:text-xl font-bold text-white font-mono">{stat.value}</div>
                    <div className="text-[11px] text-emerald-400">{stat.note}</div>
                  </div>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
