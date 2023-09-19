import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <section className="footer">
      <div className="footer__wrapper">
        <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
        <div className="footer__content">
          <p className="footer__copy">&copy;2023</p>
          <ul className="footer__links">
            <li className="footer__links-item">
              <a href="#" className="footer__link">
                Яндекс.Практикум
              </a>
            </li>
            <li className="footer__links-item">
              <a href="#" className="footer__link">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Footer;
