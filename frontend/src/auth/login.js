import React, { useState } from 'react'
import axios from "axios"
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate=useNavigate();
    const [message,setMessage]=useState('');
const [user,setUser]=useState({
    email:'',
    password:'',
})

const handleChange=(e)=>{
    const {name,value}=e.target;
    setUser({
        ...user,
        [name]:value
    });
    
}

const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/user/login', {
        email: user.email,
        password: user.password,
      });

      if (response.status === 200) {
        const data = response.data;
        setMessage('Login Successful');
        // Store the JWT token in a secure way for authentication
        navigate("/")
      } else {
        setMessage('Email and Password Incorrect');
      }
    } catch (error) {
      console.error(error);
      setMessage('Email and Password Incorrect');
    }
  };



  return (
    <div className='login-form-container'>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
        <label htmlFor="email">Email</label>
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
       <button type='submit'>Login</button>
       <div>or</div>
       <button onClick={()=>navigate('/register')}>Register</button>
      </form>
         {message && <p className='message'>{message}</p>}
    </div>
  )
}

export default Login
