/**
 * ==============================================================================
 * CENTRALIZED PROJECT CONFIGURATION DATA
 * Project: Design and Development of 3D Printing Filament from PET Bottles
 * University: Sanjivani University, Kopargaon, Maharashtra, India
 * Subject: Makerspace
 * Guide: Dr. Kiran Wakchaure Sir
 * ==============================================================================
 */

export const projectMeta = {
  title: "Design and Development of 3D Printing Filament from PET Bottles",
  shortTitle: "PET to 3D Filament Extruder",
  subject: "Makerspace",
  department: "Department of Mechanical Engineering",
  university: "Sanjivani University",
  location: "Kopargaon, Maharashtra, India",
  academicYear: "2026-2027",
  guide: {
    name: "Dr. Kiran Wakchaure Sir",
    designation: "Project Guide & Faculty Mentor",
    department: "Department of Mechanical Engineering",
    institution: "Sanjivani University, Kopargaon",
    photo: "images/guide/dr-kiran-wakchaure.jpg",
    description:
      "Under the guidance of Dr. Kiran Wakchaure Sir, this project combines practical Makerspace learning with mechanical engineering, recycling, and additive manufacturing.",
    quote:
      "Empowering engineering students to bridge theoretical mechanics and hands-on sustainability, transforming single-use municipal waste into functional engineering feedstocks."
  },
  universityInfo: {
    name: "Sanjivani University",
    location: "Kopargaon, Maharashtra, India",
    department: "Department of Mechanical Engineering",
    subject: "Makerspace",
    logo: "images/university/sanjivani-university-logo.png",
    campusPhoto: "images/university/campus.jpg",
    about:
      "Sanjivani University fosters cutting-edge technical education, research, and hands-on makerspace innovation, empowering students to build viable engineering solutions for global sustainability."
  },
  links: {
    githubRepo: "https://github.com/YOUR_USERNAME/pet-bottle-3d-filament-website",
    projectPresentation: "#",
    documentationPdf: "#"
  }
};

export const heroData = {
  badge: "Makerspace Engineering Innovation • Sanjivani University",
  mainHeading: "Turning Waste PET Bottles into 3D Printing Filament",
  projectTitle: "Design and Development of 3D Printing Filament from PET Bottles",
  shortIntro:
    "Our Makerspace project explores a practical and sustainable approach to converting discarded PET bottles into usable 3D printing filament. By combining recycling, mechanical design, heating, extrusion, and 3D-printing technology, the project aims to transform plastic waste into a useful engineering material.",
  buttons: [
    { label: "Explore Our Project", target: "#about", variant: "primary" },
    { label: "Interactive 3D CAD Model", target: "#model-3d", variant: "accent" },
    { label: "Project Work Log", target: "#work-done", variant: "secondary" },
    { label: "Meet the Team", target: "#team", variant: "ghost" }
  ],
  stats: [
    { label: "Primary Feedstock", value: "Post-Consumer PET", note: "100% Upcycled" },
    { label: "Filament Target", value: "1.75 mm", note: "Standard FDM" },
    { label: "Methodology", value: "Strip Pultrusion", note: "Thermal Reshaping" },
    { label: "Focus Domain", value: "Circular Economy", note: "Zero-Waste Lab" }
  ],
  heroImage: "images/prototype/hero-prototype.jpg"
};

