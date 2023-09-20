import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Login.css';

const Login = ({ setIsLoggedIn }) => {
  return (
    <section className="login">
      <div className="login__wrapper">
        <Logo className="login__logo" />
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form">
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Введите ваш e-mail"
            className="login__input"
          />
          <label htmlFor="password" className="login__label">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Введите ваш пароль"
            minLength="3"
            className="login__input login__input-error"
          />
          <p className="login__error login__error_active">Что-то пошло не так...</p>
          <Link to="/movies" className="login__btn" onClick={() => setIsLoggedIn(true)}>
            Войти
          </Link>
        </form>
        <p className="login__signin-question">
          Ещё не зарегистрированы?{' '}
          <Link to="/signup" className="login__signin-link">
            Регистрация
          </Link>
        </p>
      </div>
    </section>
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func
};

export default Login;
