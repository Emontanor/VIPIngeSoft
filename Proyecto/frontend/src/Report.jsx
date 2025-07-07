import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Report.css';

function Report() {   
  const [form, setForm] = useState({
    name: '',
    email: '',
    age: '',
    link: '',
    date: '',
    type: '',
    description: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate();
  //console.log('Navigate es:', navigate);
  const handleSignOut = () => {
    navigate('/'); 
  };
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validarFormulario = (e) => {
    e.preventDefault();
    const emailRegex = /^[^@]+@[^@]+$/;

    if (!form.name || !form.email || !form.age || !form.link || !form.date || !form.type) {
      setError('All fields are required (except description)');
      return;
    }
    if (isNaN(form.age) || Number(form.age) <= 0) {
        setError('Age must be a positive number');
     return;
    }


    if (!emailRegex.test(form.email)) {
      setError('Email must contain exactly one "@"');
      return;
    }

    setError('');

    toast.success('Report sent successfully', {
      position: 'top-center',
      autoClose: 2000,
    });

    setForm({
      name: '',
      email: '',
      age: '',
      link: '',
      date: '',
      type: '',
      description: '',
    });
  };

  return (
    <div className="report-container">
      <div className="report-header">
        <div className="header-buttons">
          <Link to="/statistics"><button className="header-btn">SEE THE STATISTICS</button></Link>
          <Link to="/map"><button className="header-btn">SEE THE MAP</button></Link>
          <button className="header-btn" onClick={handleSignOut}>Sign Out</button>
        </div>
        <div className="logo-wrapper">
          <span className="logo">CACVi-UN</span>
        </div>
      </div>

      <div className="report-content">
        <div className="form-header-text">
          <h1 className="form-title">Make your Report</h1>
          <p className="form-subtitle">Please complete the survey</p>
        </div>

        <form onSubmit={validarFormulario} className="report-form-single-column"> 
          <div className="form-group">
            <label htmlFor="name">NAME AND LAST NAME</label>
            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} placeholder="Please put your full name" />
          </div>

          <div className="form-group">
            <label htmlFor="email">EMAIL</label>
            <input type="email" id="email" name="email" value={form.email} onChange={handleChange} placeholder="Do not forget put an @" />
          </div>

          <div className="form-group">
            <label htmlFor="age">AGE</label>
            <input type="number" id="age" name="age" value={form.age} onChange={handleChange} placeholder="Please put your age"/>
          </div>

          <div className="form-group">
            <label htmlFor="link">LINK WITH THE UNIVERSITY</label>
            <select id="link" name="link" value={form.link} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Undergraduate student">Undergraduate student</option>
              <option value="Graduate student">Graduate student</option>
              <option value="Teacher">Teacher</option>
              <option value="Administrator">Administrator</option>
              <option value="Worker">Worker</option>
              <option value="External">External</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="date">DATE OF EVENT</label>
            <input type="date" id="date" name="date" value={form.date} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label htmlFor="type">TYPE OF VIOLENCE YOU HAVE BEEN A VICTIM OF</label>
            <select id="type" name="type" value={form.type} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Physical Violence">Physical Violence</option>
              <option value="Psychological Violence">Psychological Violence</option>
              <option value="Sexual Violence">Sexual Violence</option>
              <option value="Workplace Violence">Workplace Violence</option>
            </select>
          </div>

          <div className="form-group"> 
            <label htmlFor="description">PLEASE DESCRIBE THE EVENT</label>
            <textarea id="description" name="description" value={form.description} onChange={handleChange} placeholder="Describe the event (optional)" ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="map-area">PLEASE SELECT THE AREA ON THE MAP WHERE THE EVENTS OCCURRED.</label>
            <div className="map-placeholder"></div>
          </div>

          {error && <p className="error-msg">{error}</p>}
          <button type="submit" className="submit-btn">SEND THE REPORT</button> 
        </form>
      </div>

      <ToastContainer />
    </div>
  );
}
export default Report;