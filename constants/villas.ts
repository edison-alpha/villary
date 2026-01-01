
import { Villa, Suite } from '../types';

const JOGLO_SUITES: Suite[] = [
  {
    id: "suite-taman",
    name: "Kamar Taman",
    size: "45 sq.m / 484 sq.ft",
    view: "Taman tropis dan hutan pinus",
    location: "Sayap timur joglo utama",
    description: "Kamar yang tenang dengan pemandangan taman tropis yang asri dan hutan pinus Tawangmangu. Dilengkapi dengan tempat tidur berukir kayu jati, kamar mandi dengan bathtub batu alam, dan teras pribadi untuk menikmati kopi pagi sambil mendengar kicau burung. Interior bergaya Jawa klasik dengan sentuhan modern yang nyaman.",
    image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80&w=1200",
    basePrice: 850000,
    inclusions: ["Sarapan tradisional Jawa untuk 2 orang", "Welcome drink jamu tradisional", "Pembatalan fleksibel H-7"]
  },
  {
    id: "suite-hutan",
    name: "Kamar Hutan",
    size: "55 sq.m / 592 sq.ft",
    view: "Pemandangan hutan pinus dan Gunung Lawu",
    location: "Paviliun terpisah di area hutan",
    description: "Kamar premium dengan pemandangan langsung ke hutan pinus yang sejuk dan siluet Gunung Lawu yang megah di kejauhan. Dilengkapi dengan kolam rendam pribadi bergaya Jawa, tempat tidur king size dengan kanopi batik, dan pendopo kecil untuk bersantai. Nikmati udara pegunungan yang segar dengan kenyamanan modern.",
    image: "https://images.unsplash.com/photo-1590490359683-658d3d23f972?auto=format&fit=crop&q=80&w=1200",
    basePrice: 1250000,
    inclusions: ["Sarapan tradisional untuk 2 orang", "Kolam rendam pribadi", "Afternoon tea dengan jajanan pasar"]
  },
  {
    id: "suite-joglo-agung",
    name: "Joglo Agung Suite (2 Kamar)",
    size: "150 sq.m / 1615 sq.ft",
    view: "Panorama 360° hutan pinus & Gunung Lawu",
    location: "Joglo utama dengan area privat",
    description: "Pengalaman menginap paling eksklusif di Omah Turu. Joglo berusia 150 tahun yang telah direstorasi dengan penuh cinta, menampilkan ukiran kayu jati asli dan arsitektur tradisional Jawa yang megah. Terdiri dari 2 kamar tidur utama, ruang tamu dengan pendopo terbuka, kolam renang infinity pribadi menghadap Gunung Lawu, dan dapur tradisional. Dilengkapi dengan butler pribadi dan chef untuk pengalaman kuliner Jawa yang autentik.",
    image: "https://images.unsplash.com/photo-1544124499-58912cbddaad?auto=format&fit=crop&q=80&w=1200",
    basePrice: 3500000,
    inclusions: ["Jamu welcome drink & snack tradisional", "Chef & Butler pribadi", "Tur wisata Tawangmangu gratis", "Concierge 24 jam"]
  }
];

export const ALL_VILLAS: Villa[] = [
  { 
    id: "omah-turu-joglo",
    name: "Omah Turu Joglo", 
    price: 850000, 
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&q=80&w=2400", 
    location: "Tawangmangu, Karanganyar, Jawa Tengah",
    tags: ["Heritage", "Joglo Tradisional", "View Gunung Lawu"],
    description: "Omah Turu Joglo adalah penginapan heritage yang menawarkan pengalaman menginap autentik di rumah joglo tradisional Jawa berusia lebih dari 100 tahun. Terletak di area hutan pinus Tawangmangu dengan pemandangan Gunung Lawu yang memukau. Udara pegunungan yang sejuk dan suasana alam yang asri menjadikan tempat ini sempurna untuk melepas penat. Setiap sudut joglo ini menyimpan cerita dan filosofi Jawa yang dalam.",
    amenities: [
      "Kolam Renang Infinity dengan View Gunung Lawu", 
      "Pendopo untuk Yoga & Meditasi", 
      "Spa Tradisional Jawa (Lulur & Pijat)", 
      "Trekking ke Air Terjun", 
      "Kelas Memasak Masakan Jawa"
    ],
    architecture: [
      "Joglo Jawa Klasik Usia 150 Tahun", 
      "Ukiran Kayu Jati Asli Buatan Tangan", 
      "Gebyok Antik dengan Motif Wayang"
    ],
    attractions: [
      "Air Terjun Grojogan Sewu (15 menit)", 
      "Candi Cetho (30 menit)", 
      "Candi Sukuh (25 menit)",
      "Puncak Gunung Lawu (2 jam trekking)"
    ],
    livingArea: 500,
    bedrooms: 5,
    postedAt: "Terverifikasi",
    curator: "Omah Turu Heritage",
    suites: JOGLO_SUITES
  }
];

