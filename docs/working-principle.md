# Working Principle - Thermal Pultrusion of Post-Consumer PETG Bottles

> **Document Type:** Scientific & Kinematic Working Principle  
> Sanjivani University | Makerspace Lab | Group 10

---

## 1. Thermodynamic & Polymer Physics
Unlike conventional screw extrusion where plastic pellets are melted into a molten fluid slurry and pumped under high pressure, this system utilizes **thermal pultrusion** (pull-extrusion).

### Glass Transition & Softening Dynamics
Polyethylene Terephthalate Glycol-modified (PETG) exhibits distinct thermodynamic transition phases:
1. **Glass Transition Region ($T_g \approx 70^\circ\text{C} - 80^\circ\text{C}$):** Polymer chains gain mobility; stiff plastic becomes ductile and pliable.
2. **Crystallization Zone ($T_c \approx 120^\circ\text{C} - 150^\circ\text{C}$):** Amorphous zones begin nucleating into crystal lamellae.
3. **Pultrusion Drawing Window ($245^\circ\text{C} - 260^\circ\text{C}$):** At this temperature, the polymer reaches an ideal viscoelastic state. High shear allows the flat ribbon to fold circularly upon itself without dropping to low-viscosity liquid melting.
4. **Thermal Degradation Threshold ($T_{deg} > 265^\circ\text{C}$):** Exposure beyond 265°C causes chain scission, acetaldehyde gas release, discolouration, and severe brittleness.

```
       [ Cold Ribbon ]
             │
             ▼
┌─────────────────────────┐
│ Heating Zone (250°C)   │  Viscoelastic softening
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Tapered 45° Brass Die   │  Continuous radial folding: Flat Strip ➔ Solid Cylinder
└────────────┬────────────┘
             ▼
┌─────────────────────────┐
│ Forced Air Quenching    │  Immediate freeze below Tg, locking 1.75 mm diameter
└────────────┬────────────┘
             ▼
       [ 1.75mm Strand ]
```

---

## 2. Mathematical Continuity & Area Conversion
To produce a continuous cylinder of nominal diameter $d = 1.75\text{ mm}$, the cross-sectional area of the incoming flat ribbon must equal the cross-sectional area of the final round filament:

$$A_{\text{ribbon}} = A_{\text{filament}}$$

$$W \cdot t = \pi \cdot \left(\frac{d}{2}\right)^2$$

Where:
- $W$ = Width of the slit bottle ribbon (mm)
- $t$ = Wall thickness of the PETG bottle (mm)
- $d$ = Target filament diameter = $1.75\text{ mm}$

For nominal diameter $d = 1.75\text{ mm}$:
$$A_{\text{target}} = \frac{\pi \cdot (1.75)^2}{4} \approx 2.405\text{ mm}^2$$

### Slitting Width Calculation Table:

| Measured Bottle Wall ($t$) | Theoretical Width ($W$) | Thermal Draw Compensation (+5%) | Calibrated Cutting Width ($W_{cal}$) |
| :---: | :---: | :---: | :---: |
| 0.25 mm | 9.62 mm | +0.48 mm | **10.10 mm** |
| 0.28 mm | 8.59 mm | +0.43 mm | **9.02 mm** |
| **0.30 mm (Standard 1L)** | **8.02 mm** | **+0.40 mm** | **8.42 mm – 8.50 mm** |
| 0.35 mm | 6.87 mm | +0.34 mm | **7.21 mm** |

---

## 3. Molecular Chain Orientation
Because the ribbon is drawn under continuous linear tension through the die, polymer macromolecules undergo **uniaxial orientation** along the drawing axis. This longitudinal alignment enhances the tensile strength of the resulting filament, mitigating the micro-voids often observed in domestic recycling.
