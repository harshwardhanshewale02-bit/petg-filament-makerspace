import React from 'react';
import {
  CheckCircle2,
  BookOpen,
  Trash2,
  Coins,
  GraduationCap,
  Award
} from 'lucide-react';
import { outcomesData } from '../data/projectData';

const iconMap = {
  CheckCircle2,
  BookOpen,
  Trash2,
  Coins,
  GraduationCap
};

export default function Outcomes() {
  return (
    <section id="outcomes" className="py-24 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Award className="w-3.5 h-3.5" />
            <span>Project Deliverables</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {outcomesData.heading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            {outcomesData.lead}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Outcomes Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {outcomesData.outcomes.map((item, idx) => {
            const IconComp = iconMap[item.icon] || CheckCircle2;
            return (
              <div
                key={item.title}
                className="group p-6 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 hover:bg-slate-900 transition-all duration-300 flex flex-col justify-between shadow-xl"
              >
                <div>
                  <div className="w-12 h-12 rounded-xl bg-slate-800 border border-slate-700 text-emerald-400 flex items-center justify-center mb-4 group-hover:bg-emerald-500/20 group-hover:border-emerald-500/30 transition-all">
                    <IconComp className="w-6 h-6" />
                  </div>
                  <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-500">
                  <span>Target Milestones</span>
                  <span className="text-emerald-400">Achieved / In-Progress</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
