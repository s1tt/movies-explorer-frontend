import React from 'react';
import './NotFound.css';

import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <section className="not-found">
      <div className="not-found__wrapper">
        <div className="not-found__content">
          <h1 className="not-found__title">404</h1>
          <p className="not-found__description">Страница не найдена</p>
        </div>
        <Link to="/" className="not-found__link">
          Назад
        </Link>
      </div>
    </section>
  );
};

export default NotFound;
