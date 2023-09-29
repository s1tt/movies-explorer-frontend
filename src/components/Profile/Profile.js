import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../../Hooks/useInput.js';
import { updateUserInfo } from '../../utils/MainApi.js';
import { errorHandler, popUpAlertMessages } from '../../utils/constants.js';
import Preloader from '../Preloader/Preloader.js';
import './Profile.css';
import ProfileForm from './ProfileForm/ProfileForm.js';

const Profile = ({
  setIsLoggedIn,
  currentUser,
  setCurrentUser,
  isLoading,
  setIsPopUpOpened,
  setPopUpMessages
}) => {
  const [isNameInputError, setIsNameInputError] = useState(false);
  const [isEmailInputError, setIsEmailInputError] = useState(false);

  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);
  const name = useInput(currentUser.name || '', {
    isEmpty: true,
    minLength: 3,
    maxLength: 20,
    isNameValidError: true
  });
  const email = useInput(currentUser.email || '', { isEmpty: true, minLength: 3, isEmail: true });

  useEffect(() => {
    setErrorState(name.errorMessage, setIsNameInputError);
  }, [name.errorMessage]);

  useEffect(() => {
    setErrorState(email.errorMessage, setIsEmailInputError);
  }, [email.errorMessage]);

  const setErrorState = (errorMessage, setErrorFunction) => {
    const isAllEmpty = Object.values(errorMessage).every((value) => value === '');
    setErrorFunction(!isAllEmpty);
  };

  useEffect(() => {
    if (name.value !== currentUser.name || email.value !== currentUser.email) {
      setIsUserInfoChanged(true);
    } else {
      setIsUserInfoChanged(false);
    }
  }, [name.value, email.value, currentUser]);

  function handleSubmitForm(e) {
    e.preventDefault();
    updateUserInfo({ name: name.value, email: email.value })
      .then((res) => {
        setCurrentUser({ ...currentUser, name: res.name, email: res.email });
        setIsPopUpOpened(true);
        setPopUpMessages({
          title: popUpAlertMessages.titles.success,
          message: popUpAlertMessages.messages.success.updateProfileSuccess
        });
      })
      .catch((err) => {
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(err) });
      });
  }

  function logout() {
    setIsPopUpOpened(true);
    setPopUpMessages({
      title: popUpAlertMessages.titles.success,
      message: popUpAlertMessages.messages.success.logoutSuccess
    });
    setIsLoggedIn(false);
    localStorage.clear();
  }

  const properties = [
    {
      htmlFor: 'name',
      fieldName: 'Имя',
      inputType: 'name',
      inputName: 'name',
      inputId: 'name',
      inputPlaceholder: 'Введите Ваше новое имя',
      validation: {
        target: name,
        properties: ['isEmptyError', 'minLengthError', 'isNameValidError']
      },
      error: isNameInputError
    },
    {
      htmlFor: 'email',
      fieldName: 'E-mail',
      inputType: 'email',
      inputName: 'email',
      inputId: 'email',
      inputPlaceholder: 'Введите Ваш новый email',
      validation: {
        target: email,
        properties: ['isEmptyError', 'minLengthError', 'maxLengthError', 'isEmailError']
      },
      error: isEmailInputError
    }
  ];

  return (
    <section className="profile">
      <div className="profile__wrapper">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <h1 className="profile__title">Привет, {currentUser.name}!</h1>
            <ProfileForm
              properties={properties}
              handleSubmitForm={handleSubmitForm}
              name={name}
              email={email}
              isUserInfoChanged={isUserInfoChanged}
            />
            <Link to="/" className="profile__btn-logout" onClick={() => logout()}>
              Выйти из аккаунта
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

Profile.propTypes = {
  setIsLoggedIn: PropTypes.func,
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  isLoading: PropTypes.bool,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default Profile;
