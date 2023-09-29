import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import logo from '../../images/logo.svg';
import './Logo.css';

const Logo = () => {
  const location = useLocation();

  const isAuthPage = location.pathname === '/signin' && location.pathname === '/signup';

  console.log(isAuthPage);

  return (
    <Link to="/" className={`logo ${isAuthPage ? 'logo_auth' : ''}`}>
      <img className="logo__image" src={logo} alt="Логотип сайта" />
    </Link>
  );
};

export default Logo;
