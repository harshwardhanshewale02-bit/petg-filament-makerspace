# Design & Dimensions - SolidWorks CAD Engineering Specifications

> **Source File:** `makerspace_A.SLDASM` | SolidWorks CAD Assembly  
> Sanjivani University | Department of Mechanical Engineering | Group 10

---

## 1. Assembly Structure (`makerspace_A.SLDASM`)
The complete system is modeled as a modular CAD assembly comprising six primary functional sub-assemblies:

1. **Structural Base & Chassis (`Base.SLDPRT`, `sidebase.SLDPRT`):** Rigid foundation supporting the drive train, hotend mount, and slitter rails.
2. **Bottle Axis Mount & Precision Slitter:** Rotational axle holding the inverted bottle, paired with a blade bracket holding an 18 mm utility blade against rolling bearings.
3. **Thermal Pultrusion Hotend (`nozzel.SLDPRT`):** Machined aluminum block (20 × 20 × 12 mm) and drill-modified brass nozzle with a 45° lead-in chamfer.
4. **Puller Drive & Reduction Gearing:** Stepper / DC motor with planetary reduction driving dual knurled pinch rollers.
5. **Cooling Duct & Radial Fan Mount:** 30° radial impingement duct focusing airflow 10 mm past the nozzle exit.
6. **Electronic Housing & Display Console (`display.SLDPRT`, `ac to dc.SLDPRT`):** Enclosures for the 24V/12V power supply, microcontroller board, and LCD telemetry display.

---

## 2. Key Dimensional Callouts

| Component / Feature | Design Dimension (CAD) | As-Built Tolerance | Material Specification |
| :--- | :--- | :--- | :--- |
| **Nozzle Outlet Bore** | Ø 1.75 mm | +0.03 / -0.01 mm | Machined CW614N Brass |
| **Nozzle Inward Taper Angle** | 45° included angle | ±0.5° | Chamfered entry bore |
| **Heating Block** | 20 × 20 × 12 mm | ±0.1 mm | 6061-T6 Aluminum |
| **Heater Cartridge Bore** | Ø 6.0 mm × 20 mm | H7 slip fit | Ceramic 40W 12V cartridge |
| **Thermocouple Bore** | Ø 3.0 mm × 10 mm | Adjacent to nozzle | K-Type grounded bead |
| **Linear Cooling Span** | 180 mm | ±5 mm | Air convection zone |
| **Puller Roller Diameter** | Ø 25 mm knurled | ±0.05 mm | 304 Stainless Steel |
| **Slitter Blade Clearance** | 0.05 mm | ±0.02 mm | High-carbon SK5 steel |
| **Overall Machine Dimensions**| 380 W × 220 D × 210 H mm | Exterior frame | 2020 Aluminum extrusion |

---

## 3. Discrepancy & Tolerance Verification
- **Filament Ovality:** Measured eccentricity of drawn filament is constrained within $\le 0.04\text{ mm}$ by positioning the radial cooling nozzle symmetrically around the exit cone.
- **Thermal Heat Creep:** An air gap of 15 mm between the heater block and motor mounting plate isolates the drive train from conductively transferring heat into the stepper motor windings.
