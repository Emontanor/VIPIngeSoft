import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css'; 
import './App.css';

function Register() {
  const [Name, setName] = useState('');  
  const [email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validarEmail = (e) => {
    e.preventDefault();
    const regex = /^[a-zA-Z0-9._%+-]+@unal\.edu\.co$/;

    if (!email || !Password) {
      setError('All fields are required');
      return;
    }

    if (!regex.test(email)) {
      setError('The email must be @unal.edu.co');
      return;
    } 
    setError('');
    toast.success('Account Created Successfull', {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      theme: "colored",
    });

    setTimeout(() => {
      navigate('/');
    }, 3000);
  };
    
  return (
    <div className="background">
      <div className="header">CACVi-UN</div>
      <div className="login-box">
        <h1>Create New Account</h1>
        <form onSubmit={validarEmail}>
          <label>Name</label>
          <input type="text"
           placeholder="Your Name"
           onChange={(e) => setName(e.target.value)}
           required />

          <label>Email @unal.edu.co</label>
          <input
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <input type="password" 
          placeholder="Create a password" 
          value={Password}
          onChange={(e) => setPassword(e.target.value)}
          required />

          {error && <p style={{ color: 'black' }}>{error}</p>}

          <button type="submit">Submit</button>
        </form>
        <div className="separator">Already Registered?</div>
        <Link to="/">
          <button className="secondary">Return to Login</button>
        </Link>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;