import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Logo.css';

const Logo = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname !== '/' &&
    location.pathname !== '/movies' &&
    location.pathname !== '/profile' &&
    location.pathname !== '/saved-movies';

  return (
    <Link to="/" className={`logo__link ${isAuthPage ? 'logo__link-auth' : ''}`}>
      <img className="logo" src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;