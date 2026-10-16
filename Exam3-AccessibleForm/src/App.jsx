import React, { useState, useRef } from 'react';
import './App.css';

function App() {
  // Controlled form values in state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Validation messages & tracking previous email
  const [errors, setErrors] = useState({});
  const [previousEmail, setPreviousEmail] = useState('');

  // Refs for input elements
  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    // Validate required name
    if (!name.trim()) {
      newErrors.name = 'Name is required.';
    }

    // Validate email structure
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim()) {
      newErrors.email = 'Email is required.';
    } else if (!emailRegex.test(email)) {
      newErrors.email = 'Invalid email structure.';
    }

    // Validate password length (minimum 8 characters)
    if (!password) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters.';
    }

    setErrors(newErrors);

    // Focus the first invalid field
    if (Object.keys(newErrors).length > 0) {
      if (newErrors.name) {
        nameRef.current.focus();
      } else if (newErrors.email) {
        emailRef.current.focus();
      } else if (newErrors.password) {
        passwordRef.current.focus();
      }
    } else {
      // Successful submission: track previous email
      setPreviousEmail(email);
      alert('Registration successful!');
      // Clear form if desired
      setName('');
      setEmail('');
      setPassword('');
      setErrors({});
    }
  };

  return (
    <div style={{ padding: '2rem', fontFamily: 'Arial, sans-serif', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Accessible Form Toolkit</h2>
      <form onSubmit={handleSubmit} noValidate>
        <div style={{ marginBottom: '1rem' }}>
          <label>Name:</label><br />
          <input
            type="text"
            ref={nameRef}
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.name && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.name}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Email:</label><br />
          <input
            type="email"
            ref={emailRef}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.email && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.email}</span>}
        </div>

        <div style={{ marginBottom: '1rem' }}>
          <label>Password:</label><br />
          <input
            type="password"
            ref={passwordRef}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '8px', marginTop: '4px' }}
          />
          {errors.password && <span style={{ color: 'red', fontSize: '0.85rem' }}>{errors.password}</span>}
        </div>

        <button type="submit" style={{ padding: '10px 15px', cursor: 'pointer' }}>Register</button>
      </form>

      {previousEmail && (
        <div style={{ marginTop: '2rem', padding: '10px', background: '#f0f0f0', borderRadius: '4px' }}>
          <strong>Previous Submitted Email:</strong> {previousEmail}
        </div>
      )}
    </div>
  );
}

export default App;