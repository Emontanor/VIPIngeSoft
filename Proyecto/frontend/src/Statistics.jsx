import React from 'react';
import { Link } from 'react-router-dom';
import './Report.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';

function Statistics() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    navigate('/'); 
  };
  return (
    <div className="report-container">
      <Header role="admin" view = "statistics" />
      {/* <header className="report-header">
        <div className="header-buttons">
          <Link to="/Map">
            <button className="header-btn">See the map</button>
          </Link>
          <Link to="/report">
            <button className="header-btn">Make a report</button>
          </Link>
          <button className="header-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
        <div className="logo-wrapper">
          <span className="logo">CACVi-UN</span>
        </div>
      </header> */}

      <div className="report-content">
        <h1 className="form-title" style={{ textAlign: 'center', padding: '0.1rem'}}>
            STATISTICS
        </h1>
        <p className="form-subtitle" style={{ textAlign: 'center', fontSize: '0.8rem', padding: '0.3rem' }}>
          IN THIS SPACE YOU CAN SEE THE GENERAL STATISTICS
        </p>

        <p className="form-subtitle" style={{ textAlign: 'center', fontSize: '0.6rem' }}>
          STATS
        </p>
      </div>
    </div>
  );
}

export default Statistics;