import React from 'react';
import { Link } from 'react-router-dom';
import './Report.css';
import { useNavigate } from 'react-router-dom';

function Map() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/'); 
  };
  return (
    <div className="report-container">
      <header className="report-header">
        <div className="header-buttons">
          <Link to="/statistics">
            <button className="header-btn">See the statistics</button>
          </Link>
          <Link to="/report">
            <button className="header-btn">Make a report</button>
          </Link>
          <button className="header-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
        <div className="logo-wrapper">
          <span className="logo">CACVi-UN</span>
        </div>
      </header>

      <div className="report-content">
        <h1 className="form-title" style={{ textAlign: 'center', padding: '0.1rem'}}>
            MAP
        </h1>
        <p className="form-subtitle" style={{ textAlign: 'center', fontSize: '0.8rem', padding: '0.3rem' }}>
          ON THIS MAP YOU CAN VIEW THE AREAS WITH THE MOST RECORDED CASES
        </p>

        <div className="map-placeholder" style={{ height: '400px' }}></div>

        <p className="form-subtitle" style={{ textAlign: 'center', fontSize: '0.6rem' }}>
          NOTE: THIS MAP IS UPDATED EVERY 10 SECONDS
        </p>
      </div>
    </div>
  );
}

export default Map;