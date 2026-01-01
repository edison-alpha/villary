
export interface Suite {
  id: string;
  name: string;
  size: string;
  view: string;
  location: string;
  description: string;
  image: string;
  basePrice: number;
  inclusions: string[];
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  points: number;
}

export interface Villa {
  id: string;
  name: string;
  location: string;
  price: number;
  rating: number;
  reviews: number;
  image: string;
  tags: string[];
  description: string;
  amenities: string[];
  architecture: string[];
  attractions: string[];
  livingArea: number; // in m²
  bedrooms: number;
  postedAt: string;
  curator: string;
  suites?: Suite[];
}

export interface Stat {
  value: string;
  label: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
