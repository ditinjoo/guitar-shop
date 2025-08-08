import React from 'react';
import './components/GuitarShop.css';
import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';
import LogoSVG from './assets/logo.svg';

// Social Links Component
const SocialLinks = () => {
  const socialLinks = [
    { icon: FaFacebookF, label: 'Facebook', href: 'https://facebook.com' },
    { icon: FaTwitter, label: 'Twitter', href: 'https://twitter.com' },
    { icon: FaInstagram, label: 'Instagram', href: 'https://instagram.com' }
  ];

  return (
    <div className="social-links">
      {socialLinks.map(({ icon: Icon, label, href }) => (
        <a 
          key={label}
          href={href} 
          className="social-link" 
          target="_blank" 
          rel="noopener noreferrer" 
          aria-label={label}
        >
          <Icon size={22} />
        </a>
      ))}
    </div>
  );
};

// Footer Links Component
const FooterLinks = ({ title, links }) => (
  <div className="footer-section">
    <h4 className="footer-title">{title}</h4>
    <div className="footer-links">
      {links.map(({ text, href }) => (
        <a key={text} href={href} className="footer-link">
          {text}
        </a>
      ))}
    </div>
  </div>
);

// Main Footer Component
const Footer = () => {
  const pageLinks = [
    { text: 'Store', href: '/' },
    { text: 'Collections', href: '/brands' },
    { text: 'Support', href: '/support' }
  ];

  const productLinks = [
    { text: 'Terms', href: '/terms' },
    { text: 'Privacy Policy', href: '/privacy' },
    { text: 'Copyright', href: '/copyright' }
  ];

  return (
    <footer className="vibestrings-footer">
      <div className="container">
        <div className="footer-content">
          {/* Company Info */}
          <div className="footer-section">
            <div className="footer-logo">
              <img src={LogoSVG} alt="VibeStrings Logo" className="logo-svg" />
            </div>
            <p className="footer-description">
              Enquiry@VibeStrings.com
            </p>
            <p className="footer-location">
              📍 San Francisco
            </p>
          </div>
          
          {/* Pages */}
          <FooterLinks title="PAGES" links={pageLinks} />
          
          {/* Product */}
          <FooterLinks title="PRODUCT" links={productLinks} />
          
          {/* Follow Us */}
          <div className="footer-section">
            <h4 className="footer-title">FOLLOW US</h4>
            <SocialLinks />
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © 2022 Copyright@VibeStrings
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;