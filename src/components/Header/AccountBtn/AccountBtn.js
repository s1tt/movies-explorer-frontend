import PropTypes from 'prop-types';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCurrentDevice } from '../../../contexts/WindowWidthContext';
import accountIco from '../../../images/icon_account.svg';
import './AccountBtn.css';

const AccountBtn = ({ closeBurger }) => {
  const currentDevise = useCurrentDevice().device;
  const location = useLocation();
  return (
    <Link
      className={`account-btn ${currentDevise === 'desktop' ? '' : 'account-btn_mobile'} ${
        location.pathname === '/profile' ? 'account-btn_active' : ''
      }`}
      to="/profile"
      onClick={closeBurger ? (e) => closeBurger(e) : ''}>
      <span
        className={`account-btn__text ${
          currentDevise === 'desktop' ? '' : 'account-btn__text_mobile'
        }`}>
        Аккаунт
      </span>
      <div
        className={`account-btn__circle ${
          currentDevise === 'desktop' ? '' : 'account-btn__circle_mobile'
        } ${
          location.pathname === '/' && currentDevise === 'desktop'
            ? 'account-btn__circle_page_main'
            : ''
        }`}>
        <img
          className={`account-btn__ico ${
            currentDevise === 'desktop' ? '' : 'account-btn__ico_mobile'
          }`}
          src={accountIco}
          alt="Иконка аккаунта"
        />
      </div>
    </Link>
  );
};

AccountBtn.propTypes = {
  closeBurger: PropTypes.func
};

export default AccountBtn;
