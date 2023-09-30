import PropTypes from 'prop-types';
import React from 'react';
import { useMoviesOnThePage } from '../../../contexts/MoviesOnThePageContext';
import './MoreBtn.css';

const MoreBtn = ({ cardsInARow, isShortMoviesChecked, currentLocation }) => {
  const { moviesOnThePage, setMoviesOnThePage } = useMoviesOnThePage();

  function loadCards() {
    const shortMovies = JSON.parse(localStorage.getItem(`${currentLocation}_shortMovies`)) || [];
    const filteredMovies =
      JSON.parse(localStorage.getItem(`${currentLocation}_filteredMovies`)) || [];

    const newMovies = isShortMoviesChecked
      ? shortMovies.slice(moviesOnThePage.length, moviesOnThePage.length + cardsInARow)
      : filteredMovies.slice(moviesOnThePage.length, moviesOnThePage.length + cardsInARow);
    const newArray = [...moviesOnThePage, ...newMovies];
    setMoviesOnThePage(newArray);
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
  cardsInARow: PropTypes.number,
  currentLocation: PropTypes.string
};

export default MoreBtn;
