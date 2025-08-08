import React from 'react';
import { useQuery } from '@apollo/client';
import { Link } from 'react-router-dom';

// Components
import { LoadingSpinner, ErrorMessage } from './';

// GraphQL
import { GET_GUITAR_BRANDS } from '../graphql/queries';

// Constants
import { ROUTES } from '../constants';

// Styles
import './GuitarShop.css';

// Assets
import BannerSVG from '../assets/banner.svg';
import { ReactComponent as AppSVG } from '../assets/app.svg';
import { ReactComponent as WhyVibeStringSVG } from '../assets/whyvibestrings.svg';
import LogoSVG from '../assets/logo.svg';

const GuitarList = () => {
  const { loading, error, data } = useQuery(GET_GUITAR_BRANDS);

  if (loading) return <LoadingSpinner message="Loading brands..." />;
  if (error) return <ErrorMessage message={`Error loading brands: ${error.message}`} />;

  return (
    <div className="vibestrings-landing">
      {/* Header */}
      <header className="vibestrings-header">
        <div className="container">
          <div className="logo">
            <img src={LogoSVG} alt="VibeStrings Logo" className="logo-svg" />
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero-section-new">
        <div className="container">
          <div className="hero-content-new">
            <div className="hero-text">
              <h1 className="hero-title-new">
                Browse top quality<br/>
                <span className="highlight-orange">Guitars</span> online
              </h1>
              <p className="hero-subtitle-new">
                Explore premium guitars from top brands.<br />
                Find your sound, play your story.
              </p>
            </div>
            
            <div className="hero-image">
              <img src={BannerSVG} alt="Guitar Banner" className="banner-svg" />
              <div className="landing-page-scene">
                <div className="hero-guitar">
                  <div className="guitar-silhouette">
                    <div className="guitar-glow"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Brands Section */}
      <section className="brands-section-new">
        <div className="container">
          <h2 className="brands-title">
            Featuring the <span className="highlight-orange">Best Brands</span>
          </h2>
          <p className="brands-subtitle">
            Select your preferred brand and explore our exquisite collection.
          </p>
          <div className="brand-logos-grid">
            {data?.findAllBrands?.slice(0, 8).map((brand) => (
              <Link 
                key={brand.id} 
                to={ROUTES.BRAND_MODELS.replace(':brandId', brand.id)} 
                className="brand-logo-item"
              >
                <div className="brand-logo-wrapper">
                  {brand.image ? (
                    <img src={brand.image} alt={brand.name} className="brand-logo-img" />
                  ) : (
                    <span className="brand-logo-text">{brand.name}</span>
                  )}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why VibeStrings Section */}
      <section className="features-section">
        <div className="container">
          <WhyVibeStringSVG className="why-vibestring-svg" />
        </div>
      </section>

      {/* App Promotion Section */}
      <section className="app-section">
        <div className="container">
          <div className="app-content">
            <div className="app-preview">
              <AppSVG className="app-svg" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuitarList;
