import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useInput from '../../Hooks/useInput';
import { login } from '../../utils/MainApi';
import { errorHandler, popUpAlertMessages } from '../../utils/constants';
import AuthForm from '../Auth/From/AuthForm';
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

  const properties = [
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
    <AuthForm
      title="Рады видеть!"
      properties={properties}
      handleSubmitForm={handleSubmitForm}
      buttonText="Войти"
      question="Ещё не зарегистрированы?"
      questionLinkText="Регистрация"
      questionLinkTo="/signup"
    />
  );
};

Login.propTypes = {
  setIsLoggedIn: PropTypes.func,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default Login;
