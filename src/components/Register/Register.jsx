import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../images/logo.png';
import './Register.css';

const Register = () => {
  function onSubmit(e) {
    e.preventDefault();
    console.log('register');
  }

  return (
    <section className="register">
      <div className="register__wrapper">
        <Link to="/" className="register__logo-link ">
          <img className="register__logo" src={logo} alt="Logo" />
        </Link>
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={onSubmit}>
          <label htmlFor="name" className="register__label">
            Имя
          </label>
          <input
            type="text"
            name="name"
            id="name"
            minLength="3"
            className="register__input"
            placeholder="Введите ваше имя"
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
          />
          <label htmlFor="password" className="register__label">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            minLength="3"
            placeholder="Придумайте пароль"
            className="register__input register__input-error"
          />
          <p className="register__error register__error_active">Что-то пошло не так...</p>
          <button type="submit" className="register__btn">
            Зарегистрироваться
          </button>
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

export default Register;
