import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import useInput from '../../Hooks/useInput.js';
import { login, registration } from '../../utils/MainApi.js';
import { errorHandler, popUpAlertMessages } from '../../utils/constants.js';
import Logo from '../Logo/Logo';
import './Register.css';

const Register = ({ setIsLoggedIn, setIsPopUpOpened, setPopUpMessages }) => {
  const navigate = useNavigate();
  const [isNameInputError, setIsNameInputError] = useState(false);
  const [isEmailInputError, setIsEmailInputError] = useState(false);
  const [isPasswordInputError, setIsPasswordInputError] = useState(false);

  const name = useInput('', {
    isEmpty: true,
    minLength: 3,
    maxLength: 20,
    isNameValidError: true
  });
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
    setErrorState(name.errorMessage, setIsNameInputError);
  }, [name.errorMessage]);

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
    registration(name.value, email.value, password.value)
      .then((res) => {
        if (res._id) {
          login(email.value, password.value)
            .then((res) => {
              if (res.token) {
                localStorage.setItem('token', res.token);
                setIsLoggedIn(true);
                navigate('/movies');
              } else {
                setIsPopUpOpened(true);
                setPopUpMessages({
                  title: popUpAlertMessages.titles.error,
                  message: popUpAlertMessages.messages.undefinedError
                });
              }
            })
            .catch((err) => {
              setIsPopUpOpened(true);
              setPopUpMessages({
                title: popUpAlertMessages.titles.error,
                message: errorHandler(err)
              });
            });
        } else {
          setIsPopUpOpened(true);
          setPopUpMessages({
            title: popUpAlertMessages.titles.error,
            message: popUpAlertMessages.messages.undefinedError
          });
        }
      })
      .catch((err) => {
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(err) });
      });
  }

  return (
    <section className="register">
      <div className="register__wrapper">
        <Logo />
        <h1 className="register__title">Добро пожаловать!</h1>
        <form className="register__form" onSubmit={handleSubmitForm}>
          <label htmlFor="name" className="register__label">
            Имя
          </label>
          <input
            type="text"
            name="name"
            id="name"
            className={`register__input ${isNameInputError ? 'register__input-error' : ''}`}
            placeholder="Введите ваше имя"
            value={name.value}
            onChange={(e) => name.onChange(e)}
            onFocus={(e) => name.onFocus(e)}
          />
          <div className="profile__errors">
            {name.isDirty && name.isEmpty && (
              <div className="profile__validation-error">{name.errorMessage.isEmpty}</div>
            )}
            {name.isDirty && name.minLengthError && (
              <div className="profile__validation-error">{name.errorMessage.minLengthError}</div>
            )}
            {name.isDirty && name.maxLengthError && (
              <div className="profile__validation-error">{name.errorMessage.maxLengthError}</div>
            )}
            {name.isDirty && name.isNameValidError && (
              <div className="profile__validation-error">{name.errorMessage.isNameValidError}</div>
            )}
          </div>
          <label htmlFor="email" className="register__label">
            E-mail
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Введите ваш e-mail"
            className={`register__input ${isEmailInputError ? 'register__input-error' : ''}`}
            value={email.value}
            onChange={(e) => email.onChange(e)}
            onFocus={(e) => email.onFocus(e)}
          />
          <div className="profile__errors">
            {email.isDirty && email.isEmpty && (
              <div className="profile__validation-error">{email.errorMessage.isEmpty}</div>
            )}
            {email.isDirty && email.maxLengthError && (
              <div className="profile__validation-error">{email.errorMessage.maxLengthError}</div>
            )}
            {email.isDirty && email.minLengthError && (
              <div className="profile__validation-error">{email.errorMessage.minLengthError}</div>
            )}
            {email.isDirty && email.isEmailError && (
              <div className="profile__validation-error">{email.errorMessage.isEmailError}</div>
            )}
          </div>
          <label htmlFor="password" className="register__label">
            Пароль
          </label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Придумайте пароль"
            className={`register__input ${isPasswordInputError ? 'register__input-error' : ''}`}
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
          <button
            className="register__btn"
            type="submit"
            disabled={email.isInputValid || name.isInputValid || password.isInputValid}>
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

Register.propTypes = {
  setIsLoggedIn: PropTypes.func,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default Register;
