import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import cardCrossIco from '../../../images/card-cross-ico.svg';
import './MoviesCard.css';

const MoviesCard = ({ data }) => {
  const location = useLocation();
  return (
    <article className="card">
      <img className="card__img" src={process.env.PUBLIC_URL + data.image} alt="card1" />
      <div className="card__about">
        <div className="card__description">
          <h3 className="card__title">{data.title}</h3>
          <span className="card__duration-time">{data.duration}</span>
        </div>
        {location.pathname === '/movies' ? (
          <label htmlFor={`favorite-${data.id}`} className="card__favorite-checkbox-label">
            <input
              className="card__favorite-checkbox"
              type="checkbox"
              name={`favorite-${data.id}`}
              id={`favorite-${data.id}`}
              defaultChecked={data.isLiked}
            />
            <span className="card__favorite-checkmark"></span>
          </label>
        ) : (
          <button className="card__cross-btn">
            <img className="card__cross-ico" src={cardCrossIco} alt="cross-ico" />
          </button>
        )}
      </div>
    </article>
  );
};

MoviesCard.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.string.isRequired,
    isLiked: PropTypes.bool.isRequired
  }).isRequired
};

export default MoviesCard;