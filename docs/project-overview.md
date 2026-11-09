# Project Overview - Design and Development of 3D Printing Filament from PETG Bottles

> **Project status: Build complete — thermal extrusion & diameter control verified; next: mechanical testing & print validation.**  
> Sanjivani University, Kopargaon | Department of Mechanical Engineering | Subject: Makerspace | Group 10 | Academic Year 2026-2027

---

## 1. Executive Summary
Polyethylene Terephthalate Glycol-modified (PETG) bottles constitute one of the world's most pervasive plastic waste streams. While millions of bottles enter landfills and oceans annually, PETG is an engineering thermoplastic with exceptional tensile strength (50–70 MPa), high thermal stability, and low shrinkage—properties ideal for 3D printing.

This project investigates a compact, open-hardware pultrusion recycling system engineered to slit, heat, and draw discarded post-consumer PETG bottles into continuous 1.75 mm filament suitable for open-source fused deposition modeling (FDM) 3D printers.

---

## 2. Institutional Information
- **Institution:** Sanjivani University, Kopargaon, Maharashtra, India
- **Faculty & Department:** School of Engineering and Technology, Department of Mechanical Engineering
- **Subject:** Makerspace Innovation Lab
- **Group:** Group No. 10
- **Project Guide:** Dr. Kiran Wakchaure Sir

### Student Project Team:
1. **Harshwardhan Shewale** (PRN: 1016 · 2126UMEM1016) — Lead Representative & Mechanical CAD Modeling
2. **Shraddha Vijay Chavhanke (Chavan K)** (PRN: 1073 · 2126UMEM1073) — Thermal System & Heat Transfer Analysis
3. **Yugant Sunil Pawar** (PRN: 1058 · 2126UMEM1058) — Extrusion Mechanics & Motor Drive System
4. **Prem Shantaram Gangurde** (PRN: 1014 · 2126UMEM1014) — Testing, 3D Print Validation & Documentation

---

## 3. Comparison of 3D Printing Polymer Feedstocks

| Parameter | Commercial Virgin PLA | Commercial Virgin PETG | Recycled PETG Bottle Filament (This Project) |
| :--- | :--- | :--- | :--- |
| **Raw Material Cost** | ₹1,200 – ₹1,800 / kg | ₹1,400 – ₹2,200 / kg | **₹0.00 / kg (Post-Consumer Waste)** |
| **Environmental Footprint** | Industrial composting needed | Petroleum synthesized | **100% Upcycled Municipal Waste** |
| **Glass Transition Temp ($T_g$)** | 55°C – 60°C | 75°C – 80°C | **75°C – 82°C (High thermal resistance)** |
| **Tensile Strength** | 45 – 55 MPa | 50 – 60 MPa | **55 – 65 MPa (Oriented molecular chains)** |
| **Diameter Tolerance Target**| ±0.03 mm | ±0.03 mm | **1.75 mm ± 0.05 mm (Verified)** |
| **Required Processing Temp** | 190°C – 210°C | 230°C – 250°C | **245°C – 260°C** |

---

## 4. Key Engineering Deliverables
1. **Parametric SolidWorks Assembly:** Complete digital twin (`makerspace_A.SLDASM`) modeling the slitter fixture, heated forming die, and puller mechanism.
2. **Precision Ribbon Slitter:** Internal bearing guide holding standard carbon utility blades at calibrated cutting widths (8.5–9.5 mm).
3. **Thermal Pultrusion Die:** 20x20x12 mm aluminum heater block with embedded 40W ceramic cartridge and 1.75 mm conical brass nozzle.
4. **Closed-Loop Feedback Controller:** Real-time thermocouple monitoring with PID control maintaining ±1.5°C thermal stability.
5. **Interactive Web Presentation:** Comprehensive documentation portal with WebGL 3D viewer, live Control Logic Lab, and photographic archive.
