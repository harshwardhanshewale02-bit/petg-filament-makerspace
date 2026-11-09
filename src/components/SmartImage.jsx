import React, { useState } from 'react';
import { Camera, User, Building2, Wrench, Layers } from 'lucide-react';

/**
 * SmartImage Component
 * Handles user-uploaded images gracefully.
 * If the image exists, it displays the real photo without alteration.
 * If the user has not yet placed the file, it displays an ultra-clean,
 * futuristic technical placeholder (NO fake AI faces!).
 */
export default function SmartImage({
  src,
  alt = 'Project Image',
  className = '',
  type = 'general', // 'team' | 'guide' | 'university' | 'prototype' | 'gallery' | 'general'
  placeholderText = '',
  initials = '',
  aspectRatio = 'aspect-square'
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  // Normalize path if needed
  const normalizedSrc = src ? (src.startsWith('/') ? src.slice(1) : src) : '';

  if (!src || hasError) {
    // Render clean technical placeholder
    return (
      <div
        className={`relative overflow-hidden flex flex-col items-center justify-center bg-slate-900/90 border border-slate-700/60 text-slate-300 p-4 select-none ${aspectRatio} ${className}`}
        title={`Image slot: ${src || 'Not specified'}`}
      >
        {/* Subtle grid pattern background */}
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:12px_12px]" />

        {type === 'team' && (
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg mb-2 shadow-inner">
              {initials || <User className="w-8 h-8" />}
            </div>
            <span className="text-xs font-mono text-emerald-400/90 tracking-wider uppercase font-semibold">
              {alt}
            </span>
            <span className="text-[10px] text-slate-500 mt-1 max-w-[140px] leading-tight">
              {placeholderText || 'Awaiting photo'}
            </span>
          </div>
        )}

        {type === 'guide' && (
          <div className="relative z-10 flex flex-col items-center text-center">
            <div className="w-20 h-20 rounded-full bg-emerald-500/15 border-2 border-emerald-500/40 flex items-center justify-center text-emerald-300 font-bold text-2xl mb-2 shadow-lg shadow-emerald-950/50">
              KW
            </div>
            <span className="text-xs font-mono text-emerald-400 font-semibold tracking-wide">
              Faculty Mentor Photo Slot
            </span>
            <span className="text-[10px] text-slate-400 mt-1 font-mono">
              public/images/guide/dr-kiran-wakchaure.jpg
            </span>
          </div>
        )}

        {type === 'university' && (
          <div className="relative z-10 flex flex-col items-center text-center p-2">
            <div className="w-16 h-16 rounded-xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-2">
              <Building2 className="w-8 h-8" />
            </div>
            <span className="text-sm font-bold text-slate-200">Sanjivani University</span>
            <span className="text-[11px] text-cyan-400 font-mono mt-0.5">Logo / Campus Photo Slot</span>
            <span className="text-[10px] text-slate-500 mt-1">Upload to public/images/university/</span>
          </div>
        )}

        {(type === 'prototype' || type === 'gallery' || type === 'general') && (
          <div className="relative z-10 flex flex-col items-center text-center p-3">
            <div className="w-12 h-12 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 mb-2">
              {type === 'prototype' ? <Layers className="w-6 h-6" /> : <Camera className="w-6 h-6" />}
            </div>
            <span className="text-xs font-semibold text-slate-300 tracking-wide">
              {alt || 'Project Photo'}
            </span>
            <span className="text-[10px] text-slate-500 font-mono mt-1">
              {placeholderText || 'Awaiting prototype upload'}
            </span>
          </div>
        )}

        {/* Small corner technical bracket */}
        <div className="absolute top-1 left-1 w-2 h-2 border-t border-l border-emerald-500/40" />
        <div className="absolute top-1 right-1 w-2 h-2 border-t border-r border-emerald-500/40" />
        <div className="absolute bottom-1 left-1 w-2 h-2 border-b border-l border-emerald-500/40" />
        <div className="absolute bottom-1 right-1 w-2 h-2 border-b border-r border-emerald-500/40" />
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading shimmer */}
      {!isLoaded && (
        <div className="absolute inset-0 bg-slate-800 animate-pulse flex items-center justify-center">
          <div className="w-6 h-6 border-2 border-emerald-500/40 border-t-emerald-400 rounded-full animate-spin" />
        </div>
      )}
      <img
        src={normalizedSrc}
        alt={alt}
        className={`w-full h-full object-cover transition-all duration-500 ${
          isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        onLoad={() => setIsLoaded(true)}
        onError={() => setHasError(true)}
        loading="lazy"
      />
    </div>
  );
}
