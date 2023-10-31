import React from 'react'
import {useNavigate} from "react-router-dom";

const Homepage = () => {
    const navigate=useNavigate();
  return (
    <div>
      <h1>HomePage Access</h1>
      <button onClick={()=>navigate('/login')}>Logout</button>

    </div>
  )
}

export default Homepage
