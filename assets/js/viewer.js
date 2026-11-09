/*
 * PETGFilament 3D Interactive Assembly Viewer
 * High-fidelity multi-component CAD explorer rendering the authentic SolidWorks
 * assembly (makerspace_A.SLDASM) in vivid engineering materials and physical colors.
 * Supports: CAD Shaded (multi-color PBR), Wireframe, Thermal Sim, X-Ray, component isolation,
 * telemetry HUD, raycast inspection, and drag-and-drop custom STL loading.
 */
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { STLLoader } from 'three/addons/loaders/STLLoader.js';

(() => {
  'use strict';

  const container = document.getElementById('explorer-canvas-wrap');
  if (!container) return;

  const width = container.clientWidth || 800;
  const height = container.clientHeight || 520;

  // 1. Scene setup
  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0a0f16);

  // 2. Camera setup
  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 2000);
  camera.position.set(45, 35, 55);

  // 3. Renderer with ACES Filmic Tone Mapping for rich PBR metallic reflections
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;

  // Clean container of previous canvases
  while (container.firstChild) container.removeChild(container.firstChild);
  container.appendChild(renderer.domElement);

  // 4. Orbit Controls
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.autoRotate = true;
  controls.autoRotateSpeed = 0.8;
  controls.maxDistance = 400;
  controls.minDistance = 15;
  controls.target.set(0, 0, 0);

  // 5. Studio Multi-Point Lighting for CAD PBR Materials
  const hemiLight = new THREE.HemisphereLight(0xffffff, 0x1e293b, 0.95);
  scene.add(hemiLight);

  // Key light: warm white specular highlights
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
  keyLight.position.set(80, 120, 80);
  keyLight.castShadow = true;
  scene.add(keyLight);

  // Fill light: crisp cool cyan accent
  const fillLight = new THREE.DirectionalLight(0x7dd3fc, 1.3);
  fillLight.position.set(-80, 50, -80);
  scene.add(fillLight);

  // Rim / bounce light: soft amber warmth
  const rimLight = new THREE.DirectionalLight(0xfef08a, 0.75);
  rimLight.position.set(0, -50, 70);
  scene.add(rimLight);

  // 6. Ground Grid with Engineering Blueprint Style
  const gridHelper = new THREE.GridHelper(140, 35, 0x38bdf8, 0x1e293b);
  gridHelper.position.y = -22;
  scene.add(gridHelper);

  // 7. Component Groups & Hierarchy
  const pivotGroup = new THREE.Group();
  scene.add(pivotGroup);

  const assemblyGroup = new THREE.Group();
  pivotGroup.add(assemblyGroup);

  const customMeshGroup = new THREE.Group();
  scene.add(customMeshGroup);

  // 8. Definition of Authentic SolidWorks Assembly Components with Physical Engineering Materials & Exact Axes
  const COMPONENT_PARTS = [
    {
      id: 'nozzle',
      name: 'Brass Melt Nozzle (Ø 1.75 mm Die)',
      shortName: 'Brass Nozzle',
      file: 'models/pet-extruder-model - nozzel-1.STL',
      color: 0xd4af37, // Polished brass gold
      hexColor: '#d4af37',
      metalness: 0.88,
      roughness: 0.22,
      dims: { x: 40.1, y: 21.1, z: 50.0 },
      dimStr: '40.1 × 21.1 × 50.0 mm',
      spec: 'C360 Brass · Ø 1.75 mm Orifice · 45° conical lead · 225°C',
      thermal: { color: 0xef4444, emissive: 0xff1e1e, intensity: 0.95 }
    },
    {
      id: 'heater-block',
      name: 'Aluminum Heater Block & Clamp',
      shortName: 'Heater Block',
      file: 'models/pet-extruder-model - Part1-1.STL',
      color: 0xe2e8f0, // Milled billet aluminum silver
      hexColor: '#e2e8f0',
      metalness: 0.82,
      roughness: 0.25,
      dims: { x: 31.0, y: 30.1, z: 23.7 },
      dimStr: '31.0 × 30.1 × 23.7 mm',
      spec: '6061-T6 Aluminum · Ø 6mm Heater Bore · Ø 3mm NTC Well · 215°C',
      thermal: { color: 0xf97316, emissive: 0xf59e0b, intensity: 0.80 }
    },
    {
      id: 'extruder-drive',
      name: 'Extruder Drive & Stepper Assembly',
      shortName: 'Extruder Drive',
      file: 'models/pet-extruder-model - Creality_V2_1_Reference-1.STL',
      color: 0xe11d48, // Creality Anodized Crimson Red
      hexColor: '#e11d48',
      metalness: 0.58,
      roughness: 0.32,
      dims: { x: 125.6, y: 16.0, z: 118.1 },
      dimStr: '125.6 × 16.0 × 118.1 mm',
      spec: 'NEMA 17 Stepper (42×42×40mm) · Dual Drive Gear · 55°C active',
      thermal: { color: 0xeab308, emissive: 0xca8a04, intensity: 0.35 }
    },
    {
      id: 'plunger-guide',
      name: 'Pultrusion Guide & Puller Unit',
      shortName: 'Puller / Plunger',
      file: 'models/pet-extruder-model - plugge-1.STL',
      color: 0x0ea5e9, // Precision Electric Cyan/Sky Blue
      hexColor: '#0ea5e9',
      metalness: 0.65,
      roughness: 0.28,
      dims: { x: 92.1, y: 113.5, z: 86.5 },
      dimStr: '92.1 × 113.5 × 86.5 mm',
      spec: 'Pinch Rollers (Ø 22mm) · 12 RPM DC Geared Motor · 35°C',
      thermal: { color: 0x38bdf8, emissive: 0x0284c7, intensity: 0.20 }
    },
    {
      id: 'power-supply',
      name: 'AC-to-DC Industrial Power Supply',
      shortName: 'Power Supply',
      file: 'models/pet-extruder-model - ac to dc-1.STL',
      color: 0x94a3b8, // Perforated galvanized steel silver
      hexColor: '#94a3b8',
      metalness: 0.75,
      roughness: 0.38,
      dims: { x: 224.5, y: 52.9, z: 186.1 },
      dimStr: '224.5 × 52.9 × 186.1 mm',
      spec: 'Galvanized Enclosure · Internal 240W SMPS PCB · Ø 60mm Fan · 3mm LED',
      thermal: { color: 0x64748b, emissive: 0x334155, intensity: 0.08 }
    },
    {
      id: 'display-unit',
      name: 'LCD Controller & User Interface',
      shortName: 'LCD Display',
      file: 'models/pet-extruder-model - display-1.STL',
      color: 0x18181b, // Matte dark industrial polymer
      hexColor: '#27272a',
      metalness: 0.25,
      roughness: 0.70,
      dims: { x: 101.3, y: 95.4, z: 63.7 },
      dimStr: '101.3 × 95.4 × 63.7 mm',
      spec: '12864 Graphic LCD PCB (93×70mm) · Ø 18mm Rotary Knob · 5mm Status LED',
      thermal: { color: 0x1e293b, emissive: 0x0f172a, intensity: 0.0 }
    },
    {
      id: 'chassis-frame',
      name: '2020 V-Slot Aluminum Rail Chassis',
      shortName: 'Structural Rails',
      file: 'models/pet-extruder-model - makerspace_project-1.STL',
      color: 0x334155, // Charcoal gunmetal anodized profile
      hexColor: '#334155',
      metalness: 0.72,
      roughness: 0.35,
      dims: { x: 410.2, y: 79.9, z: 341.4 },
      dimStr: '410.2 × 79.9 × 341.4 mm',
      spec: '6063-T5 2020 Aluminum Extrusion · Rigid Transverse Cross-Ties',
      thermal: { color: 0x0284c7, emissive: 0x0369a1, intensity: 0.02 }
    },
    {
      id: 'side-base',
      name: 'Rigid Baseplates & Chassis Stanchions',
      shortName: 'Chassis Base',
      file: 'models/pet-extruder-model - sidebase-1.STL',
      color: 0xe0703a, // Makerspace Terracotta / Orange Accent
      hexColor: '#e0703a',
      metalness: 0.52,
      roughness: 0.42,
      dims: { x: 189.0, y: 72.0, z: 225.4 },
      dimStr: '189.0 × 72.0 × 225.4 mm',
      spec: '3.0 mm Laser-Cut Steel Stanchions · 4× Ø 6.5mm Bench Mounts',
      thermal: { color: 0x0369a1, emissive: 0x0284c7, intensity: 0.0 }
    }
  ];

  let viewMode = 'shaded';
  let loadedMeshes = [];
  let isCustomModel = false;
  let activeIsolatedPartId = null;
  let globalAssemblyStats = { facets: 47944, size: '486.3 × 177.2 × 418.0 mm' };

  // 9. Material Generator
  function createMaterialForPart(part, mode) {
    if (mode === 'wireframe') {
      return new THREE.MeshBasicMaterial({
        color: part.color,
        wireframe: true
      });
    }
    if (mode === 'thermal') {
      return new THREE.MeshStandardMaterial({
        color: part.thermal.color,
        emissive: part.thermal.emissive,
        emissiveIntensity: part.thermal.intensity,
        roughness: 0.28,
        metalness: 0.25
      });
    }
    if (mode === 'xray') {
      return new THREE.MeshPhysicalMaterial({
        color: part.color,
        transparent: true,
        opacity: 0.42,
        roughness: 0.15,
        transmission: 0.65,
        metalness: 0.1
      });
    }
    // Default: CAD Shaded (Authentic Multi-Color PBR)
    return new THREE.MeshStandardMaterial({
      color: part.color,
      metalness: part.metalness,
      roughness: part.roughness
    });
  }

  function applyShading(mode) {
    viewMode = mode;
    if (isCustomModel) {
      customMeshGroup.traverse((child) => {
        if (child.isMesh) {
          if (mode === 'wireframe') {
            child.material = new THREE.MeshBasicMaterial({ color: 0x38bdf8, wireframe: true });
          } else if (mode === 'thermal') {
            child.material = new THREE.MeshStandardMaterial({
              color: 0xef4444,
              emissive: 0xf97316,
              emissiveIntensity: 0.5
            });
          } else if (mode === 'xray') {
            child.material = new THREE.MeshPhysicalMaterial({
              color: 0x38bdf8,
              transparent: true,
              opacity: 0.4,
              transmission: 0.7
            });
          } else {
            child.material = new THREE.MeshStandardMaterial({
              color: 0x38bdf8,
              metalness: 0.65,
              roughness: 0.35
            });
          }
        }
      });
      return;
    }

    loadedMeshes.forEach(({ mesh, part }) => {
      if (activeIsolatedPartId && part.id !== activeIsolatedPartId) {
        // Dim unselected parts in isolation view
        mesh.material = new THREE.MeshStandardMaterial({
          color: 0x1e293b,
          transparent: true,
          opacity: 0.15,
          roughness: 0.9,
          metalness: 0.1
        });
      } else {
        mesh.material = createMaterialForPart(part, mode);
      }
    });
  }

  // 10. Load Multi-Part SolidWorks Assembly
  function loadAssembly() {
    isCustomModel = false;
    activeIsolatedPartId = null;
    customMeshGroup.clear();
    assemblyGroup.clear();
    loadedMeshes = [];

    const loader = new STLLoader();
    let loadedCount = 0;
    let totalFacets = 0;

    updateTelemetry('Loading 8 SolidWorks components (makerspace_A.SLDASM)...');

    COMPONENT_PARTS.forEach((part) => {
      loader.load(
        encodeURI(part.file),
        (geometry) => {
          geometry.computeVertexNormals();

          const material = createMaterialForPart(part, viewMode);
          const mesh = new THREE.Mesh(geometry, material);
          mesh.castShadow = true;
          mesh.receiveShadow = true;
          mesh.userData = { part };

          assemblyGroup.add(mesh);
          loadedMeshes.push({ mesh, part });

          const vertCount = geometry.attributes.position ? geometry.attributes.position.count : 0;
          totalFacets += geometry.index ? geometry.index.count / 3 : vertCount / 3;

          loadedCount++;
          if (loadedCount === COMPONENT_PARTS.length) {
            onAssemblyFullyLoaded(totalFacets);
          }
        },
        undefined,
        (err) => {
          console.warn(`Could not load part ${part.file}:`, err);
          loadedCount++;
          if (loadedCount === COMPONENT_PARTS.length) {
            if (loadedMeshes.length > 0) {
              onAssemblyFullyLoaded(totalFacets);
            } else {
              loadSingleSTL('models/pet-extruder-model.stl', 'makerspace_A.SLDASM');
            }
          }
        }
      );
    });
  }

  function onAssemblyFullyLoaded(totalFacets) {
    // 1. Calculate global bounding box across the entire assembly in SolidWorks space
    const box = new THREE.Box3().setFromObject(assemblyGroup);
    const center = new THREE.Vector3();
    box.getCenter(center);
    const size = new THREE.Vector3();
    box.getSize(size);

    // 2. Center assembly at origin
    assemblyGroup.position.set(-center.x, -center.y, -center.z);

    // 3. Scale uniformly so assembly fits comfortably in view volume
    const maxDim = Math.max(size.x, size.y, size.z);
    const targetScale = 68 / (maxDim || 1);
    pivotGroup.scale.set(targetScale, targetScale, targetScale);

    // 4. Ground grid right underneath the machine base
    gridHelper.position.y = - (size.y * targetScale) / 2 - 2;

    // 5. Camera positioning for best 3/4 isometric perspective
    camera.position.set(45, 35, 55);
    controls.target.set(0, 0, 0);
    controls.update();

    globalAssemblyStats = {
      facets: Math.round(totalFacets),
      size: `${size.x.toFixed(1)} × ${size.y.toFixed(1)} × ${size.z.toFixed(1)} mm`
    };

    updateTelemetry(`makerspace_A.SLDASM | 8 Colored Parts | ${globalAssemblyStats.facets.toLocaleString()} facets | ${globalAssemblyStats.size}`);
    renderLegend();
  }

  // Fallback for single STL files (or custom uploads)
  function loadSingleSTL(urlOrBuffer, name = 'Custom Model') {
    isCustomModel = true;
    activeIsolatedPartId = null;
    assemblyGroup.clear();
    customMeshGroup.clear();
    loadedMeshes = [];

    const loader = new STLLoader();
    const handleGeom = (geometry) => {
      geometry.computeVertexNormals();
      geometry.center();

      const material = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        metalness: 0.65,
        roughness: 0.35
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

      customMeshGroup.add(mesh);
      applyShading(viewMode);

      const vertCount = geometry.attributes.position ? geometry.attributes.position.count : 0;
      const faceCount = geometry.index ? geometry.index.count / 3 : vertCount / 3;
      updateTelemetry(`${name} | ${Math.round(faceCount).toLocaleString()} facets | ${size.x.toFixed(1)} × ${size.y.toFixed(1)} × ${size.z.toFixed(1)} mm`);
      renderLegend();
    };

    if (typeof urlOrBuffer === 'string') {
      loader.load(urlOrBuffer, handleGeom, undefined, (err) => console.warn('Could not load STL:', err));
    } else {
      const geom = loader.parse(urlOrBuffer);
      handleGeom(geom);
    }
  }

  // Telemetry updates
  function updateTelemetry(text) {
    const telEl = document.getElementById('explorer-telemetry');
    if (telEl) telEl.textContent = text;
  }

  // 11. Component Legend and Isolation Controls
  function renderLegend() {
    const legendEl = document.getElementById('explorer-legend');
    if (!legendEl) return;

    legendEl.innerHTML = '';

    if (isCustomModel) {
      const resetBtn = document.createElement('button');
      resetBtn.type = 'button';
      resetBtn.className = 'legend-chip is-active';
      resetBtn.innerHTML = '← Restore SolidWorks Assembly (8 Parts)';
      resetBtn.addEventListener('click', () => loadAssembly());
      legendEl.appendChild(resetBtn);
      return;
    }

    // "All Components" chip
    const allBtn = document.createElement('button');
    allBtn.type = 'button';
    allBtn.className = `legend-chip ${activeIsolatedPartId === null ? 'is-active' : ''}`;
    allBtn.innerHTML = `<span class="legend-swatch" style="background: #38bdf8;"></span> All Components (8)`;
    allBtn.addEventListener('click', () => {
      activeIsolatedPartId = null;
      applyShading(viewMode);
      updateTelemetry(`makerspace_A.SLDASM | 8 Colored Parts | ${globalAssemblyStats.facets.toLocaleString()} facets | ${globalAssemblyStats.size}`);
      renderLegend();
    });
    legendEl.appendChild(allBtn);

    // Individual component chips
    COMPONENT_PARTS.forEach((part) => {
      const chip = document.createElement('button');
      chip.type = 'button';
      chip.className = `legend-chip ${activeIsolatedPartId === part.id ? 'is-active' : ''}`;
      chip.innerHTML = `<span class="legend-swatch" style="background: ${part.hexColor};"></span> ${part.shortName}`;
      chip.title = part.name;

      chip.addEventListener('click', () => {
        if (activeIsolatedPartId === part.id) {
          activeIsolatedPartId = null; // Toggle off
          updateTelemetry(`makerspace_A.SLDASM | 8 Colored Parts | ${globalAssemblyStats.facets.toLocaleString()} facets | ${globalAssemblyStats.size}`);
        } else {
          activeIsolatedPartId = part.id;
          updateTelemetry(`Inspecting: ${part.name} | Dimensions: ${part.dimStr} | Axes: ΔX=${part.dims.x} ΔY=${part.dims.y} ΔZ=${part.dims.z} mm · ${part.spec}`);
        }
        applyShading(viewMode);
        renderLegend();
      });

      legendEl.appendChild(chip);
    });
  }

  // Focus a specific SolidWorks part programmatically from CAD component cards
  function focusPart(partId) {
    if (isCustomModel) return;
    const found = COMPONENT_PARTS.find(p => p.id === partId);
    if (!found) return;
    activeIsolatedPartId = partId;
    applyShading(viewMode);
    renderLegend();
    updateTelemetry(`SolidWorks CAD Focus: ${found.name} | Dimensions: ${found.dimStr} | Axes: ΔX=${found.dims.x} ΔY=${found.dims.y} ΔZ=${found.dims.z} mm · ${found.spec}`);
  }

  // 12. Raycasting for Direct 3D Model Clicking
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  function onCanvasClick(e) {
    if (isCustomModel) return;
    const rect = renderer.domElement.getBoundingClientRect();
    mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);
    const intersects = raycaster.intersectObjects(assemblyGroup.children, true);

    if (intersects.length > 0) {
      const clickedMesh = intersects[0].object;
      const part = clickedMesh.userData?.part;
      if (part) {
        if (activeIsolatedPartId === part.id) {
          activeIsolatedPartId = null;
          updateTelemetry(`makerspace_A.SLDASM | 8 Colored Parts | ${globalAssemblyStats.facets.toLocaleString()} facets | ${globalAssemblyStats.size}`);
        } else {
          activeIsolatedPartId = part.id;
          updateTelemetry(`Selected: ${part.name} · ${part.spec}`);
        }
        applyShading(viewMode);
        renderLegend();
      }
    }
  }

  renderer.domElement.addEventListener('click', onCanvasClick);

  // 13. Animation Loop
  function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
  }
  animate();

  // 14. Resize Handling
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth || 800;
    const h = container.clientHeight || 520;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // 15. UI Toolbar bindings
  document.querySelectorAll('[data-model-mode]').forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('[data-model-mode]').forEach((b) => b.setAttribute('aria-pressed', 'false'));
      btn.setAttribute('aria-pressed', 'true');
      applyShading(btn.dataset.modelMode);
    });
  });

  const rotateBtn = document.getElementById('explorer-autorotate');
  if (rotateBtn) {
    rotateBtn.addEventListener('click', () => {
      controls.autoRotate = !controls.autoRotate;
      rotateBtn.setAttribute('aria-pressed', String(controls.autoRotate));
    });
  }

  const resetBtn = document.getElementById('explorer-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      camera.position.set(45, 35, 55);
      controls.target.set(0, 0, 0);
      controls.update();
      activeIsolatedPartId = null;
      applyShading(viewMode);
      renderLegend();
      updateTelemetry(`makerspace_A.SLDASM | 8 Colored Parts | ${globalAssemblyStats.facets.toLocaleString()} facets | ${globalAssemblyStats.size}`);
    });
  }

  // 16. Custom File Upload
  const fileInput = document.getElementById('explorer-file-input');
  if (fileInput) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => loadSingleSTL(ev.target.result, file.name);
      reader.readAsArrayBuffer(file);
    });
  }

  // Drag & drop support
  container.addEventListener('dragover', (e) => e.preventDefault());
  container.addEventListener('drop', (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.name.toLowerCase().endsWith('.stl')) {
      const reader = new FileReader();
      reader.onload = (ev) => loadSingleSTL(ev.target.result, file.name);
      reader.readAsArrayBuffer(file);
    }
  });

  // Initial Load of Multi-Part SolidWorks Assembly
  loadAssembly();

  // Expose for debugging & external access
  window.__petViewer = {
    loadAssembly,
    loadSingleSTL,
    applyShading,
    focusPart,
    COMPONENT_PARTS,
    camera,
    controls,
    scene
  };
})();
