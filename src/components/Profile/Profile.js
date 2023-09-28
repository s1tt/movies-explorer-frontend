import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import useInput from '../../Hooks/useInput.js';
import { updateUserInfo } from '../../utils/MainApi.js';
import { errorHandler, popUpAlertMessages } from '../../utils/constants.js';
import Preloader from '../Preloader/Preloader.js';
import './Profile.css';

const Profile = ({
  setIsLoggedIn,
  currentUser,
  setCurrentUser,
  isLoading,
  setIsPopUpOpened,
  setPopUpMessages
}) => {
  const [isUserInfoChanged, setIsUserInfoChanged] = useState(false);
  const name = useInput(currentUser.name || '', {
    isEmpty: true,
    minLength: 3,
    maxLength: 20,
    isNameValidError: true
  });
  const email = useInput(currentUser.email || '', { isEmpty: true, minLength: 3, isEmail: true });

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

  return (
    <section className="profile">
      <div className="profile__wrapper">
        {isLoading ? (
          <Preloader />
        ) : (
          <>
            <h1 className="profile__title">Привет, {currentUser.name}</h1>
            <form className="profile__form" onSubmit={handleSubmitForm}>
              <div className="profile__fields">
                <label htmlFor="name" className="profile__label">
                  <div className="profile__field">
                    <span>Имя</span>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      className="profile__input"
                      value={name.value}
                      placeholder="Напишите свое имя"
                      onChange={(e) => name.onChange(e)}
                      onFocus={(e) => name.onFocus(e)}
                    />
                  </div>
                  <div className="profile__errors">
                    {name.isDirty && name.isEmpty && (
                      <div className="profile__validation-error">{name.errorMessage.isEmpty}</div>
                    )}
                    {name.isDirty && name.minLengthError && (
                      <div className="profile__validation-error">
                        {name.errorMessage.minLengthError}
                      </div>
                    )}
                    {name.isDirty && name.maxLengthError && (
                      <div className="profile__validation-error">
                        {name.errorMessage.maxLengthError}
                      </div>
                    )}
                    {name.isDirty && name.isNameValidError && (
                      <div className="profile__validation-error">
                        {name.errorMessage.isNameValidError}
                      </div>
                    )}
                  </div>
                </label>

                <label htmlFor="email" className="profile__label">
                  <div className="profile__field">
                    <span>E-mail</span>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="profile__input"
                      value={email.value}
                      placeholder="Напишите ваш e-mail"
                      onChange={(e) => email.onChange(e)}
                      onFocus={(e) => email.onFocus(e)}
                    />
                  </div>
                  <div className="profile__errors">
                    {email.isDirty && email.isEmpty && (
                      <div className="profile__validation-error">{email.errorMessage.isEmpty}</div>
                    )}
                    {email.isDirty && email.minLengthError && (
                      <div className="profile__validation-error">
                        {email.errorMessage.minLengthError}
                      </div>
                    )}
                    {email.isDirty && email.isEmailError && (
                      <div className="profile__validation-error">
                        {email.errorMessage.isEmailError}
                      </div>
                    )}
                  </div>
                </label>
              </div>

              <button
                type="submit"
                disabled={email.isInputValid || name.isInputValid || !isUserInfoChanged}
                className="profile__btn-edit">
                Редактировать
              </button>
            </form>
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
