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
  officePhones: ["8799617251", "8799617252"],
  inquiryPhone: "8799617254",
  accountsPhones: ["8799617253", "8799617255"],
  landLine: "9099969507",
  telefax: "+91-265-2649938 / 2649939 / 9099969507",
  contacts: [
    {
      name: "Mukesh Patel",
      role: "Owner",
      phones: ["9824917250", "8799617250"],
    },
    {
      name: "Dilip Patel",
      role: "Owner",
      phones: ["9824025001"],
    },
  ],
  officeHours: "Mon – Sat: 9:00 AM – 6:00 PM",
  focus:
    "Right Material + Accurate Processing + Testing + Traceability + Safe Handling + Reliable Delivery",
} as const;

export function hasCredential(value: string) {
  const v = value.trim().toLowerCase();
  return Boolean(v) && v !== "to be updated";
}

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
  { href: "/vendor", label: "Vendor Registration" },
  { href: "/stock-enquiry", label: "Stock Enquiry" },
  { href: "/quote", label: "Request a Quote" },
  { href: "/track", label: "Track Enquiry" },
  { href: "/contact", label: "Contact Us" },
] as const;

/** Local file preferred: public/videos/factory-hero.mp4 — fallback plays until you add yours */
export const heroMedia = {
  localSrc: "/videos/gallery/plant-video.mp4",
  localWebm: "",
  /** First frame of localSrc, so the swap from poster to video is seamless. */
  poster: "/images/plant/hero-first-frame.jpg",
  /** CC0 demo industrial footage if the plant video cannot play. */
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
  thickness: "/images/plant/thickness-meter.png",
  rings: "/images/plant/steel-rings.png",
  circles: "/images/plant/steel-circles.png",
  flanges: "/images/plant/steel-flanges.png",
  profiles: "/images/plant/large-profiles.png",
  hydra: "/images/plant/hydra-crane.png",
  loading: "/images/plant/loading-plates.png",
  unloading: "/images/plant/unloading-plates.png",
  trailer: "/images/plant/steel-trailer.png",
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
    unit: "Sq. Ft.",
    icon: "factory" as const,
  },
  {
    value: "75,000",
    label: "Steel Plate Storage Yard",
    numeric: 75000,
    prefix: "",
    suffix: "",
    unit: "Sq. Ft.",
    icon: "layers" as const,
  },
  {
    value: "2,500",
    label: "Ready Stock",
    numeric: 2500,
    prefix: "",
    suffix: "",
    unit: "MT",
    icon: "stock" as const,
  },
  {
    value: "5 × 20 Ton",
    label: "EOT Cranes",
    numeric: 5,
    prefix: "",
    suffix: " × 20 Ton",
    unit: "",
    icon: "ruler" as const,
  },
  {
    value: "8",
    label: "CNC Profile Cutting Machines",
    numeric: 8,
    prefix: "",
    suffix: "",
    unit: "Nos.",
    icon: "cnc" as const,
  },
  {
    value: "12 kW",
    label: "Laser Cutting Machine",
    numeric: 12,
    prefix: "",
    suffix: " kW",
    unit: "",
    icon: "laser" as const,
  },
] as const;

