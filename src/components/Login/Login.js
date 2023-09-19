import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Login.css';

const Login = () => {
  function onSubmit(e) {
    e.preventDefault();
    console.log('login');
  }

  return (
    <section className="login">
      <div className="login__wrapper">
        <img src={logo} alt="Logo" className="login__logo" />
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={onSubmit}>
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input type="email" name="email" id="email" className="login__input" />
          <label htmlFor="password" className="login__label">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="login__input login__input-error"
          />
          <p className="login__error login__error_active">Что-то пошло не так...</p>
          <button type="submit" className="login__btn">
            Войти
          </button>
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

export default Login;