export const introductionData = {
  heading: "From Plastic Waste to Possibility",
  lead: "Polyethylene Terephthalate (PET) beverage bottles represent one of the world's most pervasive plastic waste streams. While millions of bottles enter landfills and waterways daily, PET possesses exceptional tensile strength, thermal resistance, and durability—qualities identical to premium 3D printing polymers like PETG.",
  body: "Our Makerspace project investigates a compact, small-scale engineering system engineered to clean, precision-slit, heat, and draw discarded PET bottles into continuous filament suitable for experimentation with open-source 3D printers. By creating a closed-loop recycling ecosystem within our campus makerspace, we turn discarded beverage containers into high-value functional prototypes.",
  processChain: [
    { step: 1, label: "PET Bottle", desc: "Collected post-consumer bottles" },
    { step: 2, label: "Cleaning", desc: "Thermal label & adhesive removal" },
    { step: 3, label: "Cutting", desc: "Continuous uniform ribbon slitting" },
    { step: 4, label: "Heating", desc: "Controlled transition zone" },
    { step: 5, label: "Extrusion", desc: "Pultrusion through brass die" },
    { step: 6, label: "Cooling", desc: "Diameter stabilization" },
    { step: 7, label: "Filament Formation", desc: "1.75mm continuous round strand" },
    { step: 8, label: "3D Printing", desc: "Additive manufacturing prints" }
  ]
};

export const projectObjectives = [
  {
    id: "obj-1",
    title: "Recycling PET Plastic Waste",
    desc: "Diverting post-consumer beverage bottles from campus and municipal waste streams into practical engineering resources.",
    icon: "Recycle"
  },
  {
    id: "obj-2",
    title: "Developing Usable 3D Printing Filament",
    desc: "Forming continuous, spoolable 1.75mm diameter filament capable of feeding into standard direct-drive and Bowden FDM 3D printers.",
    icon: "Layers"
  },
  {
    id: "obj-3",
    title: "Reducing Material Waste",
    desc: "Significantly lowering student prototyping expenses by substituting expensive commercial filament with in-house upcycled plastic.",
    icon: "TrendingDown"
  },
  {
    id: "obj-4",
    title: "Understanding Plastic Extrusion",
    desc: "Investigating the thermal-rheological behavior of semi-crystalline PET during ribbon slitting, heating, and nozzle drawing.",
    icon: "Flame"
  },
  {
    id: "obj-5",
    title: "Applying Mechanical Principles",
    desc: "Designing structural fixtures, precision blade guides, gear reduction pullers, and tensioning mechanisms in SolidWorks & AutoCAD.",
    icon: "Cpu"
  },
  {
    id: "obj-6",
    title: "Developing Low-Cost Experimental System",
    desc: "Fabricating an accessible, open-source apparatus built using off-the-shelf 3D printer parts, aluminum extrusions, and microcontrollers.",
    icon: "Wrench"
  },
  {
    id: "obj-7",
    title: "Promoting Sustainable Manufacturing",
    desc: "Demonstrating circular product design within the Sanjivani University Makerspace to inspire sustainable student engineering ventures.",
    icon: "Leaf"
  }
];

