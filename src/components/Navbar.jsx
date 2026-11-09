import React, { useState, useEffect } from 'react';
import { Menu, X, Recycle, ExternalLink, Sparkles } from 'lucide-react';
import { GithubIcon } from './SocialIcons';
import { projectMeta } from '../data/projectData';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: '3D CAD Model', href: '#model-3d' },
    { name: 'Work Log', href: '#work-done' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Components', href: '#components' },
    { name: 'Sustainability', href: '#sustainability' },
    { name: 'Team', href: '#team' },
    { name: 'Guide', href: '#guide' },
    { name: 'University', href: '#university' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-slate-950/85 backdrop-blur-md border-b border-slate-800/80 shadow-lg shadow-black/30 py-3'
          : 'bg-transparent border-b border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & University badge */}
          <a href="#" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 shadow-md shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center text-emerald-400">
                <Recycle className="w-5 h-5 group-hover:rotate-180 transition-transform duration-700" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-white text-base tracking-tight">PET2Filament</span>
                <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Makerspace
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-medium">Sanjivani University</p>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-300 hover:text-emerald-400 transition-colors py-1"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Right CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <a
              href="#about"
              className="px-4 py-2 rounded-lg text-xs font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 shadow-md shadow-emerald-500/25 transition-all flex items-center gap-1.5"
            >
              <span>Explore Project</span>
              <Sparkles className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden p-2 rounded-lg bg-slate-900 border border-slate-800 text-slate-300 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isOpen && (
          <div className="lg:hidden mt-3 p-4 bg-slate-900/95 backdrop-blur-xl border border-slate-800 rounded-2xl shadow-2xl flex flex-col gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="px-3 py-2 text-sm font-medium text-slate-300 hover:text-emerald-400 hover:bg-slate-800/60 rounded-lg transition-colors"
              >
                {link.name}
              </a>
            ))}
            <div className="pt-2 border-t border-slate-800 flex flex-col gap-2">
              <a
                href="#about"
                onClick={() => setIsOpen(false)}
                className="w-full text-center py-2.5 rounded-lg text-sm font-semibold bg-emerald-500 text-slate-950 hover:bg-emerald-400 transition-colors"
              >
                Explore Project
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
