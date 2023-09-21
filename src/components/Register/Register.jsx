import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../Logo/Logo';
import './Register.css';

const Register = ({ setIsLoggedIn }) => {
  function onSubmit(e) {
    e.preventDefault();
    console.log('register');
  }

  return (
    <section className="register">
      <div className="register__wrapper">
        <Logo />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={onSubmit}>
          <label htmlFor="name" className="register__label">
            Имя
          </label>
          <input
            type="text"
            name="name"
            id="name"
            minLength={3}
            maxLength={20}
            className="register__input"
            placeholder="Введите ваше имя"
            required="required"
          />
          <label htmlFor="email" className="register__label">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Введите ваш e-mail"
            className="register__input"
            required="required"
          />
          <label htmlFor="password" className="register__label">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            minLength={3}
            maxLength={20}
            placeholder="Придумайте пароль"
            className="register__input register__input-error"
            required="required"
          />
          <p className="register__error register__error_active">Что-то пошло не так...</p>
          <Link to="/movies" className="register__btn" onClick={() => setIsLoggedIn(true)}>
            Зарегистрироваться
          </Link>
        </form>
        <p className="register__signin-question">
          Уже зарегистрированы?{' '}
          <Link to="/signin" className="register__signin-link">
            Войти
          </Link>
        </p>
      </div>
    </section>
  );
};

Register.propTypes = {
  setIsLoggedIn: PropTypes.func
};

export default Register;
