import PropTypes from 'prop-types';
import React from 'react';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

import { deviceWidth } from '../../../utils/constants';
import MoreBtn from '../MoreBtn/MoreBtn';

import { useCurrentDevice } from '../../../contexts/WindowWidthContext';

const MoviesCardList = ({ cardData }) => {
  const currentDevice = useCurrentDevice();

  return (
    <div className="movies-card-list">
      {cardData && cardData.length > 0 ? (
        <div className="movies-card-list__items">
          {cardData
            .slice(0, deviceWidth[currentDevice].cards.initialQuantity)
            .map((item, index) => (
              <MoviesCard key={index} data={item} />
            ))}
        </div>
      ) : (
        <h2 className="movies-card-list__empty">Список фильмов пуст</h2>
      )}
      {cardData.length > deviceWidth.desktop.cards.initialQuantity && <MoreBtn />}
    </div>
  );
};

MoviesCardList.propTypes = {
  cardData: PropTypes.array
};

export default MoviesCardList;