export const howItWorksSteps = [
  {
    number: "01",
    title: "PET Bottle Collection",
    subtitle: "Feedstock Sourcing",
    description:
      "Post-consumer carbonated beverage and mineral water PET (Polyethylene Terephthalate) bottles are collected from campus recycling hubs. Uniform cylindrical bottles are prioritized to ensure constant wall thickness.",
    details: "Inspection ensures bottles are free from deep creases and cross-contamination.",
    icon: "PackageCheck"
  },
  {
    number: "02",
    title: "Cleaning and Preparation",
    subtitle: "Decontamination & Pre-heat",
    description:
      "Adhesive paper/plastic labels are softened using warm water or heat guns. Bottles are washed with mild detergent to eliminate residual sugars, dried thoroughly, and pressurized to remove surface dents.",
    details: "Drying is crucial as moisture in PET causes hydrolytic degradation during heating.",
    icon: "Sparkles"
  },
  {
    number: "03",
    title: "Bottle Cutting",
    subtitle: "Precision Ribbon Slitting",
    description:
      "The bottle base is detached, and the container is mounted onto a custom-designed bearing-guided slitter with a utility razor blade. Rotating the bottle produces a continuous, uniform plastic ribbon.",
    details: "Width is calibrated (typically ~8.5mm to 9.5mm depending on bottle wall thickness).",
    icon: "Scissors"
  },
  {
    number: "04",
    title: "Heating and Softening",
    subtitle: "Glass Transition & Thermal Shaping",
    description:
      "The flat PET strip is threaded into a heated aluminum heater block fitted with a custom brass nozzle. Controlled thermal energy softens the polymer above its glass transition temperature (~70°C–80°C) toward softening point.",
    details: "Temperature is regulated to avoid thermal degradation while permitting plastic deformation.",
    icon: "Thermometer"
  },
  {
    number: "05",
    title: "Extrusion (Pultrusion)",
    subtitle: "Continuous Drawing",
    description:
      "Rather than melting pellets via a screw, the ribbon is pulled (pultruded) through a tapered 1.75mm orifice. The flat ribbon folds circularly upon itself under tension, consolidating into a dense solid-core cylindrical filament.",
    details: "Maintains molecular chain alignment along the pull axis, improving tensile properties.",
    icon: "Minimize2"
  },
  {
    number: "06",
    title: "Cooling and Diameter Control",
    subtitle: "Dimensional Stabilization",
    description:
      "As the reformed strand exits the hot nozzle, ambient air or a small DC cooling blower rapidly quenches the filament below its softening threshold, locking the circular cross-section and preventing deformation.",
    details: "Real-time vernier caliper/micrometer checks verify compliance with 1.75mm nominal diameter.",
    icon: "Wind"
  },
  {
    number: "07",
    title: "Filament Collection",
    subtitle: "Automated Spool Winding",
    description:
      "A geared stepper motor or DC gear motor drives a pulling wheel and rotating take-up spool. A synchronized tensioner ensures steady pulling speed and prevents slack, neatly spooling the finished filament.",
    details: "Uniform pull speed is critical to maintain consistent cross-sectional diameter.",
    icon: "Disc"
  },
  {
    number: "08",
    title: "3D Printing Application",
    subtitle: "Functional Prototyping",
    description:
      "The collected 100% recycled PET filament is loaded into a university FDM 3D printer. With proper nozzle temperatures (typically 250°C–265°C) and heated bed settings, functional parts are fabricated with high layer strength.",
    details: "Produces strong, impact-resistant mechanical brackets, enclosures, and test coupons.",
    icon: "Printer"
  }
];

export const systemComponents = [
  {
    name: "PET Bottle Material",
    role: "Raw Feedstock",
    description: "Post-consumer PET beverage containers sorted by thickness and clarity.",
    specPlaceholder: "Standard 1L–2L beverage bottles (wall thickness ~0.25mm–0.35mm)"
  },
  {
    name: "Cutting Mechanism",
    role: "Ribbon Slitter",
    description: "3D printed or machined guide assembly with high-carbon utility blade and rolling bearings.",
    specPlaceholder: "Calibrated slitting width [Spec Placeholder: e.g., 8.5mm–9.5mm adjustable]"
  },
  {
    name: "Heating Element",
    role: "Thermal Hotend",
    description: "Cartridge heater embedded in an aluminum block coupled with a drill-modified brass nozzle.",
    specPlaceholder: "Heating capacity [Spec Placeholder: e.g., 12V/24V 40W–50W ceramic cartridge]"
  },
  {
    name: "Temperature Sensing",
    role: "Feedback Control",
    description: "High-temperature sensor seated adjacent to the nozzle orifice for accurate surface monitoring.",
    specPlaceholder: "Sensor type [Spec Placeholder: NTC 100K Thermistor / K-type Thermocouple]"
  },
  {
    name: "Extrusion / Pultrusion Die",
    role: "Profile Forming",
    description: "Tapered internal geometry that folds flat plastic ribbon into a solid 1.75mm circular cross section.",
    specPlaceholder: "Internal orifice [Nominal 1.75mm – 1.80mm calibrated outlet]"
  },
  {
    name: "Motor & Drive System",
    role: "Pulling Actuator",
    description: "High-torque geared stepper motor or DC planetary motor providing steady, non-slip pulling tension.",
    specPlaceholder: "Drive actuator [Spec Placeholder: NEMA 17 with planetary gearbox or high-torque DC motor]"
  },
  {
    name: "Cooling Arrangement",
    role: "Thermal Quenching",
    description: "Radial fan or passive convection duct focusing cooling airflow immediately at the nozzle exit.",
    specPlaceholder: "Cooling fan [Spec Placeholder: 12V 4010/5015 blower fan with directed duct]"
  },
  {
    name: "Filament Collection System",
    role: "Spooling Assembly",
    description: "Rotational spool holder with level-wind guide for orderly coil arrangement without tangling.",
    specPlaceholder: "Spooling mechanism [Spec Placeholder: standard 200mm diameter 3D printer spool mount]"
  },
  {
    name: "Control Electronics",
    role: "System Brain",
    description: "Microcontroller board running PID temperature algorithms and PWM speed modulation.",
    specPlaceholder: "Controller [Spec Placeholder: Arduino / ESP32 / 3D printer mainboard with display]"
  }
];

