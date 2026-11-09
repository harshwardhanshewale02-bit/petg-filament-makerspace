import React, { useState, useRef } from 'react';
import { Award, GraduationCap, Quote, Camera, CheckCircle, Trash2, X } from 'lucide-react';
import { projectMeta } from '../data/projectData';

// ─────────────────────────────────────────────────────────────
//  GuideSection — Project Guide card with live photo upload
// ─────────────────────────────────────────────────────────────
export default function GuideSection() {
  const { guide } = projectMeta;

  /* ── State: guide photo (persisted in localStorage) ── */
  const [guidePhoto, setGuidePhoto] = useState(() => {
    try { return localStorage.getItem('pet2filament_guide_photo') || null; } catch { return null; }
  });
  const [hovering, setHovering] = useState(false);
  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      const data = ev.target.result;
      setGuidePhoto(data);
      try { localStorage.setItem('pet2filament_guide_photo', data); } catch {}
    };
    reader.readAsDataURL(file);
    // reset input so same file can be re-picked
    e.target.value = '';
  };

  const handleRemovePhoto = (e) => {
    e.stopPropagation();
    setGuidePhoto(null);
    try { localStorage.removeItem('pet2filament_guide_photo'); } catch {}
  };

  return (
    <section id="guide" className="py-24 bg-slate-900/40 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <GraduationCap className="w-3.5 h-3.5" />
            <span>Faculty Mentorship</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Project Guide
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Mentor Presentation Card */}
        <div className="max-w-4xl mx-auto p-8 sm:p-12 rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center md:items-start gap-8">

            {/* ── Guide Photo with Upload ── */}
            <div className="shrink-0 text-center">
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handlePhotoChange}
              />

              {/* Photo circle — click anywhere to upload */}
              <div
                className="relative w-36 h-36 sm:w-44 sm:h-44 rounded-full cursor-pointer select-none"
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                onClick={() => fileInputRef.current?.click()}
                title="Click to upload Dr. Kiran Wakchaure's photo"
              >
                {/* Gradient ring */}
                <div className="absolute inset-0 rounded-full p-1.5 bg-gradient-to-tr from-emerald-500 via-teal-400 to-cyan-400 shadow-xl shadow-emerald-950/50">
                  <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center">
                    {guidePhoto ? (
                      <img
                        src={guidePhoto}
                        alt={guide.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      /* Placeholder initials */
                      <div className="flex flex-col items-center gap-1 text-slate-500 select-none">
                        <span className="text-3xl font-black text-slate-700 tracking-tighter">KW</span>
                        <span className="text-[9px] font-mono text-slate-600 uppercase tracking-wider">Add Photo</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Hover overlay — camera icon */}
                <div
                  className={`absolute inset-0 rounded-full bg-slate-950/70 flex flex-col items-center justify-center gap-1 transition-opacity duration-200 ${
                    hovering ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <Camera className="w-7 h-7 text-emerald-400" />
                  <span className="text-[10px] font-mono text-emerald-300 font-bold">
                    {guidePhoto ? 'Change Photo' : 'Upload Photo'}
                  </span>
                </div>

                {/* Remove button (top-right corner) — only shown when photo exists */}
                {guidePhoto && (
                  <button
                    onClick={handleRemovePhoto}
                    className="absolute -top-1 -right-1 z-10 w-6 h-6 rounded-full bg-red-500 hover:bg-red-400 text-white flex items-center justify-center shadow-lg transition-colors"
                    title="Remove photo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>

              {/* Upload hint label below circle */}
              <button
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 mt-3 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[11px] font-mono text-emerald-400 hover:bg-emerald-500/20 transition-colors cursor-pointer"
              >
                <Camera className="w-3 h-3" />
                {guidePhoto ? 'Change Photo' : 'Upload Photo'}
              </button>

              {guidePhoto && (
                <div className="mt-1.5 flex items-center justify-center gap-1 text-[10px] font-mono text-emerald-500">
                  <CheckCircle className="w-3 h-3" />
                  <span>Photo uploaded</span>
                </div>
              )}
            </div>

            {/* ── Guide Bio & Info ── */}
            <div className="flex-1 text-center md:text-left">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {guide.name}
                </h3>
              </div>

              <div className="text-sm font-semibold text-cyan-400 mb-1 font-mono">
                {guide.designation}
              </div>
              <div className="text-xs text-slate-400 mb-6">
                {guide.department} • {guide.institution}
              </div>

              {/* Description */}
              <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800/80 mb-6 text-slate-300 text-sm leading-relaxed">
                "{guide.description}"
              </div>

              {/* Quotation */}
              <div className="flex items-start gap-3 text-slate-400 text-xs italic">
                <Quote className="w-5 h-5 text-emerald-400 shrink-0" />
                <span>{guide.quote}</span>
              </div>
            </div>

          </div>

          {/* Upload instructions hint (shown when no photo) */}
          {!guidePhoto && (
            <div
              className="mt-8 p-3 rounded-xl bg-slate-950/60 border border-dashed border-slate-700 text-center text-xs text-slate-500 cursor-pointer hover:border-emerald-500/40 hover:text-slate-400 transition-colors"
              onClick={() => fileInputRef.current?.click()}
            >
              <Camera className="w-4 h-4 mx-auto mb-1 text-slate-600" />
              Click the photo circle above or here to upload Dr. Kiran Wakchaure Sir's photo (JPG / PNG)
            </div>
          )}
        </div>

      </div>
    </section>
  );
}