export const strengthExtras = [
  "Approx. 2,500 MT Ready Stock",
  "Thickness Range 3 mm to 300 mm",
  "8 CNC Profile Cutting Machines",
  "Profile Cutting up to 350 mm",
  "CNC Drilling",
  "Ultrasonic Testing",
  "Hydra Loading & Unloading",
  "Drawing / DXF Based Cutting",
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
    title: "5 × 20-Ton EOT Cranes",
    body: "Five Nos. 20-ton EOT cranes for safe handling of heavy, large and thick plates, profile-cut components, and loading & unloading.",
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
    { label: "Ready Steel Stock", value: "Approx. 2,500 MT" },
    { label: "Ready Stock Thickness", value: "3 mm to 300 mm" },
    { label: "EOT Cranes", value: "5 Nos. × 20 Ton Each" },
    { label: "CNC Profile Cutting", value: "8 Nos. Machines" },
    { label: "CNC Bed Size", value: "3000 mm × 12000 mm" },
    { label: "Profile Cutting Capacity", value: "Up to 350 mm thickness" },
    { label: "Laser Cutting", value: "12 kW High-Power System" },
    { label: "Laser Bed Size", value: "3000 mm × 12000 mm" },
    { label: "Laser Thickness Range", value: "1 mm to 35 / 40 mm" },
    { label: "CNC Drilling", value: "Bed 2500 × 6000 mm · up to 60 mm dia" },
    { label: "Hydra Facility", value: "Heavy Plate Loading & Unloading" },
    { label: "UT Testing", value: "ASTM A578 / EN 10160 levels" },
  ],
  values: [
    { title: "Large Stocking Capacity", detail: "75,000 sq. ft. plate yard" },
    { title: "Strong Infrastructure", detail: "26,000 sq. ft. covered shed" },
    { title: "Heavy Material Handling", detail: "5×20T EOT cranes + Hydra" },
    { title: "Advanced Processing", detail: "CNC, 12 kW laser, drilling" },
  ],
  glance: [
    { value: "26,000 Sq. Ft.", label: "Covered Processing Shed" },
    { value: "75,000 Sq. Ft.", label: "Steel Plate Storage Yard" },
    { value: "2,500 MT", label: "Ready Steel Stock" },
    { value: "3 mm to 300 mm", label: "Ready Stock Thickness Range" },
    { value: "5 × 20 Ton", label: "EOT Cranes" },
    { value: "8 CNC Machines", label: "Profile Cutting" },
    { value: "12 kW", label: "High-Power Laser Cutting" },
    { value: "Hydra Facility", label: "Heavy Plate Loading & Unloading" },
    { value: "CNC Drilling", label: "Bed 2500 × 6000 mm · up to 60 mm dia" },
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
    "Approx. 2,500 MT ready stock",
    "Thickness range from 3 mm to 300 mm",
    "5 × 20-Ton EOT cranes",
    "8 CNC profile cutting machines — bed 3000 mm × 12000 mm",
    "Profile cutting capacity up to 350 mm thickness",
    "Hydra loading & unloading facility",
    "12 kW laser cutting, CNC drilling and oxy-fuel cutting",
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
      "Eight CNC profile-cutting machines for precision processing of steel plates — circles, rings, flanges, base plates, machine and structural components, customized profiles, heavy engineering parts and batch production.",
    capacity: "8 machines · bed 3000 × 12000 mm · up to 350 mm",
    details: [
      "8 Nos. CNC profile cutting machines",
      "Machine bed size 3000 mm × 12000 mm",
      "Cutting capacity up to 350 mm thickness",
      "Circles, rings, flanges, base plates and custom profiles",
      "Cutting as per customer drawing / DXF",
      "Ready-to-use profile-cut parts under one roof",
    ],
    icon: "flame",
    image: plantImages.cnc,
  },
  {
    id: "laser",
    title: "12 kW Laser Cutting",
    summary:
      "High-power 12 kW laser cutting for high accuracy, fast production, excellent edge finish, reduced wastage and customized profile cutting on large plates.",
    capacity: "Bed 3000 × 12000 mm · 1 mm to 35 / 40 mm",
    details: [
      "Precision laser cutting with 12 kW high-power system",
      "Bed size 3000 mm × 12000 mm",
      "Laser thickness range 1 mm to 35 / 40 mm, subject to material and grade",
      "Accurate, clean cutting and neat edge finish",
      "Customized components as per drawing",
      "Material + cutting under one roof",
    ],
    icon: "laser",
    image: plantImages.laser,
  },
  {
    id: "cnc-drilling",
    title: "CNC Drilling",
    summary:
      "Precision CNC drilling for steel plates and engineering components — multiple hole patterns, accurate positioning and heavy plate drilling.",
    capacity: "Bed 2500 × 6000 mm · holes up to 60 mm",
    details: [
      "CNC drilling bed size 2500 mm × 6000 mm",
      "Hole diameters up to 60 mm, depending on thickness and tooling",
      "Multiple hole patterns and layout support",
      "Accurate hole positioning",
      "Heavy plate & engineering components",
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
    image: plantImages.thickness,
  },
];

