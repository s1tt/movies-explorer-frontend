import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../../Hooks/useInput.js';
import { CurrentUserContext } from '../../contexts/CurrentUserContext.js';
import { useFormBlocking } from '../../contexts/FormBlockingContext';
import { updateUserInfo } from '../../utils/MainApi.js';
import { errorHandler, popUpAlertMessages } from '../../utils/constants.js';
import Preloader from '../Preloader/Preloader.js';
import './Profile.css';
import ProfileForm from './ProfileForm/ProfileForm.js';

const Profile = ({ isLoading, setIsPopUpOpened, setPopUpMessages }) => {
  const { currentUser, setIsLoggedIn } = useContext(CurrentUserContext);
  const [isNameInputError, setIsNameInputError] = useState(false);
  const [isEmailInputError, setIsEmailInputError] = useState(false);
  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);
  const { isFormSubmitting, setIsFormSubmitting } = useFormBlocking();

  const name = useInput(currentUser.name || '', {
    isEmpty: true,
    minLength: 3,
    maxLength: 20,
    isNameValidError: true
  });
  const email = useInput(currentUser.email || '', { isEmpty: true, minLength: 3, isEmail: true });

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
    setIsFormSubmitting(true);
    updateUserInfo({ name: name.value, email: email.value })
      .then((res) => {
        currentUser.name = res.name;
        currentUser.email = res.email;
        setIsPopUpOpened(true);
        setPopUpMessages({
          title: popUpAlertMessages.titles.success,
          message: popUpAlertMessages.messages.success.updateProfileSuccess
        });
      })
      .catch((err) => {
        console.log(err);
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(err) });
      })
      .finally(() => setIsFormSubmitting(false));
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
            <Link
              to="/"
              className={`profile__btn-logout ${isFormSubmitting ? 'link-disabled' : ''}`}
              onClick={() => logout()}>
              Выйти из аккаунта
            </Link>
          </>
        )}
      </div>
    </section>
  );
};

Profile.propTypes = {
  currentUser: PropTypes.object,
  isLoading: PropTypes.bool,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default Profile;
