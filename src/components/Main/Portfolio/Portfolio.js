import React from 'react';
import './Portfolio.css';
import arrowIco from '../../../images/arrow-ico.png';

const Portfolio = () => {
  return (
    <section className="portfolio">
      <div className="portfolio__wrapper">
        <h2 className="portfolio__title">Портфолио</h2>
        <div className="portfolio__content">
          <ul className="portfolio__list">
            <li className="portfolio__item">
              <a href="#" className="portfolio__item-link">
                <span className="portfolio__item-title">Статичный сайт</span>
                <img src={arrowIco} alt="arrow-ico" className="portfolio__item-arrow-ico" />
              </a>
            </li>
            <li className="portfolio__item">
              <a href="#" className="portfolio__item-link">
                <span className="portfolio__item-title">Адаптивный сайт</span>
                <img src={arrowIco} alt="arrow-ico" className="portfolio__item-arrow-ico" />
              </a>
            </li>
            <li className="portfolio__item">
              <a href="#" className="portfolio__item-link">
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
