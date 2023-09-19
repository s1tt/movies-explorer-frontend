import { Link } from 'react-scroll';
import promoImg from '../../../images/promo-img.png';
import './Promo.css';

import React from 'react';

function Promo() {
  return (
    <section className="promo">
      <div className="promo__wrapper">
        <div className="promo__description">
          <h1 className="promo__title">Учебный проект студента факультета Веб&#8209;разработки.</h1>
          <p className="promo__subtitle">
            Листайте ниже, чтобы узнать больше про этот проект и его создателя.
          </p>
          <Link
            to="about"
            className="promo__more-btn"
            spy={true}
            smooth={true}
            offset={50}
            duration={500}>
            Узнать больше
          </Link>
        </div>
        <img src={promoImg} alt="Web Image" className="promo__img" />
      </div>
    </section>
  );
}

export default Promo;
