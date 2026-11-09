import React, { useState } from 'react';
import { Camera, Image as ImageIcon, Filter, Maximize2, X, Info } from 'lucide-react';
import { galleryItems } from '../data/projectData';
import SmartImage from './SmartImage';

export default function ProjectGallery() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [modalImage, setModalImage] = useState(null);

  const categories = ['All', 'Prototype', 'Components', 'Fabrication', 'Testing', 'Final Setup'];

  const filteredItems = selectedCategory === 'All'
    ? galleryItems
    : galleryItems.filter((item) => item.category === selectedCategory);

  return (
    <section id="gallery" className="py-24 bg-slate-900/50 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Camera className="w-3.5 h-3.5" />
            <span>Visual Documentation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Project & Prototype Gallery
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto">
            Photographic archive documenting our real Makerspace hardware iterations, experimental test rigs, and component assemblies.
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* User Photo Upload Note */}
        <div className="mb-10 p-4 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-between gap-4 text-xs text-slate-400 max-w-3xl mx-auto">
          <div className="flex items-center gap-3">
            <Info className="w-5 h-5 text-emerald-400 shrink-0" />
            <span>
              <strong className="text-slate-200">Real Project Photos:</strong> Slots below reflect the physical project. Upload your actual photos to <code className="text-emerald-400 font-mono">public/images/gallery/</code> to view them automatically.
            </span>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center justify-center gap-2 flex-wrap mb-12">
          {categories.map((cat) => (
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

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="group rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-emerald-500/40 overflow-hidden shadow-xl transition-all flex flex-col justify-between"
            >
              {/* Image Container with SmartImage fallback */}
              <div
                className="relative cursor-pointer overflow-hidden aspect-[4/3] bg-slate-950"
                onClick={() => setModalImage(item)}
              >
                <SmartImage
                  src={item.image}
                  alt={item.title}
                  type="gallery"
                  placeholderText={`Upload to: ${item.image}`}
                  aspectRatio="aspect-[4/3]"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Hover overlay with maximize icon */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-xl bg-emerald-500 text-slate-950 shadow-lg">
                    <Maximize2 className="w-5 h-5" />
                  </div>
                </div>

                {/* Category Pill */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/80 backdrop-blur-md border border-slate-700/60 text-[10px] font-mono font-bold text-emerald-400">
                  {item.category}
                </div>
              </div>

              {/* Caption */}
              <div className="p-4">
                <h4 className="text-sm font-bold text-white mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {item.caption}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lightbox Modal */}
        {modalImage && (
          <div
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setModalImage(null)}
          >
            <div
              className="relative max-w-4xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-4 shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setModalImage(null)}
                className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="rounded-2xl overflow-hidden bg-slate-950 mb-4 max-h-[70vh] flex items-center justify-center">
                <SmartImage
                  src={modalImage.image}
                  alt={modalImage.title}
                  type="gallery"
                  placeholderText={`Photo Slot: ${modalImage.image}`}
                  aspectRatio="aspect-auto"
                  className="max-h-[70vh] w-auto object-contain"
                />
              </div>

              <div className="px-2 pb-2">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                    {modalImage.category}
                  </span>
                  <h3 className="text-base font-bold text-white">
                    {modalImage.title}
                  </h3>
                </div>
                <p className="text-xs text-slate-400">
                  {modalImage.caption}
                </p>
              </div>
            </div>
          </div>
        )}

      </div>
    </section>
  );
}
