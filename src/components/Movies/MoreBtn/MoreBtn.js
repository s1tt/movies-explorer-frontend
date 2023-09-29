import PropTypes from 'prop-types';
import React from 'react';
import './MoreBtn.css';

const MoreBtn = ({
  moviesOnThePage,
  setMoviesOnThePage,
  cardsInARow,
  filteredMovies,
  shortMovies,
  isShortMoviesChecked,
  currentLocation
}) => {
  function loadCards() {
    const newMovies = isShortMoviesChecked
      ? shortMovies.slice(moviesOnThePage.length, moviesOnThePage.length + cardsInARow)
      : filteredMovies.slice(moviesOnThePage.length, moviesOnThePage.length + cardsInARow);
    const newArray = [...moviesOnThePage, ...newMovies];
    setMoviesOnThePage(newArray);
    localStorage.setItem(`${currentLocation}_moviesOnThePage`, JSON.stringify(newArray));
  }
  return (
    <button className="movies-card-list__more-btn" type="button" onClick={loadCards}>
      Еще
    </button>
  );
};

MoreBtn.propTypes = {
  isShortMoviesChecked: PropTypes.bool,
  maxInitialCardsOnThePage: PropTypes.number,
  shortMovies: PropTypes.array,
  filteredMovies: PropTypes.array,
  moviesOnThePage: PropTypes.array,
  cardsInARow: PropTypes.number,
  setMoviesOnThePage: PropTypes.func,
  currentLocation: PropTypes.string
};

export default MoreBtn;
