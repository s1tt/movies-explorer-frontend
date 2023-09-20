import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Logo.css';

const Logo = () => {
  const location = useLocation();

  const isAuthPage =
    location.pathname !== '/' &&
    location.pathname !== '/movies' &&
    location.pathname !== '/profile' &&
    location.pathname !== '/saved-movies';

  return (
    <Link to="/" className={`logo ${isAuthPage ? 'logo_auth' : ''}`}>
      <img className="logo__image" src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;
