import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import { login } from '../../utils/MainApi';
import { errorHandler, popUpAlertMessages } from '../../utils/constants';
import Logo from '../Logo/Logo';
import './Login.css';

const Login = ({ setIsLoggedIn, setIsPopUpOpened, setPopUpMessages }) => {
  const navigate = useNavigate();
  const [isEmailInputError, setIsEmailInputError] = useState(false);
  const [isPasswordInputError, setIsPasswordInputError] = useState(false);

  const email = useInput('', {
    isEmpty: true,
    minLength: 3,
    maxLength: 20,
    isEmail: true
  });
  const password = useInput('', {
    isEmpty: true,
    minLength: 2,
    maxLength: 30
  });

  useEffect(() => {
    setErrorState(email.errorMessage, setIsEmailInputError);
  }, [email.errorMessage]);

  useEffect(() => {
    setErrorState(password.errorMessage, setIsPasswordInputError);
  }, [password.errorMessage]);

  const setErrorState = (errorMessage, setErrorFunction) => {
    const isAllEmpty = Object.values(errorMessage).every((value) => value === '');
    setErrorFunction(!isAllEmpty);
  };

  function handleSubmitForm(e) {
    e.preventDefault();
    login(email.value, password.value)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('token', res.token);
          setIsLoggedIn(true);
        } else {
          setIsPopUpOpened(true);
          setPopUpMessages({
            title: popUpAlertMessages.titles.error,
            message: popUpAlertMessages.messages.undefinedError
          });
        }
      })
      .then(() => navigate('/movies'))
      .catch((err) => {
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(err) });
      });
  }

  return (
    <section className="login">
      <div className="login__wrapper">
        <Logo className="login__logo" />
        <h1 className="login__title">Рады видеть!</h1>
        <form className="login__form" onSubmit={handleSubmitForm}>
          <label htmlFor="email" className="login__label">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Введите ваш e-mail"
            className={`login__input ${isEmailInputError ? 'login__input-error' : ''}`}
            value={email.value}
            onChange={(e) => email.onChange(e)}
            onFocus={(e) => email.onFocus(e)}
          />
          {email.isDirty && email.isEmpty && (
            <div className="profile__validation-error">{email.errorMessage.isEmpty}</div>
          )}
          {email.isDirty && email.minLengthError && (
            <div className="profile__validation-error">{email.errorMessage.minLengthError}</div>
          )}
          {email.isDirty && email.maxLengthError && (
            <div className="profile__validation-error">{email.errorMessage.maxLengthError}</div>
          )}
          {email.isDirty && email.isEmailError && (
            <div className="profile__validation-error">{email.errorMessage.isEmailError}</div>
          )}
          <label htmlFor="password" className="login__label">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Введите ваш пароль"
            className={`login__input ${isPasswordInputError ? 'login__input-error' : ''}`}
            value={password.value}
            onChange={(e) => password.onChange(e)}
            onFocus={(e) => password.onFocus(e)}
          />

          <div className="profile__errors">
            {password.isDirty && password.isEmpty && (
              <div className="profile__validation-error">{email.errorMessage.isEmpty}</div>
            )}
            {password.isDirty && password.minLengthError && (
              <div className="profile__validation-error">
                {password.errorMessage.minLengthError}
              </div>
            )}
            {password.isDirty && password.maxLengthError && (
              <div className="profile__validation-error">
                {password.errorMessage.maxLengthError}
              </div>
            )}
          </div>
          <button className="login__btn" disabled={email.isInputValid || password.isInputValid}>
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

Login.propTypes = {
  setIsLoggedIn: PropTypes.func,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default Login;
