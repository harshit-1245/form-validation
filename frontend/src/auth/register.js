import React, { useEffect, useState } from 'react';
import axios from "axios";
import {useNavigate} from "react-router-dom";
const Register = () => {
  const navigate=useNavigate();
    const [message,setMessage]=useState('');
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const getApi = () => {
    axios.get('http://localhost:3001/user')
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  };

  useEffect(() => {
    getApi();
  }, []);







  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (user.password !== user.confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
  
    try {
      const response = await axios.post('http://localhost:3001/user/register', {
        firstname: user.firstName,
        lastname: user.lastName,
        email: user.email,
        password: user.password,
      });
  
      if (response.status === 201) {
        const data = response.data;
        setMessage('Registration successful');
        setUser({
          firstName: '',
          lastName: '',
          email: '',
          password: '',
          confirmPassword: '',
        });
        navigate('/login');
      } else if (response.status === 409) {
        setMessage('Email is already registered');
      } else {
        setMessage('An error occurred');
      }
    } catch (error) {
      // Handle the error and display a more informative message
      if (error.response) {
        setMessage(`Error: ${error.response.data.message}`);
      } else if (error.request) {
        setMessage('Network error, please check your connection');
      } else {
        setMessage('An error occurred');
      }
    }
  };






  return (
    <div className="registration-form-container">
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            required
            value={user.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            required
            value={user.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            name="email"
            id="email"
            required
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            required
            value={user.confirmPassword}
            onChange={handleChange}
          />
        </div>

        <button type='submit'>Register</button>
      </form>

      {message && <p className='message'>{message}</p>}
    </div>
  );
  };

export default Register;
