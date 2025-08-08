# 🎸 Online Guitar Shop

A modern React application for browsing guitar brands, models, and specifications. Built with Apollo Client and GraphQL for efficient data fetching.

## 🚀 Features

- **Guitar Brands Page**: Browse all available guitar brands with images
- **Guitar Models Page**: View models for each brand with search and filter functionality
- **Guitar Details Page**: Detailed specifications and musicians using each guitar
- **Responsive Design**: Works on desktop and mobile devices
- **Language Support**: Multi-language support (English/Macedonian/Albanian)
- **Apollo GraphQL**: Efficient data fetching with caching
- **Loading & Error States**: Graceful handling of loading and error states

## 🛠️ Tech Stack

- **React 19** - Modern React with hooks
- **Apollo Client** - GraphQL client with caching
- **React Router** - Client-side routing
- **CSS3** - Custom styling with flexbox and grid
- **GraphQL** - Query language for APIs

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- Node.js (version 14 or higher)
- npm or yarn package manager

## 🔧 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd guitar-shop
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## 📖 Usage

### Navigation
- **Home Page (/)**: Browse all guitar brands
- **Models Page (/brands/:brandId/models)**: View models for a specific brand
- **Details Page (/brands/:brandId/models/:modelId)**: View detailed specifications

### Features
- **Search**: Use the search bar to find specific guitar models
- **Filter**: Filter models by guitar type (Electric, Acoustic, Bass, Classical)
- **Pagination**: Navigate through multiple pages of results
- **Language Switch**: Change language using footer buttons

## 🏗️ Project Structure

```
src/
├── components/
│   ├── GuitarList.js          # Brands listing page
│   ├── GuitarModels.js        # Models listing with search/filter
│   ├── GuitarModelDetails.js  # Detailed guitar information
│   └── GuitarShop.css         # Component styles
├── App.js                     # Main app component with routing
├── index.js                   # App entry point with Apollo setup
├── LanguageContext.js         # Language context provider
├── translations.js            # Translation strings
└── footer.js                  # Footer component
```

## 🔌 API Integration

The app connects to a GraphQL API at:
```
https://graphql-api-brown.vercel.app/api/graphql
```

### Available Queries:
- `findAllBrands` - Get all guitar brands
- `searchModels` - Search models by brand and name
- `findUniqueModel` - Get detailed model information

## 🎨 Styling

The application uses custom CSS with:
- **CSS Grid & Flexbox** for responsive layouts
- **Hover effects** for better user interaction
- **Loading states** with styled indicators
- **Mobile-first** responsive design

## 🧪 Available Scripts

- `npm start` - Start development server
- `npm build` - Build for production
- `npm test` - Run test suite
- `npm eject` - Eject from Create React App

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)

## 🌐 Language Support

Supports multiple languages with easy switching:
- English (default)
- Macedonian
- Albanian

## 🚀 Deployment

To deploy the application:

1. **Build the project**
   ```bash
   npm run build
   ```j

