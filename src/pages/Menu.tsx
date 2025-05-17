import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, InputGroup, Tabs, Tab, Badge, Dropdown, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faSort, faHeart, faStar, faInfoCircle, faArrowLeft, faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHeart as farHeart } from '@fortawesome/free-regular-svg-icons';
import { useCart, SushiItem } from '../context/CartContext';
import '../styles/Menu.css'; // Import CSS file for styling


// Enhanced menu data with additional properties
const menuItems: SushiItem[] = [
  // Nigiri
  {
    id: 101,
    name: 'Salmon Nigiri',
    description: 'Fresh salmon on a bed of seasoned rice.',
    price: 4.99,
    image: 'https://placehold.co/600x400',
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
    id: 102,
    name: 'Tuna Nigiri',
    description: 'Premium tuna on seasoned rice.',
    price: 5.99,
    image: 'https://placehold.co/600x400',
    category: 'Nigiri',
    type: 'Sushi',
    ingredients: ['Tuna', 'Rice', 'Wasabi'],
    tags: ['Premium', 'Non-Spicy'],
    ratings: 4.7,
    reviewCount: 98,
    isVegetarian: false,
    isGlutenFree: true,
    isPopular: true,
    nutrition: {
      calories: 70,
      protein: 6,
      carbs: 9,
      fat: 1.5
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
    id: 103,
    name: 'Shrimp Nigiri',
    description: 'Sweet shrimp on seasoned rice.',
    price: 4.50,
    image: 'https://placehold.co/600x400',
    category: 'Nigiri',
    type: 'Sushi',
    ingredients: ['Shrimp', 'Rice', 'Wasabi'],
    tags: ['Non-Spicy'],
    ratings: 4.5,
    reviewCount: 87,
    isVegetarian: false,
    isGlutenFree: true,
    isPopular: false,
    nutrition: {
      calories: 65,
      protein: 5,
      carbs: 9,
      fat: 1
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
    id: 104,
    name: 'Eel Nigiri',
    description: 'Freshwater eel with sweet glaze on rice.',
    price: 6.50,
    image: 'https://placehold.co/600x400',
    category: 'Nigiri',
    type: 'Sushi',
    ingredients: ['Eel', 'Rice', 'Sweet Sauce'],
    tags: ['Premium', 'Non-Spicy'],
    ratings: 4.6,
    reviewCount: 76,
    isVegetarian: false,
    isGlutenFree: false,
    isPopular: false,
    nutrition: {
      calories: 95,
      protein: 6,
      carbs: 12,
      fat: 3
    },
    addOns: [
      { id: 1, name: 'Extra Sweet Sauce', price: 0.50 },
      { id: 2, name: 'Extra Ginger', price: 0.50 }
    ],
    spicyLevel: 0,
    servingSize: '1 piece'
  },

  // Maki
  {
    id: 201,
    name: 'California Roll',
    description: 'Crab, avocado, cucumber, tobiko.',
    price: 9.99,
    image: 'https://placehold.co/600x400',
    category: 'Maki',
    type: 'Rice Roll',
    ingredients: ['Imitation Crab', 'Avocado', 'Cucumber', 'Tobiko', 'Rice', 'Nori'],
    tags: ['Popular', 'Best Seller', 'Non-Spicy'],
    ratings: 4.9,
    reviewCount: 201,
    isVegetarian: false,
    isGlutenFree: false,
    isPopular: true,
    nutrition: {
      calories: 255,
      protein: 7,
      carbs: 38,
      fat: 7
    },
    addOns: [
      { id: 1, name: 'Spicy Mayo', price: 0.75 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '6 pieces'
  },
  {
    id: 202,
    name: 'Spicy Tuna Roll',
    description: 'Spicy tuna, cucumber, sprouts.',
    price: 11.99,
    image: 'https://placehold.co/600x400',
    category: 'Maki',
    type: 'Rice Roll',
    ingredients: ['Tuna', 'Spicy Mayo', 'Cucumber', 'Sprouts', 'Rice', 'Nori'],
    tags: ['Popular', 'Spicy'],
    ratings: 4.7,
    reviewCount: 156,
    isVegetarian: false,
    isGlutenFree: false,
    isPopular: true,
    nutrition: {
      calories: 275,
      protein: 12,
      carbs: 36,
      fat: 8
    },
    addOns: [
      { id: 1, name: 'Extra Spicy Mayo', price: 0.75 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 2,
    servingSize: '6 pieces'
  },
  {
    id: 203,
    name: 'Dragon Roll',
    description: 'Eel, cucumber, topped with avocado.',
    price: 15.99,
    image: 'https://placehold.co/600x400',
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
    id: 204,
    name: 'Rainbow Roll',
    description: 'California roll topped with assorted sashimi.',
    price: 16.99,
    image: 'https://placehold.co/600x400',
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

  // Sashimi
  {
    id: 301,
    name: 'Tuna Sashimi',
    description: 'Five pieces of premium tuna.',
    price: 18.99,
    image: 'https://placehold.co/600x400',
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
    id: 302,
    name: 'Salmon Sashimi',
    description: 'Five pieces of fresh salmon.',
    price: 16.99,
    image: 'https://placehold.co/600x400',
    category: 'Sashimi',
    type: 'Sashimi',
    ingredients: ['Salmon'],
    tags: ['Popular', 'Non-Spicy', 'Gluten-Free'],
    ratings: 4.8,
    reviewCount: 112,
    isVegetarian: false,
    isGlutenFree: true,
    isPopular: true,
    nutrition: {
      calories: 175,
      protein: 23,
      carbs: 0,
      fat: 9
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
    id: 303,
    name: 'Yellowtail Sashimi',
    description: 'Five pieces of yellowtail.',
    price: 19.99,
    image: 'https://placehold.co/600x400',
    category: 'Sashimi',
    type: 'Sashimi',
    ingredients: ['Yellowtail'],
    tags: ['Premium', 'Non-Spicy', 'Gluten-Free'],
    ratings: 4.6,
    reviewCount: 67,
    isVegetarian: false,
    isGlutenFree: true,
    isPopular: false,
    nutrition: {
      calories: 150,
      protein: 25,
      carbs: 0,
      fat: 5
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
    id: 304,
    name: 'Assorted Sashimi',
    description: 'Chef\'s selection of fresh fish.',
    price: 24.99,
    image: 'https://placehold.co/600x400',
    category: 'Sashimi',
    type: 'Sashimi',
    ingredients: ['Tuna', 'Salmon', 'Yellowtail', 'Octopus', 'White Fish'],
    tags: ['Premium', 'Non-Spicy', 'Gluten-Free'],
    ratings: 4.9,
    reviewCount: 94,
    isVegetarian: false,
    isGlutenFree: true,
    isPopular: true,
    nutrition: {
      calories: 220,
      protein: 40,
      carbs: 0,
      fat: 7
    },
    addOns: [
      { id: 1, name: 'Wasabi', price: 0.50 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '12 pieces'
  },

  // Special
  {
    id: 401,
    name: 'Chirashi Bowl',
    description: 'Assorted sashimi served over sushi rice.',
    price: 22.99,
    image: 'https://placehold.co/600x400',
    category: 'Special',
    type: 'Rice Bowl',
    ingredients: ['Assorted Sashimi', 'Sushi Rice', 'Pickled Vegetables', 'Wasabi', 'Soy Sauce'],
    tags: ['Popular', 'Premium', 'Non-Spicy'],
    ratings: 4.9,
    reviewCount: 142,
    isVegetarian: false,
    isGlutenFree: false,
    isPopular: true,
    nutrition: {
      calories: 450,
      protein: 32,
      carbs: 60,
      fat: 10
    },
    addOns: [
      { id: 1, name: 'Extra Wasabi', price: 0.50 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '1 bowl'
  },
  {
    id: 402,
    name: 'Sushi Boat',
    description: 'Chef\'s selection of nigiri and maki rolls.',
    price: 42.99,
    image: 'https://placehold.co/600x400',
    category: 'Special',
    type: 'Combo',
    ingredients: ['Assorted Nigiri', 'Assorted Maki', 'Soy Sauce', 'Wasabi', 'Ginger'],
    tags: ['Premium', 'Best Seller', 'Non-Spicy', 'Combo'],
    ratings: 4.9,
    reviewCount: 206,
    isVegetarian: false,
    isGlutenFree: false,
    isPopular: true,
    nutrition: {
      calories: 850,
      protein: 45,
      carbs: 110,
      fat: 28
    },
    addOns: [
      { id: 1, name: 'Extra Wasabi', price: 0.50 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Spicy Mayo', price: 0.75 }
    ],
    spicyLevel: 0,
    servingSize: '2-3 people'
  },
  
  // Vegetarian options
  {
    id: 501,
    name: 'Avocado Roll',
    description: 'Fresh avocado wrapped in seasoned rice and seaweed.',
    price: 7.99,
    image: 'https://placehold.co/600x400',
    category: 'Maki',
    type: 'Rice Roll',
    ingredients: ['Avocado', 'Rice', 'Nori'],
    tags: ['Vegetarian', 'Non-Spicy', 'Gluten-Free'],
    ratings: 4.5,
    reviewCount: 78,
    isVegetarian: true,
    isGlutenFree: true,
    isPopular: false,
    nutrition: {
      calories: 200,
      protein: 3,
      carbs: 30,
      fat: 8
    },
    addOns: [
      { id: 1, name: 'Wasabi', price: 0.50 },
      { id: 2, name: 'Extra Ginger', price: 0.50 },
      { id: 3, name: 'Soy Sauce', price: 0 }
    ],
    spicyLevel: 0,
    servingSize: '6 pieces'
  },
  
  // Dessert
  {
    id: 601,
    name: 'Mochi Ice Cream',
    description: 'Traditional Japanese rice cake filled with ice cream.',
    price: 5.99,
    image: 'https://placehold.co/600x400',
    category: 'Dessert',
    type: 'Dessert',
    ingredients: ['Rice Flour', 'Ice Cream', 'Sugar'],
    tags: ['Vegetarian', 'Sweet', 'Popular'],
    ratings: 4.7,
    reviewCount: 112,
    isVegetarian: true,
    isGlutenFree: false,
    isPopular: true,
    nutrition: {
      calories: 130,
      protein: 2,
      carbs: 25,
      fat: 3
    },
    addOns: [],
    spicyLevel: 0,
    servingSize: '3 pieces'
  },
  
  // Drink
  {
    id: 701,
    name: 'Japanese Green Tea',
    description: 'Traditional hot green tea.',
    price: 2.99,
    image: 'https://placehold.co/600x400',
    category: 'Drink',
    type: 'Drink',
    ingredients: ['Green Tea Leaves'],
    tags: ['Vegetarian', 'Gluten-Free', 'Hot'],
    ratings: 4.6,
    reviewCount: 95,
    isVegetarian: true,
    isGlutenFree: true,
    isPopular: false,
    nutrition: {
      calories: 0,
      protein: 0,
      carbs: 0,
      fat: 0
    },
    addOns: [],
    spicyLevel: 0,
    servingSize: '1 cup'
  }
];

// Combo menus
const comboMenus = [
  {
    id: 1001,
    name: 'Salmon Lover Set',
    description: 'Perfect for salmon enthusiasts',
    price: 29.99,
    image: 'https://placehold.co/600x400',
    items: [101, 302, 501],
    servingSize: '1 person',
    isPopular: true
  },
  {
    id: 1002,
    name: 'Family Feast',
    description: 'Variety of rolls and nigiri for 3-4 people',
    price: 59.99,
    image: 'https://placehold.co/600x400',
    items: [101, 102, 201, 202, 203, 302],
    servingSize: '3-4 people',
    isPopular: true
  },
  {
    id: 1003,
    name: 'Vegetarian Delight',
    description: 'Meat-free selection for vegetarians',
    price: 24.99,
    image: 'https://placehold.co/600x400',
    items: [501, 601, 701],
    servingSize: '1-2 people',
    isPopular: false
  }
];

// 3D Flip Card Component
const FlipCard: React.FC<{
  item: SushiItem;
  onAddToCart: (item: SushiItem) => void;
  onToggleFavorite: (id: number) => void;
  isFavorite: boolean;
  showNutrition: boolean;
}> = ({ item, onAddToCart, onToggleFavorite, isFavorite, showNutrition }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };
  
 

  // Handle key press for accessibility
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  return (
    <div 
      className="flip-card-container" 
      onClick={handleFlip}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? `Close details for ${item.name}` : `Show details for ${item.name}`}
    >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of the Card */}
        <div className="flip-card-front" aria-hidden={isFlipped}>
          <div className="luxury-card-banner"></div>
          <img src={item.image} alt={item.name} className="flip-card-img" />
          <div className="flip-card-content">
            <div className="d-flex justify-content-between align-items-start">
              <h3 className="flip-card-title">{item.name}</h3>
              <Button
                variant="transparent"
                className="p-0 border-0 favorite-btn-luxury"
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite(item.id);
                }}
                aria-label={isFavorite ? `Remove ${item.name} from favorites` : `Add ${item.name} to favorites`}
              >
                <FontAwesomeIcon 
                  icon={isFavorite ? faHeart : farHeart} 
                  className={isFavorite ? "text-danger" : "text-gold"} 
                  size="lg"
                />
              </Button>
            </div>
            <div className="d-flex align-items-center justify-content-between mb-2">
              <div className="d-flex align-items-center">
                <span className="me-1">{item.ratings}</span>
                <FontAwesomeIcon icon={faStar} className="text-gold"/>
                <span className="ms-1 text-muted">({item.reviewCount})</span>
              </div>
              <div className="flip-card-price mt-2">${item.price.toFixed(2)}</div>
            </div>

           
            
            
            <div className="flip-card-tags">
              {item.tags.slice(0, 2).map(tag => (
                <Badge 
                  key={tag} 
                  bg="dark" 
                  className="me-1 luxury-badge"
                >
                  {tag}
                </Badge>
              ))}
            </div>

            

            <Button 
              variant="primary" 
              className="luxury-button mt-2"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(item);
              }}
              aria-label={`Add ${item.name} to cart`}
            >
              <span className="button-text">Add to Cart</span>
            </Button>

          </div>
        </div>
        
        {/* Back of the Card */}
        <div className="flip-card-back" aria-hidden={!isFlipped}>
          <div className="luxury-card-banner-back"></div>
          <h3 className="flip-card-back-title">{item.name}</h3>
          
          <p className="flip-card-description">{item.description}</p>
          
          <div className="flip-card-ingredients">
            <strong className="text-gold">Ingredients:</strong> {item.ingredients.join(', ')}
          </div>
          
          {showNutrition && (
            <div className="flip-card-nutrition">
              <strong className="text-gold">Nutrition Info:</strong>
              <div className="d-flex justify-content-between mt-1">
                <span>Calories: {item.nutrition.calories}</span>
                <span>Protein: {item.nutrition.protein}g</span>
              </div>
              <div className="d-flex justify-content-between">
                <span>Carbs: {item.nutrition.carbs}g</span>
                <span>Fat: {item.nutrition.fat}g</span>
              </div>
            </div>
          )}
          
          <div className="mt-2 mb-3">
            {item.isVegetarian && <Badge bg="success" className="me-1 mb-2 luxury-badge">Vegetarian</Badge>}
            {item.isGlutenFree && <Badge bg="info" className="me-1 mb-2 luxury-badge">Gluten-Free</Badge>}
            {item.spicyLevel > 0 && (
              <Badge bg="danger" className="me-1 mb-2 luxury-badge">
                Spicy {Array(item.spicyLevel).fill('🌶️').join('')}
              </Badge>
            )}
          </div>
          
          <Button 
            variant="primary" 
            className="luxury-button w-100 mt-auto"
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(item);
            }}
          >
            <span className="button-text">Add to Cart • ${item.price.toFixed(2)}</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

// Combo Flip Card Component
const ComboFlipCard: React.FC<{
  combo: {
    id: number;
    name: string;
    description: string;
    price: number;
    image: string;
    items: number[];
    servingSize: string;
    isPopular: boolean;
  };
  onAddCombo: (itemIds: number[]) => void;
  menuItems: SushiItem[];
}> = ({ combo, onAddCombo, menuItems }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handle key press for accessibility
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleFlip();
    }
  };

  // Get the actual menu items in this combo
  const comboItems = menuItems.filter(item => combo.items.includes(item.id));

  return (
    <div 
      className="flip-card-container" 
      onClick={handleFlip}
      onKeyPress={handleKeyPress}
      tabIndex={0}
      role="button"
      aria-label={isFlipped ? `Close details for ${combo.name} combo` : `Show details for ${combo.name} combo`}
    >
      <div className={`flip-card ${isFlipped ? 'flipped' : ''}`}>
        {/* Front of the Card */}
        <div className="flip-card-front" aria-hidden={isFlipped}>
          <div className="luxury-card-banner combo-banner"></div>
          <img src={combo.image} alt={combo.name} className="flip-card-img" />
          <div className="flip-card-content">
            <div className="d-flex justify-content-between align-items-start">
              <h3 className="flip-card-title">{combo.name}</h3>
              {combo.isPopular && (
                <Badge bg="danger" className="luxury-badge-premium">Premium</Badge>
              )}
            </div>
            <p className="text-truncate flip-card-description">{combo.description}</p>
            <div className="flip-card-price">${combo.price.toFixed(2)}</div>
            <div className="mt-2">
              <Badge bg="dark" className="me-1 luxury-badge">Serves: {combo.servingSize}</Badge>
              <Badge bg="dark" className="me-1 luxury-badge">{comboItems.length} items</Badge>
            </div>
          </div>
        </div>
        
        {/* Back of the Card */}
        <div className="flip-card-back" aria-hidden={!isFlipped}>
          <div className="luxury-card-banner-back combo-banner"></div>
          <h3 className="flip-card-back-title">{combo.name}</h3>
          
          <p className="flip-card-description">{combo.description}</p>
          
          <div className="mb-3">
            <strong className="text-gold">Includes:</strong>
            <ul className="list-unstyled mt-2">
              {comboItems.map(item => (
                <li key={item.id} className="mb-2">
                  <div className="d-flex align-items-center">
                    <FontAwesomeIcon icon={faUtensils} className="me-2 text-gold" />
                    <div>
                      <strong>{item.name}</strong>
                      <div className="small text-muted">{item.category} • {item.type}</div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="mb-3">
            <strong className="text-gold">Serving Size:</strong> {combo.servingSize}
          </div>
          
          <div className="flip-card-actions mt-auto">            
            <Button 
              variant="primary" 
              className="luxury-button w-100"
              onClick={(e) => {
                e.stopPropagation();
                onAddCombo(combo.items);
              }}
              aria-label={`Add ${combo.name} combo to cart`}
            >
              <span className="button-text">Add Combo to Cart • ${combo.price.toFixed(2)}</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Menu: React.FC = () => {
  const { addToCart } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState(50);
  const [filteredItems, setFilteredItems] = useState<SushiItem[]>(menuItems);
  const [activeCategory, setActiveCategory] = useState('all');
  const [activeType, setActiveType] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [showNutrition, setShowNutrition] = useState(false);
  const [language, setLanguage] = useState('english');
  const [viewMode, setViewMode] = useState('grid');
  const [showComboMenu, setShowComboMenu] = useState(false);
  
  // Extract unique ingredients, types and tags from menu items
  const allIngredients = Array.from(
    new Set(menuItems.flatMap(item => item.ingredients))
  ).sort();
  
  const allTypes = Array.from(
    new Set(menuItems.map(item => item.type))
  ).sort();
  
  const allTags = Array.from(
    new Set(menuItems.flatMap(item => item.tags))
  ).sort();
  
  // Toggle favorites
  const toggleFavorite = (id: number) => {
    if (favorites.includes(id)) {
      setFavorites(favorites.filter(favId => favId !== id));
    } else {
      setFavorites([...favorites, id]);
    }
  };
  
  // Add to cart with add-ons
  const handleAddToCart = (item: SushiItem, addOns: { id: number, name: string, price: number }[] = []) => {
    // Create a copy of the item with any selected add-ons
    const itemWithAddOns = {
      ...item,
      price: item.price + addOns.reduce((total, addon) => total + addon.price, 0),
      selectedAddOns: addOns
    };
    addToCart(itemWithAddOns);
  };

  // Filter and sort menu items
  useEffect(() => {
    let results = menuItems;
    
    // Filter by search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(item => 
        item.name.toLowerCase().includes(term) || 
        item.description.toLowerCase().includes(term) || 
        item.ingredients.some(ing => ing.toLowerCase().includes(term))
      );
    }
    
    // Filter by price range
    results = results.filter(item => item.price <= priceRange);
    
    // Filter by category
    if (activeCategory !== 'all') {
      results = results.filter(item => item.category === activeCategory);
    }
    
    // Filter by type
    if (activeType !== 'all') {
      results = results.filter(item => item.type === activeType);
    }
    
    // Filter by selected ingredients
    if (selectedIngredients.length > 0) {
      results = results.filter(item => 
        selectedIngredients.every(ing => 
          item.ingredients.includes(ing)
        )
      );
    }
    
    // Filter by selected tags
    if (selectedTags.length > 0) {
      results = results.filter(item => 
        selectedTags.some(tag => 
          item.tags.includes(tag)
        )
      );
    }
    
    // Sort results
    switch (sortOrder) {
      case 'price-asc':
        results = [...results].sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results = [...results].sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        results = [...results].sort((a, b) => b.ratings - a.ratings);
        break;
      case 'popular':
        results = [...results].sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // Keep original order
        break;
    }
    
    setFilteredItems(results);
  }, [searchTerm, priceRange, activeCategory, activeType, selectedIngredients, selectedTags, sortOrder]);

  // Get translations based on selected language
  const getTranslation = (text: string) => {
    // This would be replaced with actual translations
    const translations: Record<string, Record<string, string>> = {
      japanese: {
        'Our Menu': 'メニュー',
        'Search for dishes...': '料理を検索...',
        'Price Range': '価格帯',
        'All': 'すべて',
        'Add to Cart': 'カートに追加',
        'Ratings': '評価',
        'Popular': '人気',
        'Vegetarian': 'ベジタリアン',
        'Combo Menu': 'セットメニュー',
        // Add more translations as needed
      },
      vietnamese: {
        'Our Menu': 'Thực đơn',
        'Search for dishes...': 'Tìm kiếm món ăn...',
        'Price Range': 'Phạm vi giá',
        'All': 'Tất cả',
        'Add to Cart': 'Thêm vào giỏ hàng',
        'Ratings': 'Đánh giá',
        'Popular': 'Phổ biến',
        'Vegetarian': 'Chay',
        'Combo Menu': 'Thực đơn combo',
        // Add more translations as needed
      },
      english: {
        // Default language, return as is
      }
    };
    
    if (language === 'english') return text;
    return translations[language][text] || text;
  };

  return (
    <div className="scroll-container">
      <Container className="py-5 mt-5">
        {/* Header Section */}
        <section className="menu-section py-5">
          <Row className="mb-5">
            <Col>
              <div className="text-center position-relative luxury-header-container">
                <div className="luxury-header-line"></div>
                <h1 className="display-4 text-center luxury-header mb-4">{getTranslation('Our Menu')}</h1>
                <div className="luxury-header-line"></div>
              </div>
              <p className="lead text-center luxury-subheader">{getTranslation('Discover our authentic Japanese sushi selection.')}</p>
              
              {/* Language selector */}
              <div className="text-center mb-4 luxury-language-selector">
                <Button 
                  variant={language === 'english' ? 'primary' : 'outline-primary'} 
                  className="mx-1 luxury-lang-btn"
                  onClick={() => setLanguage('english')}
                >
                  English
                </Button>
                <Button 
                  variant={language === 'japanese' ? 'primary' : 'outline-primary'} 
                  className="mx-1 luxury-lang-btn"
                  onClick={() => setLanguage('japanese')}
                >
                  日本語
                </Button>
                <Button 
                  variant={language === 'vietnamese' ? 'primary' : 'outline-primary'} 
                  className="mx-1 luxury-lang-btn"
                  onClick={() => setLanguage('vietnamese')}
                >
                  Tiếng Việt
                </Button>
              </div>
            </Col>
          </Row>
        </section>

        {/* Enhanced Search and Filters with Luxury Styling */}
        <section className="menu-section py-4">
          <Row className="mb-4">
            <Col md={6}>
              <InputGroup className="mb-3 luxury-search">
                <InputGroup.Text className="luxury-search-icon">
                  <FontAwesomeIcon icon={faSearch} className="text-gold" />
                </InputGroup.Text>
                <Form.Control
                  placeholder={getTranslation('Search for dishes...')}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="luxury-search-input"
                />
              </InputGroup>
            </Col>
            
            <Col md={3}>
              <Dropdown className="mb-3">
                <Dropdown.Toggle variant="outline-primary" id="dropdown-sort" className="luxury-dropdown">
                  <FontAwesomeIcon icon={faSort} className="me-2 text-gold" />
                  {sortOrder === 'default' && 'Sort By'}
                  {sortOrder === 'price-asc' && 'Price: Low to High'}
                  {sortOrder === 'price-desc' && 'Price: High to Low'}
                  {sortOrder === 'rating' && 'Top Rated'}
                  {sortOrder === 'popular' && 'Most Popular'}
                </Dropdown.Toggle>
                <Dropdown.Menu className="luxury-dropdown-menu">
                  <Dropdown.Item onClick={() => setSortOrder('default')}>Default</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder('price-asc')}>Price: Low to High</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder('price-desc')}>Price: High to Low</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder('rating')}>Top Rated</Dropdown.Item>
                  <Dropdown.Item onClick={() => setSortOrder('popular')}>Most Popular</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Col>
            
            <Col md={3}>
              <div className="d-flex justify-content-end mb-3">
                <Button 
                  variant={viewMode === 'grid' ? 'primary' : 'outline-primary'} 
                  className={`me-2 ${viewMode === 'grid' ? 'luxury-view-active' : 'luxury-view'}`}
                  onClick={() => setViewMode('grid')}
                >
                  Grid
                </Button>
                <Button 
                  variant={viewMode === 'list' ? 'primary' : 'outline-primary'} 
                  className={viewMode === 'list' ? 'luxury-view-active' : 'luxury-view'}
                  onClick={() => setViewMode('list')}
                >
                  List
                </Button>
              </div>
            </Col>
          </Row>
          
          <Row className="mb-4">
            <Col md={6}>
              <Form.Label className="text-gold">
                {getTranslation('Price Range')}: <span className="luxury-price">${priceRange.toFixed(2)}</span>
              </Form.Label>
              <Form.Range
                min={5}
                max={50}
                step={1}
                value={priceRange}
                onChange={(e) => setPriceRange(Number(e.target.value))}
                className="luxury-range"
              />
            </Col>
            
            <Col md={6}>
              <Row>
                <Col xs={6}>
                  <Form.Check 
                    type="switch"
                    id="show-nutrition"
                    label="Show Nutrition Info"
                    checked={showNutrition}
                    onChange={() => setShowNutrition(!showNutrition)}
                    className="luxury-switch"
                  />
                </Col>
                <Col xs={6}>
                  <Form.Check 
                    type="switch"
                    id="show-combos"
                    label="Show Combo Menus"
                    checked={showComboMenu}
                    onChange={() => setShowComboMenu(!showComboMenu)}
                    className="luxury-switch"
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </section>
        
        {/* Filters Section */}
        <section className="menu-section py-4">
          {/* Filter by Type */}
          <Row className="mb-4">
            <Col md={12}>
              <div className="d-flex flex-wrap">
                <Button 
                  variant={activeType === 'all' ? 'primary' : 'outline-primary'} 
                  className="me-2 mb-2"
                  onClick={() => setActiveType('all')}
                >
                  All Types
                </Button>
                {allTypes.map(type => (
                  <Button 
                    key={type}
                    variant={activeType === type ? 'primary' : 'outline-primary'} 
                    className="me-2 mb-2"
                    onClick={() => setActiveType(type)}
                  >
                    {type}
                  </Button>
                ))}
              </div>
            </Col>
          </Row>
          
          {/* Filter by Ingredients */}
          <Row className="mb-4">
            <Col md={12}>
              <h6>Ingredients:</h6>
              <div className="d-flex flex-wrap">
                {allIngredients.map(ingredient => (
                  <Badge 
                    key={ingredient}
                    bg={selectedIngredients.includes(ingredient) ? 'primary' : 'secondary'} 
                    className="me-2 mb-2 p-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (selectedIngredients.includes(ingredient)) {
                        setSelectedIngredients(selectedIngredients.filter(t => t !== ingredient));
                      } else {
                        setSelectedIngredients([...selectedIngredients, ingredient]);
                      }
                    }}
                  >
                    {ingredient} 
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>

         
          {/* Filter by Tags */}
          <Row className="mb-4">
            <Col md={12}>
              <h6>Tags:</h6>
              <div className="d-flex flex-wrap">
                {allTags.map(tag => (
                  <Badge 
                    key={tag}
                    bg={selectedTags.includes(tag) ? 'primary' : 'secondary'} 
                    className="me-2 mb-2 p-2"
                    style={{ cursor: 'pointer' }}
                    onClick={() => {
                      if (selectedTags.includes(tag)) {
                        setSelectedTags(selectedTags.filter(t => t !== tag));
                      } else {
                        setSelectedTags([...selectedTags, tag]);
                      }
                    }}
                  >
                    {tag}
                  </Badge>
                ))}
              </div>
            </Col>
          </Row>
        </section>

        {/* Menu Categories */}
        <section className="menu-section py-4">
          <Tabs
            activeKey={activeCategory}
            onSelect={(k) => setActiveCategory(k || 'all')}
            className="mb-4"
            justify
          >
            <Tab eventKey="all" title={getTranslation('All')}></Tab>
            <Tab eventKey="Nigiri" title="Nigiri"></Tab>
            <Tab eventKey="Maki" title="Maki"></Tab>
            <Tab eventKey="Sashimi" title="Sashimi"></Tab>
            <Tab eventKey="Special" title="Special"></Tab>
            <Tab eventKey="Dessert" title="Dessert"></Tab>
            <Tab eventKey="Drink" title="Drink"></Tab>
          </Tabs>
        </section>
        
        {/* Combo Menus Section */}
        {showComboMenu && (
          <section className="menu-section py-4">
            <h3 className="mb-3">Combo Sets</h3>
            <Row className="mb-5">
              {comboMenus.map(combo => (
                <Col key={combo.id} md={4} className="mb-4">
                  <ComboFlipCard
                    combo={combo}
                    onAddCombo={(itemIds) => {
                      // Add all items in the combo to cart
                      const comboItems = menuItems.filter(item => itemIds.includes(item.id));
                      comboItems.forEach(item => addToCart(item));
                    }}
                    menuItems={menuItems}
                  />
                </Col>
              ))}
            </Row>
          </section>
        )}

        {/* Menu Items */}
        <section className="menu-section py-4">
          <Row>
            {filteredItems.length > 0 ? (
              viewMode === 'grid' ? (
                // Grid View
                filteredItems.map(item => (
                  <Col key={item.id} md={6} lg={4} className="mb-4">
                    <FlipCard
                      item={item}
                      onAddToCart={(item) => handleAddToCart(item)}
                      onToggleFavorite={(id) => toggleFavorite(id)}
                      isFavorite={favorites.includes(item.id)}
                      showNutrition={showNutrition}
                    />
                  </Col>
                ))
              ) : (
                // List View
                <Col md={12}>
                  {filteredItems.map(item => (
                    <Card key={item.id} className="mb-3 shadow menu-item-list">
                      <Row className="g-0">
                        <Col md={3}>
                          <Card.Img src={item.image} alt={item.name} className="img-fluid rounded-start h-100" style={{ objectFit: 'cover' }} />
                        </Col>
                        <Col md={9}>
                          <Card.Body>
                            <div className="d-flex justify-content-between align-items-start">
                              <div>
                                <Card.Title>{item.name}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">
                                  {item.type} • {item.category} • {item.servingSize}
                                </Card.Subtitle>
                              </div>
                              <div className="d-flex">
                                <div className="d-flex align-items-center me-3">
                                  <span className="me-1">{item.ratings}</span>
                                  <FontAwesomeIcon icon={faStar} className="text-warning" />
                                  <span className="ms-1 text-muted">({item.reviewCount})</span>
                                </div>
                                <Button
                                  variant="light"
                                  className="rounded-circle p-2"
                                  onClick={() => toggleFavorite(item.id)}
                                >
                                  <FontAwesomeIcon 
                                    icon={favorites.includes(item.id) ? faHeart : farHeart} 
                                    className={favorites.includes(item.id) ? "text-danger" : ""} 
                                  />
                                </Button>
                              </div>
                            </div>
                            
                            <Card.Text>{item.description}</Card.Text>
                            
                            <Row>
                              <Col md={6}>
                               
                                
                                {/* Ingredients */}
                                <small className="text-muted d-block mb-2">
                                  <strong>Ingredients:</strong> {item.ingredients.join(', ')}
                                </small>
                                
                                {/* Nutritional info */}
                                {showNutrition && (
                                  <small className="text-muted d-block mb-2">
                                    <strong>Nutrition:</strong> {item.nutrition.calories} cal, {item.nutrition.protein}g protein, 
                                    {item.nutrition.carbs}g carbs, {item.nutrition.fat}g fat
                                  </small>
                                )}
                              </Col>
                              <Col md={6} className="d-flex flex-column justify-content-between">
                                <div className="mb-2">
                                  {item.tags.map(tag => (
                                    <Badge 
                                      key={tag} 
                                      bg="secondary" 
                                      className="me-1"
                                    >
                                      {tag}
                                    </Badge>
                                  ))}
                                </div>
                                
                                <div className="d-flex justify-content-between align-items-center mt-auto">
                                  <span className="fw-bold text-primary fs-5">${item.price.toFixed(2)}</span>
                                  
                                  {item.addOns.length > 0 ? (
                                    <Dropdown>
                                      <Dropdown.Toggle variant="primary" id={`dropdown-addons-list-${item.id}`}>
                                        Add to Cart
                                      </Dropdown.Toggle>
                                      <Dropdown.Menu>
                                        {item.addOns.map(addon => (
                                          <Dropdown.Item 
                                            key={addon.id}
                                            onClick={() => handleAddToCart(item, [addon])}
                                          >
                                            With {addon.name} (+${addon.price.toFixed(2)})
                                          </Dropdown.Item>
                                        ))}
                                        <Dropdown.Divider />
                                        <Dropdown.Item onClick={() => handleAddToCart(item)}>
                                          Without extras
                                        </Dropdown.Item>
                                      </Dropdown.Menu>
                                    </Dropdown>
                                  ) : (
                                    <Button 
                                      variant="primary" 
                                      onClick={() => addToCart(item)}
                                    >
                                      {getTranslation('Add to Cart')}
                                    </Button>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </Card.Body>
                        </Col>
                      </Row>
                    </Card>
                  ))}
                </Col>
              )
            ) : (
              <Col className="text-center py-5">
                <h4>No items match your search criteria.</h4>
                <p>Try adjusting your search or filter options.</p>
              </Col>
            )}
          </Row>
        </section>
      </Container>
    </div>
  );
};

export default Menu; 