# Electronics & Control Architecture - Closed-Loop Thermal & Speed Regulation

> **Hardware:** Microcontroller + PID Controller + High-Current MOSFET  
> Sanjivani University | Makerspace Lab | Group 10

---

## 1. System Block Diagram
```
   [ K-Type Sensor ] ──────┐
                           ▼
 [ 24V PSU ] ──► [ Microcontroller (ESP32/Arduino) ] ──► [ Solid State Relay / MOSFET ] ──► [ 40W Heater ]
                           │
                           ▼
                   [ A4988 / TMC2208 Driver ] ──► [ Planetary Geared Motor (Puller) ]
```

---

## 2. Closed-Loop PID Temperature Control
Recycled PETG demands tightly regulated thermal control:
- **Proportional ($K_p = 18.5$):** Drives rapid initial ramp-up from ambient to 240°C in under 90 seconds.
- **Integral ($K_i = 1.2$):** Eliminates steady-state error caused by cold ribbon entering the die.
- **Derivative ($K_d = 62.0$):** Dampens overshoot to prevent thermal spikes exceeding 262°C.

### Temperature Regimes:
- **Cold / Inactive ($T < 240^\circ\text{C}$):** Polymer remains crystalline / semi-rigid. Pull motor is software-locked to prevent mechanical overload on the drive gears.
- **Drawing Window ($245^\circ\text{C} - 260^\circ\text{C}$):** Optimal pultrusion zone. Viscoelastic state allows seamless folding into solid-core 1.75 mm strand.
- **Safety Cutoff ($T > 265^\circ\text{C}$):** Automatic hardware & firmware safety trip immediately de-energizes the heater cartridge to prevent polymer burning and hazardous fumes.

---

## 3. Pull Speed & Synchronization Logic
The puller motor speed governs the continuous drawing tension and strand quenching time:
- Standard drawing feed: **400 – 500 mm/min** (approx. 6.5 – 8.3 mm/s).
- Pull rate is modulated via PWM pulse generation on the stepper driver STEP pin.
- Increasing pull rate slightly decreases diameter via longitudinal draw stretching, allowing fine manual trimming of diameter tolerance to within ±0.03 mm.
