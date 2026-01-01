
import { Villa, Suite } from '../types';

const AMALFI_SUITES: Suite[] = [
  {
    id: "suite-garden",
    name: "Garden Suite",
    size: "243 sq.m / 2616 sq.ft",
    view: "Menoreh Hills and surrounding farmland",
    location: "Throughout the hotel",
    description: "A serene sanctuary featuring panoramic views of the meticulously manicured terraced gardens and the lush Kedu Plain. The master bathroom is an architectural haven of local limestone, featuring a deep-soaking volcanic stone bathtub and a separate tropical rain shower. A private sun-drenched terrace offers a secluded space for morning meditation or al-fresco breakfast amidst the scent of wild jasmine.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
    basePrice: 1650,
    inclusions: ["American Breakfast for two each day", "Flexible Cancellation before 1 week"]
  },
  {
    id: "suite-pool",
    name: "Garden Pool Suite",
    size: "243 sq.m / 2616 sq.ft",
    view: "Views of the Menoreh Hills and farmland",
    location: "Throughout the resort",
    description: "Perched for ultimate privacy, this suite boasts a private heated plunge pool that seems to float over the rugged Amalfi cliffs and the azure Tyrrhenian Sea. The interiors blend contemporary Italian luxury with Mediterranean heritage, while the spa-inspired bathroom features hand-carved stone basins, premium Ortigia toiletries, and a glass-enclosed rain shower designed to capture the golden hour light.",
    image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200",
    basePrice: 1980,
    inclusions: ["American Breakfast for two each day", "Private Pool Service", "Flexible Cancellation"]
  },
  {
    id: "suite-dalem",
    name: "Dalem Jiwo Suite (2 Bedrooms)",
    size: "1200 sq.m / 12917 sq.ft",
    view: "Rice terrace, Menoreh Hills and Borobudur Temple",
    location: "Private setting to the side of the main resort",
    description: "The estate's crown jewel. A 1,200 sq.m palatial masterpiece offering 360-degree views of the historic horizon and the shimmering coastline. It features two grand master suites, each equipped with a panoramic bathroom including a circular sunken tub, dual rain showers, and walk-in dressing rooms. Guests enjoy a private 15m emerald-tiled infinity pool, a dedicated butler's pantry for discreet service, and a sprawling central rotunda for bespoke private dining under the stars.",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1200",
    basePrice: 7850,
    inclusions: ["Champagne on arrival", "Private Chef & Butler", "24/7 Priority Concierge"]
  }
];

export const ALL_VILLAS: Villa[] = [
  { 
    id: "villays-flagship",
    name: "Villays Estate Amalfi", 
    price: 2450, 
    rating: 5.0,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2400", 
    location: "Positano, Amalfi Coast, Italy",
    tags: ["Exclusive", "Fully Staffed", "Ocean Front"],
    description: "Not all luxury retreats are created equal. We have visited thousands to find the one that truly speaks to the soul. Villays Amalfi is not just a residence; it's a 1,200m² masterpiece of Mediterranean heritage. Perched on the Kedu Plain's vertical equivalents in Italy, it mirrors the aura of zen and tranquility of its historical neighbors. From the private limestone path leading to the sea to the hand-carved stone baths, every inch is a testament to timeless Italian grace.",
    amenities: [
      "25m Heated Infinity Pool", 
      "Private Cinema with 4K Laser Projection", 
      "Fully Equipped Wellness Spa & Sauna", 
      "Smart Home Automation (Control4)", 
      "Professional Grade Gym (Technogym)"
    ],
    architecture: [
      "Belle Époque Heritage Facade", 
      "Local Hand-Cut Limestone Walls", 
      "Floor-to-Ceiling Disappearing Glass Walls"
    ],
    attractions: [
      "Path of the Gods (Sentiero degli Dei)", 
      "Li Galli Private Islands", 
      "Spiaggia Grande Positano"
    ],
    livingArea: 1200,
    bedrooms: 6,
    postedAt: "Just Verified",
    curator: "Villays Signature",
    suites: AMALFI_SUITES
  }
];

export const PRACTICAL_INFO = {
  address: "Via Cristoforo Colombo, 84017 Positano SA, Italy",
  internet: { public: "Free High-Speed", room: "Private Fiber Optic (1Gbps)" },
  children: "Children of all ages are welcome. Specialized childcare services available.",
  checkInOut: { checkIn: "3:00 PM", checkOut: "11:00 AM", flexible: "Subject to availability" },
  transport: "Complimentary airport transfer. Private helipad access on-site.",
  smoking: "Non-smoking indoors. Designated terrace areas available.",
  pets: "Small pets welcome with prior notice. Specialized pet-concierge available.",
  parking: "Valet parking & secure underground garage (Free of charge)"
};

export const ESTATE_CONTENT = {
  staff: [
    { title: "Estate Manager", desc: "Your direct link to the region, available 24/7." },
    { title: "Executive Chef", desc: "Bespoke menu planning focusing on organic local produce." },
    { title: "Lifestyle Butler", desc: "Expert in itinerary planning and seamless guest comfort." }
  ],
  alwaysIncluded: [
    "Welcome signature cocktails upon arrival",
    "Daily a la carte breakfast in the lemon grove",
    "Daily housekeeping & evening turndown service",
    "Complimentary luxury mini-bar (replenished daily)",
    "Pre-arrival grocery stocking service",
    "Unlimited access to Wellness & Spa facilities"
  ],
  dining: [
    { title: "The Terrace Room", desc: "Mediterranean fine dining under the stars." },
    { title: "Azure Bar", desc: "Mixology at the cliff's edge with sunset views." }
  ],
  leisure: [
    { title: "Limestone Spa", desc: "Traditional Italian wellness treatments and Turkish Hammam." },
    { title: "The Fitness Pavilion", desc: "State-of-the-art Technogym equipment with sea views." }
  ]
};

export const INSPIRATIONS = [
  { 
    title: "The Shore Suite", 
    location: "Flagship Space", 
    image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80&w=800",
    excerpt: "Where Time Rests by the Sea. On a cliff top above the Gulf of Salerno, days slow to the rhythm of tides and timeless traditions."
  },
  { 
    title: "Ravello", 
    location: "Villa Cimbrone", 
    image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80&w=800",
    excerpt: "A Story in Three Acts. In the gardens of Villa Cimbrone, light and shadow paint a poem in stone."
  },
  { 
    title: "Where Wilderness Writes the Story", 
    location: "Amalfi Coast", 
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&q=80&w=800",
    excerpt: "The horizon stretches wider, the silence sharper. Exploring the hidden coves of the Tyrrhenian Sea."
  }
];