export const sustainabilityData = {
  heading: "Engineering for a Circular Future",
  lead: "Linear manufacturing—take, make, and dispose—is unsustainable. Our Makerspace project embodies the circular economy paradigm by intercepting single-use waste plastic at the source and upcycling it into high-value engineering materials for digital fabrication.",
  pillars: [
    {
      title: "Plastic Recycling",
      desc: "Repurposing non-biodegradable PET containers that would otherwise take up to 450 years to degrade in landfills."
    },
    {
      title: "Mechanical Engineering",
      desc: "Employing mechanics of materials, heat transfer, machine design, and kinematic pulling systems."
    },
    {
      title: "Additive Manufacturing",
      desc: "Creating zero-cost filament feedstocks directly compatible with educational 3D printers."
    },
    {
      title: "Campus Sustainability",
      desc: "Transforming Sanjivani University Makerspace into a model closed-loop fabrication facility."
    }
  ],
  circularFlow: [
    { stage: "01", title: "Waste PET", desc: "Campus beverage bottles collected" },
    { stage: "02", title: "Recycling", desc: "Cleaned, stripped & slit into ribbons" },
    { stage: "03", title: "Filament", desc: "Thermal pultrusion into 1.75mm strand" },
    { stage: "04", title: "3D Printed Object", desc: "Prototypes, gears, project enclosures" },
    { stage: "05", title: "Reuse & Regrind", desc: "Extended lifecycle with zero waste" }
  ]
};

export const outcomesData = {
  heading: "What We Aim to Achieve",
  lead: "The project addresses key technical, environmental, and academic goals within our Makerspace curriculum.",
  outcomes: [
    {
      title: "Reusable PET-Based Filament",
      desc: "Successfully fabricating continuous coils of 1.75mm recycled PET filament suitable for standard 3D printer hotends.",
      icon: "CheckCircle2"
    },
    {
      title: "Practical Understanding of Extrusion",
      desc: "Gaining real-world domain knowledge in polymer rheology, glass transition kinetics, and thermal pultrusion mechanics.",
      icon: "BookOpen"
    },
    {
      title: "Reduction of Plastic Waste",
      desc: "Directly diverting municipal PET beverage containers from university trash cans into tangible mechanical prototypes.",
      icon: "Trash2"
    },
    {
      title: "Low-Cost Experimental Approach",
      desc: "Building a functional recycling workstation using economical hardware, proving sustainable engineering does not require industrial budgets.",
      icon: "Coins"
    },
    {
      title: "Hands-on Learning Experience",
      desc: "Cultivating teamwork across mechanical fabrication, electronics prototyping, PID tuning, and additive manufacturing workflows.",
      icon: "GraduationCap"
    }
  ]
};

/**
 * ==============================================================================
 * 3D MODEL VIEWER CONFIGURATION
 * Allows interactive 3D CAD visualization with custom file drag & drop!
 * ==============================================================================
 */