export const machinery = [
  {
    id: "cnc-profile",
    title: "CNC Profile Cutting Machines",
    summary:
      "CNC profile cutting for precision steel plate processing — circles, rings, flanges, base plates, structural profiles and heavy engineering components.",
    bedSize: "3000 mm × 12000 mm",
    capacity: "8 Nos. CNC machines · up to 350 mm",
    processType: "CNC profile cutting",
    thickness: "Up to 350 mm",
    quantityNote: "8 Nos.",
    rfqService: "cnc-profile",
    applications: ["Circles & rings", "Flanges", "Base plates", "Structural profiles", "Heavy engineering parts"],
    image: plantImages.cnc,
    details: [
      "8 Nos. CNC profile cutting machines",
      "Machine bed size 3000 mm × 12000 mm",
      "Cutting capacity up to 350 mm thickness",
      "Suitable for heavy and customized profiles",
      "Circles, rings, flanges and base plates",
      "Customized profiles from drawings / DXF",
    ],
  },
  {
    id: "laser-12kw",
    title: "12 kW Laser Cutting Machine",
    summary:
      "High-power 12 kW laser for accurate, fast cutting with excellent edge quality on large-format plates.",
    bedSize: "3000 mm × 12000 mm",
    capacity: "12 kW high-power laser · 1 to 35 / 40 mm",
    processType: "12 kW fibre laser cutting",
    thickness: "1 to 35 / 40 mm (material and grade dependent)",
    quantityNote: "1 No.",
    rfqService: "laser",
    applications: ["Precision parts", "Nested sheet jobs", "Brackets & gussets", "Fine-detail profiles"],
    image: plantImages.laser,
    details: [
      "Bed size 3000 mm × 12000 mm",
      "Laser thickness range 1 mm to 35 / 40 mm (subject to material and grade)",
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
    bedSize: "2500 mm × 6000 mm",
    capacity: "Holes up to 60 mm diameter",
    processType: "CNC plate drilling",
    thickness: "Heavy plate — per job, thickness and tooling",
    quantityNote: "",
    rfqService: "cnc-drilling",
    applications: ["Base plates", "Connection plates", "Multi-hole patterns", "Flange drilling"],
    image: plantImages.drilling,
    details: [
      "CNC drilling bed size 2500 mm × 6000 mm",
      "Hole diameters up to 60 mm, depending on thickness and tooling",
      "Accurate multi-hole patterns and layout support",
      "Heavy plate drilling capability",
    ],
  },
  {
    id: "oxy-fuel",
    title: "Oxy-Fuel / Heavy Plate Cutting",
    summary:
      "Oxy-fuel cutting for heavy-thickness plates used in forging blanks, large rings, flanges and heavy base plates.",
    bedSize: "Heavy plate processing beds",
    capacity: "Heavy-thickness oxy-fuel cutting",
    processType: "Oxy-fuel / pug cutting",
    thickness: "Heavy-thickness plate",
    quantityNote: "Multiple sets",
    rfqService: "combined",
    applications: ["Forging blanks", "Large rings & circles", "Heavy base plates", "Straight cutting"],
    image: plantImages.oxy,
    details: [
      "Multiple oxy / pug cutting sets available",
      "Straight cutting and production support",
      "Thick plate cutting",
      "Large circles, rings and flanges",
      "Forging blanks and heavy base plates",
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
      "IS 2062 E250A",
      "IS 2062 E250BR",
      "IS 2062 E250C",
      "IS 2062 E350",
      "IS 2062 E350A",
      "E350BR",
      "E350C",
      "IS 2062 E450",
      "E450BR",
      "S355JR",
      "S355J0",
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
  "Approx. 2,500 MT ready stock",
  "Thickness range from 3 mm to 300 mm",
  "Special grades available",
  "Material with Mill Test Certificate / TC",
  "Fast availability for regular and urgent requirements",
  "Leading Indian mills: Jindal, SAIL, JSW, Tata Steel, AM/NS India",
  "Imported / China-origin plates subject to availability",
  "UT & ultrasonic thickness verification available",
] as const;

export const transport = {
  heading: "Transport & Logistics",
  subheading: "From Our Stockyard to Your Factory",
  badge: "On Time. Every Time.",
  body: "We have transportation arrangements suitable for different material sizes and quantities.",
  dispatchStrength: [
    "Loading support with 5 Nos. 20 Ton EOT cranes",
    "Ready stock for immediate dispatch",
    "Vehicle arrangement support",
    "Local and outstation transport coordination",
    "Safe plate loading and handling",
    "Support for regular and urgent dispatches",
    "Heavy-duty trailers, plate transport trailers, tempo and pickup vehicles",
  ],
  features: [
    { title: "Ready Vehicles", detail: "For timely dispatch" },
    { title: "5 Nos. 20 Ton", detail: "EOT cranes for loading support" },
    { title: "Safe Loading & Handling", detail: "At every step" },
    { title: "Local & Outstation", detail: "Transport coordination" },
    { title: "Regular & Urgent", detail: "Dispatch support" },
  ],
  logisticsChain:
    "Material Supply → Processing → Testing → Inspection → Loading → Transportation → Delivery",
} as const;

export const whyCustomersChooseUs = [
  "Serving the engineering industry since 2001",
  "Approx. 2,500 MT ready stock",
  "Steel trading + profile cutting + laser cutting under one roof",
  "Thickness range from 3 mm to 300 mm",
  "8 CNC profile cutting machines",
  "Strong handling capacity with 5 Nos. 20 Ton EOT cranes",
  "26,000 sq. ft. covered processing shed and 75,000 sq. ft. plate yard",
  "Customized cutting as per drawing / DXF",
  "Competitive pricing and fast delivery support",
  "Leading steel makes — Jindal, SAIL, JSW, Tata Steel and AM/NS India",
  "Quality verification — UT facilities and ultrasonic thickness meter",
  "Complete logistics — trailers, tempos, pickups and delivery support",
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

/** Focus markets — grades, standards and services are the ones listed elsewhere on this site. */
export const industryFocus = [
  {
    id: "heavy-engineering",
    title: "Heavy Engineering",
    image: plantImages.profiles,
    overview:
      "Thick plates and profile-cut blanks for machine frames, rings, flanges and heavy fabricated assemblies — supplied and processed at one site.",
    services: ["CNC profile cutting up to 350 mm", "Oxy-fuel heavy plate cutting", "CNC drilling (holes up to 60 mm)", "Ultrasonic testing"],
    materials: ["IS 2062 E350 / E450", "S355J2+N", "C45 / EN19", "42CrMo4"],
    quality: ["MTC with heat number", "UT to ASTM A578 / EN 10160 where specified", "Dimensional inspection"],
    links: [
      { href: "/machinery", label: "Machinery" },
      { href: "/grades", label: "Grades" },
    ],
    rfqService: "cnc-profile",
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    image: plantImages.plates,
    overview:
      "Structural plates and cut-to-size parts for steelwork and project fabrication, with ready stock to support project schedules.",
    services: ["Steel plate supply from stock", "Cut to size", "Laser-cut connection plates", "CNC drilling of base plates"],
    materials: ["IS 2062 E250BR / E350BR", "S355JR / S355J0", "ST52-3"],
    quality: ["Grade and thickness verification", "Heat / plate number traceability", "Mill Test Certificates"],
    links: [
      { href: "/facilities", label: "Infrastructure" },
      { href: "/logistics", label: "Logistics" },
    ],
    rfqService: "plate-supply",
  },
  {
    id: "boiler-pressure",
    title: "Boiler & Pressure Equipment",
    image: plantImages.ut,
    overview:
      "Boiler and pressure vessel quality plates with the testing and documentation that code fabrication requires.",
    services: ["Plate supply (stock & indent)", "Profile-cut circles and blanks", "Ultrasonic testing", "Third-party inspection support"],
    materials: ["SA516 Grade 60 / 65 / 70", "P355NL / P355NL1", "ASTM A537 Class 1 / 2", "ASTM A387 Grade 22 Class 2"],
    quality: ["UT: ASTM A578 Level A / B / C", "UT: EN 10160 S1/E1 – S2/E3", "MTC verification and NABL testing coordination"],
    links: [
      { href: "/quality", label: "Quality & UT" },
      { href: "/grades", label: "Grades" },
    ],
    rfqService: "combined",
  },
  {
    id: "industrial-fabrication",
    title: "Industrial Fabrication",
    image: plantImages.components,
    overview:
      "Drawing and DXF-based parts — gussets, brackets, base plates and custom profiles — cut accurately and delivered ready for fabrication.",
    services: ["12 kW laser cutting", "CNC profile cutting", "CNC drilling", "Transport & delivery"],
    materials: ["IS 2062 E250 / E350", "S355 series", "Customer-specified grades"],
    quality: ["Cutting accuracy inspection", "Dimensional inspection", "Thickness verification"],
    links: [
      { href: "/services", label: "Services" },
      { href: "/machinery", label: "Machinery" },
    ],
    rfqService: "laser",
  },
  {
    id: "mining-wear",
    title: "Mining & Wear Applications",
    image: plantImages.oxy,
    overview:
      "High strength and wear resistant plates processed into liners, wear parts and heavy components for mining, cement and earthmoving equipment.",
    services: ["CNC profile cutting", "Laser cutting (thickness dependent)", "CNC drilling", "Cut to size"],
    materials: ["Hardox 400 / 500", "Rockstar 400", "Domex 460 / 550"],
    quality: ["Grade verification against MTC", "Thickness verification", "Plate number traceability"],
    links: [
      { href: "/grades", label: "Grades" },
      { href: "/quality", label: "Quality" },
    ],
    rfqService: "cnc-profile",
  },
] as const;

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
  { id: "hydra", title: "Hydra", image: plantImages.hydra },
  { id: "loading", title: "Loading", image: plantImages.loading },
  { id: "unloading", title: "Unloading", image: plantImages.unloading },
  { id: "trailers", title: "Trailers", image: plantImages.trailer },
  { id: "finished-components", title: "Finished Components", image: plantImages.components },
  { id: "rings", title: "Rings", image: plantImages.rings },
  { id: "circles", title: "Circles", image: plantImages.circles },
  { id: "flanges", title: "Flanges", image: plantImages.flanges },
  { id: "large-profiles", title: "Large Profiles", image: plantImages.profiles },
  { id: "dispatch", title: "Dispatch", image: plantImages.dispatch },
] as const;

export const galleryVideos = [
  {
    id: "video-all-grades",
    title: "All Grades Available",
    src: "/videos/gallery/all-grades-available.mp4",
    poster: "/images/plant/poster-all-grades.png",
  },
  {
    id: "video-fast-delivery",
    title: "Fast Delivery",
    src: "/videos/gallery/fast-delivery.mp4",
    poster: "/images/plant/poster-fast-delivery.png",
  },
  {
    id: "video-grade-wise-code",
    title: "Grade-wise Code",
    src: "/videos/gallery/grade-wise-code.mp4",
    poster: "/images/plant/poster-grade-code.png",
  },
  {
    id: "video-heavy-plate",
    title: "Heavy Plate Cutting",
    src: "/videos/gallery/heavy-plate-cutting.mp4",
    poster: "/images/plant/poster-heavy-plate.png",
  },
  {
    id: "video-since",
    title: "Company Video",
    src: "/videos/gallery/since.mp4",
    poster: "/images/plant/poster-company.png",
  },
  {
    id: "video-plant",
    title: "Plant Video",
    src: "/videos/gallery/plant-video.mp4",
    poster: "/images/plant/poster-plant.png",
  },
] as const;

export const downloads = [
  {
    id: "company-profile",
    title: "Company Profile",
    file: null as string | null,
  },
  {
    id: "product-brochure",
    title: "Product Brochure",
    file: null as string | null,
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

export type SeoPage = {
  slug: string;
  /** Without the brand — the root title template appends it. */
  title: string;
  h1: string;
  description: string;
  keywords: readonly string[];
  intro: readonly string[];
  /** Processing service shown with its capacity details. */
  serviceId?: Service["id"];
  /** Grade family listed on the page. */
  gradeCategoryId?: GradeCategoryId;
  /** Show ASTM A578 / EN 10160 testing options. */
  showUt?: boolean;
  related: readonly string[];
};

export const seoPages: readonly SeoPage[] = [
  {
    slug: "cnc-profile-cutting-vadodara",
    title: "CNC Profile Cutting in Vadodara – Up to 350 mm",
    h1: "CNC Profile Cutting Vadodara",
    description:
      "CNC profile cutting for steel plates in Vadodara — circles, rings, flanges, base plates and customized profiles. 8 CNC machines, bed 3000 × 12000 mm, up to 350 mm thickness.",
    keywords: [
      "cnc profile cutting vadodara",
      "profile cutting gujarat",
      "steel profile cutting",
    ],
    intro: [
      "Jagdamba Procut Pvt. Ltd. runs 8 CNC profile cutting machines at GIDC Makarpura, Vadodara, with a machine bed of 3000 mm × 12000 mm and cutting capacity up to 350 mm thickness.",
      "We cut circles, rings, flanges, base plates, structural profiles and heavy engineering parts as per your drawing or DXF — from plates in our own stock, so material and cutting come from one supplier.",
    ],
    serviceId: "cnc-profile",
    related: ["laser-cutting-vadodara", "oxy-fuel-cutting-vadodara", "cnc-drilling-vadodara", "steel-plate-supplier-vadodara"],
  },
  {
    slug: "steel-plate-supplier-vadodara",
    title: "Steel Plate Supplier in Vadodara – 2,500 MT Ready Stock",
    h1: "Steel Plate Supplier Vadodara",
    description:
      "Steel plate stockist and supplier in Vadodara with approx. 2,500 MT ready stock, 3–300 mm thickness, 75,000 sq. ft. plate yard, leading Indian mills and imported material subject to availability.",
    keywords: [
      "steel plate supplier vadodara",
      "steel stockist gujarat",
      "carbon steel plates",
    ],
    intro: [
      "Jagdamba Procut Pvt. Ltd. has been a steel plate stockist in Vadodara since 2001, holding approx. 2,500 MT of ready stock in thicknesses from 3 mm to 300 mm across a 75,000 sq. ft. open plate yard and a 26,000 sq. ft. covered shed.",
      "Plates are sourced from leading Indian mills — Jindal, SAIL, JSW, Tata Steel and AM/NS India — with imported / China-origin plates subject to availability, supplied with Mill Test Certificate / TC.",
    ],
    gradeCategoryId: "structural",
    related: ["is2062-e350-plates", "boiler-quality-plates-vadodara", "cnc-profile-cutting-vadodara", "ultrasonic-testing-steel-plates"],
  },
  {
    slug: "laser-cutting-vadodara",
    title: "12 kW Laser Cutting in Vadodara",
    h1: "Laser Cutting Vadodara",
    description:
      "High-power 12 kW laser cutting in Vadodara for accurate, fast steel plate cutting with excellent edge finish — bed 3000 × 12000 mm, 1 mm to 35 / 40 mm subject to material and grade.",
    keywords: [
      "laser cutting vadodara",
      "12 kw laser cutting",
      "steel laser cutting gujarat",
    ],
    intro: [
      "Our 12 kW high-power laser cuts steel plates on a 3000 mm × 12000 mm bed, in thicknesses from 1 mm to 35 / 40 mm depending on material and grade.",
      "It suits precision parts, brackets, gussets and nested jobs where accuracy, edge finish and reduced wastage matter — with the plate supplied from our Vadodara stock.",
    ],
    serviceId: "laser",
    related: ["cnc-profile-cutting-vadodara", "cnc-drilling-vadodara", "steel-plate-supplier-vadodara"],
  },
  {
    slug: "sa516-grade-70",
    title: "SA516 Grade 70 Plates – Boiler Quality Steel, Vadodara",
    h1: "SA516 Grade 70 Steel Plates",
    description:
      "SA516 Grade 70 boiler and pressure vessel plates with supply, CNC cutting, UT to ASTM A578 / EN 10160 and thickness verification from Vadodara.",
    keywords: [
      "sa516 grade 70",
      "boiler quality plates",
      "pressure vessel steel plates",
    ],
    intro: [
      "SA516 Grade 70 is one of the boiler and pressure vessel grades we supply from Vadodara, alongside SA516 Grade 60 and Grade 65.",
      "Plates can be supplied with Mill Test Certificate, profile cut to drawing, and checked with ultrasonic testing and ultrasonic thickness measurement depending on thickness and purchase specification.",
    ],
    gradeCategoryId: "boiler",
    showUt: true,
    related: ["sa516-grade-60", "boiler-quality-plates-vadodara", "ultrasonic-testing-steel-plates", "cnc-profile-cutting-vadodara"],
  },
  {
    slug: "sa516-grade-60",
    title: "SA516 Grade 60 Plates – Boiler & Pressure Vessel, Vadodara",
    h1: "SA516 Grade 60 Steel Plates",
    description:
      "SA516 Grade 60 plates for boiler and pressure vessel applications — stock, CNC profile cutting and ultrasonic testing support in Vadodara.",
    keywords: ["sa516 grade 60", "sa516 plates", "bq plates vadodara"],
    intro: [
      "SA516 Grade 60 plates for boiler and pressure vessel work are part of our boiler-quality range, together with SA516 Grade 65 and Grade 70.",
      "We support the full job from Vadodara — plate supply with MTC, CNC profile cutting, UT and thickness verification, and delivery to your factory.",
    ],
    gradeCategoryId: "boiler",
    showUt: true,
    related: ["sa516-grade-70", "boiler-quality-plates-vadodara", "ultrasonic-testing-steel-plates"],
  },
  {
    slug: "cnc-drilling-vadodara",
    title: "CNC Drilling for Steel Plates in Vadodara",
    h1: "CNC Drilling Vadodara",
    description:
      "CNC drilling for steel plates and engineering components in Vadodara — bed size 2500 × 6000 mm, hole diameters up to 60 mm with accurate positioning.",
    keywords: [
      "cnc drilling vadodara",
      "plate drilling",
      "steel hole drilling",
    ],
    intro: [
      "Our CNC drilling machine handles steel plates and engineered components on a 2500 mm × 6000 mm bed, with hole diameters up to 60 mm depending on thickness and tooling.",
      "Typical work includes base plates, connection plates, flange drilling and multi-hole patterns — often combined with profile cutting so parts arrive cut and drilled.",
    ],
    serviceId: "cnc-drilling",
    related: ["cnc-profile-cutting-vadodara", "laser-cutting-vadodara", "oxy-fuel-cutting-vadodara"],
  },
  {
    slug: "ultrasonic-testing-steel-plates",
    title: "Ultrasonic Testing (UT) for Steel Plates – ASTM A578 & EN 10160",
    h1: "Ultrasonic Testing for Steel Plates",
    description:
      "UT for steel plates to ASTM A578 Levels A/B/C and EN 10160 body/edge classes, plus ultrasonic thickness measurement — Jagdamba Procut, Vadodara.",
    keywords: [
      "ultrasonic testing steel plates",
      "astm a578",
      "en 10160",
    ],
    intro: [
      "Ultrasonic testing is available depending on grade, thickness, customer specification and the applicable standard — ASTM A578 / A578M Levels A, B and C, and EN 10160 body classes S0–S3 and edge classes E0–E4.",
      "An ultrasonic thickness meter is also used to verify actual plate thickness at inward, stock, customer and dispatch inspection. Mill or third-party UT reports can be coordinated as required.",
    ],
    serviceId: "ut-testing",
    showUt: true,
    related: ["boiler-quality-plates-vadodara", "sa516-grade-70", "steel-plate-supplier-vadodara"],
  },
  {
    slug: "oxy-fuel-cutting-vadodara",
    title: "Oxy-Fuel Heavy Plate Cutting in Vadodara",
    h1: "Oxy-Fuel / Heavy Plate Cutting",
    description:
      "Oxy-fuel cutting for heavy-thickness steel plates — forging blanks, large rings, flanges and heavy base plates in Vadodara.",
    keywords: [
      "oxy fuel cutting vadodara",
      "heavy plate cutting",
      "thick plate cutting",
    ],
    intro: [
      "Multiple oxy / pug cutting sets handle heavy-thickness plates for forging blanks, large circles, rings, flanges, heavy base plates and machine components.",
      "Heavy plates are handled with 5 Nos. 20-ton EOT cranes and a Hydra loading facility, and supplied from our Vadodara stock where available.",
    ],
    serviceId: "heavy-plate",
    related: ["cnc-profile-cutting-vadodara", "steel-plate-supplier-vadodara", "cnc-drilling-vadodara"],
  },
  {
    slug: "boiler-quality-plates-vadodara",
    title: "Boiler Quality Plates in Vadodara – SA516 Gr 60/65/70",
    h1: "Boiler Quality Steel Plates",
    description:
      "Boiler quality and pressure vessel plates including SA516 Grade 60/65/70, P355NL and ASTM A537 with cutting, UT and delivery from Vadodara.",
    keywords: [
      "boiler quality plates vadodara",
      "pressure vessel plates",
      "sa516 plates",
    ],
    intro: [
      "We supply boiler and pressure vessel steel plates from Vadodara — SA516 Grade 60, 65 and 70, P355NL / P355NL1, ASTM A537 Class 1 and 2, and ASTM A387 Grade 22 Class 2.",
      "Plates come with Mill Test Certificate and heat / plate number traceability, and can be profile cut, ultrasonically tested and thickness-verified before dispatch.",
    ],
    gradeCategoryId: "boiler",
    showUt: true,
    related: ["sa516-grade-70", "sa516-grade-60", "ultrasonic-testing-steel-plates", "cnc-profile-cutting-vadodara"],
  },
  {
    slug: "is2062-e350-plates",
    title: "IS 2062 E350 Steel Plates – Structural Steel, Vadodara",
    h1: "IS 2062 E350 Plates",
    description:
      "IS 2062 E350 and related structural grades with ready stock, CNC profile cutting and logistics support in Vadodara.",
    keywords: ["is 2062 e350", "structural steel plates", "e350 plates"],
    intro: [
      "IS 2062 E350 is part of our structural and carbon steel range, together with E250, E450 and European grades such as S355JR, S355J2 and S460N.",
      "Plates are available from approx. 2,500 MT ready stock in Vadodara and can be CNC profile cut, drilled and delivered by our transport arrangements.",
    ],
    gradeCategoryId: "structural",
    related: ["steel-plate-supplier-vadodara", "cnc-profile-cutting-vadodara", "cnc-drilling-vadodara"],
  },
];

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
      "5 × 20-ton EOT cranes plus Hydra loading and unloading across the stockyard.",
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
    "Fast processing and delivery",
    "Ready stock for immediate dispatch",
    "Support for regular and urgent requirements",
    "Reliable supply for production and project needs",
    "Loading with 5 Nos. 20 Ton EOT cranes & Hydra facility",
    "Local and outstation transport coordination",
  ],
} as const;

export const serviceHighlights = [
  "CNC Profile Cutting · 12 kW Laser · CNC Drilling · Heavy Plate Cutting",
  "Ultrasonic Testing — ASTM A578 Levels A/B/C · EN 10160 S0–S3 / E0–E4",
  "Ultrasonic Thickness Meter for inward, stock, customer & dispatch inspection",
  "5 × 20-Ton EOT Cranes · 8 CNC Machines · 26,000 + 75,000 Sq. Ft. facility",
] as const;

export const machineCapacityChart = [
  {
    process: "CNC Profile Cutting",
    capacity: "8 Nos. Machines",
    remarks: "Oxy-fuel profile cutting for heavy plates",
  },
  {
    process: "CNC Bed Size",
    capacity: "3000 mm × 12000 mm",
    remarks: "Suitable for large plate processing",
  },
  {
    process: "Profile Cutting Capacity",
    capacity: "Up to 350 mm thickness",
    remarks: "As per material grade and profile",
  },
  {
    process: "Laser Cutting",
    capacity: "12 kW high-power laser system",
    remarks: "Precision cutting for clean components",
  },
  {
    process: "Laser Bed Size",
    capacity: "3000 mm × 12000 mm",
    remarks: "Large sheet / plate handling",
  },
  {
    process: "Laser Thickness Range",
    capacity: "1 mm to 35 / 40 mm",
    remarks: "Subject to material and grade",
  },
  {
    process: "CNC Drilling",
    capacity: "Bed size 2500 mm × 6000 mm",
    remarks: "Hole drilling and layout support",
  },
  {
    process: "Drill Capacity",
    capacity: "Up to 60 mm dia",
    remarks: "Depending on thickness and tooling",
  },
  {
    process: "Oxy / Pug Cutting",
    capacity: "Multiple sets available",
    remarks: "Straight cutting and production support",
  },
  {
    process: "EOT Cranes",
    capacity: "5 Nos., 20 Ton capacity",
    remarks: "Safe plate lifting and handling",
  },
  {
    process: "Material Handling",
    capacity: "Magnet / forklift / crane support",
    remarks: "Internal movement and loading",
  },
  {
    process: "Input Support",
    capacity: "Drawing / DXF / NC based cutting",
    remarks: "Customer drawing-based job work",
  },
] as const;

export const machineCapacityNote =
  "Machine capacity and achievable thickness vary with process, material grade, drawing complexity, and production planning. Final confirmation will be provided at quotation stage.";

export const machineValueAdded = [
  "Drawing-based profile cutting",
  "Nesting and customized job work",
  "Marking / identification support",
  "CNC drilling support on requirement",
  "Heavy plate handling under one roof",
  "Quick turnaround for regular and urgent jobs",
] as const;

export const stockRange = [
  { parameter: "Plate Thickness", details: "3 mm to 300 mm" },
  {
    parameter: "Standard Widths",
    details: "1250 / 1500 / 2000 / 2500 / 3000 mm",
  },
  {
    parameter: "Standard Lengths",
    details: "6000 / 8000 / 10000 / 12000 mm",
  },
  {
    parameter: "Supply Form",
    details: "Full plates, cut plates, profile-cut parts",
  },
  {
    parameter: "Delivery Condition",
    details: "As rolled / Normalized / N / Special grades subject to availability",
  },
  {
    parameter: "Documentation",
    details: "Mill Test Certificate / TC available",
  },
] as const;

export const commonGradeGroups = [
  {
    group: "IS 2062 Series",
    grades: "E250A, E250BR, E250C, E350A / BR / C, E450A / BR",
  },
  {
    group: "EN Structural",
    grades: "S355JR, S355J0, S355J2, S355J2+N",
  },
  {
    group: "Pressure Vessel Plates",
    grades: "SA516 Gr 60, SA516 Gr 65, SA516 Gr 70",
  },
  {
    group: "Carbon / Alloy",
    grades: "C45, EN19, ST52-3",
  },
  {
    group: "Wear Resistant / High Strength",
    grades: "Hardox 400 / 500, NM 400 / 500, 690QL",
  },
  {
    group: "Other Availability",
    grades: "Additional grades as per customer requirement",
  },
] as const;

export const stockReferenceNote =
  "Stock position varies by grade, thickness, make, and order cycle. Exact availability, make, and delivery condition will be confirmed at the time of inquiry / quotation.";

export const is2062Chemistry = {
  heading: "IS 2062 Chemical Composition",
  caption:
    "Ladle / heat analysis reference values. All values are % by mass unless otherwise stated.",
  columns: ["IS 2062 Grade", "C Max", "Mn Max", "Si Max", "P Max", "S Max", "CE Max"],
  rows: [
    ["E250A", "0.23", "1.50", "0.40", "0.045", "0.045", "0.42"],
    ["E250BR", "0.22", "1.50", "0.40", "0.045", "0.045", "0.41"],
    ["E250C", "0.20", "1.50", "0.40", "0.040", "0.040", "0.39"],
    ["E350 A / BR", "0.20", "1.55", "0.45", "0.045", "0.045", "0.47"],
    ["E350C", "0.20", "1.55", "0.45", "0.040", "0.040", "0.45"],
    ["E450 A / BR", "0.22", "1.65", "0.45", "0.045", "0.045", "0.52"],
  ],
} as const;

export const otherGradeChemistry = {
  heading: "Other Common Grades",
  caption: "EN structural, carbon steel and pressure-vessel plate grades commonly supplied.",
  columns: ["Grade / Standard", "C", "Mn", "Si", "P", "S", "Condition / Note"],
  rows: [
    ["S355JR - EN 10025-2", "<=0.24*", "<=1.60", "<=0.55", "<=0.035", "<=0.035", "Structural steel"],
    ["S355J0 - EN 10025-2", "<=0.24*", "<=1.60", "<=0.55", "<=0.035", "<=0.035", "Impact at 0 C"],
    ["S355J2 / +N", "<=0.24*", "<=1.60", "<=0.55", "<=0.035", "<=0.035", "Impact at -20 C"],
    ["C45 - EN 10083-2", "0.42-0.50", "0.50-0.80", "<=0.40", "<=0.045", "<=0.045", "Non-alloy carbon steel"],
    ["SA516 Gr 60", "0.23**", "0.85-1.20", "0.15-0.40", "<=0.025", "<=0.025", "t >12.5 to 50 mm"],
    ["SA516 Gr 65", "0.26**", "0.85-1.20", "0.15-0.40", "<=0.025", "<=0.025", "t >12.5 to 50 mm"],
    ["SA516 Gr 70", "0.28**", "0.85-1.20", "0.15-0.40", "<=0.025", "<=0.025", "t >12.5 to 50 mm"],
  ],
} as const;

export const chemistryNotes = [
  "S355 composition limits vary with product thickness and exact subgrade; common plate reference values are shown.",
  "SA516 carbon maximum varies by thickness; values shown are for over 12.5 mm to 50 mm plate thickness.",
  "Exact MTC / TC, ordered subgrade, thickness, delivery condition and the latest applicable standard shall govern.",
] as const;

export const mechanicalProperties = {
  heading: "Mechanical Properties",
  caption:
    "Minimum / standard reference values at room temperature unless otherwise stated.",
  columns: [
    "Grade",
    "Yield Strength / Proof",
    "Tensile Strength",
    "Elongation",
    "Impact / Condition",
  ],
  rows: [
    [
      "IS 2062 E250A",
      "250 / 240 / 230 MPa (t <20 / 20-40 / >40 mm)",
      ">=410 MPa",
      ">=23%",
      "Not specified",
    ],
    ["IS 2062 E250BR", "250 / 240 / 230 MPa", ">=410 MPa", ">=23%", "27 J @ RT, if specified"],
    ["IS 2062 E250C", "250 / 240 / 230 MPa", ">=410 MPa", ">=23%", "27 J @ -20 C"],
    ["IS 2062 E350A", "350 / 330 / 320 MPa", ">=490 MPa", ">=22%", "Not specified"],
    ["IS 2062 E350BR", "350 / 330 / 320 MPa", ">=490 MPa", ">=22%", "27 J @ RT, if specified"],
    ["IS 2062 E350C", "350 / 330 / 320 MPa", ">=490 MPa", ">=22%", "27 J @ -20 C"],
    ["IS 2062 E450A", "450 / 430 / 420 MPa", ">=570 MPa", ">=20%", "Not specified"],
    ["IS 2062 E450BR", "450 / 430 / 420 MPa", ">=570 MPa", ">=20%", "20 J @ RT, if specified"],
    ["S355JR - EN 10025-2", ">=355 MPa*", "470-630 MPa*", ">=20%*", "27 J @ +20 C"],
    ["S355J0 - EN 10025-2", ">=355 MPa*", "470-630 MPa*", ">=20%*", "27 J @ 0 C"],
    ["S355J2 / +N", ">=355 MPa*", "470-630 MPa*", ">=20%*", "27 J @ -20 C"],
    ["C45 - EN 10083-2", ">=490 MPa**", "700-850 MPa**", ">=14%**", "Q&T; ref. t <=16 mm"],
    ["SA516 Gr 60", ">=220 MPa", "415-550 MPa", ">=25%***", "Impact by PO / supplement"],
    ["SA516 Gr 65", ">=240 MPa", "450-585 MPa", ">=23%***", "Impact by PO / supplement"],
    ["SA516 Gr 70", ">=260 MPa", "485-620 MPa", ">=21%***", "Impact by PO / supplement"],
  ],
} as const;

export const mechanicalNotes = [
  "S355 values shown for common plate thickness range; yield / tensile / elongation vary with thickness.",
  "C45 values shown as quenched-and-tempered reference for small section / thickness; condition strongly affects properties.",
  "SA516 elongation shown for 50 mm gauge length. Impact testing is supplementary unless specifically ordered.",
  "Technical references: IS 2062:2011, EN 10025-2, EN 10083-2 and ASME SA-516/SA-516M. Verify latest edition & MTC/TC.",
] as const;

export const inspectionSupport = [
  "Mill Test Certificate / TC support",
  "Heat No. and Plate No. traceability",
  "Thickness measurement and verification",
  "UT testing support as per requirement",
  "Material marking before cutting / dispatch",
  "Dimensional checking of cut parts",
  "Visual inspection before dispatch",
  "Chemical / mechanical test reference support",
  "NABL lab testing support on requirement",
  "TPI coordination with customer-nominated agencies",
] as const;

export const traceabilityWorkflow = [
  { stage: "Material Receipt", support: "Grade, size, heat no., plate no. verification" },
  { stage: "Pre-Processing", support: "Marking, traceability and job identification" },
  { stage: "In-Process", support: "Dimensional checking and process monitoring" },
  { stage: "Final Dispatch", support: "Visual check, loading coordination and documentation support" },
  { stage: "Customer Support", support: "MTC / TC, UT / test reference, dispatch details" },
] as const;

export const tpiSupport = [
  "Inspection coordination available with SGS / TUV / BV / customer nominated agency",
  "UT level, documentation and special testing as per PO / inquiry",
  "Exact material standard, test scope and supply condition will govern as per MTC / TC",
] as const;

export const inspectionNote =
  "Inspection scope may vary grade-wise and order-wise. Final testing, traceability, and documentation will be provided subject to customer requirement, PO terms, and material condition.";

export const departmentContacts = [
  { label: "Office", phones: ["8799617251", "8799617252"] },
  { label: "Inquiry", phones: ["8799617254"] },
  { label: "Accounts", phones: ["8799617253", "8799617255"] },
  { label: "Land Line", phones: ["9099969507"] },
] as const;
