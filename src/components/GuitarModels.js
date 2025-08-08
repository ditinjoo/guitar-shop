import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, gql } from '@apollo/client';
import './GuitarShop.css';
import { ReactComponent as BannerTextSVG } from '../assets/second-page-banner-text.svg';
import LogoSVG from '../assets/logo.svg';
import { ReactComponent as FilterSVG } from '../assets/filter.svg';

import Image3SVG from '../assets/image 3.svg';
import UnsplashSVG from '../assets/unsplash_H6j0Zsy91WY.svg';

const GET_BRAND_MODELS = gql`
  query($brandId: String!, $name: String!) {
    searchModels(brandId: $brandId, name: $name) {
      id
      name
      type
      price
      image
    }
  }
`;

const MODELS_PER_PAGE = 6;

const GuitarModels = () => {
  const { brandId } = useParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(0);

  const nameForQuery = searchTerm.trim() || "";

  const { loading, error, data } = useQuery(GET_BRAND_MODELS, {
    variables: { brandId: brandId || "", name: nameForQuery },
    skip: !brandId,
  });

  if (!brandId) return <div className="error">Brand ID is missing.</div>;
  if (loading) return <div className="loading">Loading models...</div>;
  if (error) return <div className="error">Error: {error.message}</div>;

  const models = data?.searchModels || [];

  // Apply type filter
  const filteredModels = typeFilter 
    ? models.filter(model => model.type.toLowerCase().includes(typeFilter.toLowerCase()))
    : models;

  // Pagination logic
  const totalPages = Math.ceil(filteredModels.length / MODELS_PER_PAGE);
  const startIndex = currentPage * MODELS_PER_PAGE;
  const paginatedModels = filteredModels.slice(startIndex, startIndex + MODELS_PER_PAGE);

  const handlePrev = () => setCurrentPage(prev => Math.max(prev - 1, 0));
  const handleNext = () => setCurrentPage(prev => Math.min(prev + 1, totalPages - 1));

  return (
  <div className="guitar-models-page">
    {/* Header with Back Navigation */}
   
     <header className="vibestrings-header">
         <div className="container">
           <div className="header-content">
             <Link to="/" className="back-to-home">
               <span className="back-arrow">←</span>
               <span className="back-text">Back To Home</span>
             </Link>
           </div>
           <div className="logo">
             <img src={LogoSVG} alt="VibeStrings Logo" className="logo-svg" />
           </div>
         </div>
       </header>

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
                  value={typeFilter}
                  onChange={e => {
                    setTypeFilter(e.target.value);
                    setCurrentPage(0);
                  }}
                  className="hidden-select"
                >
                  <option value="">Filter by type</option>
                  <option value="electric">Electric</option>
                  <option value="acoustic">Acoustic</option>
                  <option value="bass">Bass</option>
                  <option value="classical">Classical</option>
                </select>
                <FilterSVG className="filter-svg-styled-small" onClick={() => document.querySelector('.hidden-select').focus()} />
              </div>
            </div>
            
            <div className="search-item">
              <input
                type="text"
                placeholder="Search by name"
                value={searchTerm}
                onChange={e => {
                  setSearchTerm(e.target.value);
                  setCurrentPage(0); 
                }}
                className="search-input"
              />
            </div>
          </div>

          {/* Guitar Grid */}
          {paginatedModels.length === 0 ? (
            <div className="no-results">No models found.</div>
          ) : (
            <div className="guitar-selection-grid">
              {paginatedModels.map(model => (
                <Link 
                  key={model.id} 
                  to={`/brands/${brandId}/models/${model.id}`}
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
                            onError={e => e.target.style.display = 'none'}
                          />
                        ) : (
                          <div className="guitar-placeholder">
                            <div className="placeholder-guitar">🎸</div>
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
                </Link>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination-new">
              <span className="pagination-info">
                SHOWING {Math.min(filteredModels.length, MODELS_PER_PAGE)} RESULTS FROM {filteredModels.length}
              </span>
              
              <div className="pagination-controls">
                <button 
                  onClick={handlePrev} 
                  disabled={currentPage === 0}
                  className="pagination-btn"
                >
                  ←
                </button>
                
                {Array.from({ length: Math.min(totalPages, 10) }).map((_, idx) => {
                  const pageNum = currentPage < 5 ? idx : currentPage - 4 + idx;
                  if (pageNum >= totalPages) return null;
                  
                  return (
                    <button
                      key={pageNum}
                      onClick={() => setCurrentPage(pageNum)}
                      className={pageNum === currentPage ? 'pagination-btn active' : 'pagination-btn'}
                    >
                      {pageNum + 1}
                    </button>
                  );
                })}
                
                <span className="pagination-dots">...</span>
                
                {totalPages > 10 && (
                  <button
                    onClick={() => setCurrentPage(totalPages - 1)}
                    className={currentPage === totalPages - 1 ? 'pagination-btn active' : 'pagination-btn'}
                  >
                    {totalPages}
                  </button>
                )}
                
                <button 
                  onClick={handleNext} 
                  disabled={currentPage === totalPages - 1}
                  className="pagination-btn"
                >
                  →
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GuitarModels;
