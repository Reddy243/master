import { useState, useContext } from 'react';
import './Signup.css';
import { UserContext } from '../../UserContext'; // Import UserContext

function Signup() {
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  // Access the global context to update the name
  const { setUserName } = useContext(UserContext); 

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    try {
      const response = await fetch('https://myshop-backend-fop9.onrender.com/api/Signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, mobile, password }),
      });
      const data = await response.json();
      if (response.ok && data.success) {
        setSuccess('Signup successful! You can now login.');
        setName('');
        setMobile('');
        setPassword('');
        
        // Set the name in the global context after successful signup
        setUserName(name);
      } else {
        setError(data.message || 'Signup failed. Try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="signupForm">
      <h2>Create Account</h2>
      <h4>Signup Below</h4>

      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}

      <form onSubmit={handleSignup}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Mobile</label>
          <input type="tel" value={mobile} onChange={(e) => setMobile(e.target.value)} required />
        </div>

        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>

        <div className="form-group center">
          <button type="submit">Signup</button>
        </div>

        <div className="form-group center">
          <span>Already have an account? <a href="/order">Login Here</a></span>
        </div>
      </form>
    </div>
  );
}

export default Signup;
