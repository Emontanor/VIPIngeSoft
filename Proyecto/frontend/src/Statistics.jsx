import React from 'react';
import { Link } from 'react-router-dom';
import './Report.css';
import { useNavigate } from 'react-router-dom';
import Header from './Header';
import { useAuth } from './context/context.jsx';

function Statistics() {
  const navigate = useNavigate();
  const { rol } = useAuth();

  const handleSignOut = () => {
    navigate('/'); 
  };
  return (
    <div className="report-container">
      <Header rol={rol} view = "statistics" />
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