
- **Guitar Brands Page**: Browse all available guitar brands with images
- **Guitar Models Page**: View models for each brand with search and filter functionality
- **Guitar Details Page**: Detailed specifications and musicians using each guitar
- **Responsive Design**: Works on desktop and mobile devices
- **Language Support**: Multi-language support (English/Macedonian/Albanian)
- **Apollo GraphQL**: Efficient data fetching with caching
- **Loading & Error States**: Graceful handling of loading and error states

##  Tech Stack

- **React 19** - Modern React with hooks
- **Apollo Client** - GraphQL client with caching
- **React Router** - Client-side routing
- **CSS3** - Custom styling with flexbox and grid
- **GraphQL** - Query language for APIs

##  Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <https://github.com/ditinjoo/guitar-shop.git>
   Navigate to branch - 'main' where all the Pull Requests were merged
   ```

2. **Install dependencies**
   npm install
   

3. **Start the development server**
   npm start

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application

## Project Structure

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

## API Integration

The app connects to a GraphQL API at:
```
https://graphql-api-brown.vercel.app/api/graphql
```

### Available Queries:
- `findAllBrands` - Get all guitar brands
- `searchModels` - Search models by brand and name
- `findUniqueModel` - Get detailed model information

## Responsive Design

The application is fully responsive and works on:
- Desktop computers (1200px+)
- Tablets (768px - 1199px)
- Mobile phones (320px - 767px)
