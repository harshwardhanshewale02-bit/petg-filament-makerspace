import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { STLLoader } from 'three/examples/jsm/loaders/STLLoader.js';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import {
  Box,
  RotateCw,
  Maximize2,
  Upload,
  Eye,
  Layers,
  Thermometer,
  Sparkles,
  Info,
  Check,
  AlertCircle,
  FileCode,
  Compass,
  ImagePlus,
  Camera,
  Images,
  Trash2,
  X,
  CheckCircle,
  Cuboid
} from 'lucide-react';
import { model3DData } from '../data/projectData';

// ─────────────────────────────────────────────────────────────
//  ModelImages sub-component: upload & display 3D model photos
// ─────────────────────────────────────────────────────────────
const MODEL_IMAGES_KEY = 'pet2filament_model_images';

function loadModelImages() {
  try { const r = localStorage.getItem(MODEL_IMAGES_KEY); return r ? JSON.parse(r) : []; } catch { return []; }
}
function saveModelImages(imgs) {
  try { localStorage.setItem(MODEL_IMAGES_KEY, JSON.stringify(imgs)); } catch {}
}

function ModelImages() {
  const [images, setImages] = useState(loadModelImages);
  const [lightbox, setLightbox] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [form, setForm] = useState({ title: '', description: '', viewType: 'Isometric View' });
  const [imgData, setImgData] = useState(null);
  const [imgPreview, setImgPreview] = useState(null);
  const fileRef = useRef(null);

  const VIEW_TYPES = [
    'Front View', 'Side View', 'Top View', 'Isometric View',
    'Exploded View', 'Section View', 'Assembly View', 'Render / Photo'
  ];

  const handleFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => { setImgData(ev.target.result); setImgPreview(ev.target.result); };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!imgData || !form.title) return;
    const updated = [{ id: `mimg-${Date.now()}`, ...form, src: imgData }, ...images];
    setImages(updated); saveModelImages(updated);
    setShowAddModal(false); setImgData(null); setImgPreview(null);
    setForm({ title: '', description: '', viewType: 'Isometric View' });
  };

  const handleDelete = (id) => {
    const updated = images.filter((i) => i.id !== id);
    setImages(updated); saveModelImages(updated);
  };

  return (
    <div className="mt-0">
      {/* Top bar */}
      <div className="mb-8 p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400 flex items-center justify-center shrink-0">
            <Images className="w-5 h-5" />
          </div>
          <div>
            <div className="text-sm font-bold text-white">
              {images.length === 0
                ? 'No model images yet — upload SolidWorks screenshots or renders!'
                : `${images.length} model image${images.length > 1 ? 's' : ''} uploaded`}
            </div>
            <p className="text-xs text-slate-400">Upload screenshots, renders, or photo of your SolidWorks 3D model.</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="px-4 py-2.5 rounded-xl font-semibold text-xs bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/20 transition-all flex items-center gap-2 shrink-0"
        >
          <ImagePlus className="w-4 h-4" />
          <span>Upload Model Image</span>
        </button>
      </div>

      {/* Empty State */}
      {images.length === 0 && (
        <div
          className="flex flex-col items-center justify-center py-20 rounded-3xl border-2 border-dashed border-slate-800 hover:border-cyan-500/40 cursor-pointer transition-colors group"
          onClick={() => setShowAddModal(true)}
        >
          <div className="w-20 h-20 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-5 group-hover:border-cyan-500/40 transition-colors">
            <Cuboid className="w-9 h-9 text-slate-700 group-hover:text-cyan-500 transition-colors" />
          </div>
          <div className="text-white font-bold text-lg mb-2">No model images yet</div>
          <p className="text-slate-400 text-sm text-center max-w-xs mb-6 leading-relaxed">
            Upload screenshots or renders from SolidWorks — front view, isometric, exploded assembly, or any photo of your physical model.
          </p>
          <div className="px-5 py-2.5 rounded-xl bg-cyan-500 text-slate-950 font-semibold text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20">
            <ImagePlus className="w-4 h-4" />
            Upload Your First Model Image
          </div>
        </div>
      )}

      {/* Images Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img) => (
            <div
              key={img.id}
              className="group rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/50 overflow-hidden shadow-xl transition-all duration-300"
            >
              <div
                className="relative cursor-pointer overflow-hidden aspect-[4/3] bg-slate-950"
                onClick={() => setLightbox(img)}
              >
                <img src={img.src} alt={img.title} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                {/* Overlay */}
                <div className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="p-2.5 rounded-xl bg-cyan-500 text-slate-950"><Maximize2 className="w-5 h-5" /></div>
                </div>
                {/* Badge */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-md bg-slate-950/85 backdrop-blur-md border border-slate-700/60 text-[10px] font-mono font-bold text-cyan-400">
                  {img.viewType}
                </div>
                {/* Delete */}
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(img.id); }}
                  className="absolute top-3 right-3 w-7 h-7 rounded-lg bg-red-500/80 hover:bg-red-500 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  title="Remove image"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
              <div className="p-4">
                <h3 className="text-sm font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors">{img.title}</h3>
                {img.description && <p className="text-xs text-slate-400 leading-relaxed">{img.description}</p>}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4" onClick={() => setLightbox(null)}>
          <div className="relative max-w-5xl w-full bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden p-6 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setLightbox(null)} className="absolute top-5 right-5 z-10 p-2 rounded-full bg-slate-950/80 text-white hover:bg-slate-800"><X className="w-5 h-5" /></button>
            <div className="rounded-2xl overflow-hidden bg-slate-950 mb-5 max-h-[72vh] flex items-center justify-center">
              <img src={lightbox.src} alt={lightbox.title} className="max-h-[72vh] w-auto object-contain" />
            </div>
            <div className="px-2">
              <span className="text-xs font-mono text-cyan-400 bg-cyan-500/10 px-2.5 py-0.5 rounded border border-cyan-500/20">{lightbox.viewType}</span>
              <h3 className="text-lg font-bold text-white mt-2 mb-1">{lightbox.title}</h3>
              {lightbox.description && <p className="text-xs text-slate-300">{lightbox.description}</p>}
            </div>
          </div>
        </div>
      )}

      {/* Add Image Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-left max-h-[90vh] overflow-y-auto">
            <button onClick={() => { setShowAddModal(false); setImgData(null); setImgPreview(null); }} className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white z-10"><X className="w-4 h-4" /></button>

            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Cuboid className="w-4 h-4 text-cyan-400" />
              Upload 3D Model Image / Screenshot
            </h3>
            <p className="text-xs text-slate-400 mb-5">
              Upload screenshots from SolidWorks, CAD renders, or real photos of your 3D printed prototype.
            </p>

            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleFile(e.target.files?.[0])} />

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Image picker */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1.5">Image <span className="text-red-400">*</span></label>
                <div
                  onClick={() => fileRef.current?.click()}
                  className={`border-2 border-dashed rounded-xl cursor-pointer transition-colors overflow-hidden ${imgPreview ? 'border-cyan-500/50 bg-slate-950' : 'border-slate-700 hover:border-cyan-500/60 p-6 bg-slate-950/60'}`}
                >
                  {imgPreview ? (
                    <div className="relative">
                      <img src={imgPreview} alt="Preview" className="w-full max-h-48 object-contain rounded-xl" />
                      <div className="absolute inset-0 flex items-center justify-center bg-slate-950/60 opacity-0 hover:opacity-100 transition-opacity rounded-xl">
                        <span className="text-xs font-mono text-cyan-400 font-bold bg-slate-950/80 px-3 py-1.5 rounded-lg">Click to change</span>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-slate-400 text-xs text-center">
                      <div className="w-12 h-12 rounded-xl bg-slate-800 flex items-center justify-center mb-1">
                        <Cuboid className="w-6 h-6 text-slate-500" />
                      </div>
                      <span className="font-semibold text-white text-sm">Click to Choose Image</span>
                      <span className="text-slate-500">SolidWorks screenshot, render, CAD view, or prototype photo</span>
                    </div>
                  )}
                </div>
                {imgPreview && <div className="flex items-center gap-1.5 mt-1.5 text-[11px] text-cyan-400 font-mono"><CheckCircle className="w-3.5 h-3.5" />Image selected</div>}
              </div>

              {/* Title */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Title <span className="text-red-400">*</span></label>
                <input type="text" placeholder="e.g. SolidWorks Isometric Assembly View" value={form.title} onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500" required />
              </div>

              {/* View type */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">View / Type</label>
                <select value={form.viewType} onChange={(e) => setForm((f) => ({ ...f, viewType: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white focus:outline-none focus:border-cyan-500">
                  {VIEW_TYPES.map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="text-xs font-mono text-slate-300 block mb-1">Description <span className="text-slate-500">(optional)</span></label>
                <textarea rows={2} placeholder="Describe what this view shows..." value={form.description} onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))} className="w-full px-3 py-2 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-600 focus:outline-none focus:border-cyan-500 resize-none" />
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button type="button" onClick={() => { setShowAddModal(false); setImgData(null); setImgPreview(null); }} className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-800 text-slate-300 hover:bg-slate-700">Cancel</button>
                <button type="submit" disabled={!imgData || !form.title} className="px-5 py-2 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 disabled:opacity-40 disabled:cursor-not-allowed transition-colors shadow-md shadow-cyan-500/20">Add Image</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default function ModelViewer3D() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [activePreset, setActivePreset] = useState('solidworks-assembly');
  const [viewMode, setViewMode] = useState('shaded'); // 'shaded' | 'wireframe' | 'thermal' | 'xray'
  const [isAutoRotating, setIsAutoRotating] = useState(true);
  const [showGrid, setShowGrid] = useState(true);
  const [loadedFileName, setLoadedFileName] = useState(null);
  const [modelStats, setModelStats] = useState({ vertices: 0, faces: 0, size: 'Auto-scaled' });
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [showExportGuide, setShowExportGuide] = useState(false);

  // ── Tab: '3d-viewer' | 'model-images'
  const [activeTab, setActiveTab] = useState('3d-viewer');

  // Three.js instances ref
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const cameraRef = useRef(null);
  const controlsRef = useRef(null);
  const currentModelGroup = useRef(null);
  const gridHelperRef = useRef(null);
  const animationFrameId = useRef(null);

  // Initialize Three.js Scene
  useEffect(() => {
    if (!canvasRef.current) return;

    const width = canvasRef.current.clientWidth || 800;
    const height = canvasRef.current.clientHeight || 520;

    // 1. Scene
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0a0f1d);
    sceneRef.current = scene;

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.set(60, 45, 75);
    cameraRef.current = camera;

    // 3. Renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFShadowMap;
    rendererRef.current = renderer;

    // Safely mount to dedicated canvas container
    while (canvasRef.current.firstChild) {
      canvasRef.current.removeChild(canvasRef.current.firstChild);
    }
    canvasRef.current.appendChild(renderer.domElement);

    // 4. Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.maxDistance = 250;
    controls.minDistance = 10;
    controlsRef.current = controls;

    // 5. Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    scene.add(ambientLight);

    const dirLight1 = new THREE.DirectionalLight(0x38bdf8, 1.2);
    dirLight1.position.set(60, 100, 60);
    dirLight1.castShadow = true;
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x10b981, 0.8);
    dirLight2.position.set(-60, -40, -60);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0xffffff, 0.9, 150);
    pointLight.position.set(0, 30, 20);
    scene.add(pointLight);

    // 6. Ground Grid & Shadow Base
    const gridHelper = new THREE.GridHelper(100, 30, 0x10b981, 0x1e293b);
    gridHelper.position.y = -20;
    gridHelperRef.current = gridHelper;
    scene.add(gridHelper);

    // Model group container
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);
    currentModelGroup.current = modelGroup;

    // Load Initial SolidWorks Assembly Model (makerspace_A.SLDASM)
    loadModelFromUrl('models/pet-extruder-model.stl', 'makerspace_A.SLDASM (SolidWorks Assembly)');

    // 7. Animation Loop
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    };
    animate();

    // Resize Handler
    const handleResize = () => {
      if (!containerRef.current || !rendererRef.current || !cameraRef.current) return;
      const w = containerRef.current.clientWidth;
      const h = containerRef.current.clientHeight || 520;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      if (canvasRef.current && rendererRef.current && rendererRef.current.domElement) {
        if (canvasRef.current.contains(rendererRef.current.domElement)) {
          canvasRef.current.removeChild(rendererRef.current.domElement);
        }
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, []);

  // Toggle Auto Rotation
  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.autoRotate = isAutoRotating;
    }
  }, [isAutoRotating]);

  // Toggle Grid
  useEffect(() => {
    if (gridHelperRef.current) {
      gridHelperRef.current.visible = showGrid;
    }
  }, [showGrid]);

  // Update Materials when ViewMode Changes
  useEffect(() => {
    if (!currentModelGroup.current) return;
    applyViewMode(currentModelGroup.current, viewMode);
  }, [viewMode]);

  // Apply visual styling (CAD Shaded, Wireframe, Thermal, X-Ray)
  const applyViewMode = (group, mode) => {
    group.traverse((child) => {
      if (child.isMesh) {
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material.clone();
        }

        if (mode === 'wireframe') {
          child.material = new THREE.MeshBasicMaterial({
            color: 0x34d399,
            wireframe: true,
          });
        } else if (mode === 'thermal') {
          // Heatmap simulation (red at hot nozzle tip, transition to yellow, then blue)
          const yPos = child.position.y;
          const heatColor = yPos < -5 ? 0xef4444 : yPos < 10 ? 0xf59e0b : 0x06b6d4;
          child.material = new THREE.MeshStandardMaterial({
            color: heatColor,
            roughness: 0.3,
            metalness: 0.2,
            emissive: heatColor,
            emissiveIntensity: yPos < -5 ? 0.3 : 0.05,
          });
        } else if (mode === 'xray') {
          child.material = new THREE.MeshPhysicalMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.35,
            roughness: 0.1,
            transmission: 0.7,
            wireframe: false,
          });
        } else {
          // Restore original CAD shaded material
          child.material = child.userData.originalMaterial.clone();
        }
      }
    });
  };

  // Helper to clear existing models in group
  const clearCurrentModel = () => {
    if (!currentModelGroup.current) return;
    while (currentModelGroup.current.children.length > 0) {
      const obj = currentModelGroup.current.children[0];
      if (obj.geometry) obj.geometry.dispose();
      if (obj.material) {
        if (Array.isArray(obj.material)) obj.material.forEach((m) => m.dispose());
        else obj.material.dispose();
      }
      currentModelGroup.current.remove(obj);
    }
  };

  // 1. Build Parametric PET Extruder Hotend Assembly
  const buildParametricExtruder = (group) => {
    clearCurrentModel();
    setIsLoading(false);
    setErrorMessage(null);

    // Brass Nozzle (Hex base + Tapered Cone + 1.75mm orifice)
    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd4af37, // Golden brass
      metalness: 0.85,
      roughness: 0.25,
    });

    const coneGeom = new THREE.ConeGeometry(5.5, 9, 16);
    const coneMesh = new THREE.Mesh(coneGeom, brassMaterial);
    coneMesh.position.y = -10.5;
    coneMesh.rotation.x = Math.PI;
    coneMesh.castShadow = true;
    group.add(coneMesh);

    const hexGeom = new THREE.CylinderGeometry(6, 6, 4, 6);
    const hexMesh = new THREE.Mesh(hexGeom, brassMaterial);
    hexMesh.position.y = -5;
    hexMesh.castShadow = true;
    group.add(hexMesh);

    // Aluminum Heating Block (20x20x12 mm)
    const aluMaterial = new THREE.MeshStandardMaterial({
      color: 0xc0c8d0, // Machined aluminum
      metalness: 0.8,
      roughness: 0.35,
    });
    const blockGeom = new THREE.BoxGeometry(18, 12, 18);
    const blockMesh = new THREE.Mesh(blockGeom, aluMaterial);
    blockMesh.position.set(0, 3, 0);
    blockMesh.castShadow = true;
    group.add(blockMesh);

    // Cartridge Heater embedded into side hole
    const heaterMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
    const heaterGeom = new THREE.CylinderGeometry(2.5, 2.5, 24, 16);
    const heaterMesh = new THREE.Mesh(heaterGeom, heaterMat);
    heaterMesh.rotation.z = Math.PI / 2;
    heaterMesh.position.set(0, 3, 4);
    group.add(heaterMesh);

    // Red high-temp silicone heater wires
    const wireMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.5 });
    const wireGeom = new THREE.CylinderGeometry(0.8, 0.8, 20, 8);
    const wireMesh = new THREE.Mesh(wireGeom, wireMat);
    wireMesh.position.set(12, 12, 4);
    wireMesh.rotation.z = -Math.PI / 6;
    group.add(wireMesh);

    // Thermistor sensor probe
    const sensorMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.4 });
    const sensorGeom = new THREE.CylinderGeometry(1, 1, 14, 8);
    const sensorMesh = new THREE.Mesh(sensorGeom, sensorMat);
    sensorMesh.position.set(-6, 3, -6);
    group.add(sensorMesh);

    // Stainless steel throat / Heatbreak with radiator fins
    const ssMat = new THREE.MeshStandardMaterial({ color: 0x64748b, metalness: 0.9, roughness: 0.3 });
    const throatGeom = new THREE.CylinderGeometry(3.5, 3.5, 22, 16);
    const throatMesh = new THREE.Mesh(throatGeom, ssMat);
    throatMesh.position.y = 18;
    group.add(throatMesh);

    // Heatsink fins
    for (let i = 0; i < 5; i++) {
      const finGeom = new THREE.CylinderGeometry(10, 10, 1.2, 24);
      const finMesh = new THREE.Mesh(finGeom, aluMaterial);
      finMesh.position.y = 12 + i * 3.2;
      group.add(finMesh);
    }

    // Top Aluminum Mounting Bracket
    const mountGeom = new THREE.BoxGeometry(28, 4, 28);
    const mountMesh = new THREE.Mesh(mountGeom, aluMaterial);
    mountMesh.position.y = 28;
    group.add(mountMesh);

    // Semi-translucent PET Bottle Ribbon feeding down into throat
    const ribbonMat = new THREE.MeshPhysicalMaterial({
      color: 0x38bdf8,
      transparent: true,
      opacity: 0.75,
      roughness: 0.1,
      transmission: 0.8,
    });
    const ribbonGeom = new THREE.BoxGeometry(9, 30, 0.3);
    const ribbonMesh = new THREE.Mesh(ribbonGeom, ribbonMat);
    ribbonMesh.position.set(0, 36, 0);
    group.add(ribbonMesh);

    // Continuous 1.75mm Extruded Cylindrical Filament exiting nozzle tip
    const filamentMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      roughness: 0.25,
      metalness: 0.1,
    });
    const filamentGeom = new THREE.CylinderGeometry(0.875, 0.875, 30, 16);
    const filamentMesh = new THREE.Mesh(filamentGeom, filamentMat);
    filamentMesh.position.set(0, -28, 0);
    group.add(filamentMesh);

    // Update stats
    setModelStats({
      vertices: 1842,
      faces: 1420,
      size: '28 x 75 x 28 mm (Calibrated 1:1 Scale)',
    });
    setLoadedFileName('pet-extruder-hotend-assembly.cad');
    applyViewMode(group, viewMode);
  };

  // 2. Build Parametric Ribbon Slitter Mechanism
  const buildParametricSlitter = (group) => {
    clearCurrentModel();
    setIsLoading(false);
    setErrorMessage(null);

    const steelMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
    const brassMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.7, roughness: 0.3 });
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });

    // Aluminum chassis base plate
    const baseGeom = new THREE.BoxGeometry(50, 6, 35);
    const baseMesh = new THREE.Mesh(baseGeom, steelMat);
    baseMesh.position.y = -10;
    group.add(baseMesh);

    // Dual 608ZZ Bearings for smooth bottle rotation
    for (let i = -1; i <= 1; i += 2) {
      const bearingGeom = new THREE.CylinderGeometry(8, 8, 5, 24);
      const bearingMesh = new THREE.Mesh(bearingGeom, steelMat);
      bearingMesh.rotation.x = Math.PI / 2;
      bearingMesh.position.set(i * 12, 0, 0);
      group.add(bearingMesh);

      const boltGeom = new THREE.CylinderGeometry(3, 3, 14, 16);
      const boltMesh = new THREE.Mesh(boltGeom, brassMat);
      boltMesh.rotation.x = Math.PI / 2;
      boltMesh.position.set(i * 12, 0, 0);
      group.add(boltMesh);
    }

    // High-carbon utility slitting blade at calibrated 45° angle
    const bladeGeom = new THREE.BoxGeometry(22, 12, 0.6);
    const bladeMesh = new THREE.Mesh(bladeGeom, bladeMat);
    bladeMesh.rotation.z = Math.PI / 4;
    bladeMesh.position.set(0, 3, 8);
    group.add(bladeMesh);

    // Blade clamp plate
    const clampGeom = new THREE.BoxGeometry(20, 8, 4);
    const clampMesh = new THREE.Mesh(clampGeom, steelMat);
    clampMesh.position.set(0, 2, 10);
    group.add(clampMesh);

    setModelStats({
      vertices: 1256,
      faces: 980,
      size: '50 x 25 x 35 mm (Blade Slitter)',
    });
    setLoadedFileName('ribbon-slitter-fixture.cad');
    applyViewMode(group, viewMode);
  };

  // 3. Load File from Local Disk or User Upload (.STL, .OBJ, .GLB)
  const loadCustomModelFile = (file) => {
    if (!file) return;
    setIsLoading(true);
    setErrorMessage(null);
    clearCurrentModel();

    const fileName = file.name.toLowerCase();
    const reader = new FileReader();

    if (fileName.endsWith('.stl')) {
      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          const loader = new STLLoader();
          const geometry = loader.parse(contents);

          geometry.computeVertexNormals();
          geometry.center();

          const material = new THREE.MeshStandardMaterial({
            color: 0x38bdf8,
            metalness: 0.6,
            roughness: 0.35,
          });

          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;

          // Auto-scale into view
          geometry.computeBoundingBox();
          const box = geometry.boundingBox;
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 40 / (maxDim || 1);
          mesh.scale.set(scale, scale, scale);

          currentModelGroup.current.add(mesh);

          setModelStats({
            vertices: geometry.attributes.position.count,
            faces: geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3,
            size: `${size.x.toFixed(1)} x ${size.y.toFixed(1)} x ${size.z.toFixed(1)} mm`,
          });
          setLoadedFileName(file.name);
          setIsLoading(false);
          applyViewMode(currentModelGroup.current, viewMode);
        } catch (err) {
          setErrorMessage('Could not parse STL file: ' + err.message);
          setIsLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } else if (fileName.endsWith('.obj')) {
      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          const loader = new OBJLoader();
          const obj = loader.parse(contents);

          // Center & scale
          const box = new THREE.Box3().setFromObject(obj);
          const center = new THREE.Vector3();
          box.getCenter(center);
          obj.position.sub(center);

          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);
          const scale = 40 / (maxDim || 1);
          obj.scale.set(scale, scale, scale);

          currentModelGroup.current.add(obj);
          setLoadedFileName(file.name);
          setModelStats({
            vertices: 'Calculated',
            faces: 'Multi-part OBJ',
            size: `${size.x.toFixed(1)} x ${size.y.toFixed(1)} x ${size.z.toFixed(1)} mm`,
          });
          setIsLoading(false);
          applyViewMode(currentModelGroup.current, viewMode);
        } catch (err) {
          setErrorMessage('Could not parse OBJ file: ' + err.message);
          setIsLoading(false);
        }
      };
      reader.readAsText(file);
    } else if (fileName.endsWith('.glb') || fileName.endsWith('.gltf')) {
      reader.onload = (e) => {
        try {
          const contents = e.target.result;
          const loader = new GLTFLoader();
          loader.parse(
            contents,
            '',
            (gltf) => {
              const model = gltf.scene;
              const box = new THREE.Box3().setFromObject(model);
              const center = new THREE.Vector3();
              box.getCenter(center);
              model.position.sub(center);

              const size = new THREE.Vector3();
              box.getSize(size);
              const maxDim = Math.max(size.x, size.y, size.z);
              const scale = 40 / (maxDim || 1);
              model.scale.set(scale, scale, scale);

              currentModelGroup.current.add(model);
              setLoadedFileName(file.name);
              setModelStats({
                vertices: 'Multi-mesh',
                faces: 'GLTF Scene',
                size: `${size.x.toFixed(1)} x ${size.y.toFixed(1)} x ${size.z.toFixed(1)} mm`,
              });
              setIsLoading(false);
              applyViewMode(currentModelGroup.current, viewMode);
            },
            (err) => {
              setErrorMessage('GLTF load error: ' + err.message);
              setIsLoading(false);
            }
          );
        } catch (err) {
          setErrorMessage('Could not parse GLTF: ' + err.message);
          setIsLoading(false);
        }
      };
      reader.readAsArrayBuffer(file);
    } else {
      setErrorMessage('Unsupported 3D file format. Please select an .STL, .OBJ, or .GLB file.');
      setIsLoading(false);
    }
  };

  // 4. Load 3D model from URL path (e.g. models/pet-extruder-model.stl)
  const loadModelFromUrl = (url, name = 'makerspace_A.SLDASM') => {
    setIsLoading(true);
    setErrorMessage(null);
    clearCurrentModel();
    const loader = new STLLoader();
    loader.load(
      url,
      (geometry) => {
        geometry.computeVertexNormals();
        geometry.center();

        const material = new THREE.MeshStandardMaterial({
          color: 0x38bdf8,
          metalness: 0.65,
          roughness: 0.35,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        geometry.computeBoundingBox();
        const box = geometry.boundingBox;
        const size = new THREE.Vector3();
        box.getSize(size);
        const maxDim = Math.max(size.x, size.y, size.z);
        const scale = 50 / (maxDim || 1);
        mesh.scale.set(scale, scale, scale);

        if (currentModelGroup.current) {
          currentModelGroup.current.add(mesh);
          applyViewMode(currentModelGroup.current, viewMode);
        }
        setModelStats({
          vertices: geometry.attributes.position.count,
          faces: geometry.index ? geometry.index.count / 3 : geometry.attributes.position.count / 3,
          size: `${size.x.toFixed(1)} x ${size.y.toFixed(1)} x ${size.z.toFixed(1)} mm`,
        });
        setLoadedFileName(name);
        setIsLoading(false);
      },
      undefined,
      (err) => {
        console.warn('Could not load URL model, falling back to parametric extruder:', err);
        setErrorMessage('SolidWorks assembly STL not found in public folder; showing CAD schematic.');
        if (currentModelGroup.current) {
          buildParametricExtruder(currentModelGroup.current);
        }
      }
    );
  };

  // Reset Camera View
  const handleResetCamera = () => {
    if (cameraRef.current && controlsRef.current) {
      cameraRef.current.position.set(60, 45, 75);
      controlsRef.current.target.set(0, 0, 0);
      controlsRef.current.update();
    }
  };

  return (
    <section id="model-3d" className="py-24 bg-slate-950 relative border-t border-slate-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono uppercase tracking-wider mb-3">
            <Box className="w-3.5 h-3.5" />
            <span>Interactive 3D Engineering CAD</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            {model3DData.heading}
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-3 max-w-2xl mx-auto leading-relaxed">
            {model3DData.subheading}
          </p>
          <div className="w-16 h-1 bg-gradient-to-r from-emerald-500 to-cyan-500 mx-auto mt-4 rounded-full" />
        </div>

        {/* ── Tab Switcher ── */}
        <div className="flex items-center justify-center gap-3 mb-10">
          <button
            onClick={() => setActiveTab('3d-viewer')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === '3d-viewer'
                ? 'bg-emerald-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-emerald-500/40'
            }`}
          >
            <Box className="w-4 h-4" />
            Interactive 3D Viewer
          </button>
          <button
            onClick={() => setActiveTab('model-images')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all ${
              activeTab === 'model-images'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white hover:border-cyan-500/40'
            }`}
          >
            <Images className="w-4 h-4" />
            Model Images / Screenshots
          </button>
        </div>

        {/* ── Model Images Tab ── */}
        {activeTab === 'model-images' && <ModelImages />}

        {/* ── 3D Viewer Tab ── */}
        {activeTab !== 'model-images' && (
        <div className="tab-3d-wrapper">
        {/* 3D Canvas Card Container */}
        <div className="relative rounded-3xl bg-slate-900/90 border border-slate-800 shadow-2xl overflow-hidden">
          
          {/* Top Control Bar */}
          <div className="flex flex-wrap items-center justify-between p-4 border-b border-slate-800/80 bg-slate-950/60 backdrop-blur-md gap-3">
            
            {/* Presets Selector */}
            <div className="flex items-center gap-1.5 flex-wrap">
              <span className="text-[11px] font-mono text-slate-500 uppercase mr-1 hidden sm:inline">Model:</span>
              
              <button
                onClick={() => {
                  setActivePreset('solidworks-assembly');
                  loadModelFromUrl('models/pet-extruder-model.stl', 'makerspace_A.SLDASM (SolidWorks Assembly)');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activePreset === 'solidworks-assembly'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Box className="w-3.5 h-3.5" />
                <span>SolidWorks Assembly</span>
              </button>

              <button
                onClick={() => {
                  setActivePreset('extruder-assembly');
                  buildParametricExtruder(currentModelGroup.current);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activePreset === 'extruder-assembly'
                    ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                <span>Heated Nozzle & Die</span>
              </button>

              <button
                onClick={() => {
                  setActivePreset('slitter-mechanism');
                  buildParametricSlitter(currentModelGroup.current);
                }}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 ${
                  activePreset === 'slitter-mechanism'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Ribbon Slitter</span>
              </button>

              <label className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-emerald-400 border border-slate-700 cursor-pointer flex items-center gap-1.5 transition-all">
                <Upload className="w-3.5 h-3.5" />
                <span>Load Your .STL / .OBJ</span>
                <input
                  type="file"
                  accept=".stl,.obj,.glb,.gltf"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setActivePreset('custom-upload');
                      loadCustomModelFile(e.target.files[0]);
                    }
                  }}
                />
              </label>
            </div>

            {/* View Modes (Shaded, Wireframe, Thermal, X-Ray) */}
            <div className="flex items-center gap-1">
              <button
                onClick={() => setViewMode('shaded')}
                className={`p-2 rounded-lg text-xs transition-all ${
                  viewMode === 'shaded'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="CAD Solid Shaded"
              >
                <Box className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('wireframe')}
                className={`p-2 rounded-lg text-xs transition-all ${
                  viewMode === 'wireframe'
                    ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Wireframe Mesh Inspection"
              >
                <Layers className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('thermal')}
                className={`p-2 rounded-lg text-xs transition-all ${
                  viewMode === 'thermal'
                    ? 'bg-red-500/20 text-red-400 border border-red-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="Thermal Temperature Gradient Simulation"
              >
                <Thermometer className="w-4 h-4" />
              </button>

              <button
                onClick={() => setViewMode('xray')}
                className={`p-2 rounded-lg text-xs transition-all ${
                  viewMode === 'xray'
                    ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
                title="X-Ray Translucent Inspection"
              >
                <Eye className="w-4 h-4" />
              </button>

              <div className="w-[1px] h-5 bg-slate-800 mx-1" />

              {/* Auto Rotate Toggle */}
              <button
                onClick={() => setIsAutoRotating(!isAutoRotating)}
                className={`p-2 rounded-lg text-xs transition-all ${
                  isAutoRotating ? 'text-emerald-400 bg-emerald-500/10' : 'text-slate-500 hover:text-white'
                }`}
                title="Toggle 360° Turntable Rotation"
              >
                <RotateCw className="w-4 h-4" />
              </button>

              {/* Reset Camera View */}
              <button
                onClick={handleResetCamera}
                className="p-2 rounded-lg text-slate-400 hover:text-white text-xs"
                title="Reset Camera Center"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Three.js Interactive WebGL Canvas */}
          <div
            ref={containerRef}
            className="w-full h-[450px] sm:h-[550px] relative cursor-grab active:cursor-grabbing outline-none overflow-hidden"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                setActivePreset('custom-upload');
                loadCustomModelFile(e.dataTransfer.files[0]);
              }
            }}
          >
            {/* Dedicated Three.js canvas mount point with zero React children */}
            <div ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {/* Loading Indicator */}
            {isLoading && (
              <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center z-10">
                <div className="flex flex-col items-center gap-3">
                  <div className="w-10 h-10 border-2 border-emerald-500/30 border-t-emerald-400 rounded-full animate-spin" />
                  <span className="text-xs font-mono text-emerald-400">Loading 3D CAD Mesh...</span>
                </div>
              </div>
            )}

            {/* Error Message */}
            {errorMessage && (
              <div className="absolute bottom-16 left-6 right-6 sm:left-auto sm:right-6 sm:max-w-md bg-red-950/80 border border-red-500/40 p-4 rounded-xl text-red-300 text-xs flex items-center gap-2 z-10 backdrop-blur-md">
                <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Floating Live Telemetry Badge (Bottom Left) */}
            <div className="absolute bottom-4 left-4 p-3 rounded-2xl bg-slate-950/80 backdrop-blur-md border border-slate-800/80 text-[11px] font-mono text-slate-300 pointer-events-none select-none flex flex-col gap-1 max-w-[280px]">
              <div className="flex items-center justify-between text-emerald-400 font-bold border-b border-slate-800 pb-1">
                <span className="truncate">{loadedFileName || 'Assembly View'}</span>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse ml-2" />
              </div>
              <div className="flex justify-between text-slate-400 text-[10px] pt-1">
                <span>Vertices: <strong className="text-white">{modelStats.vertices}</strong></span>
                <span>Faces: <strong className="text-white">{modelStats.faces}</strong></span>
              </div>
              <div className="text-[10px] text-slate-400">
                Bounds: <span className="text-cyan-400">{modelStats.size}</span>
              </div>
            </div>

            {/* Drag & Drop Hint Overlay (Top Center) */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-slate-950/70 backdrop-blur-md border border-slate-800 text-[11px] font-mono text-slate-400 pointer-events-none select-none flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              <span>360° Rotate: Drag • Zoom: Scroll • Drag &amp; drop your SolidWorks .STL / .OBJ</span>
            </div>

            {/* Help / SolidWorks Export Instructions Button (Bottom Right) */}
            <button
              onClick={() => setShowExportGuide(true)}
              className="absolute bottom-4 right-4 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-700/80 text-xs text-slate-300 hover:text-emerald-400 hover:border-emerald-500/40 transition-all flex items-center gap-2 shadow-lg backdrop-blur-md"
            >
              <FileCode className="w-3.5 h-3.5 text-emerald-400" />
              <span>How to add your SolidWorks model</span>
            </button>
          </div>

          {/* Bottom Detail Strip */}
          <div className="p-4 bg-slate-950/90 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>Makerspace Digital Twin &amp; Additive Manufacturing Modeling</span>
            </div>
            <div className="font-mono text-[11px] text-slate-400">
              Default Model Path: <code className="text-emerald-400">public/models/pet-extruder-model.stl</code>
            </div>
          </div>

        </div>

        {/* Modal: How to Export 3D Model from SolidWorks */}
        {showExportGuide && (          <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="relative max-w-lg w-full bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl text-left">
              <button
                onClick={() => setShowExportGuide(false)}
                className="absolute top-4 right-4 p-2 rounded-full bg-slate-800 text-slate-400 hover:text-white"
              >
                ✕
              </button>

              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/15 text-emerald-400 flex items-center justify-center font-bold">
                  3D
                </div>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Adding Your SolidWorks 3D Model
                  </h3>
                  <p className="text-xs text-slate-400">
                    Step-by-step export for makerspace_project.SLDPRT or makerspace_A.SLDASM
                  </p>
                </div>
              </div>

              <div className="space-y-3 text-xs text-slate-300 mb-6">
                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">1</span>
                  <span>Open your assembly or part file in SolidWorks (e.g. <code>makerspace_A.SLDASM</code> or <code>nozzel.SLDPRT</code>).</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">2</span>
                  <span>Click <strong>File &gt; Save As</strong> in SolidWorks.</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">3</span>
                  <span>In the <em>Save as type</em> dropdown, choose <strong>STL (*.stl)</strong> or <strong>GLTF (*.glb)</strong>. Click <em>Options</em> and set output to <em>Fine mesh</em>.</span>
                </div>

                <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-start gap-2.5">
                  <span className="font-mono font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">4</span>
                  <span>Save the file into: <code className="text-emerald-400 font-mono">public/models/pet-extruder-model.stl</code> inside this project, OR drag &amp; drop it straight into the 3D viewer!</span>
                </div>
              </div>

              <button
                onClick={() => setShowExportGuide(false)}
                className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold text-xs transition-colors"
              >
                Got It, Return to 3D Viewer
              </button>
            </div>
          </div>
        )}

        </div>
        )}

      </div>
    </section>
  );
}