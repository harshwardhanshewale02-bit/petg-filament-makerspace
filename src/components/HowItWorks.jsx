import React, { useState } from 'react';
import {
  PackageCheck,
  Sparkles,
  Scissors,
  Thermometer,
  Minimize2,
  Wind,
  Disc,
  Printer,
  ChevronRight,
  ArrowRight,
  Info
} from 'lucide-react';
import { howItWorksSteps } from '../data/projectData';

const iconMap = {
  PackageCheck,
  Sparkles,
  Scissors,
  Thermometer,
  Minimize2,
  Wind,
  Disc,
  Printer
};

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);
  const current = howItWorksSteps[activeStep];
  const IconComponent = iconMap[current.icon] || Info;

  return (
    <section id="how-it-works" className="py-24 bg-slate-950/80 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <span>Engineering Workflow</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            How It Works: Step-by-Step
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Explore the detailed mechanical, thermal, and material transformation pipeline turning consumer plastic containers into additive manufacturing spools.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Interactive Step Navigator Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar justify-start lg:justify-center">
          {howItWorksSteps.map((step, idx) => (
            <button
              key={step.number}
              onClick={() => setActiveStep(idx)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-2 border ${
                activeStep === idx
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 shadow-md shadow-emerald-500/20'
                  : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
              }`}
            >
              <span className={`font-mono text-[11px] ${activeStep === idx ? 'text-slate-950 font-bold' : 'text-emerald-400'}`}>
                {step.number}
              </span>
              <span>{step.title}</span>
            </button>
          ))}
        </div>

        {/* Featured Step Display Card */}
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden mb-16">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left: Step Info */}
            <div className="lg:col-span-7">
              <div className="flex items-center gap-3 mb-4">
                <span className="font-mono text-xs font-bold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
                  STAGE {current.number} OF 08
                </span>
                <span className="text-xs text-slate-400 font-mono tracking-wider uppercase">
                  {current.subtitle}
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-extrabold text-white mb-4">
                {current.title}
              </h3>

              <p className="text-slate-300 text-base leading-relaxed mb-6">
                {current.description}
              </p>

              {/* Engineering Detail Callout */}
              <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-start gap-3">
                <Info className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold text-white uppercase font-mono">
                    Technical Consideration
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5">
                    {current.details}
                  </div>
                </div>
              </div>

              {/* Step Navigation Controls */}
              <div className="flex items-center gap-3 mt-8">
                <button
                  onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : howItWorksSteps.length - 1))}
                  className="px-4 py-2 rounded-lg text-xs font-medium bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                >
                  ← Previous Step
                </button>
                <button
                  onClick={() => setActiveStep((prev) => (prev < howItWorksSteps.length - 1 ? prev + 1 : 0))}
                  className="px-5 py-2 rounded-lg text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 transition-colors flex items-center gap-1.5"
                >
                  <span>Next Step</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Right: Technical Diagram Card */}
            <div className="lg:col-span-5">
              <div className="p-8 rounded-2xl bg-slate-950/90 border border-slate-800 relative flex flex-col items-center justify-center text-center shadow-inner min-h-[300px]">
                <div className="w-24 h-24 rounded-2xl bg-gradient-to-tr from-emerald-500/20 to-cyan-500/20 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-400 mb-6 shadow-lg shadow-emerald-950">
                  <IconComponent className="w-12 h-12" />
                </div>

                <div className="text-sm font-bold text-white mb-1">
                  {current.title}
                </div>
                <div className="text-xs font-mono text-cyan-400 mb-4">
                  {current.subtitle}
                </div>

                {/* Simulated parameter strip */}
                <div className="w-full grid grid-cols-2 gap-2 text-left bg-slate-900 p-3 rounded-xl border border-slate-800 text-[11px] font-mono">
                  <div>
                    <span className="text-slate-500 block">Status:</span>
                    <span className="text-emerald-400">Calibrated</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Process Mode:</span>
                    <span className="text-white">Active</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* 8-Step Grid Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {howItWorksSteps.map((step, idx) => {
            const StepIcon = iconMap[step.icon] || Info;
            return (
              <div
                key={step.number}
                onClick={() => setActiveStep(idx)}
                className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                  activeStep === idx
                    ? 'bg-slate-900 border-emerald-500/60 shadow-lg shadow-emerald-950/40'
                    : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-900/90'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center text-emerald-400">
                    <StepIcon className="w-5 h-5" />
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-500">
                    #{step.number}
                  </span>
                </div>
                <h4 className="text-sm font-bold text-white mb-1">
                  {step.title}
                </h4>
                <p className="text-xs text-slate-400 line-clamp-2">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