export const model3DData = {
  heading: "Interactive 3D CAD Model & Assembly",
  subheading: "Inspect our actual SolidWorks project assembly (makerspace_A.SLDASM), heated die, and slitter in 360° interactive 3D.",
  instructions:
    "Rotate (Left Click + Drag), Pan (Right Click + Drag), Zoom (Scroll Wheel). Switch display modes below, upload new SolidWorks .STL / .OBJ / .GLB files, or switch to the Model Images tab to add screenshots!",
  defaultModelPath: "models/pet-extruder-model.stl",
  presets: [
    {
      id: "solidworks-assembly",
      name: "SolidWorks Assembly (makerspace_A)",
      type: "stl",
      description: "Actual Makerspace SolidWorks assembly model (makerspace_A.SLDASM) exported and rendered in full 3D WebGL."
    },
    {
      id: "extruder-assembly",
      name: "Heated Nozzle & Die",
      type: "parametric",
      description: "CAD schematic representation of the brass nozzle, aluminum heating block, cartridge heater, and thermocouple."
    },
    {
      id: "slitter-mechanism",
      name: "Ribbon Slitter Assembly",
      type: "parametric",
      description: "Cutting guide fixture with dual rolling bearings, high-carbon utility razor blade, and bottle height adjuster."
    }
  ]
};

export const workDoneItems = [];

/**
 * ==============================================================================
 * TEAM MEMBERS (VERIFIED 4-MEMBER TEAM FROM OFFICIAL SANJIVANI DOCUMENTATION)
 * ==============================================================================
 */
export const teamMembers = [
  {
    id: "member-1",
    name: "Harshwardhan Shewale",
    role: "AutoCAD Modeling",
    department: "Department of Mechanical Engineering",
    prn: "PRN: 2126UMEM1016",
    contribution:
      "CAD modeling of slitter assembly, AutoCAD engineering drawings, chassis structural fabrication, and mechanical alignment.",
    photo: "images/team/member1.jpg",
    linkedin: "#",
    github: "#"
  },
  {
    id: "member-2",
    name: "Shraddha Chavanke",
    role: "PPT Presentation",
    department: "Department of Mechanical Engineering",
    prn: "PRN: 2126UMEF1073",
    contribution:
      "Thermal mass balance calculations, heater block sizing, thermocouple feedback calibration, and PID controller tuning.",
    photo: "images/team/member2.jpg",
    linkedin: "#",
    github: "#"
  },
  {
    id: "member-3",
    name: "Yugant Pawar",
    role: "Testing & Hardware Work",
    department: "Department of Mechanical Engineering",
    prn: "PRN: 2126UMEM1058",
    contribution:
      "Nozzle orifice profiling, stepper motor reduction gearing, puller roller grip testing, and line tension calibration.",
    photo: "images/team/member3.jpg",
    linkedin: "#",
    github: "#"
  },
  {
    id: "member-4",
    name: "Prem Gangurde",
    role: "Testing & Hardware Work",
    department: "Department of Mechanical Engineering",
    prn: "PRN: 2126UMEM1014",
    contribution:
      "Diameter consistency checks, test specimen 3D printing on FDM printers, tensile evaluation, and report compilation.",
    photo: "images/team/member4.jpg",
    linkedin: "#",
    github: "#"
  }
];

export const technicalHighlights = [
  {
    title: "PET Recycling",
    desc: "Upcycling single-use polyethylene terephthalate bottles with minimal energy compared to industrial resin synthesis.",
    icon: "Recycle"
  },
  {
    title: "Filament Extrusion",
    desc: "Thermal pultrusion method that draws flat strip through a forming nozzle without complex molten screw barrels.",
    icon: "Cog"
  },
  {
    title: "Temperature Control",
    desc: "Closed-loop feedback monitoring maintaining precise nozzle temperatures within the optimal softening envelope.",
    icon: "Gauge"
  },
  {
    title: "Mechanical Design",
    desc: "Compact modular aluminum profile framework ensuring rigidity, adjustable blade depth, and vibration-free pulling.",
    icon: "Compass"
  },
  {
    title: "3D Printing",
    desc: "Direct validation of recycled strands on standard FDM 3D printers, verifying bed adhesion, stringing, and layer fusion.",
    icon: "Layers"
  },
  {
    title: "Sustainable Manufacturing",
    desc: "Demonstration of distributed manufacturing, empowering local makerspaces to produce custom materials on-demand.",
    icon: "ShieldCheck"
  }
];