export const PRACTICAL_INFO = {
  address: "Area Hutan, Gondosuli, Kec. Tawangmangu, Kabupaten Karanganyar, Jawa Tengah 57792",
  internet: { public: "WiFi Gratis", room: "WiFi Fiber Optik Cepat" },
  children: "Anak-anak semua usia dipersilakan. Tersedia area bermain dan aktivitas edukasi budaya.",
  checkInOut: { checkIn: "14:00 WIB", checkOut: "12:00 WIB", flexible: "Fleksibel sesuai ketersediaan" },
  transport: "Penjemputan dari Bandara Adi Soemarmo Solo/Stasiun Solo Balapan. Rental mobil tersedia.",
  smoking: "Dilarang merokok di dalam ruangan. Area merokok tersedia di taman.",
  pets: "Hewan peliharaan kecil diperbolehkan dengan pemberitahuan sebelumnya.",
  parking: "Parkir gratis di area penginapan"
};

export const ESTATE_CONTENT = {
  staff: [
    { title: "Pengelola Omah", desc: "Siap membantu kebutuhan Anda 24 jam dengan keramahan khas Jawa." },
    { title: "Juru Masak", desc: "Menyajikan masakan Jawa autentik dari resep turun-temurun." },
    { title: "Pemandu Wisata", desc: "Ahli sejarah dan wisata alam Tawangmangu untuk pengalaman bermakna." }
  ],
  alwaysIncluded: [
    "Jamu tradisional & teh Jawa saat kedatangan",
    "Sarapan tradisional Jawa setiap hari",
    "Pembersihan kamar & layanan turndown",
    "Minuman di minibar (teh, kopi, air mineral)",
    "Akses kolam renang & fasilitas umum",
    "WiFi gratis di seluruh area"
  ],
  dining: [
    { title: "Pendopo Makan", desc: "Sajian masakan Jawa autentik dengan suasana tradisional." },
    { title: "Teras Kopi", desc: "Kopi Jawa dan jajanan pasar dengan pemandangan Gunung Lawu." }
  ],
  leisure: [
    { title: "Spa Tradisional", desc: "Perawatan lulur, boreh, dan pijat tradisional Jawa." },
    { title: "Pendopo Yoga", desc: "Sesi yoga pagi dengan pemandangan hutan pinus dan Gunung Lawu." }
  ]
};

export const INSPIRATIONS = [
  { 
    title: "Joglo Agung", 
    location: "Suite Utama", 
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=800",
    excerpt: "Kemegahan arsitektur Jawa dalam balutan kenyamanan modern. Rasakan filosofi hidup Jawa di setiap sudut joglo bersejarah ini."
  },
  { 
    title: "Pagi di Pegunungan", 
    location: "Pemandangan Alam", 
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80&w=800",
    excerpt: "Bangun dengan udara sejuk pegunungan dan pemandangan Gunung Lawu yang megah. Nikmati kopi Jawa di tengah hutan pinus."
  },
  { 
    title: "Wisata Alam", 
    location: "Tawangmangu", 
    image: "https://images.unsplash.com/photo-1602343168117-bb8ffe3e2e9f?auto=format&fit=crop&q=80&w=800",
    excerpt: "Jelajahi keindahan alam Tawangmangu dari Air Terjun Grojogan Sewu hingga Candi Cetho. Setiap perjalanan adalah petualangan."
  }
];
