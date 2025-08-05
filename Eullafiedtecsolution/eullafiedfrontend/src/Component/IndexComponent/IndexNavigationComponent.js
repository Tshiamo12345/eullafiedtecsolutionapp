import React from 'react';
import './IndexNavigationComponent.css';
import { FaSignInAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function IndexNavigationComponent() {
  const navigate = useNavigate(); // Initialize useNavigate

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to the LoginInFormComponent route
  };

  return (
    <div className='nav container'>
      <nav className="navigationComponent container fixed-top text-light mt-3">

        <div className="d-flex justify-content-between align-items-center px-3 py-2" style={{ fontSize: '0.8rem' }}>

          {/* Left - Logo */}
          <div className="ourLogo left-logo">
            Login
          </div>

          {/* Center - Navigation */}
          <ul className="navigationComponentFix nav justify-content-center gap-5 m-0 small">
            <li className='nav-link p-1 '>HOME</li>
            <li className='nav-link p-1 '>SERVICE</li>
            <li className='nav-link p-1 '>ABOUT</li>
          </ul>

          {/* Right - Smaller Login Button */}
          <button 
            className="btn d-flex align-items-center gap-1 px-2 py-1 " 
            style={{ fontSize: '2.5rem', height: '10px' }} 
            onClick={handleLoginClick} // Add onClick handler
          >
            <FaSignInAlt style={{ fontSize: '2.5rem' }} />
            Login
          </button>
        </div>
      </nav>
    </div>
  );
}

export default IndexNavigationComponent;
