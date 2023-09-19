import PropTypes from 'prop-types';
import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { Link, useLocation } from 'react-router-dom';
import burgerIco from '../../../images/burger.svg';
import crossIco from '../../../images/cross.svg';
import accountIco from '../../../images/icon_account.png';
import './Sidebar.css';

function Sidebar({ isMobile }) {
  const location = useLocation();

  return (
    <Menu
      right
      width={isMobile ? '100%' : '520px'}
      customBurgerIcon={<img src={burgerIco} />}
      customCrossIcon={<img src={crossIco} />}>
      <ul className="header__nav-list header__nav-list-burger">
        <li className="header__nav-item header__nav-item-burger">
          <Link
            to="/"
            className={`menu-item header__nav-link header__nav-link-burger ${
              location.pathname === '/' && 'header__nav-link-burger_active'
            }`}>
            Главная
          </Link>
        </li>
        <li className="header__nav-item header__nav-item-burger">
          <Link
            to="/movies"
            className={`menu-item header__nav-link header__nav-link-burger ${
              location.pathname === '/movies' && 'header__nav-link-burger_active'
            }`}>
            Фильмы
          </Link>
        </li>
        <li className="header__nav-item header__nav-item-burger">
          <Link
            to="/saved-movies"
            className={`menu-item header__nav-link header__nav-link-burger ${
              location.pathname === '/saved-movies' && 'header__nav-link-burger_active'
            }`}>
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
      <Link className="header__account header__account-burger" to="/profile">
        <span className="header__account-text header__account-text-burger">Аккаунт</span>
        <div className="header__account-circle header__account-circle-burger">
          <img
            className="header__account-ico header__account-ico-burger"
            src={accountIco}
            alt="accountIco"
          />
        </div>
      </Link>
    </Menu>
  );
}

Sidebar.propTypes = {
  isMobile: PropTypes.bool.isRequired
};

export default Sidebar;