export const galleryItems = [
  {
    id: "gal-1",
    title: "Initial Prototype Rig",
    category: "Prototype",
    image: "images/gallery/prototype-1.jpg",
    caption: "Early benchtop assembly testing ribbon feed angle into the heated brass die."
  },
  {
    id: "gal-2",
    title: "Slitter & Bearing Assembly",
    category: "Components",
    image: "images/gallery/components-1.jpg",
    caption: "Precision bearing guide and utility razor fixture calibrated for uniform ribbon width."
  },
  {
    id: "gal-3",
    title: "Heater Block & Nozzle Assembly",
    category: "Components",
    image: "images/gallery/components-2.jpg",
    caption: "Modified brass nozzle drilled to 1.75mm with cartridge heater and thermistor sensor."
  },
  {
    id: "gal-4",
    title: "Chassis Fabrication",
    category: "Fabrication",
    image: "images/gallery/fabrication-1.jpg",
    caption: "Assembly of 2020 aluminum V-slot extrusions and custom 3D printed brackets in Makerspace."
  },
  {
    id: "gal-5",
    title: "Filament Extrusion Testing",
    category: "Testing",
    image: "images/gallery/testing-1.jpg",
    caption: "Real-time pulling test verifying steady drawing speed and continuous strand formation."
  },
  {
    id: "gal-6",
    title: "Test 3D Print Verification",
    category: "Testing",
    image: "images/gallery/testing-2.jpg",
    caption: "Test calibration cube 3D printed using the custom recycled PET filament."
  },
  {
    id: "gal-7",
    title: "Complete Makerspace Workstation",
    category: "Final Setup",
    image: "images/gallery/final-setup-1.jpg",
    caption: "Integrated experimental setup with slitter, hotend, puller, and electronics."
  }
];

export const futureScope = [
  {
    title: "Improved Filament Diameter Consistency",
    description: "Integrating inline dual-axis optical laser diameter sensors with closed-loop PID puller speed modulation."
  },
  {
    title: "Better Temperature Control",
    description: "Multi-zone thermal heating with pre-heat chamber and adaptive PID temperature tuning for various bottle brands."
  },
  {
    title: "Automated Filament Winding",
    description: "Motorized traverse lead screw mechanism to automatically distribute filament uniformly across standard 1kg spools."
  },
  {
    title: "Improved Extrusion Mechanism",
    description: "Refining nozzle interior geometry, internal chamfer angles, and low-friction coatings for smoother ribbon folding."
  },
  {
    title: "Quality Testing of Produced Filament",
    description: "Conducting standardized tensile tests (ASTM D638), cross-sectional microscopy, and DSC thermal crystallinity analysis."
  },
  {
    title: "Development of Larger-Scale Recycling Systems",
    description: "Scaling system capacity to process shredded PET flakes or multiple bottles concurrently for higher throughput."
  },
  {
    title: "Integration with Different 3D Printing Applications",
    description: "Benchmarking recycled PET print profiles (retraction, bridging, flow multiplier) across diverse open-source printers."
  }
];

export const conclusionData = {
  quoteHeading: "Small Waste. Big Possibility.",
  text: "Our Makerspace project demonstrates that discarded post-consumer PET bottles need not be viewed as environmental burdens, but as accessible, high-performance feedstocks for digital manufacturing. By harmonizing sustainability, mechanical design, thermal control, and hands-on makerspace innovation, this project provides a stepping stone toward localized, zero-waste engineering ecosystems.",
  finalCta: "Explore. Build. Recycle. Innovate."
};
