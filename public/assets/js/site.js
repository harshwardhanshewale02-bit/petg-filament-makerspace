/*
 * PETGFilament main site interactions, simulation, gallery & prototype photo upload controller.
 * Sanjivani University Makerspace · Group 10
 */
(() => {
  'use strict';

  const project = window.PETFILAMENT_PROJECT || {};
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const rootEl = document.documentElement;

  // ---------------- 0. Toast Helper ----------------
  function showToast(msg, isError = false) {
    const toast = $('#toast');
    if (!toast) return;
    toast.textContent = msg;
    toast.style.borderColor = isError ? 'var(--clay-ink)' : 'var(--ok)';
    toast.hidden = false;
    clearTimeout(window.__toastTimeout);
    window.__toastTimeout = setTimeout(() => { toast.hidden = true; }, 3500);
  }

  // ---------------- 1. Theme Toggle ----------------
  const themeToggle = $('#theme-toggle');
  const savedTheme = localStorage.getItem('petgfilament_theme') || localStorage.getItem('petfilament_theme') || 'dark';
  rootEl.setAttribute('data-theme', savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      const current = rootEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      rootEl.setAttribute('data-theme', current);
      localStorage.setItem('petgfilament_theme', current);
    });
  }

  // ---------------- 2. Presentation Mode (Projector Mode) ----------------
  const presToggle = $('#presentation-toggle');
  if (presToggle) {
    presToggle.addEventListener('click', () => {
      const on = document.body.classList.toggle('presentation-mode');
      presToggle.setAttribute('aria-pressed', String(on));
    });
  }

  // ---------------- 3. Share Button ----------------
  const shareBtn = $('#share-button');
  if (shareBtn) {
    shareBtn.addEventListener('click', async () => {
      if (navigator.share) {
        try {
          await navigator.share({
            title: project.fullTitle || document.title,
            text: 'Makerspace Engineering Journal - Design and Development of 3D Printing Filament from PETG Bottles',
            url: window.location.href
          });
        } catch {}
      } else {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Project link copied to clipboard!');
      }
    });
  }

  // ---------------- 4. Scroll Progress Indicator ----------------
  const progressBar = $('#scroll-progress-bar');
  if (progressBar) {
    window.addEventListener('scroll', () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollTotal > 0 ? window.scrollY / scrollTotal : 0;
      progressBar.style.transform = `scaleX(${progress})`;
    }, { passive: true });
  }

  // ---------------- 5. Lightbox Dialog ----------------
  const dialog = $('#photo-dialog');
  const dialogImg = $('#dialog-image');
  const dialogWrap = $('#dialog-image-wrap');
  const zoomBtn = $('#dialog-zoom');

  function openLightbox(src, title, kind, desc) {
    if (!dialog || !dialogImg) return;
    dialogImg.src = src;
    $('#dialog-title').textContent = title || 'Engineering Record';
    $('#dialog-kind').textContent = kind || 'Photo';
    $('#dialog-description').textContent = desc || '';
    if (dialogWrap) dialogWrap.classList.remove('is-zoomed');
    if (typeof dialog.showModal === 'function') dialog.showModal();
  }

  if (zoomBtn && dialogWrap) {
    zoomBtn.addEventListener('click', () => {
      const zoomed = dialogWrap.classList.toggle('is-zoomed');
      zoomBtn.textContent = zoomed ? 'Fit' : 'Zoom';
    });
  }
  $('#dialog-close')?.addEventListener('click', () => dialog?.close());
  dialog?.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });

  // ---------------- 6. Specifications Table ----------------
  const specTbody = $('#spec-table-body');
  if (specTbody && Array.isArray(project.specifications)) {
    specTbody.innerHTML = project.specifications.map(s => `
      <tr>
        <th scope="row"><strong>${s.label}</strong></th>
        <td><code class="spec-value">${s.value}</code></td>
        <td class="spec-note">${s.note || ''}</td>
      </tr>
    `).join('');
  }

  // ---------------- 7. Components List (Electronics Section) ----------------
  const compList = $('#component-list');
  if (compList && Array.isArray(project.components)) {
    compList.innerHTML = project.components.map(c => `
      <div class="component-card">
        <div class="comp-head">
          <strong class="comp-name">${c.name}</strong>
          <span class="label-chip ${c.status === 'COMPLETED' ? 'badge-completed' : 'badge-implemented'}">${c.status}</span>
        </div>
        <p class="comp-role">${c.role}</p>
      </div>
    `).join('');
  }

  // ---------------- 8. Extrusion & Thermal Control Lab (Simulator) ----------------
  const ctrl = window.PETFILAMENT_CONTROL || {
    tempOptimalLow: 245, tempOptimalHigh: 260, tempCutoff: 265,
    nominalDiameter: 1.75, tolerance: 0.05,
    defaultTemp: 250, defaultSpeed: 450, defaultStripWidth: 9.0, defaultWallThickness: 0.30
  };

  const tempSlider = $('#sim-temp-slider');
  const tempNumber = $('#sim-temp-number');
  const speedSlider = $('#sim-speed-slider');
  const speedNumber = $('#sim-speed-number');
  const widthInput = $('#sim-width-number');

  const heaterOutputs = $('#sim-heater-outputs');
  const diaOutputs = $('#sim-dia-outputs');
  const heaterExplain = $('#sim-heater-explain');
  const diaExplain = $('#sim-dia-explain');

  function evaluateExtruder(temp, speed, width, thick) {
    const area = width * thick;
    const rawDia = Math.sqrt((4 * area) / Math.PI);
    const stretchFactor = 0.94 - ((speed - 400) / 3000);
    const calculatedDia = rawDia * stretchFactor;

    let tempStatus = 'OPTIMAL';
    let heaterState = 'PID REGULATING';
    if (temp < ctrl.tempOptimalLow) {
      tempStatus = 'UNDERHEATED';
      heaterState = 'HEATING 100% PWM';
    } else if (temp > ctrl.tempCutoff) {
      tempStatus = 'CUTOFF TRIP';
      heaterState = 'SAFETY CUTOFF OFF';
    } else if (temp > ctrl.tempOptimalHigh) {
      tempStatus = 'OVERHEATED';
      heaterState = 'PID MINIMAL PWM';
    }

    const diaDelta = Math.abs(calculatedDia - ctrl.nominalDiameter);
    const inTolerance = diaDelta <= ctrl.tolerance;

    return { calculatedDia, tempStatus, heaterState, inTolerance };
  }

  function renderSim() {
    if (!tempSlider || !heaterOutputs || !diaOutputs) return;
    const t = parseFloat(tempSlider.value);
    const s = parseFloat(speedSlider ? speedSlider.value : 450);
    const w = parseFloat(widthInput ? widthInput.value : 9.0);
    const result = evaluateExtruder(t, s, w, 0.30);

    const isCutoff = result.tempStatus === 'CUTOFF TRIP';
    const isOptimal = result.tempStatus === 'OPTIMAL';

    heaterOutputs.innerHTML = `
      <div class="sim-chip ${isOptimal ? 'is-on' : isCutoff ? 'is-danger' : 'is-off'}">
        <span class="sim-chip-label">Heater Element</span>
        <span class="sim-chip-value">${result.heaterState}</span>
      </div>
      <div class="sim-chip ${isCutoff ? 'is-danger' : 'is-on'}">
        <span class="sim-chip-label">Thermal Zone</span>
        <span class="sim-chip-value">${result.tempStatus}</span>
      </div>
    `;

    diaOutputs.innerHTML = `
      <div class="sim-chip ${result.inTolerance ? 'is-on' : 'is-danger'}">
        <span class="sim-chip-label">Calculated Strand</span>
        <span class="sim-chip-value">${result.calculatedDia.toFixed(2)} mm</span>
      </div>
      <div class="sim-chip ${result.inTolerance ? 'is-on' : 'is-off'}">
        <span class="sim-chip-label">FDM 1.75mm Tolerance</span>
        <span class="sim-chip-value">${result.inTolerance ? 'COMPLIANT (±0.05 mm)' : 'OUT OF SPEC'}</span>
      </div>
    `;

    if (heaterExplain) {
      if (t < ctrl.tempOptimalLow) {
        heaterExplain.textContent = `${t.toFixed(1)} °C is below 245 °C; PETG polymer viscosity is too high causing puller motor stall risk.`;
      } else if (t > ctrl.tempCutoff) {
        heaterExplain.textContent = `${t.toFixed(1)} °C exceeds safety limit (265 °C); bi-metal cutoff trips to prevent PETG burning and fumes.`;
      } else {
        heaterExplain.textContent = `${t.toFixed(1)} °C is in the optimal glass pultrusion window (245°C - 260°C); consistent circular melting.`;
      }
    }

    if (diaExplain) {
      diaExplain.textContent = `At ${w.toFixed(1)} mm strip width and ${s.toFixed(0)} mm/min pull speed, theoretical diameter is ${result.calculatedDia.toFixed(2)} mm (${result.inTolerance ? 'within ±0.05 mm spec' : 'adjust ribbon width or speed'}).`;
    }
  }

  function bindInput(slider, number) {
    if (!slider || !number) return;
    slider.addEventListener('input', () => { number.value = slider.value; renderSim(); });
    number.addEventListener('input', () => { slider.value = number.value; renderSim(); });
  }
  bindInput(tempSlider, tempNumber);
  bindInput(speedSlider, speedNumber);
  if (widthInput) widthInput.addEventListener('input', renderSim);
  $('#sim-reset')?.addEventListener('click', () => {
    if (tempSlider) { tempSlider.value = '250'; if (tempNumber) tempNumber.value = '250'; }
    if (speedSlider) { speedSlider.value = '450'; if (speedNumber) speedNumber.value = '450'; }
    if (widthInput) widthInput.value = '9.0';
    renderSim();
  });
  renderSim();

  // ---------------- 9. Build Status Groups (Section 11) ----------------
  const statusCont = $('#status-groups-container');
  if (statusCont && Array.isArray(project.statusGroups)) {
    statusCont.innerHTML = project.statusGroups.map(g => `
      <div class="status-group status-group-${g.tone || 'done'}">
        <div class="status-group-head">
          <h3 class="status-group-title">${g.heading}</h3>
          <span class="label-chip ${g.badge === 'COMPLETED' ? 'badge-completed' : g.badge === 'IMPLEMENTED' ? 'badge-implemented' : 'badge-next'}">${g.badge}</span>
        </div>
        ${g.subgroups ? g.subgroups.map(sg => `
          <div class="status-subgroup">
            <strong class="status-subgroup-label">${sg.label}:</strong>
            <ul class="status-list">${sg.items.map(it => `<li>${it}</li>`).join('')}</ul>
          </div>
        `).join('') : ''}
        ${g.items ? `<ul class="status-list">${g.items.map(it => `<li>${it}</li>`).join('')}</ul>` : ''}
      </div>
    `).join('');
  }

  // ---------------- 10. Engineering Journey Steps (Section 04) ----------------
  const journeyList = $('#journey-steps');
  function renderJourney() {
    if (!journeyList || !Array.isArray(project.journeySteps)) return;
    const customItems = getCustomGallery();

    journeyList.innerHTML = project.journeySteps.map(st => {
      // Find matching custom photo uploaded by user for this step
      const customPhoto = customItems.find(item =>
        item.stepNumber === st.number ||
        (item.title && item.title.includes(`Stage ${st.number}`))
      );

      return `
        <li class="journey-step">
          <div class="step-head">
            <span class="step-number">${st.number}</span>
            <h3 class="step-title">${st.title}</h3>
          </div>
          ${customPhoto ? `
            <figure class="step-figure">
              <button type="button" class="step-photo" onclick="window.__openLightbox('${customPhoto.src.replace(/'/g, "\\'")}', '${customPhoto.title.replace(/'/g, "\\'")}', 'Uploaded Lab Photo', '${(customPhoto.description || '').replace(/'/g, "\\'")}')">
                <img src="${customPhoto.src}" alt="${customPhoto.title}" loading="lazy" />
              </button>
              <figcaption class="step-caption">
                <span class="label-chip custom-upload-chip">Stage ${st.number} Photo</span> ${customPhoto.title}
              </figcaption>
            </figure>
          ` : `
            <div class="step-prose"><p>${st.text}</p></div>
          `}
          ${st.findings ? `<div class="step-finding"><strong>Key Finding:</strong> ${st.findings}</div>` : ''}
        </li>
      `;
    }).join('');
  }

  // ---------------- 11. Project & Prototype Gallery (Section 10) ----------------
  const galleryGrid = $('#gallery-grid');
  const galleryCountEl = $('#gallery-item-count');
  let activeCat = 'all';
  let activeDeleteId = null;

  function getCustomGallery() {
    try {
      const stored = localStorage.getItem('petgfilament_custom_gallery') || localStorage.getItem('petfilament_custom_gallery');
      const items = stored ? JSON.parse(stored) : [];
      // Clean out any lingering built-in or mock items
      return Array.isArray(items) ? items.filter(it => it && !it.builtin && !String(it.id).startsWith('builtin-')) : [];
    } catch {
      return [];
    }
  }

  function setCustomGallery(items) {
    try {
      localStorage.setItem('petgfilament_custom_gallery', JSON.stringify(items));
    } catch (e) {
      try {
        const trimmed = items.slice(0, 15);
        localStorage.setItem('petgfilament_custom_gallery', JSON.stringify(trimmed));
      } catch (e2) {
        console.warn('Storage quota limit reached', e2);
      }
    }
  }

  function getAllGalleryItems() {
    // Only student/team uploaded photos are shown (no annoying preloaded images)
    return getCustomGallery();
  }

  // Pressing an image enables the delete option
  window.__toggleImageDelete = (id) => {
    activeDeleteId = (activeDeleteId === id) ? null : id;
    renderGallery();
  };

  window.__deselectGalleryItem = (id) => {
    activeDeleteId = null;
    renderGallery();
  };

  window.__deleteGalleryItem = (id) => {
    let custom = getCustomGallery();
    custom = custom.filter(item => item.id !== id);
    setCustomGallery(custom);
    activeDeleteId = null;
    renderGallery();
    renderJourney();
    showToast('Photo removed from gallery.');
  };

  function renderGallery() {
    if (!galleryGrid) return;

    const allItems = getAllGalleryItems();
    const filtered = activeCat === 'all'
      ? allItems
      : allItems.filter(i => i.category === activeCat);

    if (galleryCountEl) {
      galleryCountEl.textContent = allItems.length === 0
        ? '0 photos uploaded · Click "+ Upload Progress Photo" to add'
        : `${allItems.length} photo${allItems.length === 1 ? '' : 's'} uploaded · Press any photo to enable delete`;
    }

    if (filtered.length === 0) {
      galleryGrid.innerHTML = `
        <div class="gallery-empty-state">
          <div class="gallery-add-card-icon" style="margin:0 auto 1rem">📷</div>
          <h3 style="margin:0 0 .5rem; font-size:1.15rem; color:var(--text,#f1f5f9)">Your Project Gallery is Empty</h3>
          <p style="margin:0 0 1.5rem; opacity:.7; font-size:.9rem; max-width:440px; margin-inline:auto">
            Upload your prototype photos, fabrication milestones, SolidWorks models, and lab tests here.
          </p>
          <button type="button" class="button button-primary" onclick="window.__openGalleryUpload(activeCat)">
            📷 Upload First Progress Photo
          </button>
        </div>
      `;
      return;
    }

    const cardsHtml = filtered.map(item => {
      const isDeleteReady = (activeDeleteId === item.id);
      const safeTitle = (item.title || 'Project Photo').replace(/'/g, '&#39;');
      const safeSrc   = (item.src   || '').replace(/'/g, '&#39;');
      const safeKind  = (item.kind  || 'Photo').replace(/'/g, '&#39;');
      const safeDesc  = (item.description || '').replace(/'/g, '&#39;');

      return `
        <article class="gallery-card ${isDeleteReady ? 'is-delete-ready' : ''}" id="gallery-card-${item.id}">
          <div class="gallery-thumb" onclick="window.__toggleImageDelete('${item.id}')" title="Press image to enable delete option">
            <img src="${item.src}" alt="${safeTitle}" loading="lazy" />
            <div class="gallery-chip-bar">
              <span class="label-chip custom-upload-chip">Uploaded Photo</span>
            </div>

            ${isDeleteReady ? `
              <div class="gallery-delete-overlay" onclick="event.stopPropagation()">
                <span class="gallery-press-indicator">⚠️ Photo Selected</span>
                <p class="gallery-delete-prompt">Delete this photo?</p>
                <div class="gallery-delete-actions-row">
                  <button type="button" class="gallery-confirm-delete-btn" onclick="event.stopPropagation(); window.__deleteGalleryItem('${item.id}')" title="Delete this photo">
                    🗑️ Delete Photo
                  </button>
                  <button type="button" class="gallery-view-btn" onclick="event.stopPropagation(); window.__openLightbox('${safeSrc}','${safeTitle}','Progress Photo','${safeDesc}')" title="View fullscreen">
                    🔍 View
                  </button>
                  <button type="button" class="gallery-cancel-press-btn" onclick="event.stopPropagation(); window.__deselectGalleryItem('${item.id}')">
                    Cancel
                  </button>
                </div>
              </div>
            ` : `
              <div class="gallery-press-hint" style="position:absolute;bottom:8px;left:8px;right:8px;text-align:center;font-size:11px;font-family:var(--mono, monospace);background:rgba(0,0,0,0.7);color:#cbd5e1;padding:4px 8px;border-radius:4px;backdrop-filter:blur(2px);pointer-events:none">
                👆 Press image to delete
              </div>
            `}
          </div>
          <div class="gallery-info">
            <h4 class="gallery-title">${item.title}</h4>
            ${item.description ? `<p class="gallery-desc">${item.description}</p>` : ''}
            <div class="gallery-card-footer">
              <span class="gallery-author">${item.author || 'Group 10 · Student Upload'}</span>
              ${isDeleteReady ? `
                <button type="button" class="gallery-delete-btn" style="background:#ef4444;color:#fff;border-color:#ef4444;font-weight:700" onclick="event.stopPropagation(); window.__deleteGalleryItem('${item.id}')">
                  🗑️ Delete Now
                </button>
              ` : `
                <button type="button" class="gallery-delete-btn" style="opacity:0.7" onclick="event.stopPropagation(); window.__toggleImageDelete('${item.id}')" title="Press image to enable delete">
                  Press image to delete
                </button>
              `}
            </div>
          </div>
        </article>
      `;
    }).join('');

    const addCardHtml = `
      <article class="gallery-add-card" onclick="window.__openGalleryUpload(activeCat)" role="button" tabindex="0" title="Upload another photo">
        <div class="gallery-add-card-icon">📷</div>
        <strong style="font-size:15px;color:var(--text,#f1f5f9)">+ Upload Another Photo</strong>
        <span style="font-size:12px;opacity:.65">Click to browse or drop an image</span>
      </article>
    `;

    galleryGrid.innerHTML = cardsHtml + addCardHtml;
  }

  // Expose lightbox globally
  window.__openLightbox = (src, title, kind, desc) => openLightbox(src, title, kind, desc);

  // Category filter tabs
  $$('[data-gallery-filter]').forEach(btn => {
    btn.addEventListener('click', () => {
      $$('[data-gallery-filter]').forEach(b => b.classList.remove('is-active'));
      btn.classList.add('is-active');
      activeCat = btn.dataset.galleryFilter;
      renderGallery();
    });
  });

  // ----------- 12. Gallery Upload Modal -----------
  const uploadOverlay = document.createElement('div');
  uploadOverlay.id = 'gallery-upload-overlay';
  uploadOverlay.setAttribute('role', 'dialog');
  uploadOverlay.setAttribute('aria-modal', 'true');
  uploadOverlay.setAttribute('aria-labelledby', 'guo-heading');
  uploadOverlay.style.cssText = [
    'position:fixed','inset:0','z-index:9999',
    'background:rgba(0,0,0,0.85)','display:none',
    'align-items:center','justify-content:center',
    'padding:1rem','backdrop-filter:blur(8px)'
  ].join(';');
  uploadOverlay.innerHTML = `
    <div style="background:var(--surface,#131c2b);border:1px solid var(--border,#243249);border-radius:16px;padding:2rem;max-width:520px;width:100%;position:relative;max-height:90vh;overflow-y:auto;box-shadow:0 24px 48px rgba(0,0,0,0.6)">
      <button type="button" id="guo-close" aria-label="Close" style="position:absolute;top:1rem;right:1rem;background:transparent;border:none;color:inherit;font-size:1.25rem;cursor:pointer;opacity:.7">✕</button>
      <span class="label-chip" style="margin-bottom:.75rem;display:inline-block">📷 Progress Photo</span>
      <h3 id="guo-heading" style="margin:0 0 .5rem">Upload Project Photo</h3>
      <p style="margin:0 0 1.25rem;opacity:.65;font-size:.875rem">Select your prototype or project image from your device.</p>

      <div id="guo-drop-zone" role="button" tabindex="0" style="display:flex;flex-direction:column;align-items:center;justify-content:center;gap:.6rem;border:2px dashed var(--ok,#10b981);border-radius:12px;padding:2rem 1.5rem;cursor:pointer;text-align:center;transition:all .2s;background:rgba(16,185,129,0.06)">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" style="color:var(--ok,#10b981);pointer-events:none"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        <span style="font-size:1rem;font-weight:600;color:var(--text,#f1f5f9);pointer-events:none">Click anywhere here to select photo</span>
        <span style="font-size:.85rem;color:var(--muted,#94a3b8);pointer-events:none">Supports JPG, PNG, WEBP · Drag & drop supported</span>
        <button type="button" class="button button-primary" id="guo-browse-btn" style="margin-top:.4rem;pointer-events:none">
          📁 Choose Image from Computer / Phone
        </button>
        <img id="guo-preview" src="" alt="Selected photo preview" style="display:none;max-width:100%;max-height:200px;border-radius:8px;margin-top:.75rem;object-fit:contain;border:1px solid var(--border,#243249)" />
      </div>
      <input type="file" id="guo-file-input" accept="image/*" style="display:none" />

      <div style="display:flex;flex-direction:column;gap:.75rem;margin-top:1.25rem">
        <label style="display:flex;flex-direction:column;gap:.25rem;font-size:.875rem">
          <span>Photo Title *</span>
          <input id="guo-title-input" type="text" placeholder="e.g. Assembled Extruder Prototype" maxlength="80"
            style="background:var(--surface-raised,#1b2740);border:1px solid var(--border,#243249);border-radius:8px;padding:.5rem .75rem;color:inherit;font-size:.9rem" />
        </label>
        <label style="display:flex;flex-direction:column;gap:.25rem;font-size:.875rem">
          <span>Category</span>
          <select id="guo-category-input" style="background:var(--surface-raised,#1b2740);border:1px solid var(--border,#243249);border-radius:8px;padding:.5rem .75rem;color:inherit;font-size:.9rem">
            <option value="prototype">Prototypes & Setup</option>
            <option value="cad">CAD & SolidWorks</option>
            <option value="fabrication">Fabrication</option>
            <option value="thermal-die">Thermal Die</option>
            <option value="electronics">Electronics</option>
            <option value="testing">Testing</option>
          </select>
        </label>
        <label style="display:flex;flex-direction:column;gap:.25rem;font-size:.875rem">
          <span>Description (optional)</span>
          <textarea id="guo-desc-input" rows="2" placeholder="Notes or observations for this photo..."
            style="background:var(--surface-raised,#1b2740);border:1px solid var(--border,#243249);border-radius:8px;padding:.5rem .75rem;color:inherit;font-size:.9rem;resize:vertical"></textarea>
        </label>
      </div>

      <div style="display:flex;gap:.75rem;margin-top:1.5rem;justify-content:flex-end">
        <button type="button" id="guo-cancel" class="button button-quiet">Cancel</button>
        <button type="button" id="guo-save" class="button button-primary" disabled>✓ Done — Save to Gallery</button>
      </div>
    </div>
  `;
  document.body.appendChild(uploadOverlay);

  let _pendingDataUrl = null;
  const dropZone = document.getElementById('guo-drop-zone');
  const fileInput = document.getElementById('guo-file-input');

  // Direct, foolproof click handling on drop zone
  dropZone?.addEventListener('click', () => {
    fileInput?.click();
  });
  dropZone?.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      fileInput?.click();
    }
  });

  function compressGalleryImage(file, cb) {
    const reader = new FileReader();
    reader.onload = e => {
      const img = new Image();
      img.onload = () => {
        const MAX = 900;
        const scale = Math.min(1, MAX / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width  = Math.round(img.width * scale);
        canvas.height = Math.round(img.height * scale);
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height);
        cb(canvas.toDataURL('image/jpeg', 0.72));
      };
      img.onerror = () => showToast('Could not read image file.', true);
      img.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  function handleGalleryFile(file) {
    if (!file || !file.type.startsWith('image/')) return;
    compressGalleryImage(file, dataUrl => {
      _pendingDataUrl = dataUrl;
      const prev = document.getElementById('guo-preview');
      if (prev) { prev.src = dataUrl; prev.style.display = 'block'; }
      const ti = document.getElementById('guo-title-input');
      if (ti && !ti.value) ti.value = file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' ');
      const sb = document.getElementById('guo-save');
      if (sb) sb.disabled = false;
    });
  }

  fileInput?.addEventListener('change', e => {
    if (e.target.files && e.target.files[0]) handleGalleryFile(e.target.files[0]);
  });

  dropZone?.addEventListener('dragover', e => { e.preventDefault(); dropZone.style.borderColor = 'var(--ok,#10b981)'; dropZone.style.background = 'rgba(16,185,129,0.12)'; });
  dropZone?.addEventListener('dragleave', () => { dropZone.style.borderColor = ''; dropZone.style.background = 'rgba(16,185,129,0.06)'; });
  dropZone?.addEventListener('drop', e => {
    e.preventDefault(); dropZone.style.borderColor = ''; dropZone.style.background = 'rgba(16,185,129,0.06)';
    const file = e.dataTransfer?.files?.[0];
    if (file) handleGalleryFile(file);
  });

  function closeGalleryUpload() {
    uploadOverlay.style.display = 'none';
    _pendingDataUrl = null;
    const prev = document.getElementById('guo-preview');
    if (prev) { prev.src = ''; prev.style.display = 'none'; }
    const ti = document.getElementById('guo-title-input');
    if (ti) ti.value = '';
    const di = document.getElementById('guo-desc-input');
    if (di) di.value = '';
    const sb = document.getElementById('guo-save');
    if (sb) sb.disabled = true;
    if (fileInput) fileInput.value = '';
  }

  document.getElementById('guo-close')?.addEventListener('click', closeGalleryUpload);
  document.getElementById('guo-cancel')?.addEventListener('click', closeGalleryUpload);
  uploadOverlay.addEventListener('click', e => {
    if (e.target === uploadOverlay) closeGalleryUpload();
  });
  window.addEventListener('keydown', e => {
    if (e.key === 'Escape' && uploadOverlay.style.display === 'flex') closeGalleryUpload();
  });

  document.getElementById('guo-save')?.addEventListener('click', () => {
    if (!_pendingDataUrl) { showToast('Please select a photo first.', true); return; }
    const title = (document.getElementById('guo-title-input')?.value || '').trim() || 'Project Photo';
    const newItem = {
      id:          'custom-' + Date.now(),
      src:         _pendingDataUrl,
      title,
      kind:        'Progress Photo',
      category:    document.getElementById('guo-category-input')?.value || 'prototype',
      description: (document.getElementById('guo-desc-input')?.value || '').trim(),
      author:      'Group 10 · Student Upload',
      builtin:     false
    };
    const custom = getCustomGallery();
    custom.unshift(newItem);
    setCustomGallery(custom);
    closeGalleryUpload();
    renderGallery();
    renderJourney();
    showToast(`"${title}" uploaded to gallery! 🎉`);
    setTimeout(() => {
      document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }, 200);
  });

  window.__openGalleryUpload = (cat) => {
    const catInput = document.getElementById('guo-category-input');
    if (catInput && cat && cat !== 'all') catInput.value = cat;
    uploadOverlay.style.display = 'flex';
    document.getElementById('guo-title-input')?.focus();
    // Synchronously open file picker for instant upload experience!
    try {
      fileInput?.click();
    } catch (_) {}
  };
  window.__openUploadModal         = (cat) => window.__openGalleryUpload(cat);
  window.__openUploadModalForStep  = (cat) => window.__openGalleryUpload(cat);

  // Initial renders
  renderJourney();
  renderGallery();

  // ---------------- 13. Natural Theme & Sliding Transitions Engine ----------------
  function initSlideTransitionSystem() {
    const shutter = $('#site-opening-shutter');
    const meter = $('#shutter-meter-fill');
    const replayBtn = $('#replay-slide-transition');

    // 1. Shutter Slide Opening Sequence
    function triggerSlideOpening() {
      if (!shutter) return;
      if (meter) {
        meter.style.transition = 'none';
        meter.style.width = '0%';
        setTimeout(() => {
          meter.style.transition = 'width 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
          meter.style.width = '100%';
        }, 50);
      }

      setTimeout(() => {
        shutter.classList.add('is-open');
        triggerHeroSlide();
      }, 550);
    }

    if (shutter) {
      triggerSlideOpening();
    }

    if (replayBtn) {
      replayBtn.addEventListener('click', () => {
        if (!shutter) return;
        shutter.classList.remove('is-open');
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setTimeout(() => {
          triggerSlideOpening();
        }, 400);
      });
    }

    // 2. Hero Cascade Slide
    function triggerHeroSlide() {
      const heroEls = $$('.hero .eyebrow, .hero h1, .hero .hero-lede, .hero-actions, .hero-team, .hero-figure-note, .hero-visual-card');
      heroEls.forEach((el, idx) => {
        el.classList.add('has-slide-reveal');
        el.style.transitionDelay = `${100 + idx * 80}ms`;
        setTimeout(() => el.classList.add('is-revealed'), 60);
      });
    }

    // 3. Scroll-Driven IntersectionObserver Slide System
    const slideTargets = $$(
      '.title-block, .section-intro, .prose p, .status-group, .component-card, ' +
      '.gallery-card, .test-card, .notes-table, .spec-table, .ref-layout > div, ' +
      '.csb-callout, .sim-panel, .model-host'
    );

    slideTargets.forEach((el) => {
      if (!el.classList.contains('has-slide-reveal') && !el.classList.contains('slide-from-left') && !el.classList.contains('slide-from-right')) {
        el.classList.add('has-slide-reveal');
      }
    });

    // Milestone steps slide alternately from left and right
    $$('.step').forEach((step, idx) => {
      if (idx % 2 === 0) {
        step.classList.add('slide-from-left');
      } else {
        step.classList.add('slide-from-right');
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, {
      rootMargin: '0px 0px -60px 0px',
      threshold: 0.08
    });

    slideTargets.forEach((el) => observer.observe(el));
    $$('.step').forEach((el) => observer.observe(el));

    // 4. Parallax Background Movement
    window.addEventListener('scroll', () => {
      const scrolled = window.scrollY;
      document.body.style.setProperty('--scroll-offset', `${scrolled * 0.12}px`);
    }, { passive: true });
  }

  // Initialize transitions
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlideTransitionSystem);
  } else {
    initSlideTransitionSystem();
  }

  // Expose lightbox globally
  window.__openLightbox = openLightbox;


  /* ======================================================================== */
  /* PERMANENT TEAM & GUIDE PHOTOS                                            */
  /* ======================================================================== */
  function initTeamPhotoUploads() {
    // Clear any previous temporary photo uploads from localStorage to lock in permanent photos
    try {
      localStorage.removeItem('pet_team_photos_v2');
      localStorage.removeItem('pet_team_photos');
    } catch (e) {}
  }

  /* ======================================================================== */
  /* SECTION TRANSITIONS & FLOATING HUD                                        */
  /* ======================================================================== */
  function initSectionTransitionHUD() {
    const sections = [
      'top', 'problem', 'how', 'journey', 'design', 
      'explorer-section', 'electronics', 'testing', 
      'safety', 'gallery', 'status', 'references'
    ];

    const hudLinks = $$('.snh-link');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          hudLinks.forEach((link) => {
            if (link.getAttribute('data-target') === id) {
              link.classList.add('is-active');
            } else {
              link.classList.remove('is-active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -50% 0px',
      threshold: 0.15
    });

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    // Smooth scroll for divider buttons
    $$('.std-btn-next').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const href = btn.getAttribute('href');
        if (href && href.startsWith('#')) {
          e.preventDefault();
          const target = document.querySelector(href);
          if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      });
    });
  }

  // Initialize photo uploads and HUD on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initTeamPhotoUploads();
      initSectionTransitionHUD();
    });
  } else {
    initTeamPhotoUploads();
    initSectionTransitionHUD();
  }

})();
