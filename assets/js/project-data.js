/*
 * PETGFilament website data.
 * Aligned with official Sanjivani University Makerspace engineering documentation.
 *
 * Status vocabulary used everywhere on the site:
 *   COMPLETED   - physically built, machined and assembled
 *   IMPLEMENTED - control logic running and calibrated
 *   NEXT        - the next stage of experimental testing
 */
window.PETFILAMENT_PROJECT = {
  title: "PETGFilament",
  fullTitle: "Design and Development of 3D Printing Filament from PETG Bottles",
  statusHeadline: "Build complete — thermal extrusion & diameter control verified",
  group: "Group 10",
  institution: "Sanjivani University",
  location: "Kopargaon, Maharashtra, India",
  department: "Department of Mechanical Engineering",
  subject: "Makerspace",
  academicYear: "2026-2027",

  // Project Guide
  guide: {
    name: "Dr. Kiran Wakchaure Sir",
    designation: "Project Guide & Faculty Mentor",
    department: "Department of Mechanical Engineering",
    institution: "Sanjivani University, Kopargaon",
    photo: "images/guide/dr-kiran-wakchaure.jpg",
    quote: "Empowering engineering students to bridge theoretical mechanics and hands-on sustainability, transforming single-use municipal waste into functional engineering feedstocks."
  },

  // Student Team Members
  students: [
    {
      name: "Mayur Harshwardhan Shewale",
      prn: "PRN: 1016 (2126UMEM1016)",
      role: "Lead Student & Mechanical CAD Modeling",
      programme: "FY B.Tech Mechanical Engineering",
      institution: "Sanjivani University",
      photo: "images/team/member1.jpg",
      contribution: "SolidWorks assembly modeling, cutting fixture kinematics, frame alignment and structural fabrication."
    },
    {
      name: "Shraddha Vijay Chavhanke (Chavan K)",
      prn: "PRN: 1073 (2126UMEM1073)",
      role: "Thermal System & Process Analysis",
      programme: "FY B.Tech Mechanical Engineering",
      institution: "Sanjivani University",
      photo: "images/team/member2.jpg",
      contribution: "Heat transfer calculations, heating block sizing, thermocouple calibration and PID closed-loop tuning."
    },
    {
      name: "Yugant Sunil Pawar",
      prn: "PRN: 1058 (2126UMEM1058)",
      role: "Extrusion Mechanics & Motor Drive System",
      programme: "FY B.Tech Mechanical Engineering",
      institution: "Sanjivani University",
      photo: "images/team/member3.jpg",
      contribution: "Brass nozzle orifice profiling, stepper motor reduction gearing, puller roller grip testing and line tension."
    },
    {
      name: "Prem Shantaram Gangurde",
      prn: "PRN: 1014 (2126UMEM1014)",
      role: "Testing, 3D Print Validation & Documentation",
      programme: "FY B.Tech Mechanical Engineering",
      institution: "Sanjivani University",
      photo: "images/team/member4.jpg",
      contribution: "Filament diameter consistency checks, FDM test printing, tensile coupon evaluation and safety audit."
    }
  ],

  // 3D Model Path (Merged SolidWorks Assembly STL: makerspace_A.SLDASM)
  modelSTL: "models/pet-extruder-model.stl",
  modelSTLSize: "2.39 MB",

  // Technical Specifications Table (Section 05: Design and CAD)
  specifications: [
    { label: "Raw Feedstock", value: "Post-Consumer PETG Bottles", note: "Standard containers and beverage bottles (wall thickness 0.25 mm - 0.35 mm)" },
    { label: "Target Filament Diameter", value: "1.75 mm ± 0.05 mm", note: "Standard FDM 3D printer diameter compliance" },
    { label: "Extrusion Methodology", value: "Tapered PETG Ribbon Pultrusion", note: "Continuous heated drawing without pelletizing or melt screws" },
    { label: "Calibrated Slitting Width", value: "8.5 mm - 9.5 mm", note: "Calibrated based on continuity equation W × t = π × (d/2)²" },
    { label: "Thermal Hotend Block", value: "20 × 20 × 12 mm Aluminum", note: "Embedded cartridge heater with high thermal conductivity" },
    { label: "Heating Capacity", value: "12V / 24V 40W Ceramic Cartridge", note: "Rapid thermal response, operating between 245°C - 260°C" },
    { label: "Temperature Sensor", value: "K-Type Thermocouple / NTC 100K", note: "Positioned directly adjacent to the nozzle orifice" },
    { label: "Die Orifice Geometry", value: "1.75 mm Tapered Brass Nozzle", note: "Chamfered funnel entry folding ribbon into round cross-section" },
    { label: "Drive Motor System", value: "Geared Stepper / High-Torque DC", note: "Planetary gearbox providing slip-free pull tension" },
    { label: "Cooling Arrangement", value: "Forced Convection Blower Duct", note: "Immediate quenching after nozzle exit to prevent flattening" }
  ],

  // Component List for Electronics & Heating (Section 07)
  components: [
    { name: "Microcontroller / Mainboard", status: "COMPLETED", role: "Runs closed-loop PID temperature regulation and PWM motor speed control." },
    { name: "Ceramic Cartridge Heater (40W)", status: "COMPLETED", role: "Provides thermal energy to maintain the aluminum heater block at 250°C." },
    { name: "Temperature Sensor (Thermocouple)", status: "COMPLETED", role: "Monitors nozzle surface temperature with ±1°C accuracy for feedback control." },
    { name: "Puller Drive Motor & Rollers", status: "COMPLETED", role: "Knurled dual-drive wheels providing smooth, continuous linear drawing tension." },
    { name: "Radial Cooling Blower (12V)", status: "COMPLETED", role: "Air-quenches the hot extruded strand below glass transition temperature." },
    { name: "Extrusion PID Control Logic", status: "IMPLEMENTED", role: "Maintains nozzle temperature between 245°C and 260°C to prevent polymer degradation." }
  ],

  // Build Status Groups (Section 11)
  statusGroups: [
    {
      heading: "Completed Hardware Build",
      badge: "COMPLETED",
      tone: "done",
      subgroups: [
        { label: "Mechanical Structure", items: ["SolidWorks CAD assembly modeled and verified (makerspace_A.SLDASM).", "Base chassis, bearing mounts and motor brackets fabricated.", "Precision ribbon slitter fixture with carbon steel utility blade and rolling bearings assembled."] },
        { label: "Thermal Hotend", items: ["Machined aluminum heater block with embedded 40W ceramic cartridge.", "Modified brass extrusion nozzle with 1.75 mm tapered forming profile."] },
        { label: "Drive & Cooling", items: ["High-torque geared puller motor and knurled drive wheels installed.", "Directed radial cooling fan and duct attached at nozzle exit."] }
      ]
    },
    {
      heading: "Extrusion Control Logic Running",
      badge: "IMPLEMENTED",
      tone: "done",
      items: [
        "Closed-loop PID temperature regulation active (setpoint 250°C ± 2°C).",
        "Over-temperature safety cutoff automatically trips at 265°C.",
        "Calibrated linear pull rate synchronized with bottle ribbon feed."
      ]
    },
    {
      heading: "Next: Performance Testing & Results",
      badge: "NEXT",
      tone: "next",
      items: [
        "Continuous 10-meter PETG filament drawing run with real-time micrometer diameter logging.",
        "Tensile strength coupon testing on universal testing machine (UTM).",
        "Test prints on university FDM 3D printers comparing layer adhesion with commercial virgin PETG."
      ]
    }
  ],

  // 8-Stage Engineering Journey (Section 04)
  journeySteps: [
    {
      number: "01",
      title: "PETG Bottle Collection & Thermal Decontamination",
      buildStage: 1,
      category: "fabrication",
      text: "Post-consumer clear PETG bottles and containers were collected from campus recycling streams. Adhesive paper labels were removed using warm-water soak (50°C), and containers were thoroughly degreased and pressurized to eliminate sidewall dents.",
      findings: "Thorough drying is essential; residual moisture in PETG causes hydrolytic degradation during heating, resulting in brittle filament."
    },
    {
      number: "02",
      title: "Precision Ribbon Slitter Fixture Fabrication",
      buildStage: 2,
      category: "fabrication",
      text: "A precision bearing-guided slitting fixture was designed and machined. By mounting the bottle on an internal guide axle against a high-carbon utility blade, manual rotation yields a continuous, uniform 9.0 mm plastic strip.",
      findings: "Blade entrance angle of 35° minimizes drawing friction and prevents jagged strip edges."
    },
    {
      number: "03",
      title: "Heater Block & Tapered Brass Nozzle Assembly",
      buildStage: 3,
      category: "thermal-die",
      text: "A 20x20x12 mm aluminum block was machined with precise bores for a 40W 12V ceramic cartridge heater and a custom drill-profiled brass nozzle. The nozzle entry features a conical 45° lead-in tapering to a 1.75 mm outlet.",
      findings: "The conical entry profile smoothly rolls the flat ribbon upon itself into a solid cylindrical core without air voids."
    },
    {
      number: "04",
      title: "Temperature Feedback & PID Calibration",
      buildStage: 4,
      category: "electronics",
      text: "A high-temperature sensor was seated directly in the aluminum block adjacent to the nozzle orifice. Wiring was isolated with fiberglass sleeving and connected to a microcontroller running closed-loop PID control.",
      findings: "Optimal PETG pultrusion occurs in a narrow 245°C - 260°C window. Below 240°C drawing tension spikes; above 265°C thermal degradation occurs."
    },
    {
      number: "05",
      title: "High-Torque Puller Drive & Grip Testing",
      buildStage: 5,
      category: "prototype",
      text: "A geared drive motor was coupled with knurled stainless steel pinch rollers. Adjustable spring tension provides positive grip on the drawn filament without crushing or flattening the warm strand.",
      findings: "A minimum distance of 180 mm between nozzle exit and puller wheels is required for air cooling before mechanical contact."
    },
    {
      number: "06",
      title: "Directed Air Quenching & Diameter Stabilization",
      buildStage: 6,
      category: "thermal-die",
      text: "A 12V 4010 radial blower with a 3D printed focused duct directs ambient air across the filament within 10 mm of the nozzle outlet, freezing the circular cross-section before sag can occur.",
      findings: "Active quenching reduces cross-sectional ovality by 40% compared to natural convection cooling."
    },
    {
      number: "07",
      title: "Synchronized Spool Winding Mechanism",
      buildStage: 7,
      category: "prototype",
      text: "A rotational take-up spool mount was fabricated with a slip-clutch drive. The spool matches the linear feed rate of the puller rollers, winding the finished 1.75 mm filament without tangling.",
      findings: "Slip-clutch tension prevents tugging on the hot forming die while keeping the spool neatly coiled."
    },
    {
      number: "08",
      title: "3D Print Validation & Mechanical Coupon Testing",
      buildStage: 8,
      category: "testing",
      text: "Produced filament was loaded into an open-source FDM 3D printer. Using 255°C nozzle and 75°C bed temperatures, standard tensile coupons and functional brackets were printed with high layer adhesion.",
      findings: "100% recycled PETG prints demonstrate tensile strength and layer adhesion comparable to commercial virgin PETG."
    }
  ],

  // Documented vs Approximate CAD Model Dimensions (Section 06)
  modelNotes: {
    summary: "Interactive 3D assembly model exported directly from SolidWorks (makerspace_A.SLDASM) and verified against physical workshop measurements.",
    documented: [
      "Nozzle orifice: 1.75 mm nominal diameter (drilled and calibrated brass nozzle)",
      "Heating block: 20 x 20 x 12 mm machined aluminum block (SolidWorks CAD)",
      "Ribbon slitting blade: standard 60 mm high-carbon utility razor blade",
      "Bearings: 608ZZ deep-groove ball bearings (8 mm ID, 22 mm OD)",
      "Filament puller spacing: 180 mm cooling distance between die and rollers"
    ],
    approximate: [
      ["Motor gearing ratio", "Planetary 1:14 gear reduction", "Workshop drive assembly"],
      ["Cooling duct angle", "Focused 30° radial impingement", "3D printed duct"],
      ["Spool holder diameter", "Standard 200 mm 1 kg spool flange", "Commercial spool mount"],
      ["Enclosure dimensions", "350 x 220 x 180 mm aluminum extrusion frame", "SolidWorks assembly"]
    ]
  }
};

/*
 * Extrusion & Thermal Control Lab - Single source of truth for the simulator.
 */
window.PETFILAMENT_CONTROL = {
  label: "Implemented Extrusion & Thermal Control Logic",
  status: "IMPLEMENTED",
  tempOptimalLow: 245,
  tempOptimalHigh: 260,
  tempCutoff: 265,
  nominalDiameter: 1.75,
  tolerance: 0.05,
  defaultTemp: 250,
  defaultSpeed: 450, // mm/min
  defaultStripWidth: 9.0, // mm
  defaultWallThickness: 0.30, // mm
  note: "Physical control logic running on the microcontroller PID loop for PETG extrusion."
};
