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
      <div className="movies-card-list__items">
        {cardData.slice(0, deviceWidth[currentDevice].cards.initialQuantity).map((item, index) => (
          <MoviesCard key={index} data={item} />
        ))}
      </div>
      {cardData.length > deviceWidth.desktop.cards.initialQuantity && <MoreBtn />}
    </div>
  );
};

MoviesCardList.propTypes = {
  cardData: PropTypes.array
};

export default MoviesCardList;
