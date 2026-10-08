export interface FrameAnimationConfig {
  framePath: string;
  framePrefix: string;
  frameCount: number;
  frameExtension: string;
  framePadding: number;
}

export const animationConfig: FrameAnimationConfig = {
  framePath: "/frames",
  framePrefix: "ezgif-frame-",
  frameCount: 240,
  frameExtension: "jpg",
  framePadding: 3,
};

export interface StoryBeat {
  id: string;
  phase: string;
  title: string;
  subtitle: string;
  description: string;
  accentText: string;
  startProgress: number;
  endProgress: number;
  alignment: "left" | "right" | "center";
}

export const storyBeats: StoryBeat[] = [
  {
    id: "beat-1",
    phase: "I. THE INCEPTION",
    title: "Poetry in Motion",
    subtitle: "PURE MULBERRY SILK ORGANZA",
    description:
      "Spun from single-origin royal silkworm filaments, our heritage weave captures the soft golden glow of dawn, breathing with every ambient whisper of the wind.",
    accentText: "100% PURE FILAMENT SILK • GRADE 6A+",
    startProgress: 0.02,
    endProgress: 0.22,
    alignment: "left",
  },
  {
    id: "beat-2",
    phase: "II. LIQUID GEOMETRY",
    title: "Choreographed Luminance",
    subtitle: "24K ELECTROPLATED ZARI METALLIC WEFT",
    description:
      "Light does not merely strike Ansari fabric; it is orchestrated. Hand-drawn precious gold threads weave micro-reflections that transition from warm champagne to burnished bronze.",
    accentText: "AUTHENTIC DIPPED ZARI • 320 GSM LUXURY WEIGHT",
    startProgress: 0.26,
    endProgress: 0.48,
    alignment: "right",
  },
  {
    id: "beat-3",
    phase: "III. ANCESTRAL CRAFT",
    title: "Centuries in Every Meter",
    subtitle: "ARTISANAL JACQUARD & BOTANICAL MOTIFS",
    description:
      "Every arch, floral trellis, and undulating fold tells of master weavers who dedicate over sixty hours to calibrate each loom pattern for flawless drape and drape retention.",
    accentText: "60+ HOURS PER WEAVE • PALATIAL ARCHIVE EDITION",
    startProgress: 0.52,
    endProgress: 0.74,
    alignment: "left",
  },
  {
    id: "beat-4",
    phase: "IV. THE METAMORPHOSIS",
    title: "Couture Presence",
    subtitle: "TIMELESS BESPOKE SPLENDOR",
    description:
      "When the garment turns, the world stills. Designed for gala silhouettes, royal bridal ensembles, and contemporary couture that demands an unforgettable entrance.",
    accentText: "LIMITED REEL CUTS • WORLDWIDE EXPRESS COURIER",
    startProgress: 0.76,
    endProgress: 0.91,
    alignment: "center",
  },
];

export interface FabricProduct {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  pricePerMeter: number;
  samplePrice: number;
  currency: string;
  weaveType: string;
  composition: string;
  width: string;
  weight: string;
  origin: string;
  idealFor: string[];
  colors: { name: string; hex: string; border?: string }[];
  inStockMeters: number;
  rating: number;
  reviewsCount: number;
  description: string;
  characteristics: string[];
  careInstructions: string;
  featuredImage: string;
}

