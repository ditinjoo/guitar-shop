import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// Components
import { Header, LoadingSpinner, ErrorMessage, Pagination } from './';

// GraphQL
import { GET_BRAND_MODELS } from '../graphql/queries';

// Constants
import { ROUTES } from '../constants';

// Hooks
import { useSearch, useFilters, usePagination } from '../hooks';

// Styles
import './GuitarShop.css';

// Assets
import LogoSVG from '../assets/logo.svg';
import { ReactComponent as FilterSVG } from '../assets/filter.svg';
import { ReactComponent as BannerTextSVG } from '../assets/second-page-banner-text.svg';
import Image3SVG from '../assets/image 3.svg';
import UnsplashSVG from '../assets/unsplash_H6j0Zsy91WY.svg';

const GuitarModelsNew = () => {
  const { brandId } = useParams();

  // Custom hooks for state management
  const { searchTerm, debouncedSearchTerm, handleSearchChange } = useSearch();
  const { selectedFilter, handleFilterChange } = useFilters();
  const { currentPage, itemsPerPage, handlePageChange, resetPagination } = usePagination();

  // GraphQL query - using the existing query structure
  const { loading, error, data } = useQuery(GET_BRAND_MODELS, {
    variables: { brandId: brandId || "", name: debouncedSearchTerm || "" },
    skip: !brandId,
  });

  // Reset pagination when search/filter changes
  React.useEffect(() => {
    resetPagination();
  }, [debouncedSearchTerm, selectedFilter, resetPagination]);

  if (!brandId) return <ErrorMessage message="Brand ID is missing" />;
  if (loading) return <LoadingSpinner message="Loading models..." />;
  if (error) return <ErrorMessage message={`Error loading models: ${error.message}`} />;

  const models = data?.searchModels || [];

  // Apply type filter
  const filteredModels = selectedFilter && selectedFilter !== 'all'
    ? models.filter(model => model.type?.toLowerCase().includes(selectedFilter.toLowerCase()))
    : models;

  // Calculate pagination
  const totalPages = Math.ceil(filteredModels.length / itemsPerPage);
  const paginatedModels = filteredModels.slice(
    currentPage * itemsPerPage,
    (currentPage + 1) * itemsPerPage
  );

  return (
    <div className="guitar-models-page">
      {/* Header with Back Navigation */}
      <Header 
        showBackButton={true}
        backTo={ROUTES.HOME}
        backText="Back To Home"
        logoSrc={LogoSVG}
      />

      {/* Hero Section for Brand */}
      <div className="brand-hero">
        <div className="container">
          <div className="brand-hero-content brand-hero-flex">
            <div className="brand-hero-left">
              <BannerTextSVG className="brand-hero-text-svg" />
            </div>
            <div className="brand-hero-right">
              <div className="svg-stack">
                <img src={UnsplashSVG} alt="Background" className="svg-layer svg-unsplash" />
                <img src={Image3SVG} alt="Guitar display" className="svg-layer svg-image3-top" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Selection Section */}
      <div className="selection-section">
        <div className="container">
          <h2 className="selection-title">
            Check out the <span className="highlight-orange">Selection</span>
          </h2>
          
          {/* Filter Section */}
          <div className="filter-controls">
            <div className="filter-item">
              <div className="custom-filter-wrapper">
                <select
                  value={selectedFilter}
                  onChange={handleFilterChange}
                  className="hidden-select"
                >
                  <option value="">Filter by type</option>
                  <option value="electric">Electric</option>
                  <option value="acoustic">Acoustic</option>
                  <option value="bass">Bass</option>
                  <option value="classical">Classical</option>
                </select>
                <FilterSVG 
                  className="filter-svg-styled-small" 
                  onClick={() => document.querySelector('.hidden-select').focus()} 
                />
              </div>
            </div>
            
            <div className="search-item">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
            </div>
          </div>

          {/* Guitar Grid */}
          {paginatedModels.length === 0 ? (
            <div className="no-results">
              <p>No models found.</p>
            </div>
          ) : (
            <div className="guitar-selection-grid">
              {paginatedModels.map(model => (
                <a 
                  key={model.id} 
                  href={ROUTES.MODEL_DETAILS
                    .replace(':brandId', brandId)
                    .replace(':modelId', model.id)
                  }
                  className="guitar-card-new"
                >
                  <div className="guitar-card-frame">
                    <div className="frame-top"></div>
                    <div className="frame-content">
                      <div className="guitar-display-area">
                        {model.image ? (
                          <img
                            src={model.image}
                            alt={model.name}
                            className="guitar-image"
                            onError={(e) => {
                              e.target.style.display = 'none';
                              const placeholder = e.target.parentElement.querySelector('.guitar-placeholder') ||
                                document.createElement('div');
                              placeholder.className = 'guitar-placeholder';
                              placeholder.innerHTML = '<span class="placeholder-guitar">🎸</span>';
                              placeholder.style.display = 'flex';
                              e.target.parentElement.appendChild(placeholder);
                            }}
                          />
                        ) : (
                          <div className="guitar-placeholder">
                            <span className="placeholder-guitar">🎸</span>
                          </div>
                        )}
                      </div>
                      <div className="frame-reflection"></div>
                    </div>
                    <div className="frame-bottom"></div>
                    <div className="frame-stand">
                      <div className="stand-base"></div>
                      <div className="stand-support"></div>
                    </div>
                  </div>
                  
                  <div className="guitar-info-new">
                    <h3 className="guitar-name-new">{model.name}</h3>
                    <p className="guitar-price-new">${model.price}</p>
                  </div>
                </a>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
              showInfo={true}
              totalItems={filteredModels.length}
              itemsPerPage={itemsPerPage}
              customClass="pagination-new"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default GuitarModelsNew;
