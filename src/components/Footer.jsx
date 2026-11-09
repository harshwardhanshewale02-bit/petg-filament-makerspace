import React from 'react';
import {
  Recycle,
  FileText,
  Building2,
  User,
  Heart,
  ExternalLink,
  ChevronUp
} from 'lucide-react';
import { GithubIcon, LinkedinIcon } from './SocialIcons';
import { projectMeta } from '../data/projectData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-900 text-slate-400 text-xs sm:text-sm relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          
          {/* Col 1 & 2: Project Info */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 shadow-md">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                  <Recycle className="w-4 h-4" />
                </div>
              </div>
              <div>
                <span className="font-bold text-white text-base">PET2Filament</span>
                <span className="text-[10px] font-mono text-emerald-400 block">Sanjivani University Makerspace</span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed mb-6 max-w-sm">
              Turning waste post-consumer Polyethylene Terephthalate (PET) beverage bottles into functional 1.75mm 3D printing filament through thermal ribbon slitting and pultrusion drawing.
            </p>

            <div className="flex items-center gap-3">
              <a
                href={projectMeta.links.githubRepo}
                target="_blank"
                rel="noreferrer"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-colors"
                aria-label="GitHub Repository"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="#gallery"
                className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:text-cyan-400 hover:border-cyan-500/40 transition-colors"
                aria-label="Project Documentation"
              >
                <FileText className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 3: Academic Metadata (Mandatory items) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono mb-4">
              Project Details
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Project</span>
                <strong className="text-slate-200">{projectMeta.title}</strong>
              </li>
              <li>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Subject</span>
                <span className="text-emerald-400 font-mono font-medium">{projectMeta.subject}</span>
              </li>
              <li>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Team</span>
                <span className="text-slate-300">4 Member Project Team</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Guide & Institution (Mandatory items) */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono mb-4">
              Mentorship & Institution
            </h4>
            <ul className="space-y-2.5 text-xs">
              <li>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Project Guide</span>
                <strong className="text-slate-200">{projectMeta.guide.name}</strong>
              </li>
              <li>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">University</span>
                <span className="text-slate-300">{projectMeta.university}, Kopargaon</span>
              </li>
              <li>
                <span className="text-slate-500 block text-[10px] uppercase font-mono">Department</span>
                <span className="text-slate-300">{projectMeta.department}</span>
              </li>
            </ul>
          </div>

          {/* Col 5: Quick Section Links */}
          <div>
            <h4 className="text-white font-bold text-xs uppercase tracking-wider font-mono mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li><a href="#about" className="hover:text-emerald-400 transition-colors">Project Overview</a></li>
              <li><a href="#objectives" className="hover:text-emerald-400 transition-colors">Objectives</a></li>
              <li><a href="#how-it-works" className="hover:text-emerald-400 transition-colors">How It Works</a></li>
              <li><a href="#components" className="hover:text-emerald-400 transition-colors">System Components</a></li>
              <li><a href="#sustainability" className="hover:text-emerald-400 transition-colors">Sustainability</a></li>
              <li><a href="#gallery" className="hover:text-emerald-400 transition-colors">Prototype Gallery</a></li>
              <li><a href="#team" className="hover:text-emerald-400 transition-colors">4 Team Members</a></li>
              <li><a href="#guide" className="hover:text-emerald-400 transition-colors">Project Guide</a></li>
              <li><a href="#university" className="hover:text-emerald-400 transition-colors">Sanjivani University</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <div>
            © {new Date().getFullYear()} Makerspace Project Team • Sanjivani University, Kopargaon, Maharashtra.
          </div>
          
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 text-slate-400 hover:text-emerald-400 transition-colors font-mono text-[11px]"
          >
            <span>Back to top</span>
            <ChevronUp className="w-4 h-4" />
          </button>
        </div>

      </div>
    </footer>
  );
}
