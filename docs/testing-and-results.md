# Testing & Results - Experimental Protocol & Quality Verification

> **Scope:** Diameter Verification, Tensile Strength Testing, and 3D Print Validation  
> Sanjivani University | Mechanical Engineering Makerspace | Group 10

---

## 1. Test Protocol Matrix

| Test Metric | Instrument / Tool | Target Specification | Acceptance Threshold | Status |
| :--- | :--- | :--- | :--- | :---: |
| **Filament Diameter** | Digital Micrometer (0.001 mm) | 1.750 mm | **1.70 mm – 1.80 mm (±0.05 mm)** | **PASS** |
| **Cross-Sectional Ovality** | Multi-axis Caliper (0° & 90°) | Circular ($e \le 0.03\text{ mm}$) | $\le 0.05\text{ mm}$ eccentricity | **PASS** |
| **Temperature Stability** | PID datalogger (1 Hz sample) | 250.0°C | **± 1.5°C steady state** | **PASS** |
| **Ultimate Tensile Strength** | Universal Testing Machine (UTM)| $\ge 50\text{ MPa}$ | ASTM D638 Type IV coupon | **IN PROGRESS** |
| **3D Print Layer Adhesion** | Open-source FDM printer | Zero delamination | Functional 20 mm calibration cube | **VERIFIED** |

---

## 2. Filament Diameter Consistency Sampling (10-Meter Run)

| Sample Station | Measured $d_x$ (0°) | Measured $d_y$ (90°) | Mean Diameter | Deviation from 1.75 mm |
| :---: | :---: | :---: | :---: | :---: |
| 1.0 m | 1.74 mm | 1.76 mm | **1.750 mm** | 0.000 mm |
| 2.5 m | 1.73 mm | 1.75 mm | **1.740 mm** | -0.010 mm |
| 5.0 m | 1.76 mm | 1.75 mm | **1.755 mm** | +0.005 mm |
| 7.5 m | 1.74 mm | 1.77 mm | **1.755 mm** | +0.005 mm |
| 10.0 m | 1.75 mm | 1.76 mm | **1.755 mm** | +0.005 mm |

- **Sample Mean:** $1.751\text{ mm}$
- **Standard Deviation ($\sigma$):** $0.018\text{ mm}$
- **Result:** Fully compatible with standard 0.4 mm brass 3D printer nozzles without feeder gear slipping or hotend jamming.

---

## 3. 3D Print Validation Parameters
- **Slicer:** Ultimaker Cura / PrusaSlicer
- **Nozzle Temperature:** 255°C
- **Bed Temperature:** 75°C (PEI textured sheet with PVA glue stick)
- **Print Speed:** 40 mm/s (Outer walls 25 mm/s)
- **Cooling Fan:** 30% after layer 3
- **Observed Surface Finish:** Glossy finish, high stiffness, superior inter-layer bonding with zero stringing when properly dried.
