import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import './GuitarShop.css';

// Components
import Header from './ui/Header';
import LoadingSpinner from './ui/LoadingSpinner';
import ErrorMessage from './ui/ErrorMessage';
import Pagination from './ui/Pagination';

// Assets
import { ReactComponent as BannerTextSVG } from '../assets/second-page-banner-text.svg';
import { ReactComponent as FilterSVG } from '../assets/filter.svg';
import Image3SVG from '../assets/image 3.svg';
import UnsplashSVG from '../assets/unsplash_H6j0Zsy91WY.svg';

// GraphQL & Hooks
import { GET_BRAND_MODELS } from '../graphql/queries';
import { useSearch, useFilters, usePagination } from '../hooks';
import { CONFIG, MESSAGES } from '../constants';

const GuitarModels = () => {
  const { brandId } = useParams();
  const { searchTerm, debouncedSearchTerm, updateSearch } = useSearch();
  const { filters, updateFilter } = useFilters({ type: '' });
  
  const { loading, error, data, refetch } = useQuery(GET_BRAND_MODELS, {
    variables: { brandId: brandId || "", name: debouncedSearchTerm },
    skip: !brandId,
    errorPolicy: 'all'
  });

  const models = data?.searchModels || [];
  
  // Apply filters
  const filteredModels = filters.type 
    ? models.filter(model => model.type.toLowerCase().includes(filters.type.toLowerCase()))
    : models;

  const {
    currentPage,
    totalPages,
    goToPage,
    resetPage
  } = usePagination(filteredModels.length, CONFIG.MODELS_PER_PAGE);

  // Reset page when filters change
  useEffect(() => {
    resetPage();
  }, [debouncedSearchTerm, filters.type, resetPage]);

  // Paginated models
  const startIndex = currentPage * CONFIG.MODELS_PER_PAGE;
  const paginatedModels = filteredModels.slice(startIndex, startIndex + CONFIG.MODELS_PER_PAGE);

  // Event handlers
  const handleSearchChange = (e) => updateSearch(e.target.value);
  const handleTypeChange = (e) => updateFilter('type', e.target.value);
  const handleRetry = () => refetch();

  // Render states
  if (!brandId) {
    return <ErrorMessage message={MESSAGES.ERROR_BRAND_MISSING} />;
  }

  if (loading) {
    return <LoadingSpinner message={MESSAGES.LOADING_MODELS} />;
  }

  if (error) {
    return (
      <ErrorMessage 
        message={error.message || MESSAGES.ERROR_GENERIC}
        onRetry={handleRetry}
        showRetry={true}
      />
    );
  }

  return (
    <div className="guitar-models-page">
      {/* Header */}
      <Header showBackButton={true} backTo="/" backText={MESSAGES.BACK_TO_HOME} />

      {/* Hero Banner */}
      <section className="brand-hero">
        <div className="container">
          <div className="brand-hero-content brand-hero-flex">
            <div className="brand-hero-left">
              <BannerTextSVG className="brand-hero-text-svg" />
            </div>
            <div className="brand-hero-right">
              <div className="svg-stack">
                <img src={UnsplashSVG} alt="Background" className="svg-layer svg-unsplash" />
                <img src={Image3SVG} alt="Guitar" className="svg-layer svg-image3-top" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Selection Section */}
      <section className="selection-section">
        <div className="container">
          <h2 className="selection-title">
            Check out the <span className="highlight-orange">Selection</span>
          </h2>
          
          {/* Filters */}
          <div className="filter-controls">
            <div className="custom-filter-wrapper">
              <select
                value={filters.type}
                onChange={handleTypeChange}
                className="hidden-select"
              >
                <option value="">All Types</option>
                <option value="acoustic">Acoustic</option>
                <option value="electric">Electric</option>
                <option value="bass">Bass</option>
                <option value="classical">Classical</option>
              </select>
              <FilterSVG className="filter-svg-styled-small" />
            </div>
            
            <input
              type="text"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="search-input"
            />
          </div>

          {/* Results */}
          {filteredModels.length === 0 ? (
            <div className="no-results">{MESSAGES.NO_RESULTS}</div>
          ) : (
            <>
              {/* Guitar Grid */}
              <div className="guitar-selection-grid">
                {paginatedModels.map((model) => (
                  <GuitarCard key={model.id} model={model} brandId={brandId} />
                ))}
              </div>

              {/* Pagination */}
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={filteredModels.length}
                itemsPerPage={CONFIG.MODELS_PER_PAGE}
                onPageChange={goToPage}
              />
            </>
          )}
        </div>
      </section>
    </div>
  );
};

// Guitar Card Component
const GuitarCard = ({ model, brandId }) => {
  const formatPrice = (price) => {
    if (!price) return 'Price not available';
    return typeof price === 'number' ? `$${price.toLocaleString()}` : price;
  };

  const handleImageError = (e) => {
    e.target.style.display = 'none';
    e.target.nextSibling.style.display = 'flex';
  };

  return (
    <Link
      to={`/brands/${brandId}/models/${model.id}`}
      className="guitar-card-new"
    >
      <div className="guitar-card-frame">
        <div className="guitar-display-area">
          {model.image ? (
            <>
              <img
                src={model.image}
                alt={model.name}
                className="guitar-image"
                onError={handleImageError}
              />
              <div className="guitar-placeholder" style={{ display: 'none' }}>
                <span className="placeholder-guitar">🎸</span>
              </div>
            </>
          ) : (
            <div className="guitar-placeholder">
              <span className="placeholder-guitar">🎸</span>
            </div>
          )}
        </div>
      </div>
      
      <div className="guitar-info-new">
        <h3 className="guitar-name-new">{model.name}</h3>
        <p className="guitar-price-new">{formatPrice(model.price)}</p>
      </div>
    </Link>
  );
};

export default GuitarModels;
