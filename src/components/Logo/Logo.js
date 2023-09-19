import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Logo.css';

const Logo = () => {
  const location = useLocation();

  return (
    <Link to="/" className={`logo__link ${location.pathname !== '/' ? 'logo__link-auth' : ''}`}>
      <img className="logo" src={logo} alt="Logo" />
    </Link>
  );
};

export default Logo;
