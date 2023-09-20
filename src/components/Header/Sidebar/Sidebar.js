import PropTypes from 'prop-types';
import React from 'react';
import NavTab from '../../Main/NavTab/NavTab';
import AccountBtn from '../AccountBtn/AccountBtn';
import './Sidebar.css';

const Sidebar = ({ open, setOpen, toggleScrollLock }) => {
  function closeBurger(e) {
    if (
      e.target.className.includes('nav__link_mobile_active') ||
      e.currentTarget.className.includes('account-btn_active')
    ) {
      e.preventDefault();
    } else {
      setOpen(false);
      toggleScrollLock();
    }
  }

  return (
    <>
      <div className={`sidebar ${open ? 'sidebar_open' : ''}`}>
        <div className="sidebar__wrapper">
          <NavTab closeBurger={closeBurger} />
          <AccountBtn closeBurger={closeBurger} />
        </div>
      </div>
      {open && <div className="sidebar__blackout "></div>}
    </>
  );
};

Sidebar.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  toggleScrollLock: PropTypes.func
};

export default Sidebar;
