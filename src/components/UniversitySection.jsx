import React from 'react';
import { Building2, MapPin, BookOpen, Layers, Award, Sparkles, ExternalLink } from 'lucide-react';
import { projectMeta } from '../data/projectData';
import SmartImage from './SmartImage';

export default function UniversitySection() {
  const { universityInfo } = projectMeta;

  return (
    <section id="university" className="py-24 bg-slate-950/90 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Building2 className="w-3.5 h-3.5" />
            <span>Academic Institution</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Sanjivani University
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Kopargaon, Maharashtra, India • Department of Mechanical Engineering
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* University Showcase Card */}
        <div className="p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Prominent University Logo & Visual Frame */}
            <div className="lg:col-span-5 flex flex-col items-center">
              <div className="w-full max-w-sm rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 p-6 flex flex-col items-center justify-center text-center shadow-xl">
                
                {/* University Logo Slot */}
                <div className="w-36 h-36 rounded-2xl bg-slate-900 border border-slate-700/80 p-3 mb-4 flex items-center justify-center shadow-lg">
                  <SmartImage
                    src={universityInfo.logo}
                    alt="Sanjivani University Logo"
                    type="university"
                    placeholderText="Upload logo"
                    aspectRatio="aspect-square"
                    className="w-full h-full object-contain"
                  />
                </div>

                <h3 className="text-xl font-bold text-white mb-1">
                  {universityInfo.name}
                </h3>
                <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-mono mb-4">
                  <MapPin className="w-3.5 h-3.5" />
                  <span>{universityInfo.location}</span>
                </div>

                <div className="w-full py-2 px-3 rounded-lg bg-slate-900 text-[11px] font-mono text-slate-400 border border-slate-800">
                  Logo slot: public/images/university/sanjivani-university-logo.png
                </div>
              </div>
            </div>

            {/* Right: Academic Specifications & Department Context */}
            <div className="lg:col-span-7">
              <div className="inline-block px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-xs font-mono text-emerald-400 uppercase tracking-wider mb-4">
                Makerspace Laboratory Innovation
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                Empowering Practical Engineering
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
                {universityInfo.about}
              </p>

              {/* Exact Required Fields in Clean Spec Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-500 mb-1">
                    Department / School
                  </div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-emerald-400" />
                    <span>Mechanical Engineering</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-500 mb-1">
                    Academic Subject
                  </div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Layers className="w-4 h-4 text-cyan-400" />
                    <span>Makerspace</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-500 mb-1">
                    University Location
                  </div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-amber-400" />
                    <span>Kopargaon, Maharashtra, India</span>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="text-[11px] font-mono uppercase text-slate-500 mb-1">
                    Research Focus
                  </div>
                  <div className="text-sm font-bold text-white flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-teal-400" />
                    <span>Sustainable Additive Manufacturing</span>
                  </div>
                </div>

              </div>

              <div className="text-xs text-slate-400 font-mono flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Sanctioned student innovation project for evaluation and portfolio exhibition</span>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
