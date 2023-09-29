import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../Hooks/useInput.js';
import { login, registration } from '../../utils/MainApi.js';
import { errorHandler, popUpAlertMessages } from '../../utils/constants.js';
import AuthForm from '../Auth/From/AuthForm.js';
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

  const properties = [
    {
      htmlFor: 'name',
      fieldName: 'Имя',
      inputType: 'name',
      inputName: 'name',
      inputId: 'name',
      inputPlaceholder: 'Введите ваше имя',
      validation: {
        target: name,
        properties: ['isEmptyError', 'minLengthError', 'maxLengthError', 'isNameValidError']
      },
      error: isNameInputError
    },
    {
      htmlFor: 'email',
      fieldName: 'E-mail',
      inputType: 'email',
      inputName: 'email',
      inputId: 'email',
      inputPlaceholder: 'Введите ваш e-mail',
      validation: {
        target: email,
        properties: ['isEmptyError', 'minLengthError', 'maxLengthError', 'isEmailError']
      },
      error: isEmailInputError
    },
    {
      htmlFor: 'password',
      fieldName: 'Пароль',
      inputType: 'password',
      inputName: 'password',
      inputId: 'password',
      inputPlaceholder: 'Введите ваш пароль',
      validation: {
        target: password,
        properties: ['isEmptyError', 'minLengthError', 'maxLengthError']
      },
      error: isPasswordInputError
    }
  ];

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
    registration(name.value, email.value.toLowerCase(), password.value)
      .then((res) => {
        if (res._id) {
          login(email.value.toLowerCase(), password.value)
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
    <AuthForm
      title="Добро пожаловать!"
      properties={properties}
      handleSubmitForm={handleSubmitForm}
      buttonText="Зарегистрироваться"
      question="Уже зарегистрированы?"
      questionLinkText="Войти"
      questionLinkTo="/signin"
    />
  );
};

Register.propTypes = {
  setIsLoggedIn: PropTypes.func,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default Register;