export const fabricCatalog: FabricProduct[] = [
  {
    id: "noor-zari-organza",
    name: "Noor-e-Zari Silk Organza",
    subtitle: "The Signature Royal Drape",
    tagline: "Translucent crisp silk interwoven with micro-beaten champagne gold filament.",
    pricePerMeter: 185,
    samplePrice: 15,
    currency: "$",
    weaveType: "Plain Weave with Metallic Zari Weft",
    composition: "85% Pure Mulberry Silk, 15% Metallic Gold Thread",
    width: "138 cm (54 inches)",
    weight: "48 GSM",
    origin: "Varanasi & Lyon Master Artisans",
    idealFor: ["Bridal Capes", "Floating Evening Gowns", "Sculptural Ruffles", "Couture Dupattas"],
    colors: [
      { name: "Alabaster Gold", hex: "#F7F3E9" },
      { name: "Champagne Dust", hex: "#E9DFCC" },
      { name: "Antique Bronze", hex: "#CDB78C" },
      { name: "Midnight Noir", hex: "#161618" },
    ],
    inStockMeters: 48,
    rating: 4.98,
    reviewsCount: 42,
    description:
      "The quintessential Ansari signature fabric featured in our cinematic sequence. A breathless balance of celestial lightness and crisp architectural structure, allowing gowns to billow while holding dramatic silhouette memory.",
    characteristics: [
      "Natural organic silk sheen with radiant luster",
      "Stiffness engineered for billowy couture movement",
      "Skin-friendly hypoallergenic natural dye finish",
      "Pure gilded gold threads that resist tarnish",
    ],
    careInstructions: "Specialist dry clean only. Cool iron under protective silk pressing cloth.",
    featuredImage: "/frames/ezgif-frame-001.jpg",
  },
  {
    id: "al-miraj-velvet-brocade",
    name: "Al-Miraj Royal Brocade Velvet",
    subtitle: "Imperial Opulence",
    tagline: "Rich crushed silk velvet embossed with Persian floral vine arabesques.",
    pricePerMeter: 240,
    samplePrice: 20,
    currency: "$",
    weaveType: "Cut Velvet on Silk Ground with Gold Brocade",
    composition: "70% Mulberry Silk, 30% Micro-Rayon Pile, Gold Leaf Trim",
    width: "140 cm (55 inches)",
    weight: "360 GSM",
    origin: "Como & Kashmir Guild",
    idealFor: ["Winter Gala Jackets", "Regal Ballgowns", "Statement Capes", "Bridal Lehengas"],
    colors: [
      { name: "Palace Gold", hex: "#DEC68B" },
      { name: "Ivory Pearl", hex: "#FBF9F4" },
      { name: "Imperial Ruby", hex: "#5C1523" },
      { name: "Deep Emerald", hex: "#0F3224" },
    ],
    inStockMeters: 32,
    rating: 5.0,
    reviewsCount: 38,
    description:
      "A sumptuous, tactile masterpiece favored by European couture houses and eastern royalty alike. The plush pile absorbs ambient light while the raised gold arabesques shimmer with every turn of the wearer.",
    characteristics: [
      "Ultra-plush hand feel with velvety depth",
      "Substantial drape ideal for architectural tailoring",
      "Micro-woven gold wire that catches evening flash photography",
      "Reinforced silk backing preventing pile shedding",
    ],
    careInstructions: "Professional dry clean only. Steam vertical from reverse; do not press flat.",
    featuredImage: "/frames/ezgif-frame-080.jpg",
  },
  {
    id: "chanderi-gilded-chiffon",
    name: "Chanderi Gilded Chiffon",
    subtitle: "The Gossamer Veil",
    tagline: "Featherlight float with micro-woven gold zari pinstripes.",
    pricePerMeter: 145,
    samplePrice: 12,
    currency: "$",
    weaveType: "High-Twist Loose Crepe Weave",
    composition: "90% Chiffon Silk, 10% Gold Metallic Lurex",
    width: "115 cm (45 inches)",
    weight: "32 GSM",
    origin: "Madhya Pradesh Heritage Looms",
    idealFor: ["Cathedral Veils", "Layered Sheer Sleeves", "Breeze Gowns", "Scarves"],
    colors: [
      { name: "Pearl Cream", hex: "#FAF8F2" },
      { name: "Blush Champagne", hex: "#F3E7DC" },
      { name: "Warm Ochre", hex: "#E0CA9E" },
    ],
    inStockMeters: 65,
    rating: 4.95,
    reviewsCount: 51,
    description:
      "So sheer and airy that a 10-meter cut can pass through a ring, yet tough enough to sustain delicate crystal embellishment. Creates an ethereal halo effect under soft sunset and studio lighting.",
    characteristics: [
      "Featherweight vaporous transparency",
      "Subtle crinkle texture that drapes gracefully without clinging",
      "Micro-gold filaments caught in the weave",
      "Non-static natural silk fiber",
    ],
    careInstructions: "Delicate dry clean or hand rinse in cold silk soap. Dry flat in shade.",
    featuredImage: "/frames/ezgif-frame-140.jpg",
  },
  {
    id: "zuleikha-embroidered-tulle",
    name: "Zuleikha Hand-Worked Tulle",
    subtitle: "High Fashion Illusion",
    tagline: "Hexagonal silk mesh adorned with hand-placed golden bullion petals.",
    pricePerMeter: 210,
    samplePrice: 18,
    currency: "$",
    weaveType: "Fine Hexagonal Silk Net with Bullion Embroidery",
    composition: "60% Silk Tulle, 40% Gold Thread & Micro-Sequins",
    width: "145 cm (57 inches)",
    weight: "95 GSM",
    origin: "Lyon & Lucknow Ateliers",
    idealFor: ["Corsetry Overlays", "Illusion Bodices", "Modern Bridal Trains"],
    colors: [
      { name: "Ivory Mist", hex: "#FBF9F5" },
      { name: "Pale Antique Gold", hex: "#E5D4B1" },
      { name: "Obsidian Gilt", hex: "#222120" },
    ],
    inStockMeters: 29,
    rating: 4.97,
    reviewsCount: 29,
    description:
      "Crafted for modern brides and runway designers who desire sheer mystery. The botanical motifs appear to float weightlessly on bare skin, reflecting candlelight with unmatched subtlety.",
    characteristics: [
      "Invisible illusion mesh that melts against skin tones",
      "Hand-knotted gold bullion wire that never frays",
      "Stretch-stable construction prevents distortion under tension",
      "Hand-clipped scalloped selvage along both borders",
    ],
    careInstructions: "Specialist couture dry cleaner only. Store rolled in acid-free tissue.",
    featuredImage: "/frames/ezgif-frame-180.jpg",
  },
  {
    id: "shahmaran-tissue-brocade",
    name: "Shahmaran Pure Tissue Brocade",
    subtitle: "Liquid Gold Metal Weave",
    tagline: "Ultra-fine gold zari warp interlaced with raw mulberry silk weft.",
    pricePerMeter: 280,
    samplePrice: 25,
    currency: "$",
    weaveType: "Zari Tissue Jacquard",
    composition: "55% Pure Real Zari (Silver Core Gilt in 24K Gold), 45% Silk",
    width: "120 cm (48 inches)",
    weight: "165 GSM",
    origin: "Royal Banaras Master Guild",
    idealFor: ["Heirloom Bridal Ensembles", "Sculpted Peplums", "Red Carpet Gowns"],
    colors: [
      { name: "24K Real Gold", hex: "#DFC27A" },
      { name: "Rose-Tinted Gold", hex: "#E5BA9D" },
      { name: "Moonlit Silver-Gold", hex: "#ECE4D0" },
    ],
    inStockMeters: 22,
    rating: 5.0,
    reviewsCount: 64,
    description:
      "The pinnacle of classical eastern textile engineering. Incorporates real silver core wire electroplated with genuine 24-karat gold, creating a metal cloth that behaves like fluid water.",
    characteristics: [
      "Certified precious metal content with certificate of authenticity",
      "Metallic mirror sheen that cannot be replicated by synthetics",
      "High drape recovery without permanent creasing",
      "An investment-grade textile passed down through generations",
    ],
    careInstructions: "Store wrapped in unbleached muslin cloth. Specialist museum textile care.",
    featuredImage: "/frames/ezgif-frame-220.jpg",
  },
  {
    id: "banu-ivory-twill",
    name: "Banu Heavy Ivory Silk Twill",
    subtitle: "Sculptural Bridal Canvas",
    tagline: "Dense, luminous silk twill with crisp hand and supple recovery.",
    pricePerMeter: 165,
    samplePrice: 14,
    currency: "$",
    weaveType: "2x2 Diagonal Silk Twill",
    composition: "100% Pure Mulberry Silk (40 Momme)",
    width: "142 cm (56 inches)",
    weight: "185 GSM",
    origin: "Lake Como Weaving House",
    idealFor: ["Tailored Bridal Suits", "Minimalist Column Gowns", "Corseted Bodices"],
    colors: [
      { name: "Warm Alabaster", hex: "#FAF8F4" },
      { name: "Natural Ecru", hex: "#F2EBE0" },
      { name: "Champagne Butter", hex: "#EFE3CD" },
    ],
    inStockMeters: 55,
    rating: 4.96,
    reviewsCount: 47,
    description:
      "For the minimalist who worships cut and pure material purity. Offers structural body without rigidity, molding to darts and architectural pleats with flawless composure.",
    characteristics: [
      "40 Momme ultra-heavyweight pure mulberry silk",
      "Subtle diagonal twill rib that diffuses direct spotlights",
      "Silky interior comfort without needing synthetic lining",
      "Clean selvage designed for invisible hem finishes",
    ],
    careInstructions: "Dry clean with petroleum solvent only. Iron on reverse with low heat.",
    featuredImage: "/frames/ezgif-frame-040.jpg",
  },
];

