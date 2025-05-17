import { 
  faNewspaper, 
  faBlog, 
  faQuestionCircle, 
  faHandshake 
} from '@fortawesome/free-solid-svg-icons';
import { SushiItem } from '../context/CartContext';

// Section data with proper titles for ScrollSpy
export interface SectionData {
  id: string;
  title: string;
  icon: string;
}

export const sectionData: SectionData[] = [
  { id: 'hero', title: 'Welcome', icon: '✦' },
  { id: 'about', title: 'Our Story', icon: '✦' },
  { id: 'featured', title: 'Featured', icon: '✦' },
  { id: 'testimonials', title: 'Testimonials', icon: '✦' },
  { id: 'gallery', title: 'Gallery', icon: '✦' },
  { id: 'media', title: 'Media', icon: '✦' },
  { id: 'contact', title: 'Reservation', icon: '✦' },
  { id: 'footer', title: 'Contact', icon: '✦' },
];

// Featured sushi data
export const featuredSushi: SushiItem[] = [
  {
    id: 1,
    name: 'Rainbow Roll',
    description: 'A colorful roll topped with various sashimi.',
    price: 16.99,
    image: 'https://placehold.co/340x450',
    category: 'Maki',
    type: 'Rice Roll',
    ingredients: ['Imitation Crab', 'Avocado', 'Cucumber', 'Assorted Fish', 'Rice', 'Nori'],
    tags: ['Premium', 'Non-Spicy', 'Popular'],
    ratings: 4.9,
    reviewCount: 178,
    isVegetarian: false,
    isGlutenFree: false,
    isPopular: true,
    nutrition: {
      calories: 340,
      protein: 14,
      carbs: 40,
      fat: 13
    },
    addOns: [
      { id: 1, name: 'Spicy Mayo', price: 0.75 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '8 pieces'
  },
  {
    id: 2,
    name: 'Salmon Nigiri',
    description: 'Fresh salmon on a bed of seasoned rice.',
    price: 4.99,
    image: 'https://placehold.co/340x450',
    category: 'Nigiri',
    type: 'Sushi',
    ingredients: ['Salmon', 'Rice', 'Wasabi'],
    tags: ['Popular', 'Best Seller', 'Non-Spicy'],
    ratings: 4.8,
    reviewCount: 124,
    isVegetarian: false,
    isGlutenFree: true,
    isPopular: true,
    nutrition: {
      calories: 68,
      protein: 5,
      carbs: 9,
      fat: 2
    },
    addOns: [
      { id: 1, name: 'Extra Wasabi', price: 0.50 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '1 piece'
  },
  {
    id: 3,
    name: 'Dragon Roll',
    description: 'Eel and cucumber roll topped with avocado.',
    price: 15.99,
    image: 'https://placehold.co/340x450',
    category: 'Maki',
    type: 'Rice Roll',
    ingredients: ['Eel', 'Cucumber', 'Avocado', 'Sweet Sauce', 'Rice', 'Nori'],
    tags: ['Premium', 'Non-Spicy', 'Popular'],
    ratings: 4.8,
    reviewCount: 143,
    isVegetarian: false,
    isGlutenFree: false,
    isPopular: true,
    nutrition: {
      calories: 320,
      protein: 11,
      carbs: 42,
      fat: 12
    },
    addOns: [
      { id: 1, name: 'Extra Sweet Sauce', price: 0.75 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '8 pieces'
  },
  {
    id: 4,
    name: 'Tuna Sashimi',
    description: 'Premium cuts of fresh tuna.',
    price: 18.99,
    image: 'https://placehold.co/340x450',
    category: 'Sashimi',
    type: 'Sashimi',
    ingredients: ['Tuna'],
    tags: ['Premium', 'Non-Spicy', 'Gluten-Free'],
    ratings: 4.7,
    reviewCount: 89,
    isVegetarian: false,
    isGlutenFree: true,
    isPopular: false,
    nutrition: {
      calories: 120,
      protein: 26,
      carbs: 0,
      fat: 2
    },
    addOns: [
      { id: 1, name: 'Wasabi', price: 0.50 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '5 pieces'
  },
  {
    id: 5,
    name: 'Veggie Roll',
    description: 'Assorted vegetables with avocado and carrot.',
    price: 9.99,
    image: 'https://placehold.co/340x450',
    category: 'Maki',
    type: 'Rice Roll',
    ingredients: ['Avocado', 'Carrot', 'Cucumber', 'Rice', 'Nori'],
    tags: ['Vegetarian', 'Non-Spicy', 'Healthy'],
    ratings: 4.3,
    reviewCount: 65,
    isVegetarian: true,
    isGlutenFree: true,
    isPopular: false,
    nutrition: {
      calories: 200,
      protein: 5,
      carbs: 35,
      fat: 6
    },
    addOns: [
      { id: 1, name: 'Extra Avocado', price: 1.00 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '8 pieces'
  },
  {
    id: 6,
    name: 'Rainbow Roll',
    description: 'California roll topped with assorted sashimi and avocado.',
    price: 17.99,
    image: 'https://placehold.co/340x450',
    category: 'Maki',
    type: 'Rice Roll',
    ingredients: ['Crab', 'Avocado', 'Tuna', 'Salmon', 'Rice', 'Nori'],
    tags: ['Premium', 'Non-Spicy', 'Popular'],
    ratings: 4.9,
    reviewCount: 210,
    isVegetarian: false,
    isGlutenFree: false,
    isPopular: true,
    nutrition: {
      calories: 350,
      protein: 16,
      carbs: 40,
      fat: 14
    },
    addOns: [
      { id: 1, name: 'Extra Wasabi', price: 0.50 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '8 pieces'
  }
];

// Testimonials data
export interface Testimonial {
  id: number;
  name: string;
  comment: string;
  image: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    comment: 'The Dragon Roll is simply divine! Fresh ingredients and expert preparation.',
    image: 'https://placehold.co/100x100',
    rating: 5
  },
  {
    id: 2,
    name: 'Michael Chen',
    comment: 'Authentic Japanese flavors that remind me of Tokyo. The omakase experience is a must-try!',
    image: 'https://placehold.co/100x100',
    rating: 5
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    comment: 'Such a beautiful atmosphere and the service is impeccable. The sashimi platter is exceptional.',
    image: 'https://placehold.co/100x100',
    rating: 4
  },
  {
    id: 4,
    name: 'Emily Rodriguez',
    comment: 'Such a beautiful atmosphere and the service is impeccable. The sashimi platter is exceptional.',
    image: 'https://placehold.co/100x100',
    rating: 4
  }

];

// Gallery images
export const galleryImages: string[] = [
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
  'https://placehold.co/600x400',
  'https://placehold.co/600x400'
];

// Media section data
export interface MediaSection {
  id: string;
  title: string;
  icon: any;
  description: string;
  image: string;
  path: string;
}

export const mediaSections: MediaSection[] = [
  {
    id: 'blog',
    title: 'Blog',
    icon: faBlog,
    description: 'Discover culinary stories, chef insights, and Japanese food culture.',
    image: 'https://placehold.co/200x400',
    path: '/#blog' // Changed to internal anchor for simplicity
  },
  {
    id: 'news',
    title: 'News',
    icon: faNewspaper,
    description: 'Stay updated with our latest events, promotions, and announcements.',
    image: 'https://placehold.co/200x400',
    path: '/#news' // Changed to internal anchor for simplicity
  },
  {
    id: 'faq',
    title: 'FAQ',
    icon: faQuestionCircle,
    description: 'Find answers to commonly asked questions about our services.',
    image: 'https://placehold.co/200x400',
    path: '/#faq' // Changed to internal anchor for simplicity
  },
  {
    id: 'partners',
    title: 'Partners',
    icon: faHandshake,
    description: 'Learn about our partners and collaboration opportunities.',
    image: 'https://placehold.co/200x400',
    path: '/#partners' // Changed to internal anchor for simplicity
  }
]; 