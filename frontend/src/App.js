import React from 'react';
import './App.css'
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Register from './auth/register';
import Login from './auth/login';
import Homepage from './components/Homepage';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Homepage/>} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
