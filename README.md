# Yusensu - Sushi Restaurant Website

A modern, responsive React application for a sushi restaurant with a full-page interface and seamless user experience.

![Yusensu Sushi Restaurant](https://source.unsplash.com/fsI-_MRsic0/1200x630)

## Features

- **Full-page scrolling interface** with scroll snapping for a modern user experience
- **Responsive design** that works on all devices using Bootstrap 5
- **Shopping cart functionality** with React Context API
- **Dynamic menu filtering** by category, search, and price range
- **Table reservation system** with date and time selection
- **Contact form** with validation
- **Customer reviews** with rating system
- **Newsletter subscription** for updates and promotions
- **FAQ section** with accordion
- **News and events** with filtering by category
- **About Us page** with restaurant history and team profiles
- **Google Maps integration** for restaurant location
- **Authentication system** with protected routes
- **Responsive layouts** with custom hooks
- **Performance optimized** with lazy loading and code splitting
- **Smooth scrolling** and section transitions
- **Premium content** with access control

## Pages

1. **Home** - Features a full-screen hero section, about section, and featured dishes carousel
2. **Menu** - Displays all sushi dishes by category with search and filter options
3. **Cart** - Shows selected items with quantity controls and checkout functionality
4. **Contact** - Includes a contact form and restaurant information with map
5. **FAQ** - Answers to common questions with accordion functionality
6. **Reviews** - Customer testimonials and ability to submit new reviews
7. **News** - Blog posts and events with category filtering
8. **Reservation** - Form to book a table with date and time selection
9. **About Us** - Restaurant history, chef profiles, and mission statement

## Technologies Used

- **React** - Frontend library
- **TypeScript** - Type safety
- **Vite** - Build tool and development server
- **Bootstrap 5** - UI framework
- **React Router** - Page navigation
- **Swiper** - Touch slider for featured dishes
- **Font Awesome** - Icons
- **React Context API** - State management
- **Custom Hooks** - Reusable logic

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository
```
git clone <repository-url>
```

2. Navigate to the project directory
```
cd sushi-web
```

3. Install dependencies
```
npm install
```

4. Start the development server
```
npm start
```

The application will open in your default browser at `http://localhost:3000`.

## Project Structure

```
sushi-web/
├── public/               # Public assets
│   ├── assets/          # Images and media files
│   └── favicon.ico      # Site favicon
├── src/                 # Source files
│   ├── components/      # Reusable components
│   │   ├── common/      # Shared components
│   │   ├── footer/      # Footer components
│   │   ├── sections/    # Page sections
│   │   ├── reservation/ # Reservation components
│   │   └── ...         # Other components
│   ├── context/         # React Context
│   │   ├── AuthContext.tsx    # Authentication context
│   │   ├── CartContext.tsx    # Shopping cart context
│   │   ├── FetchContext.tsx   # Data fetching context
│   │   └── ScrollContext.tsx  # Scroll behavior context
│   ├── hooks/           # Custom React hooks
│   │   ├── useAuth.ts
│   │   ├── useFetch.ts
│   │   ├── useScrollBehavior.ts
│   │   └── ... 
│   ├── pages/           # Page components
│   ├── services/        # API services
│   ├── styles/          # Global styles
│   ├── types/          # TypeScript types
│   ├── utils/          # Utility functions
│   ├── App.tsx         # Main App component
│   └── index.tsx       # Entry point
├── vite.config.js      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Project dependencies
```

## Building for Production

To build the app for production, run:

```
npm run build
```

This will create an optimized build in the `build` folder.

## License

MIT

## Acknowledgements

- Images from [Unsplash](https://unsplash.com)
- Icons from [Font Awesome](https://fontawesome.com)
