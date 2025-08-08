import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

// Components
import { Header, LoadingSpinner, ErrorMessage, Pagination } from './';

// GraphQL
import { GET_MODEL_DETAILS } from '../graphql/queries';

// Constants
import { ROUTES, CONFIG } from '../constants';

// Styles
import './GuitarShop.css';

// Assets
import LogoSVG from '../assets/logo.svg';
import { ReactComponent as Person1SVG } from '../assets/person1.svg';
import { ReactComponent as Person2SVG } from '../assets/person2.svg';
import { ReactComponent as Page3TextBannerSVG } from '../assets/page3-text-banner.svg';
import { ReactComponent as BackgroundSVG } from '../assets/unsplash_H6j0Zsy91WY.svg';
import { ReactComponent as GuitarPage3SVG } from '../assets/guitar-page-3.svg';

const GuitarModelDetails = () => {
  const { brandId, modelId } = useParams();
  
  const [activeTab, setActiveTab] = useState('specs');
  const [currentPage, setCurrentPage] = useState(0);
  
  const personSVGs = [Person1SVG, Person2SVG];
  
  const { loading, error, data } = useQuery(GET_MODEL_DETAILS, {
    variables: { brandId, modelId },
  });

  if (loading) return <LoadingSpinner message="Loading model..." />;
  if (error) return <ErrorMessage message={`Error loading model: ${error.message}`} />;

  const model = data?.findUniqueModel;
  if (!model) return <ErrorMessage message="Model not found." />;

  const musiciansPerPage = CONFIG.MUSICIANS_PER_PAGE || 2;
  const totalPages = Math.ceil((model.musicians?.length || 0) / musiciansPerPage);

  const visibleMusicians = model.musicians?.slice(
    currentPage * musiciansPerPage,
    currentPage * musiciansPerPage + musiciansPerPage
  ) || [];

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <>
      {/* Header with Back Navigation */}
      <Header 
        showBackButton={true}
        backTo={ROUTES.BRAND_MODELS.replace(':brandId', brandId)}
        backText="Back To List"
        logoSrc={LogoSVG}
      />

      {/* Top Banner Section */}
      <section className="top-banner-section">
        <div className="text-banner">
          <Page3TextBannerSVG className="text-banner-svg" />
        </div>
        <div className="guitar-banner">
          <div className="guitar-svg-wrapper">
            <BackgroundSVG className="background-svg" />
            <GuitarPage3SVG className="guitar-banner-svg" />
          </div>
        </div>
      </section>
      
      <div className="detail-container">
        {/* Tab Navigation */}
        <div className="tabs">
          <button
            className={activeTab === 'specs' ? 'active' : ''}
            onClick={() => setActiveTab('specs')}
          >
            Specifications
          </button>
          <button
            className={activeTab === 'musicians' ? 'active' : ''}
            onClick={() => setActiveTab('musicians')}
          >
            Who plays it?
          </button>
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'specs' && (
            <div className="specs-section">
              <div className="coded-guitar-display">
                <div className="guitar-technical-view">
                  <div className="guitar-outline">
                    <div className="guitar-body-outline">
                      <div className="guitar-sound-hole"></div>
                      <div className="guitar-bridge"></div>
                    </div>
                    <div className="guitar-neck-outline">
                      <div className="guitar-frets">
                        {Array.from({ length: 12 }, (_, i) => (
                          <div key={i} className="fret-wire"></div>
                        ))}
                      </div>
                      <div className="guitar-strings">
                        {Array.from({ length: 6 }, (_, i) => (
                          <div key={i} className="guitar-string"></div>
                        ))}
                      </div>
                    </div>
                    <div className="guitar-headstock">
                      <div className="tuning-pegs">
                        {Array.from({ length: 6 }, (_, i) => (
                          <div key={i} className="tuning-peg"></div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {/* Technical annotations */}
                  <div className="tech-annotations">
                    <div className="annotation scale-length" style={{top: '20%', left: '10%'}}>
                      <div className="annotation-line"></div>
                      <h1>{model.name}</h1>
                      <p>{model.description}</p>
                      <div className="annotation-value">{model.specs?.scaleLength}</div>
                    </div>   
                  </div>
                </div>
              </div>
              
              <div className="specs-data-panel">
                <h3>Technical Specifications</h3>
                <div className="specs-grid">
                  <div className="spec-item">
                    <div className="spec-details">
                      <strong>Body Wood: </strong>
                      <span>{model.specs?.bodyWood}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-details">
                      <strong>Neck Wood: </strong>
                      <span>{model.specs?.neckWood}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-details">
                      <strong>Pickups: </strong>
                      <span>{model.specs?.pickups}</span>
                    </div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-details">
                      <strong>Scale Length: </strong>
                      <span>{model.specs?.scaleLength}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'musicians' && (
            <div className="musicians-section">
              <div className="musicians-hero">
                <div className="coded-musicians-header">
                  <div className="musicians-stage">
                    <div className="stage-lights">
                      <div className="spotlight spotlight-1"></div>
                      <div className="spotlight spotlight-2"></div>
                      <div className="spotlight spotlight-3"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="musicians-content">
                <div className="musicians-gallery">
                  {visibleMusicians.map((musician, index) => {
                    const AvatarSVG = personSVGs[index] || Person1SVG;
                    return (
                      <div key={index} className="musician-card">
                        <div className="musician-avatar-frame">
                          <AvatarSVG className="musician-avatar-svg" />
                        </div>
                        <div className="musician-info">
                          <div className="musician-status">
                            <div className="status-dot"></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {totalPages > 1 && (
                  <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default GuitarModelDetails;
