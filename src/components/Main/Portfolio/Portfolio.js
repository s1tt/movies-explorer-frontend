import React from 'react';
import arrowIco from '../../../images/arrow-ico.png';
import './Portfolio.css';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h2 className="portfolio__title">Портфолио</h2>
        <div className="portfolio__content">
          <ul className="portfolio__list">
            <li className="portfolio__item">
              <a
                href="https://github.com/s1tt/how-to-learn"
                target="_blank"
                rel="noreferrer"
                className="portfolio__item-link">
                <span className="portfolio__item-title">Статичный сайт</span>
                <img src={arrowIco} alt="arrow-ico" className="portfolio__item-arrow-ico" />
              </a>
            </li>
            <li className="portfolio__item">
              <a
                href="https://github.com/s1tt/russian-travel"
                target="_blank"
                rel="noreferrer"
                className="portfolio__item-link">
                <span className="portfolio__item-title">Адаптивный сайт</span>
                <img src={arrowIco} alt="arrow-ico" className="portfolio__item-arrow-ico" />
              </a>
            </li>
            <li className="portfolio__item">
              <a
                href="https://github.com/s1tt/react-mesto-auth"
                target="_blank"
                rel="noreferrer"
                className="portfolio__item-link">
                <span className="portfolio__item-title">Одностраничное приложение</span>
                <img src={arrowIco} alt="arrow-ico" className="portfolio__item-arrow-ico" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Portfolio;
