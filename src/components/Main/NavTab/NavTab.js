import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';
import { useCurrentDevice } from '../../../contexts/WindowWidthContext';
import './NavTab.css';

const NavTab = ({ closeBurger }) => {
  const location = useLocation();
  const currentDevice = useCurrentDevice();

  function checkClassNameForElement(elementType, pathname) {
    const isActive = location.pathname === pathname;
    const baseClassName = `nav__${elementType}`;
    const mobileClassName = currentDevice === 'desktop' ? '' : `${baseClassName}_mobile`;
    let newClassName = baseClassName;
    let activeClassModifier = '';

    newClassName = `${baseClassName} ${mobileClassName}`.trim();

    if (mobileClassName) {
      activeClassModifier = isActive ? mobileClassName + '_active' : '';
    } else {
      activeClassModifier = isActive ? newClassName + '_active' : '';
    }

    const finalClassName = `${baseClassName} ${mobileClassName} ${activeClassModifier}`.trim();

    return finalClassName;
  }

  return (
    <nav className={`nav ${currentDevice === 'desktop' ? '' : 'nav_mobile'}`}>
      <ul className={`nav__list ${currentDevice === 'desktop' ? '' : 'nav__list_mobile'}`}>
        {currentDevice !== 'desktop' && (
          <li className={checkClassNameForElement('item', '/')}>
            <Link
              to="/"
              className={checkClassNameForElement('link', '/')}
              onClick={closeBurger ? (e) => closeBurger(e) : (e) => e.preventDefault()}>
              Главная
            </Link>
          </li>
        )}
        <li className={checkClassNameForElement('item', '/movies')}>
          <Link
            to="/movies"
            className={checkClassNameForElement('link', '/movies')}
            onClick={closeBurger ? (e) => closeBurger(e) : (e) => e.preventDefault}>
            Фильмы
          </Link>
        </li>
        <li className={checkClassNameForElement('item', '/saved-movies')}>
          <Link
            to="/saved-movies"
            className={checkClassNameForElement('link', '/saved-movies')}
            onClick={closeBurger ? (e) => closeBurger(e) : (e) => e.preventDefault}>
            Сохранённые фильмы
          </Link>
        </li>
      </ul>
    </nav>
  );
};

NavTab.propTypes = {
  closeBurger: PropTypes.func
};

export default NavTab;
