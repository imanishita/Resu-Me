import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import Resume1Image from './Resume1.png';
import Resume2Image from './Resume2.png';
import './Home.css';

const Home = () => {
  const [zoomedPicture, setZoomedPicture] = useState(null);
  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipText, setTooltipText] = useState('');
  const [tooltipPosition, setTooltipPosition] = useState({ left: 0, top: 0 });
  const tooltipRef = useRef(null);

  const handlePictureClick = (picture) => {
    setZoomedPicture(picture);
  };

  const closeZoomedPicture = (e) => {
    if (e.target.className === 'zoomed-picture' || e.target.className === 'close-btn') {
      setZoomedPicture(null);
    }
  };

  const handleTooltip = (event, show, templateName = '') => {
    setShowTooltip(show);
    setTooltipText(`Click to zoom in: ${templateName}`);

    if (show && event.currentTarget) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipPosition({
        left: rect.left + rect.width / 2,
        top: rect.bottom + 10,
      });
    }
  };

  return (
    <div className="home-page">
      <div className="brand-container">
        <h1 className="brand-name"></h1>
        <p className="brand-tagline"></p>
      </div>

      <div className="template-section">
        <h2>Choose a Template</h2>
        <div className="pictures">
          <div className="template-card">
            <img
              src={Resume1Image}
              alt="Classic Resume Template"
              onClick={() => handlePictureClick(Resume1Image)}
              onMouseEnter={(e) => handleTooltip(e, true, "Classic Template")}
              onMouseLeave={(e) => handleTooltip(e, false)}
            />
            <p>Classic Template Resume</p>
            <Link to="/resume/1">
              <button className="template-btn">Use This Template</button>
            </Link>
          </div>

          <div className="template-card">
            <img
              src={Resume2Image}
              alt="Modern Resume Template"
              onClick={() => handlePictureClick(Resume2Image)}
              onMouseEnter={(e) => handleTooltip(e, true, "Modern Template")}
              onMouseLeave={(e) => handleTooltip(e, false)}
            />
            <p>Modern Template Resume</p>
            <Link to="/resume/2">
              <button className="template-btn">Use This Template</button>
            </Link>
          </div>
        </div>

        {showTooltip && (
          <div 
            className="tooltip" 
            ref={tooltipRef}
            style={{
              left: `${tooltipPosition.left}px`,
              top: `${tooltipPosition.top}px`,
            }}
          >
            {tooltipText}
          </div>
        )}
      </div>

      <div className="ats-section">
        <h2 className="ats-title">Optimize Your Resume</h2>
        <p className="ats-description">Check if your resume is ATS-friendly with our ATS Checker tool</p>
        <Link to="/ats-checker">
          <button className="primary-btn ats-btn">ATS Checker</button>
        </Link>
      </div>

      {zoomedPicture && (
        <div className="zoomed-picture" onClick={closeZoomedPicture}>
          <span className="close-btn" onClick={closeZoomedPicture}>
            &times;
          </span>
          <img src={zoomedPicture} alt="Zoomed Resume Template" />
        </div>
      )}
    </div>
  );
};

export default Home;