export const craftsmanshipPillars = [
  {
    number: "01",
    title: "Ancestral Jacquard Weaving",
    subtitle: "The Mathematical Loom",
    description:
      "Each loom punch-card is calculated to balance yarn tension within 0.1 gram tolerance, ensuring that warp and weft meet in seamless harmony without fabric puckering.",
  },
  {
    number: "02",
    title: "Pure 24K Dipped Gold Zari",
    subtitle: "Precious Metallurgy",
    description:
      "Unlike synthetic polyester lurex that scratches and tarnishes within months, our zari features micro-beaten silver bullion wire dipped in authentic 24-karat gold.",
  },
  {
    number: "03",
    title: "Living Drape & Memory",
    subtitle: "Sculptural Dynamics",
    description:
      "Tested in wind corridors and motion stages. The fabric remembers its shape, cascading into soft, sculptural flutes whether the wearer is still or in stride.",
  },
  {
    number: "04",
    title: "Ethical Silk Harvest",
    subtitle: "Cruelty-Aware Sericulture",
    description:
      "100% traceable silkworm farms nourished on organic mulberry leaves without synthetic pesticides, sustaining multigenerational artisan families.",
  },
];

export const testimonials = [
  {
    quote:
      "Ansari's Noor-e-Zari organza transformed our Paris Couture Week bridal finale. The way the fabric caught the spotlights had editors gasping. It holds volume like architecture yet moves like water.",
    author: "Elena Rostova",
    role: "Creative Director, Maison Rostova Paris",
    city: "Paris, France",
    verified: true,
  },
  {
    quote:
      "Finding genuine 24-karat dipped zari woven onto pure silk ground is nearly impossible today. Ansari Fabric is our secret source for royal wedding commissions in Dubai and London.",
    author: "Zainab Al-Maktoum",
    role: "Bespoke Bridal Couturier",
    city: "Dubai, UAE",
    verified: true,
  },
  {
    quote:
      "As a young designer competing on global stages, working with Ansari Fabric elevated my graduate collection into a luxury award-winning portfolio. The swatch box alone is an art piece.",
    author: "Aria Chen",
    role: "Emerging Designer Award Winner",
    city: "New York, USA",
    verified: true,
  },
];

export const faqList = [
  {
    q: "Can I order sample swatches before committing to full yardage?",
    a: "Yes. Every fabric is available as an 8x10 inch archival swatch with full selvage, certification of silk purity, and color variant cards for $12–$25 including luxury packaging.",
  },
  {
    q: "Do you offer custom loom widths or bespoke color dyeing?",
    a: "For orders of 25 meters or more, our master dyers can formulate custom Pantone or heritage vegetable dye hues, as well as customize zari density.",
  },
  {
    q: "What is your shipping timeframe for international couture orders?",
    a: "Stock fabrics ship within 24 to 48 hours via DHL Express Worldwide or FedEx International Priority with signature requirement and tamper-proof archival wrapping (2–4 business days delivery).",
  },
  {
    q: "How does Ansari ensure authentic gold and silk purity?",
    a: "Every shipment includes a Silk Mark Organization certificate and a signed assay card certifying the purity of precious bullion threads.",
  },
];
