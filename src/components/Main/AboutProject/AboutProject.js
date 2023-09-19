import React from 'react';
import './AboutProject.css';

const AboutProject = () => {
  return (
    <section className="about-project" name="about">
      <div className="about-project__wrapper">
        <h2 className="about-project__title">О проекте</h2>
        <div className="about-project__description">
          <div className="about-project__description-overview">
            <div className="about-project__description-item">
              <h3 className="about-project__description-title">
                Дипломный проект включал 5 этапов
              </h3>
              <p className="about-project__description-text">
                Составление плана, работу над бэкендом, вёрстку, добавление функциональности и
                финальные доработки.
              </p>
            </div>
            <div className="about-project__description-item">
              <h3 className="about-project__description-title">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="about-project__description-text">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было соблюдать, чтобы
                успешно защититься.
              </p>
            </div>
          </div>
          <div className="about-project__description-snippet">
            <span className="about-project__description-snippet-block about-project__description-snippet-block-1w">
              1 неделя
            </span>
            <span className="about-project__description-snippet-block about-project__description-snippet-block-4w">
              4 недели
            </span>
            <span className="about-project__description-snippet-block about-project__description-snippet-block-desc">
              Back-end
            </span>
            <span className="about-project__description-snippet-block about-project__description-snippet-block-desc">
              Front-end
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutProject;
