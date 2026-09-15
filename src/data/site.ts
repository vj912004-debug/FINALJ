export const company = {
  name: "Jagdamba Procut Pvt. Ltd.",
  shortName: "JP",
  legalName: "Jagdamba Procut Pvt. Ltd.",
  tagline: "Precision in Steel. Strength in Every Cut.",
  subTagline: "Steel Stockist • Processor • Profile Cutting Specialist",
  serviceLine:
    "Steel Plates | CNC Profile Cutting | Laser Cutting | CNC Drilling | Ultrasonic Testing | Complete Steel Processing Solutions",
  heroTagline: "Your Complete Steel Solution Partner",
  trustBadge: "Complete Steel Solution Under One Roof",
  businessNature:
    "Steel stockholding, processing and supply — Vadodara, Gujarat",
  since: 2001,
  certification: "To be updated",
  gst: "To be updated",
  cin: "To be updated",
  msme: "To be updated",
  iso: "To be updated",
  address: "504/1A GIDC Makarpura, Vadodara, Gujarat 390010",
  location: "Vadodara, Gujarat, India",
  email: "jagdambaprofile@gmail.com",
  whatsappNumber: "9824917250",
  officePhones: ["8799617250", "9824917250"],
  inquiryPhone: "9824917250",
  accountsPhones: ["8799617250"],
  landLine: "9099969507",
  telefax: "+91-265-2649938 / 2649939 / 9099969507",
  contacts: [
    {
      name: "Mukesh Patel",
      role: "Director",
      phones: ["9824917250", "8799617250"],
    },
  ],
  officeHours: "Mon – Sat: 9:00 AM – 6:00 PM",
  focus:
    "Right Material + Accurate Processing + Testing + Traceability + Safe Handling + Reliable Delivery",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Services" },
  { href: "/machinery", label: "Machinery" },
  { href: "/grades", label: "Grades" },
  { href: "/facilities", label: "Infrastructure" },
  { href: "/quality", label: "Quality & UT" },
  { href: "/industries", label: "Industries" },
  { href: "/gallery", label: "Gallery" },
  { href: "/download", label: "Download" },
  { href: "/stock-enquiry", label: "Stock Enquiry" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/contact", label: "Contact Us" },
] as const;

/** Local file preferred: public/videos/factory-hero.mp4 — fallback plays until you add yours */
export const heroMedia = {
  localSrc: "/videos/factory-hero.mp4",
  localWebm: "/videos/factory-hero.webm",
  poster: "/images/plant/factory-exterior.png",
  /** CC0 demo industrial footage (browser-loaded). Replace when local MP4 is added. */
  fallbackSrc:
    "https://cdn.coverr.co/videos/coverr-a-welder-works-on-a-metal-structure-5567/1080p.mp4",
  fallbackSrcAlt:
    "https://cdn.coverr.co/videos/coverr-welding-sparks-flying-5566/1080p.mp4",
} as const;

/** AI plant imagery — replace with real factory photos when available */
export const plantImages = {
  factory: "/images/plant/factory-exterior.png",
  shed: "/images/plant/shed-interior.png",
  yard: "/images/plant/open-yard.png",
  plates: "/images/plant/steel-plates.png",
  laser: "/images/plant/laser-cutting.png",
  cnc: "/images/plant/cnc-profile.png",
  drilling: "/images/plant/cnc-drilling.png",
  oxy: "/images/plant/oxy-fuel-cutting.png",
  crane: "/images/plant/overhead-crane.png",
  dispatch: "/images/plant/loading-dispatch.png",
  components: "/images/plant/finished-components.png",
  ut: "/images/plant/ut-testing.png",
} as const;

export const homeCarouselImages = [
  { src: plantImages.shed, alt: "Covered processing shed" },
  { src: plantImages.laser, alt: "12 kW laser cutting" },
  { src: plantImages.yard, alt: "Open plate storage yard" },
  { src: plantImages.crane, alt: "20-ton overhead cranes" },
  { src: plantImages.plates, alt: "Steel plate stock" },
  { src: plantImages.dispatch, alt: "Loading and dispatch" },
] as const;

export const homeMediaSlots = [
  {
    title: "Covered Shed & CNC Bay",
    hint: "Factory walkthrough",
    src: plantImages.shed,
  },
  {
    title: "12 kW Laser Line",
    hint: "Cutting in action",
    src: plantImages.laser,
  },
  {
    title: "Open Plate Yard",
    hint: "Stock & crane handling",
    src: plantImages.yard,
  },
  {
    title: "Loading / Dispatch",
    hint: "Hydra & trailer loading",
    src: plantImages.dispatch,
  },
] as const;

export const homeCtas = [
  { label: "Get a Quote", href: "/quote", external: false },
  {
    label: "Check Material Availability",
    href: "/stock-enquiry",
    external: false,
  },
  {
    label: "Send Requirement on WhatsApp",
    href: `https://wa.me/91${"9824917250"}?text=${encodeURIComponent("Hello Jagdamba Procut, I want to send a steel requirement.")}`,
    external: true,
  },
  { label: "Upload Drawing", href: "/quote#upload", external: false },
  { label: "Contact Sales Team", href: "/contact#team", external: false },
] as const;

export const coreValues = [
  "Precision",
  "People",
  "Partnership",
  "Progress",
] as const;

export const stats = [
  {
    value: "26,000",
    label: "Covered Processing Shed",
    numeric: 26000,
    prefix: "",
    suffix: "",
    icon: "factory" as const,
  },
  {
    value: "75,000",
    label: "Steel Plate Storage Yard",
    numeric: 75000,
    prefix: "",
    suffix: "",
    icon: "layers" as const,
  },
  {
    value: "4 × 20 Ton",
    label: "Overhead Cranes",
    numeric: 4,
    prefix: "",
    suffix: " × 20 Ton",
    icon: "ruler" as const,
  },
  {
    value: "12 kW",
    label: "Laser Cutting Machine",
    numeric: 12,
    prefix: "",
    suffix: " kW",
    icon: "laser" as const,
  },
] as const;

export const strengthExtras = [
  "CNC Profile Cutting",
  "CNC Drilling",
  "Ultrasonic Testing",
  "Hydra Loading & Unloading",
  "Ultrasonic Thickness Measurement",
  "Transport Facility",
] as const;

export const aboutOverview = {
  heading: "About Us",
  subheading: "Your Complete Steel Solution Partner",
  intro:
    "Jagdamba Procut Pvt. Ltd. is a professionally managed steel stockholding, processing and supply company based in Vadodara, Gujarat.",
  paragraphs: [
    "We provide steel plate supply, CNC profile cutting, laser cutting, CNC drilling, ultrasonic testing, material inspection, heavy material handling and transportation services under one roof.",
    "Jagdamba Procut Pvt. Ltd. specializes in the supply and processing of carbon steel plates, structural steel plates, boiler & pressure vessel plates, high strength steel plates, alloy steel plates, wear resistant plates, special grade steel plates and imported steel plates.",
  ],
  specializations: [
    "Carbon Steel Plates",
    "Structural Steel Plates",
    "Boiler & Pressure Vessel Plates",
    "High Strength Steel Plates",
    "Alloy Steel Plates",
    "Wear Resistant Plates",
    "Special Grade Steel Plates",
    "Imported Steel Plates",
  ],
} as const;

export const coreBusiness = [
  "Steel Plate Stock & Supply",
  "CNC Profile Cutting",
  "12 kW Laser Cutting",
  "CNC Drilling",
  "Heavy Plate / Oxy-Fuel Cutting",
  "Ultrasonic Testing (UT)",
  "Ultrasonic Thickness Measurement",
  "Heavy Crane & Hydra Handling",
  "Transport & Delivery",
] as const;

export const processTagline =
  "From Steel Plate to Finished Profile – Everything Under One Roof.";

export const processFlow = [
  "Steel Plate Stock",
  "CNC Profile Cutting",
  "12 kW Laser Cutting",
  "CNC Drilling",
  "Ultrasonic Testing",
  "Quality Inspection",
  "Heavy Crane & Hydra Handling",
  "Customer Delivery",
] as const;

export const completeSolutionServices = [
  "Steel Plate Supply",
  "CNC Profile Cutting",
  "12 kW Laser Cutting",
  "CNC Drilling",
  "Heavy Plate / Oxy-Fuel Cutting",
  "Ultrasonic Testing (UT)",
  "Ultrasonic Thickness Measurement",
  "Quality Inspection & Traceability",
  "Heavy Crane & Hydra Handling",
  "Loading & Unloading",
  "Transport Facility",
  "Customer Delivery",
] as const;

export const indianMills = [
  "Jindal Steel",
  "SAIL",
  "JSW Steel",
  "Tata Steel",
  "AM/NS India – ArcelorMittal Nippon Steel",
] as const;

export const importedMaterialNote =
  "China-origin / imported steel plates are also available in various grades, thicknesses and sizes, subject to stock availability. Material can be supplied with applicable Mill Test Certificates and traceability documents.";

export const mills = [
  { id: "jindal", name: "Jindal Steel", logo: "/mills/jindal.svg" },
  { id: "sail", name: "SAIL", logo: "/mills/sail.svg" },
  { id: "jsw", name: "JSW Steel", logo: "/mills/jsw.svg" },
  { id: "tata", name: "Tata Steel", logo: "/mills/tata.svg" },
  { id: "amns", name: "AM/NS India", logo: "/mills/amns.svg" },
  { id: "posco", name: "POSCO", logo: "/mills/posco.svg" },
  { id: "essar", name: "ESSAR Steel", logo: "/mills/essar.svg" },
  { id: "ssab", name: "SSAB", logo: "/mills/ssab.svg" },
  { id: "uttam", name: "Uttam", logo: "/mills/uttam.svg" },
  { id: "nisco", name: "NISCO", logo: "/mills/nisco.svg" },
] as const;

export const infrastructure = {
  heading: "Our Infrastructure",
  subheading: "Large-Scale Steel Stocking & Processing Facility",
  body: "Our Vadodara facility is purpose-built for storing, handling and processing heavy steel plates — from stockyard to finished profile under one roof.",
  slogan: "Built for Today. Ready for Tomorrow.",
  coveredShed: {
    title: "26,000 Sq. Ft. Covered Processing Shed",
    body: "Approximately 26,000 sq. ft. of covered industrial shed dedicated to steel processing — CNC profile cutting, 12 kW laser cutting, CNC drilling, material handling, production, inspection and finished-material staging.",
    uses: [
      "Steel Processing",
      "CNC Profile Cutting",
      "12 kW Laser Cutting",
      "CNC Drilling",
      "Material Handling",
      "Production Activities",
      "Inspection",
      "Finished Material Storage",
    ],
  },
  openYard: {
    title: "75,000 Sq. Ft. Steel Plate Storage Yard",
    body: "Approximately 75,000 sq. ft. of dedicated open yard for steel plate storage — maintaining substantial stock across grades, thicknesses, widths, lengths, makes and heat numbers for large-volume requirements and faster availability.",
    stockedBy: [
      "Grades",
      "Thicknesses",
      "Widths",
      "Lengths",
      "Makes",
      "Heat Numbers",
    ],
  },
  cranes: {
    title: "4 × 20-Ton Overhead Cranes",
    body: "Four heavy-duty overhead cranes, each with 20-ton lifting capacity, for safe handling of heavy, large and thick plates, profile-cut components, and loading & unloading.",
    handles: [
      "Heavy Steel Plates",
      "Large Size Plates",
      "Thick Plates",
      "Profile-Cut Components",
      "Heavy Engineering Components",
      "Material Loading & Unloading",
    ],
  },
  hydra: {
    title: "Hydra Loading & Unloading Facility",
    body: "Hydra equipment supports efficient heavy-plate loading, unloading and yard movement across the open stockyard and trailer bays.",
    uses: [
      "Plate Loading",
      "Plate Unloading",
      "Yard Material Movement",
      "Trailer Loading",
      "Vehicle Unloading",
      "Heavy Component Handling",
    ],
  },
  items: [
    { label: "Covered Processing Shed", value: "Approx. 26,000 Sq. Ft." },
    { label: "Steel Plate Storage Yard", value: "Approx. 75,000 Sq. Ft." },
    { label: "Overhead Cranes", value: "4 Nos. × 20 Ton Each" },
    { label: "Laser Cutting", value: "12 kW High-Power System" },
    { label: "Laser / CNC Bed Size", value: "Up to approx. 3000 × 12000 mm" },
    { label: "CNC Drilling", value: "Hole diameters up to approx. 60 mm" },
    { label: "Hydra Facility", value: "Heavy Plate Loading & Unloading" },
    { label: "UT Testing", value: "ASTM A578 / EN 10160 levels" },
  ],
  values: [
    { title: "Large Stocking Capacity", detail: "75,000 sq. ft. plate yard" },
    { title: "Strong Infrastructure", detail: "26,000 sq. ft. covered shed" },
    { title: "Heavy Material Handling", detail: "4×20T cranes + Hydra" },
    { title: "Advanced Processing", detail: "CNC, 12 kW laser, drilling" },
  ],
  glance: [
    { value: "26,000 Sq. Ft.", label: "Covered Processing Shed" },
    { value: "75,000 Sq. Ft.", label: "Steel Plate Storage Yard" },
    { value: "4 × 20 Ton", label: "Heavy-Duty Overhead Cranes" },
    { value: "12 kW", label: "High-Power Laser Cutting" },
    { value: "Hydra Facility", label: "Heavy Plate Loading & Unloading" },
    { value: "CNC Profile Cutting", label: "Heavy Plate Processing" },
    { value: "CNC Drilling", label: "Precision Drilling up to ~60 mm" },
    { value: "Ultrasonic Testing", label: "Multiple UT Levels Available" },
    {
      value: "Ultrasonic Thickness Meter",
      label: "Accurate Thickness Verification",
    },
  ],
} as const;

export const facilities = {
  heading: "Our Facilities",
  body: "Jagdamba Procut Pvt. Ltd. operates a large-scale steel stocking and processing facility in Vadodara with covered shed processing, open plate yard storage, overhead cranes, Hydra handling, CNC profile cutting, 12 kW laser cutting, CNC drilling, oxy-fuel heavy plate cutting, ultrasonic testing and thickness verification — under one roof.",
  bullets: [
    "26,000 Sq. Ft. covered processing shed",
    "75,000 Sq. Ft. steel plate storage yard",
    "4 × 20-Ton overhead cranes",
    "Hydra loading & unloading facility",
    "CNC profile cutting, 12 kW laser & CNC drilling",
    "UT testing & ultrasonic thickness measurement",
  ],
} as const;

export type Service = {
  id: string;
  title: string;
  summary: string;
  capacity: string;
  details: string[];
  materials?: string[];
  icon: "flame" | "zap" | "wrench" | "laser" | "drill" | "ut";
  image: string;
};

export const services: Service[] = [
  {
    id: "cnc-profile",
    title: "CNC Profile Cutting",
    summary:
      "Multiple CNC profile-cutting machines for precision processing of steel plates — circles, rings, flanges, base plates, machine and structural components, customized profiles, heavy engineering parts and batch production.",
    capacity: "Bed size up to approx. 3000 × 12000 mm",
    details: [
      "Circles, rings & flanges",
      "Base plates & machine components",
      "Structural & customized profiles",
      "Heavy engineering parts & batch production",
      "Drawing / DXF based nesting support",
    ],
    icon: "flame",
    image: plantImages.cnc,
  },
  {
    id: "laser",
    title: "12 kW Laser Cutting",
    summary:
      "High-power 12 kW laser cutting for high accuracy, fast production, excellent edge finish, reduced wastage and customized profile cutting on large plates.",
    capacity: "Processing up to approx. 3000 × 12000 mm",
    details: [
      "High cutting accuracy & fast production",
      "Excellent edge finish",
      "Reduced material wastage",
      "Customized profile cutting",
      "Large-format bed for long plates",
    ],
    icon: "laser",
    image: plantImages.laser,
  },
  {
    id: "cnc-drilling",
    title: "CNC Drilling",
    summary:
      "Precision CNC drilling for steel plates and engineering components — multiple hole patterns, accurate positioning and heavy plate drilling.",
    capacity: "Hole diameters up to approx. 60 mm",
    details: [
      "CNC plate drilling",
      "Multiple hole patterns",
      "Accurate hole positioning",
      "Heavy plate & engineering components",
      "Hole diameters up to approx. 60 mm",
    ],
    icon: "drill",
    image: plantImages.drilling,
  },
  {
    id: "heavy-plate",
    title: "Heavy Plate / Oxy-Fuel Cutting",
    summary:
      "Oxy-fuel cutting for heavy-thickness steel plates — forging blanks, heavy base plates, large circles, rings, flanges and machine components.",
    capacity: "Heavy-thickness plate cutting",
    details: [
      "Heavy engineering components",
      "Forging blanks & heavy base plates",
      "Large circles, rings & flanges",
      "Machine components",
      "Thick-plate oxy-fuel capability",
    ],
    icon: "wrench",
    image: plantImages.oxy,
  },
  {
    id: "ut-testing",
    title: "Ultrasonic Testing (UT)",
    summary:
      "Material quality you can verify — UT available depending on grade, thickness, customer specification and applicable standard (ASTM A578 / A578M and EN 10160).",
    capacity: "ASTM A578 & EN 10160",
    details: [
      "ASTM A578 Levels A, B, C",
      "EN 10160 body classes S0–S3",
      "EN 10160 edge classes E0–E4",
      "Common reqs: S1/E1, S2/E2, S2/E3 & combinations",
    ],
    icon: "ut",
    image: plantImages.ut,
  },
  {
    id: "thickness",
    title: "Ultrasonic Thickness Measurement",
    summary:
      "Ultrasonic Thickness Meter for accurate checking and verification of actual steel plate thickness during inward, stock, customer and dispatch inspection.",
    capacity: "Thickness verification",
    details: [
      "Material inward & stock inspection",
      "Customer & quality checking",
      "Dispatch inspection",
      "Special grade verification",
    ],
    icon: "zap",
    image: plantImages.ut,
  },
];

export const machinery = [
  {
    id: "cnc-profile",
    title: "CNC Profile Cutting Machines",
    summary:
      "CNC profile cutting for precision steel plate processing — circles, rings, flanges, base plates, structural profiles and heavy engineering components.",
    bedSize: "Approx. 3000 × 12000 mm",
    capacity: "Multi-machine CNC profile cutting",
    image: plantImages.cnc,
    details: [
      "Bed size up to approx. 3000 mm × 12000 mm",
      "Circles, rings, flanges and base plates",
      "Customized profiles from drawings / DXF",
      "Batch production for OEM and project work",
    ],
  },
  {
    id: "laser-12kw",
    title: "12 kW Laser Cutting Machine",
    summary:
      "High-power 12 kW laser for accurate, fast cutting with excellent edge quality on large-format plates.",
    bedSize: "Approx. 3000 × 12000 mm",
    capacity: "12 kW high-power laser",
    image: plantImages.laser,
    details: [
      "Bed size up to approx. 3000 mm × 12000 mm",
      "High accuracy and speed",
      "Excellent edge finish",
      "Reduced wastage on nested jobs",
    ],
  },
  {
    id: "cnc-drilling",
    title: "CNC Drilling Machine",
    summary:
      "CNC drilling for precise hole patterns on steel plates and engineered components.",
    bedSize: "Aligned with plate processing lines",
    capacity: "Holes up to approx. 60 mm diameter",
    image: plantImages.drilling,
    details: [
      "Hole diameters up to approx. 60 mm",
      "Accurate multi-hole patterns",
      "Heavy plate drilling capability",
      "Engineering component drilling",
    ],
  },
  {
    id: "oxy-fuel",
    title: "Oxy-Fuel / Heavy Plate Cutting",
    summary:
      "Oxy-fuel cutting for heavy-thickness plates used in forging blanks, large rings, flanges and heavy base plates.",
    bedSize: "Heavy plate processing beds",
    capacity: "Heavy-thickness oxy-fuel cutting",
    image: plantImages.oxy,
    details: [
      "Thick plate cutting",
      "Large circles, rings and flanges",
      "Forging blanks and heavy base plates",
      "Machine and structural components",
    ],
  },
] as const;

export const utTesting = {
  heading: "Ultrasonic Testing (UT)",
  subheading: "Material Quality You Can Verify",
  body: "UT is available depending on grade, thickness, customer specification and the applicable standard. We support commonly requested ASTM and EN acceptance levels for steel plates.",
  astm: {
    standard: "ASTM A578 / A578M",
    levels: ["Level A", "Level B", "Level C"],
  },
  en: {
    standard: "EN 10160",
    bodyClasses: ["S0", "S1", "S2", "S3"],
    edgeClasses: ["E0", "E1", "E2", "E3", "E4"],
  },
  commonReqs: [
    "S1 / E1",
    "S2 / E2",
    "S2 / E3",
    "Other body/edge class combinations as specified",
  ],
  notes: [
    "UT level depends on grade, thickness and purchase specification",
    "Mill / third-party UT reports can be coordinated as required",
    "Suitable for boiler, pressure vessel and critical engineering plates",
  ],
} as const;

export const thicknessMeter = {
  heading: "Ultrasonic Thickness Measurement",
  subheading: "Accurate Thickness Verification",
  body: "An Ultrasonic Thickness Meter is used to check and verify actual steel plate thickness at key inspection stages.",
  uses: [
    "Material inward inspection",
    "Stock inspection",
    "Customer / quality checking",
    "Dispatch inspection",
    "Special grade verification",
  ],
  benefits: [
    "Confirms actual thickness vs. ordered requirement",
    "Supports quality and traceability records",
    "Useful for critical and special-grade plates",
  ],
} as const;

export const qualityTraceability = [
  "Grade Verification",
  "Thickness Verification",
  "Ultrasonic Thickness Measurement",
  "Heat Number Verification",
  "Plate Number Verification",
  "Dimensional Inspection",
  "Cutting Accuracy Inspection",
  "UT Verification",
  "Mill Test Certificate Verification",
  "NABL Testing Coordination",
  "Third-Party Inspection Support",
] as const;

export const traceabilityDocuments = [
  "Mill Test Certificate (MTC / TC)",
  "Heat Number / Plate Number records",
  "UT reports (as applicable)",
  "Dimensional / cutting inspection records",
  "Thickness verification records",
  "Third-party / customer inspection reports (as arranged)",
] as const;

export const gradeCategories = [
  {
    id: "structural",
    name: "Structural & Carbon Steel",
    grades: [
      "IS 2062 E250",
      "IS 2062 E350",
      "E350BR",
      "E350C",
      "E450BR",
      "S355JR",
      "S355J2",
      "S355J2+N",
      "S355NL",
      "S460N",
      "ST52-3",
    ],
  },
  {
    id: "boiler",
    name: "Boiler & Pressure Vessel Steel",
    grades: [
      "SA516 Grade 60",
      "SA516 Grade 65",
      "SA516 Grade 70",
      "P355NL",
      "P355NL1",
      "ASTM A537 Class 1",
      "ASTM A537 Class 2",
      "ASTM A387 Grade 22 Class 2",
    ],
  },
  {
    id: "alloy",
    name: "Alloy & Engineering Steel",
    grades: [
      "C45",
      "EN19",
      "42CrMo4",
      "34CrNiMo6",
      "ASTM A517 Grade F",
      "1045",
    ],
  },
  {
    id: "wear",
    name: "High Strength & Wear Resistant Steel",
    grades: [
      "Domex 460",
      "Domex 550",
      "Hardox 400",
      "Hardox 500",
      "Rockstar 400",
      "Rockstar 500",
      "NM400",
      "NM500",
      "690QL",
    ],
  },
] as const;

/** AI plate photos by category — rotated across grades for unique cards */
export const gradeCategoryImages = {
  structural: [
    "/images/grades/grade-structural-a.png",
    "/images/grades/grade-structural-b.png",
    "/images/grades/grade-structural-c.png",
  ],
  boiler: [
    "/images/grades/grade-boiler-a.png",
    "/images/grades/grade-boiler-b.png",
    "/images/grades/grade-boiler-c.png",
  ],
  alloy: [
    "/images/grades/grade-alloy-a.png",
    "/images/grades/grade-alloy-b.png",
    "/images/grades/grade-alloy-c.png",
  ],
  wear: [
    "/images/grades/grade-wear-a.png",
    "/images/grades/grade-wear-b.png",
    "/images/grades/grade-wear-c.png",
  ],
} as const;

export type GradeCategoryId = keyof typeof gradeCategoryImages;

export function gradeCategoryId(grade: string): GradeCategoryId {
  const found = gradeCategories.find((c) =>
    (c.grades as readonly string[]).includes(grade),
  );
  return (found?.id ?? "structural") as GradeCategoryId;
}

export function gradeImageFor(grade: string, index = 0): string {
  const cat = gradeCategoryId(grade);
  const pool = gradeCategoryImages[cat];
  return pool[index % pool.length];
}

/** Flat list with image + category for the grades photo grid */
export const gradesWithMedia = gradeCategories.flatMap((cat) =>
  cat.grades.map((grade, i) => ({
    grade,
    categoryId: cat.id as GradeCategoryId,
    categoryName: cat.name,
    image: gradeCategoryImages[cat.id as GradeCategoryId][i % 3],
  })),
);

export const products = gradeCategories.map((cat) => ({
  id: cat.id,
  name: cat.name,
  grades: [...cat.grades],
  applications: "Industrial supply & processing",
  description: `Supply and processing of ${cat.name.toLowerCase()} grades. Special and equivalent grades can also be supplied subject to availability.`,
}));

export const supportedGrades = gradeCategories.flatMap((c) => c.grades);

export const materialGradesList = supportedGrades;

export const readyStockAdvantage = [
  "Leading Indian mills: Jindal, SAIL, JSW, Tata Steel, AM/NS India",
  "Imported / China-origin plates subject to availability",
  "Mill Test Certificates & traceability documents",
  "UT & ultrasonic thickness verification available",
  "Special and equivalent grades subject to availability",
] as const;

export const transport = {
  heading: "Transport & Logistics",
  subheading: "From Our Stockyard to Your Factory",
  badge: "On Time. Every Time.",
  body: "We have transportation arrangements suitable for different material sizes and quantities.",
  dispatchStrength: [
    "Heavy-Duty Trailers",
    "Plate Transport Trailers",
    "Tempo",
    "Pickup Vehicles",
    "Local Delivery Vehicles",
  ],
  features: [
    { title: "Material Supply", detail: "Stock to order" },
    { title: "Processing", detail: "CNC · Laser · Drilling" },
    { title: "Testing & Inspection", detail: "UT & QC" },
    { title: "Loading", detail: "Crane & Hydra" },
    { title: "Delivery", detail: "Transport support" },
  ],
  logisticsChain:
    "Material Supply → Processing → Testing → Inspection → Loading → Transportation → Delivery",
} as const;

export const whyCustomersChooseUs = [
  "Large Stocking Capacity — dedicated 75,000 sq. ft. steel plate storage yard",
  "Strong Infrastructure — 26,000 sq. ft. covered processing facility",
  "Heavy Material Handling — four 20-ton overhead cranes plus Hydra facility",
  "Leading Steel Makes — Jindal, SAIL, JSW, Tata Steel and AM/NS India",
  "Imported Material — China-origin and other imported material subject to availability",
  "Advanced Processing — CNC profile cutting, 12 kW laser cutting and CNC drilling",
  "Quality Verification — UT facilities and Ultrasonic Thickness Meter",
  "Complete Logistics — trailers, tempos, pickups and delivery support",
  "End-to-end solution — from steel plate supply to customer delivery under one roof",
] as const;

export const whyUs = whyCustomersChooseUs;

export const rfqFields = [
  "Grade",
  "Thickness",
  "Width",
  "Length",
  "Quantity",
  "Drawing",
  "DXF File",
  "PDF Drawing",
  "Required Make",
  "Required UT Level",
  "Delivery Location",
] as const;

export const vendorRegistration = [
  "Please add JAGDAMBA PROCUT PVT. LTD. to your approved / prospective vendor database.",
  "We are ready to submit company profile, GST / PAN details, infrastructure details, quality documents, and material test certificates for vendor approval.",
  "Send us your RFQs, steel plate requirements, drawings, or DXF files for our best quotation.",
] as const;

export const bankDetails = {
  accountName: "JAGDAMBA PROFILE",
  bankName: "ICICI BANK LTD",
  accountNumber: "431205000780",
  ifsc: "ICIC0004312",
  accountType: "CURRENT ACCOUNT",
  branch: "Makarpura, Vadodara",
  branchAddress:
    "Shop No 165 to 168, 1st Floor, SunPlaza, Makarpura, Vadodara, Gujarat-390011",
  slogan: "Trusted Banking for a Stronger Tomorrow.",
  secureSlogan: "Secure Transactions Enable Growth.",
  notice:
    "This bank page is intended for vendor registration and payment setup. Please use bank details only after verification with Jagdamba Procut Pvt. Ltd.",
  watermark: "FOR VENDOR REGISTRATION ONLY",
} as const;

export const industriesDetailed = [
  { title: "Heavy Engineering", icon: "gear" as const },
  { title: "Oil & Gas Equipment", icon: "oil" as const },
  { title: "Pressure Vessel Manufacturing", icon: "tank" as const },
  { title: "Boiler Manufacturing", icon: "tank" as const },
  { title: "Power Generation", icon: "plant" as const },
  { title: "Hydro Power", icon: "plant" as const },
  { title: "Machine Manufacturing", icon: "oem" as const },
  { title: "Infrastructure", icon: "building" as const },
  { title: "Structural Fabrication", icon: "building" as const },
  { title: "Forging Industry", icon: "gear" as const },
  { title: "Mining Equipment", icon: "mining" as const },
  { title: "Cement Industry", icon: "mining" as const },
  { title: "Material Handling Equipment", icon: "crane" as const },
  { title: "Earthmoving Equipment", icon: "oem" as const },
  { title: "Renewable Energy", icon: "plant" as const },
  { title: "Industrial Equipment", icon: "gear" as const },
  { title: "General Engineering", icon: "oem" as const },
] as const;

export const industriesServed = industriesDetailed.map((i) => i.title);

export const commonApplications = [
  "Base plates and connection plates",
  "Machine parts and customized components",
  "Gussets, brackets and fabricated profiles",
  "Flanges, rings and profile-cut shapes",
  "Wear parts and liner components",
  "Pressure vessel parts and structural plates",
  "Laser-cut precision parts",
  "Drawing / DXF based custom jobs",
] as const;

export const industriesWhyChoose = whyCustomersChooseUs;

export const galleryCategories = [
  { id: "factory", title: "Factory", image: plantImages.factory },
  { id: "covered-shed", title: "Covered Shed", image: plantImages.shed },
  { id: "open-yard", title: "Open Yard", image: plantImages.yard },
  { id: "steel-plate-stock", title: "Steel Plate Stock", image: plantImages.plates },
  { id: "cnc-machines", title: "CNC Machines", image: plantImages.cnc },
  { id: "laser-machine", title: "Laser Machine", image: plantImages.laser },
  { id: "cnc-drilling", title: "CNC Drilling", image: plantImages.drilling },
  { id: "heavy-plate-cutting", title: "Heavy Plate Cutting", image: plantImages.oxy },
  { id: "20-ton-cranes", title: "20 Ton Cranes", image: plantImages.crane },
  { id: "hydra", title: "Hydra", image: plantImages.dispatch },
  { id: "loading", title: "Loading", image: plantImages.dispatch },
  { id: "unloading", title: "Unloading", image: plantImages.crane },
  { id: "trailers", title: "Trailers", image: plantImages.dispatch },
  { id: "finished-components", title: "Finished Components", image: plantImages.components },
  { id: "rings", title: "Rings", image: plantImages.components },
  { id: "circles", title: "Circles", image: plantImages.components },
  { id: "flanges", title: "Flanges", image: plantImages.components },
  { id: "large-profiles", title: "Large Profiles", image: plantImages.cnc },
  { id: "dispatch", title: "Dispatch", image: plantImages.dispatch },
] as const;

export const downloads = [
  {
    id: "company-profile",
    title: "Company Profile",
    file: "/downloads/company-profile.pdf" as string | null,
  },
  {
    id: "product-brochure",
    title: "Product Brochure",
    file: "/downloads/product-brochure.pdf" as string | null,
  },
  {
    id: "iso-certificate",
    title: "ISO Certificate",
    file: null as string | null,
  },
  {
    id: "msme-udyam",
    title: "MSME/UDYAM",
    file: null as string | null,
  },
  {
    id: "gst-certificate",
    title: "GST Certificate",
    file: null as string | null,
  },
  {
    id: "other",
    title: "Other",
    file: null as string | null,
  },
] as const;

export const seoPages = [
  {
    slug: "cnc-profile-cutting-vadodara",
    title: "CNC Profile Cutting in Vadodara | Jagdamba Procut",
    h1: "CNC Profile Cutting Vadodara",
    description:
      "CNC profile cutting for steel plates in Vadodara — circles, rings, flanges, base plates and customized profiles. Bed size up to approx. 3000 × 12000 mm.",
    keywords: [
      "cnc profile cutting vadodara",
      "profile cutting gujarat",
      "steel profile cutting",
    ],
  },
  {
    slug: "steel-plate-supplier-vadodara",
    title: "Steel Plate Supplier in Vadodara | Jagdamba Procut",
    h1: "Steel Plate Supplier Vadodara",
    description:
      "Steel plate stockist and supplier in Vadodara with 75,000 sq. ft. storage yard, leading Indian mills and imported material subject to availability.",
    keywords: [
      "steel plate supplier vadodara",
      "steel stockist gujarat",
      "carbon steel plates",
    ],
  },
  {
    slug: "laser-cutting-vadodara",
    title: "12 kW Laser Cutting in Vadodara | Jagdamba Procut",
    h1: "Laser Cutting Vadodara",
    description:
      "High-power 12 kW laser cutting in Vadodara for accurate, fast steel plate cutting with excellent edge finish on large-format beds.",
    keywords: [
      "laser cutting vadodara",
      "12 kw laser cutting",
      "steel laser cutting gujarat",
    ],
  },
  {
    slug: "sa516-grade-70",
    title: "SA516 Grade 70 Plates | Boiler Quality Steel | Jagdamba Procut",
    h1: "SA516 Grade 70 Steel Plates",
    description:
      "SA516 Grade 70 boiler and pressure vessel plates with supply, CNC cutting, UT and thickness verification from Vadodara.",
    keywords: [
      "sa516 grade 70",
      "boiler quality plates",
      "pressure vessel steel plates",
    ],
  },
  {
    slug: "sa516-grade-60",
    title: "SA516 Grade 60 Plates | Jagdamba Procut Vadodara",
    h1: "SA516 Grade 60 Steel Plates",
    description:
      "SA516 Grade 60 plates for boiler and pressure vessel applications — stock, processing and testing support in Vadodara.",
    keywords: ["sa516 grade 60", "sa516 plates", "bq plates vadodara"],
  },
  {
    slug: "cnc-drilling-vadodara",
    title: "CNC Drilling for Steel Plates | Vadodara | Jagdamba Procut",
    h1: "CNC Drilling Vadodara",
    description:
      "CNC drilling for steel plates and engineering components in Vadodara — hole diameters up to approx. 60 mm with accurate positioning.",
    keywords: [
      "cnc drilling vadodara",
      "plate drilling",
      "steel hole drilling",
    ],
  },
  {
    slug: "ultrasonic-testing-steel-plates",
    title: "Ultrasonic Testing (UT) for Steel Plates | ASTM & EN",
    h1: "Ultrasonic Testing for Steel Plates",
    description:
      "UT for steel plates to ASTM A578 Levels A/B/C and EN 10160 body/edge classes, plus ultrasonic thickness measurement.",
    keywords: [
      "ultrasonic testing steel plates",
      "astm a578",
      "en 10160",
    ],
  },
  {
    slug: "oxy-fuel-cutting-vadodara",
    title: "Oxy-Fuel Heavy Plate Cutting Vadodara | Jagdamba Procut",
    h1: "Oxy-Fuel / Heavy Plate Cutting",
    description:
      "Oxy-fuel cutting for heavy-thickness steel plates — forging blanks, large rings, flanges and heavy base plates in Vadodara.",
    keywords: [
      "oxy fuel cutting vadodara",
      "heavy plate cutting",
      "thick plate cutting",
    ],
  },
  {
    slug: "boiler-quality-plates-vadodara",
    title: "Boiler Quality Plates Vadodara | SA516 & More",
    h1: "Boiler Quality Steel Plates",
    description:
      "Boiler quality and pressure vessel plates including SA516 Grade 60/65/70 with cutting, UT and delivery from Vadodara.",
    keywords: [
      "boiler quality plates vadodara",
      "pressure vessel plates",
      "sa516 plates",
    ],
  },
  {
    slug: "is2062-e350-plates",
    title: "IS 2062 E350 Steel Plates | Structural Steel Vadodara",
    h1: "IS 2062 E350 Plates",
    description:
      "IS 2062 E350 and related structural grades with ready stock, CNC profile cutting and logistics support in Vadodara.",
    keywords: ["is 2062 e350", "structural steel plates", "e350 plates"],
  },
] as const;

export const ourTeam = {
  heading: "Our Team",
  points: [
    "Professionally managed steel stockholding, processing and supply operations.",
    "Focus on right material, accurate processing, testing and traceability.",
    "Safe handling with overhead cranes and Hydra facility.",
    "Reliable delivery from stockyard to your factory.",
  ],
} as const;

export const clientSatisfaction = {
  heading: "Client Satisfaction",
  body: "Our focus is Right Material + Accurate Processing + Testing + Traceability + Safe Handling + Reliable Delivery — complete steel solutions under one roof for engineering and manufacturing industries.",
} as const;

export const aboutHighlights = [
  {
    title: "Complete Under One Roof",
    description:
      "Stock, CNC profile cutting, 12 kW laser, CNC drilling, UT testing, handling and transport.",
  },
  {
    title: "Quality & Traceability",
    description:
      "Grade, thickness, heat/plate number verification, MTC, NABL coordination and TPI support.",
  },
  {
    title: "Heavy Handling",
    description:
      "4 × 20-ton overhead cranes plus Hydra loading and unloading across the stockyard.",
  },
] as const;

export const qualityTesting = {
  heading: "Quality & Testing",
  subheading: "Material Quality You Can Verify",
  title: "Quality, Testing & Traceability",
  points: [...qualityTraceability],
} as const;

export const deliverySupport = {
  heading: "Delivery Support",
  points: [
    "Heavy-Duty Trailers & Plate Transport Trailers",
    "Tempo, Pickup & Local Delivery Vehicles",
    "Loading with cranes & Hydra facility",
    "Supply → Processing → Testing → Delivery chain",
  ],
} as const;

export const serviceHighlights = [
  "CNC Profile Cutting · 12 kW Laser · CNC Drilling · Heavy Plate Cutting",
  "Ultrasonic Testing — ASTM A578 Levels A/B/C · EN 10160 S0–S3 / E0–E4",
  "Ultrasonic Thickness Meter for inward, stock, customer & dispatch inspection",
  "4 × 20-Ton Overhead Cranes · Hydra Facility · 26,000 + 75,000 Sq. Ft. facility",
] as const;
