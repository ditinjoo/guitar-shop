// App Configuration Constants
export const CONFIG = {
  GRAPHQL_ENDPOINT: 'https://graphql-api-brown.vercel.app/api/graphql',
  MODELS_PER_PAGE: 6,
  MUSICIANS_PER_PAGE: 2,
  BRANDS_PER_PAGE: 8,
  SEARCH_DEBOUNCE_DELAY: 300,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  API_TIMEOUT: 10000, // 10 seconds
  RETRY_ATTEMPTS: 3
};

// Route Constants
export const ROUTES = {
  HOME: '/',
  BRANDS: '/brands',
  BRAND_MODELS: '/brands/:brandId/models',
  MODEL_DETAILS: '/brands/:brandId/models/:modelId',
  SUPPORT: '/support',
  TERMS: '/terms',
  PRIVACY: '/privacy',
  COPYRIGHT: '/copyright'
};

// UI Messages
export const MESSAGES = {
  LOADING: 'Loading...',
  LOADING_BRANDS: 'Loading brands...',
  LOADING_MODELS: 'Loading models...',
  LOADING_MODEL: 'Loading model...',
  ERROR_GENERIC: 'An error occurred. Please try again.',
  ERROR_LOADING_BRANDS: 'Error loading brands',
  ERROR_LOADING_MODELS: 'Error loading models',
  ERROR_LOADING_MODEL: 'Error loading model',
  ERROR_BRAND_MISSING: 'Brand ID is missing.',
  ERROR_MODEL_LOADING: 'Error loading model.',
  BRAND_ID_MISSING: 'Brand ID is missing.',
  MODEL_NOT_FOUND: 'Model not found.',
  NO_RESULTS: 'No results found.',
  NO_MODELS_FOUND: 'No models found.',
  NO_BRANDS_FOUND: 'No brands found.',
  BACK_TO_HOME: 'Back To Home',
  BACK_TO_LIST: 'Back To List',
  VIEW_DETAILS: 'View Details',
  SEARCH_MODELS: 'Search models...',
  SEARCH_BY_NAME: 'Search by name',
  SPECIFICATIONS: 'Specifications',
  TECHNICAL_SPECIFICATIONS: 'Technical Specifications',
  WHO_PLAYS_IT: 'Who plays it?',
  BODY_WOOD: 'Body Wood',
  NECK_WOOD: 'Neck Wood',
  PICKUPS: 'Pickups',
  SCALE_LENGTH: 'Scale Length',
  RETRY: 'Retry'
};

// Social Media Links
export const SOCIAL_LINKS = [
  { platform: 'Facebook', url: 'https://facebook.com/vibestrings', icon: 'FaFacebookF' },
  { platform: 'Twitter', url: 'https://twitter.com/vibestrings', icon: 'FaTwitter' },
  { platform: 'Instagram', url: 'https://instagram.com/vibestrings', icon: 'FaInstagram' }
];

// Company Information
export const COMPANY_INFO = {
  name: 'VibeStrings',
  email: 'Enquiry@VibeStrings.com',
  location: 'San Francisco',
  copyright: '© 2022 Copyright@VibeStrings'
};

// Filter Options
export const FILTER_OPTIONS = {
  GUITAR_TYPES: [
    { value: '', label: 'All Types' },
    { value: 'electric', label: 'Electric' },
    { value: 'acoustic', label: 'Acoustic' },
    { value: 'bass', label: 'Bass' },
    { value: 'classical', label: 'Classical' },
  ],
  
  PRICE_RANGES: [
    { value: '', label: 'All Prices' },
    { value: '0-500', label: 'Under $500' },
    { value: '500-1000', label: '$500 - $1000' },
    { value: '1000-2000', label: '$1000 - $2000' },
    { value: '2000+', label: 'Over $2000' },
  ]
};
