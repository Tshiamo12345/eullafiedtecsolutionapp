

import { Link, useLocation } from 'react-router-dom';
import './mainNavigation.css';

function MainNavigation() {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <header className="main-navigation">
      <div className="nav-container">
        {/* Brand/Logo */}
        <Link to="/" className="nav-brand">
          EullaTech
        </Link>

        {/* Main Navigation Links - Centered */}
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className={isActive('/')}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" className={isActive('/about')}>
                About
              </Link>
            </li>
            <li>
              <Link to="/services" className={isActive('/services')}>
                Services
              </Link>
            </li>
            <li>
              <Link to="/contact" className={isActive('/contact')}>
                Contact
              </Link>
            </li>
           
          </ul>
        </nav>

        {/* Auth Section - Far Right */}
        <div className="nav-auth">
          <Link to="/login" className="login-btn">
            <span className="login-icon">👤</span>
            Login
          </Link>
        </div>
      </div>
    </header>
  );
}

export default MainNavigation;