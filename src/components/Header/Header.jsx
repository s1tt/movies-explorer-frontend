import React, { useContext, useState } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.css';

import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { useCurrentDevice } from '../../contexts/WindowWidthContext.js';
import Logo from '../Logo/Logo';
import NavTab from '../Main/NavTab/NavTab';
import AccountBtn from './AccountBtn/AccountBtn';
import Auth from './Auth/Auth';
import BurgerBtn from './Sidebar/BurgerBtn/BurgerBtn';
import Sidebar from './Sidebar/Sidebar';

function Header() {
  const { isLoggedIn } = useContext(CurrentUserContext);
  const currentDevice = useCurrentDevice().device;
  const location = useLocation();
  const [isBurgerOpen, setIsBurgerOpen] = useState(false);

  const toggleScrollLock = () => {
    if (!isBurgerOpen) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  };

  return (
    <header id="header" className={`header ${location.pathname === '/' ? 'header_page_main' : ''}`}>
      <div className="header__wrapper">
        <Logo />

        {isLoggedIn ? (
          currentDevice !== 'desktop' ? (
            <>
              <BurgerBtn
                open={isBurgerOpen}
                setOpen={setIsBurgerOpen}
                toggleScrollLock={toggleScrollLock}
              />
              <Sidebar
                open={isBurgerOpen}
                setOpen={setIsBurgerOpen}
                toggleScrollLock={toggleScrollLock}
              />
            </>
          ) : (
            <>
              <NavTab />
              <AccountBtn />
            </>
          )
        ) : (
          <Auth />
        )}
      </div>
    </header>
  );
}
export default Header;
