import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import './Profile.css';

const Profile = ({ setIsLoggedIn }) => {
  function onSubmit(e) {
    e.preventDefault();
    console.log('edit profile');
  }

  return (
    <>
      <section className="profile">
        <div className="profile__wrapper">
          <h1 className="profile__title">Привет, Виталий!</h1>
          <form className="profile__form" onSubmit={onSubmit}>
            <div className="profile__fields">
              <label htmlFor="name" className="profile__label">
                Имя
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="profile__input"
                  defaultValue="Виталий"
                  minLength="3"
                  placeholder="Напишите свое имя"
                />
              </label>

              <label htmlFor="email" className="profile__label">
                E-mail
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="profile__input"
                  defaultValue="pochta@yandex.ru"
                  placeholder="Напишите ваш e-mail"
                />
              </label>
            </div>
            <p className="profile__error profile__error_active">
              При обновлении профиля произошла ошибка.
            </p>

            <button type="submit" className="profile__btn-edit">
              Редактировать
            </button>
          </form>
          <Link to="/" className="profile__btn-logout" onClick={() => setIsLoggedIn(false)}>
            Выйти из аккаунта
          </Link>
        </div>
      </section>
    </>
  );
};

Profile.propTypes = {
  setIsLoggedIn: PropTypes.func
};

export default Profile;
