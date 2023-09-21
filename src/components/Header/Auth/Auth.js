import React from 'react';
import { Link } from 'react-router-dom';
import './Auth.css';

const Auth = () => {
  return (
    <div className="auth">
      <Link to="/signup" className="auth__btn auth__btn-signup">
        Регистрация
      </Link>
      <Link to="/signin" className="auth__btn auth__btn-signin">
        Войти
      </Link>
    </div>
  );
};

export default Auth;
