# 🌿 Design and Development of 3D Printing Filament from Recycled PETG Bottles

[![Sanjivani University Makerspace](https://img.shields.io/badge/Sanjivani_University-Makerspace_AY_2026--2027-10b981?style=for-the-badge&logo=google-earth&logoColor=white)](https://sanjivani-makerspace-group10.surge.sh)
[![Group 10](https://img.shields.io/badge/Team-Group_10-0284c7?style=for-the-badge)](https://sanjivani-makerspace-group10.surge.sh)
[![Live Website](https://img.shields.io/badge/Live_Website-Visit_Project-10b981?style=for-the-badge&logo=vercel)](https://sanjivani-makerspace-group10.surge.sh)
[![SolidWorks CAD](https://img.shields.io/badge/CAD-SolidWorks_2026-ef4444?style=for-the-badge&logo=dassaultsystemes)](https://sanjivani-makerspace-group10.surge.sh/#design)
[![Three.js 3D Viewer](https://img.shields.io/badge/3D_Viewer-Three.js_WebGL-8b5cf6?style=for-the-badge&logo=three.js)](https://sanjivani-makerspace-group10.surge.sh/#explorer-section)

> **Department of Mechanical Engineering · Sanjivani University, Kopargaon, Maharashtra, India**  
> **Academic Year 2026–2027 · Makerspace Innovation Lab**  
> **Project Guide:** Dr. Kiran Wakchaure Sir (Department of Mechanical Engineering)

---

## 🌐 Live Project Showcase Website
Explore the full interactive project portal with 3D WebGL assembly, SolidWorks dimensional datum envelopes, real-time PID thermal simulator, and prototype gallery:

- 🚀 **Primary Live Deployment:** [https://sanjivani-makerspace-group10.surge.sh](https://sanjivani-makerspace-group10.surge.sh)
- 🔗 **Alternative Mirror:** [https://petg-filament-group10.surge.sh](https://petg-filament-group10.surge.sh)

---

## 👥 Project Team (Group 10)

| Student Name | PRN Number | University Roll / PRN | Role & Responsibilities |
| :--- | :---: | :---: | :--- |
| **Mayur Harshwardhan Shewale** *(Team Lead)* | **1016** | `2126UMEM1016` | Mechanical Design, SolidWorks CAD modeling, Assembly Architecture |
| **Shraddha Vijay Chavhanke (Chavan K)** | **1073** | `2126UMEM1073` | Thermal System Modeling, Heat Transfer Analysis, Die Thermodynamics |
| **Prem Shantaram Gangurde** | **1014** | `2126UMEM1014` | Mechanical Fabrication, Workshop Machining, Dimensional Tolerances |
| **Yugant Sunil Pawar** | **1058** | `2126UMEM1058` | Drive Mechanics, Motor Pulling System, Diameter Consistency Testing |

**Project Guide:**  
👨‍🏫 **Dr. Kiran Wakchaure Sir** — *Department of Mechanical Engineering, Sanjivani University*

---

## 🎯 Executive Summary & Problem Statement

Plastic waste from discarded Polyethylene Terephthalate Glycol (PETG) beverage containers creates a significant environmental burden. Meanwhile, commercial 3D printing filament retails at ₹1,500 – ₹2,500/kg. 

This project designs, engineers, and fabricates a desktop-scale, energy-efficient **pultrusion extrusion system** that converts cleaned strips of post-consumer PET bottles into continuous **1.75 mm ± 0.05 mm** tolerance filament ready for desktop FDM 3D printers.

```
[ Used PETG Bottles ] ──▶ [ Precision Slitter ] ──▶ [ 9.2 mm Strip ] 
                                                           │
                                                           ▼
[ 1.75 mm Spooled Filament ] ◀── [ Puller Wheels ] ◀── [ Heated Pultrusion Die (245°C) ]
```

---

## 📐 SolidWorks Datum & Dimensional Envelope

All mechanical subsystems are engineered within a master coordinate datum frame verified in SolidWorks:

- **Overall Datum Envelope:** `486.3 mm (X-Length) × 177.2 mm (Y-Width) × 418.0 mm (Z-Height)`
- **Thermal Die Block:** `55.0 mm × 25.0 mm × 25.0 mm` brass/copper alloy block
- **Extrusion Nozzle Orifice:** `1.75 mm` calibrated bore with 45° internal transition taper
- **Puller Roller Center Distance:** `85.0 mm` dual silicone-pinch roller assembly
- **Spool Winder Hub:** `50.0 mm` inner core, `200.0 mm` outer flange diameter
- **Control Enclosure (Custom PCB):** `120.0 mm × 85.0 mm × 40.0 mm` ventilated ABS housing

---

## 🔬 Key Engineering Specifications

| Parameter | Design Value | Operational Tolerance |
| :--- | :--- | :--- |
| **Input Feedstock** | Post-consumer PET/PETG bottle ribbon | 9.0 mm – 9.5 mm width |
| **Die Operating Temperature** | 245°C – 255°C | ± 1.5°C (PID Closed Loop) |
| **Heater Cartridge** | 12V / 40W ceramic cartridge | Fast heat-up (< 3 mins) |
| **Temperature Sensor** | 100k NTC 3950 Thermistor | High accuracy up to 300°C |
| **Pulling Speed** | 180 – 260 mm/min | Controlled via stepper PWM |
| **Output Filament Diameter** | 1.75 mm | ± 0.04 mm circularity |
| **Power Consumption** | ~65 W peak / ~35 W continuous | High energy efficiency |

---

## 📚 Technical Documentation Library (`docs/`)

The repository includes complete academic and technical engineering reports:

1. 📖 [`docs/project-overview.md`](docs/project-overview.md) — Comprehensive problem statement, literature review, and objectives.
2. ⚙️ [`docs/working-principle.md`](docs/working-principle.md) — Pultrusion thermodynamic transition, shear stresses, and conservation of mass equations.
3. 📏 [`docs/design-and-dimensions.md`](docs/design-and-dimensions.md) — Full SolidWorks CAD dimensional breakdown with datums and clearances.
4. 🔩 [`docs/materials-and-components.md`](docs/materials-and-components.md) — Bill of Materials (BOM), part numbers, suppliers, and cost sheet.
5. 🛠️ [`docs/fabrication-and-assembly.md`](docs/fabrication-and-assembly.md) — Workshop fabrication protocol, lathe turning, drill tapping, and assembly steps.
6. ⚡ [`docs/electronics-and-control.md`](docs/electronics-and-control.md) — Schematics, Arduino PID firmware, thermistor calibration, and stepper timing.
7. 🧪 [`docs/testing-and-results.md`](docs/testing-and-results.md) — Diameter consistency measurements, tensile tests, and test 3D prints.
8. 🦺 [`docs/safety-and-maintenance.md`](docs/safety-and-maintenance.md) — Thermal hazards, cutter blade safety guards, and preventative maintenance.

---

## 💻 Tech Stack & Website Architecture

- **Frontend Core:** HTML5, CSS3, JavaScript (ES6+ modular)
- **Styling:** Tailwind CSS, PostCSS, Custom Eco-Green Design System
- **3D Graphics Engine:** Three.js WebGL (Interactive orbital CAD model)
- **Bundler & Build Tool:** Vite 5
- **Hosting & CDN:** Surge.sh Permanent Global Edge CDN + GitHub Pages
- **Continuous Deployment:** GitHub Actions (`.github/workflows/deploy.yml`)

---

## 🚀 Local Development Setup

### Prerequisites
- Node.js (v18 or higher recommended)
- Git

### Installation & Run
```bash
# 1. Clone the repository
git clone https://github.com/<your-username>/petg-filament-makerspace.git

# 2. Navigate to project directory
cd petg-filament-makerspace

# 3. Install dependencies
npm install

# 4. Start local development server
npm run dev

# 5. Build for production
npm run build

# 6. Preview production build
npm run preview
```
Visit `http://localhost:5173` or `http://localhost:4173` in your browser.

---

## 📜 License & Acknowledgments

This project is submitted to the **Department of Mechanical Engineering, Sanjivani University, Kopargaon** for the Makerspace Project Showcase, AY 2026–2027.

Special gratitude to **Dr. Kiran Wakchaure Sir** for technical mentorship, structural analysis guidance, and continuous encouragement throughout design and fabrication.
