import React, { useState, useRef } from 'react';
import {
  Wrench,
  Camera,
  Maximize2,
  X,
  Plus,
  CheckCircle,
  Calendar,
  Trash2,
  ImagePlus,
  FolderOpen,
  Info,
  Sparkles
} from 'lucide-react';

// ─────────────────────────────────────────────────────────────
//  WorkDone — Project Work Log & Photos
//  • Starts completely empty — no hardcoded drawings.
//  • Add button opens an upload modal.
//  • Each card has a delete (×) button.
//  • All data persisted in localStorage.
// ─────────────────────────────────────────────────────────────

const CATEGORIES = [
  'All',
  'Mechanical Fabrication',
  'CAD & Mechanical Drafting',
  'SolidWorks 3D Modeling',
  'Thermal & Electronics',
  'Assembly & Testing',
  'System Architecture',
  'Safety & Makerspace Standards',
  'Other',
];

const CATEGORY_OPTIONS = CATEGORIES.filter((c) => c !== 'All');

const STORAGE_KEY = 'pet2filament_work_done_v2';

function loadItems() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return [];          // ← empty by default
}

function saveItems(items) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(items)); } catch {}
}

export default function WorkDone() {
  const [items, setItems] = useState(loadItems);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [lightboxItem, setLightboxItem] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  /* form state */
  const [form, setForm] = useState({
    title: '',
    category: 'Mechanical Fabrication',
    description: '',
    author: '',
    date: '',
  });
  const [imageData, setImageData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const addMoreFileRef = useRef(null);

  /* ── Derived filtered list ── */
  const filtered =
    selectedCategory === 'All'
      ? items
      : items.filter((item) => item.category === selectedCategory);

  /* ── Handlers ── */
  const handleFileSelect = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setImageData(ev.target.result);
      setImagePreview(ev.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!imageData || !form.title) return;

    const newItem = {
      id: `work-${Date.now()}`,
      phase: `WORK LOG // ${form.category.toUpperCase()}`,
      title: form.title,
      category: form.category,
      image: imageData,
      author: form.author || 'Project Team',
      date: form.date || 'Makerspace Lab Work',
      description: form.description || 'Hands-on fabrication and assembly progress.',
    };

    const updated = [newItem, ...items];
    setItems(updated);
    saveItems(updated);

    /* reset form */
    setForm({ title: '', category: 'Mechanical Fabrication', description: '', author: '', date: '' });
    setImageData(null);
    setImagePreview(null);
    setShowAddModal(false);
  };

  const handleDelete = (id) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveItems(updated);
  };

  const handleClearAll = () => {
    if (window.confirm('Remove all work log photos? This cannot be undone.')) {
      setItems([]);
      saveItems([]);
    }
  };

  /* ── Render ── */
  return (
    <section id="work-done" className="py-24 bg-slate-900/60 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Wrench className="w-3.5 h-3.5" />
            <span>Fabrication & Research Archive</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Project Work Log & Work Done
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            Upload your actual project photos — machining, soldering, CAD drawings, assembly, testing —
            and build your living work log directly on this website.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* Top Action Bar */}
        <div className="mb-10 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <div className="text-sm font-bold text-white">
                {items.length === 0
                  ? 'No photos yet — add your first work photo!'
                  : `${items.length} photo${items.length > 1 ? 's' : ''} in work log`}
              </div>
              <p className="text-xs text-slate-400">
                Click any card to expand it in a full-screen lightbox.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {items.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-3 py-2 rounded-xl font-semibold text-xs bg-slate-800 hover:bg-red-900/40 text-slate-400 hover:text-red-400 border border-slate-700 hover:border-red-500/40 transition-all flex items-center gap-1.5"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All</span>
              </button>
            )}
            <button
              onClick={() => setShowAddModal(true)}
              className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all flex items-center gap-2"
            >
              <ImagePlus className="w-4 h-4" />
              <span>Add Work Done Photo</span>
            </button>
          </div>
        </div>

        {/* Category Filter Tabs */}
        {items.length > 0 && (
          <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
            {CATEGORIES.filter((c) => c === 'All' || items.some((i) => i.category === c)).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
                  selectedCategory === cat
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900/80 text-slate-400 hover:text-white hover:bg-slate-800 border border-slate-800'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Empty State */}
        {items.length === 0 && (
          <div
            className="flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed border-slate-800 hover:border-emerald-500/40 cursor-pointer transition-colors group"
            onClick={() => setShowAddModal(true)}
          >
            <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 group-hover:border-emerald-500/40 transition-colors">
              <ImagePlus className="w-9 h-9 text-slate-700 group-hover:text-emerald-500 transition-colors" />
            </div>
            <div className="text-white font-bold text-lg mb-2">No work photos yet</div>
            <p className="text-slate-400 text-sm text-center max-w-xs mb-6 leading-relaxed">
              Upload photos of your CAD drawings, SolidWorks models, fabrication, assembly, 
              electronics wiring, or testing sessions.
            </p>
            <div className="px-5 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-emerald-500/20">
              <Plus className="w-4 h-4" />
              Add Your First Work Photo
            </div>
            <p className="mt-4 text-xs text-slate-600">
              All photos are saved locally in your browser.
            </p>
          </div>
        )}

        {/* Work Done Grid */}
        {filtered.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="group rounded-3xl bg-slate-900/90 border border-slate-800 hover:border-emerald-500/50 overflow-hidden shadow-xl transition-all duration-300 flex flex-col"
              >
                {/* Image */}
                <div
                  className="relative cursor-pointer overflow-hidden aspect-[16/10] bg-slate-950 border-b border-slate-800"
                  onClick={() => setLightboxItem(item)}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />

                  {/* Zoom overlay */}
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 shadow-lg">
                      <Maximize2 className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Phase badge */}
                  <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/60 text-[10px] font-mono font-bold text-emerald-400 max-w-[80%] truncate">
                    {item.phase}
                  </div>

                  {/* Delete button */}
                  <button
                    onClick={(e) => { e.stopPropagation(); handleDelete(item.id); }}
                    className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                    title="Delete this photo"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                {/* Card body */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center gap-2 text-[11px] font-mono text-cyan-400 mb-2">
                    <Calendar className="w-3.5 h-3.5" />
                    <span>{item.date}</span>
                  </div>

                  <h3 className="text-base font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors leading-snug">
                    {item.title}
                  </h3>

                  <p className="text-xs text-slate-300 leading-relaxed mb-4 flex-1">
                    {item.description}
                  </p>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80 text-[11px]">
                    <span className="text-slate-500 block text-[10px] uppercase font-mono">By:</span>
                    <strong className="text-slate-200">{item.author}</strong>
                  </div>
                </div>

                {/* Category tag */}
                <div className="px-5 pb-4">
                  <span className="px-2.5 py-0.5 rounded-md bg-slate-800 text-[10px] font-mono text-slate-400">
                    {item.category}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxItem && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setLightboxItem(null)}
          >
            <div
              className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxItem(null)}
                className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden bg-slate-950 mb-5 max-h-[72vh] flex items-center justify-center">
                <img
                  src={lightboxItem.image}
                  alt={lightboxItem.title}
                  className="max-h-[72vh] w-auto object-contain"
                />
              </div>

              <div className="px-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded border border-emerald-500/20">
                    {lightboxItem.phase}
                  </span>
                  <span className="text-xs text-slate-400 font-mono">{lightboxItem.category}</span>
                </div>
                <h3 className="text-lg font-bold text-white mb-2">{lightboxItem.title}</h3>
                <p className="text-xs text-slate-300 leading-relaxed mb-3">{lightboxItem.description}</p>
                <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 pt-2 border-t border-slate-800">
                  <span>By: <strong className="text-white">{lightboxItem.author}</strong></span>
                  <span className="font-mono text-emerald-400">{lightboxItem.date}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ── Add Work Photo Modal ── */}
        {showAddModal && (
          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
              <button
                onClick={() => { setShowAddModal(false); setImageData(null); setImagePreview(null); }}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white z-10"
              >
                <X className="w-4 h-4" />
              </button>

              <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
                <ImagePlus className="w-4 h-4 text-emerald-400" />
                <span>Add Work Done / Project Photo</span>
              </h3>
              <p className="text-xs text-slate-400 mb-5">
                Upload photos of your prototype, CAD drawings, SolidWorks renders, wiring, 
                machining, or any project work.
              </p>

              {/* hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
              />

              <form onSubmit={handleAddSubmit} className="space-y-4">

                {/* Photo picker */}
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1.5">
                    Photo <span className="text-red-400">*</span>
                  </label>
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className={`border-2 border-dashed rounded-xl cursor-pointer transition-colors overflow-hidden ${
                      imagePreview
                        ? 'border-emerald-500/50 bg-slate-950'
                        : 'border-slate-700 hover:border-emerald-500/60 p-6 bg-slate-950/60'
                    }`}
                  >
                    {imagePreview ? (
                      <div className="relative">
                        <img
                          src={imagePreview}
                          alt="Preview"
                          className="w-full max-h-48 object-contain rounded-xl"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                          <span className="text-xs font-mono text-emerald-400 font-bold bg-slate-950/80 px-3 py-1.5 rounded-lg">
                            Click to change photo
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2 text-slate-400 text-xs text-center">
                        <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-1">
                          <Camera className="w-6 h-6 text-slate-500" />
                        </div>
                        <span className="font-semibold text-white text-sm">Click to Choose Photo</span>
                        <span className="text-slate-500">JPG, PNG, WEBP — from your computer or phone camera</span>
                        <span className="text-[10px] text-slate-600 mt-1">
                          Works great with: CAD screenshots, SolidWorks renders, prototype photos, lab work
                        </span>
                      </div>
                    )}
                  </div>
                  {imagePreview && (
                    <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-emerald-400 font-mono">
                      <CheckCircle className="w-3.5 h-3.5" />
                      Photo selected — ready to upload
                    </div>
                  )}
                </div>

                {/* Title */}
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Title / What is this? <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. SolidWorks Assembly Front View, Heating Block Wiring, Extrusion Test..."
                    value={form.title}
                    onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-emerald-500"
                  >
                    {CATEGORY_OPTIONS.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div>
                  <label className="text-xs font-mono text-slate-300 block mb-1">
                    Description / Notes <span className="text-slate-500">(optional)</span>
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe what's shown — what was made, tested, or drawn..."
                    value={form.description}
                    onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500 resize-none"
                  />
                </div>

                {/* Author & Date (side by side) */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Done By <span className="text-slate-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Harshwardhan & Team"
                      value={form.author}
                      onChange={(e) => setForm((f) => ({ ...f, author: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-mono text-slate-300 block mb-1">
                      Date / Stage <span className="text-slate-500">(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Week 3, Nov 2026"
                      value={form.date}
                      onChange={(e) => setForm((f) => ({ ...f, date: e.target.value }))}
                      className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => { setShowAddModal(false); setImageData(null); setImagePreview(null); }}
                    className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={!imageData || !form.title}
                    className="px-5 py-2 rounded-xl text-xs font-semibold bg-emerald-500 hover:bg-emerald-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md shadow-emerald-500/20"
                  >
                    Add to Work Log
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
