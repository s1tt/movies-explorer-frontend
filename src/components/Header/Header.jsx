import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import accountIco from '../../images/icon_account.png';
import logo from '../../images/logo.png';
import './Header.css';

import { useCurrentDevice } from '../../contexts/WindowWidthContext.js';
import Sidebar from '../Sidebar/Sidebar.js';

function Header() {
  const [isBurgerTime, setIsBurgerTime] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const currentDevice = useCurrentDevice();
  const location = useLocation();

  useEffect(() => {
    setIsBurgerTime(currentDevice !== 'desktop');
    setIsMobile(currentDevice === 'mobile');
    console.log(isBurgerTime, currentDevice);
  }, [currentDevice]);

  function checkLocation(pathname, newClassName) {
    if (location.pathname === pathname) {
      return newClassName;
    } else {
      return '';
    }
  }

  return (
    <header id="header" className={`header ${checkLocation('/', 'header_page_main')}`}>
      <div className="header__wrapper">
        <Link to="/" className="header__logo-link ">
          <img className="header__logo" src={logo} alt="Logo" />
        </Link>

        {isBurgerTime ? (
          <Sidebar isMobile={isMobile} pageWrapId={'header'} outerContainerId={'header'} />
        ) : (
          <>
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item">
                  <Link
                    to="/movies"
                    className={`header__nav-link ${checkLocation(
                      '/movies',
                      'header__nav-link_active'
                    )}`}>
                    Фильмы
                  </Link>
                </li>
                <li className="header__nav-item">
                  <Link
                    to="/saved-movies"
                    className={`header__nav-link ${checkLocation(
                      '/saved-movies',
                      'header__nav-link_active'
                    )}`}>
                    Сохранённые фильмы
                  </Link>
                </li>
              </ul>
            </nav>
            <Link
              className={`header__account ${checkLocation('/profile', 'header__nav-link_active')}`}
              to="/profile">
              <span
                className={`header__account-text ${checkLocation(
                  '/profile',
                  'header__nav-link_active'
                )}`}>
                Аккаунт
              </span>
              <div
                className={`header__account-circle ${checkLocation(
                  '/',
                  'header__account-circle_page_main'
                )} ${checkLocation('/profile', 'header__nav-link_active')}`}>
                <img className="header__account-ico" src={accountIco} alt="accountIco" />
              </div>
            </Link>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
