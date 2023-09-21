import React from 'react';
import photo from '../../../images/pic__COLOR_pic.jpg';
import './AboutMe.css';

const AboutMe = () => {
  return (
    <section className="about-me">
      <div className="about-me__wrapper">
        <h2 className="about-me__title">Студент</h2>
        <div className="about-me__content">
          <div className="about-me__description">
            <h3 className="about-me__name">Виталий</h3>
            <p className="about-me__job">Фронтенд-разработчик, 30 лет</p>
            <p className="about-me__bio">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У меня есть жена и
              дочь. Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить. С 2015 года
              работал в компании «СКБ Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <a
              href="https://github.com/s1tt"
              target="_blank"
              rel="noreferrer"
              className="about-me__gh-link">
              Github
            </a>
          </div>
          <img src={photo} alt="Фотография владельца сайта" className="about-me__photo" />
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
