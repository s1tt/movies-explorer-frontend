import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useCurrentDevice } from '../../../contexts/WindowWidthContext';
import { cardsOnDeviceWidth } from '../../../utils/constants';
import MoreBtn from '../MoreBtn/MoreBtn';
import MoviesCard from '../MoviesCard/MoviesCard';
import './MoviesCardList.css';

const MoviesCardList = ({
  isShortMoviesChecked,
  currentLocation,
  isLoading,
  setIsLoading,
  filteredMovies,
  setMovies,
  moviesOnThePage,
  setMoviesOnThePage,
  shortMovies,
  cardsInARow,
  setCardsInARow,
  maxInitialCardsOnThePage,
  setMaxInitialCardsOnThePage,
  isMoviesFound,
  setIsCardLikeRequested,
  isCardLikeRequested,
  setIsPopUpOpened,
  setPopUpMessages,
  setFilteredMovies
}) => {
  const { width } = useCurrentDevice();

  useEffect(() => {
    let newCardsInARow = 1;
    let newMaxInitialCardsOnThePage = 5;

    if (width >= cardsOnDeviceWidth.fourCardsInARow.width) {
      newCardsInARow = 4;
      newMaxInitialCardsOnThePage = 16;
    } else if (width >= cardsOnDeviceWidth.threeCardsInARow.width) {
      newCardsInARow = 3;
      newMaxInitialCardsOnThePage = 12;
    } else if (width >= cardsOnDeviceWidth.twoCardsInARow.width) {
      newCardsInARow = 2;
      newMaxInitialCardsOnThePage = 8;
    }

    setCardsInARow(newCardsInARow);
    setMaxInitialCardsOnThePage(newMaxInitialCardsOnThePage);
  }, [width]); // Этот эффект выполнится каждый раз, когда значение ширины экрана изменится, отвечает за расчет количества карточек в строку и при изменении экрана

  return (
    <div className="movies-card-list">
      {moviesOnThePage && moviesOnThePage.length > 0 ? (
        <ul className="movies-card-list__items">
          {moviesOnThePage.map((movie) => (
            <li key={movie.id ? movie.id : movie._id} className="movies-card-list__item">
              <MoviesCard
                movie={movie}
                isLoading={isLoading}
                setIsLoading={setIsLoading}
                setMovies={setMovies}
                setIsCardLikeRequested={setIsCardLikeRequested}
                isCardLikeRequested={isCardLikeRequested}
                setIsPopUpOpened={setIsPopUpOpened}
                setPopUpMessages={setPopUpMessages}
                setMoviesOnThePage={setMoviesOnThePage}
                setFilteredMovies={setFilteredMovies}
              />
            </li>
          ))}
        </ul>
      ) : currentLocation === 'movies' ? (
        <h2
          className={`movies-card-list__empty ${
            !isMoviesFound ? '' : 'movies-card-list__empty_active'
          }`}>
          Ничего не найдено
        </h2>
      ) : (
        <h2
          className={`movies-card-list__empty ${
            moviesOnThePage.length ? '' : 'movies-card-list__empty_active'
          }`}>
          Ничего не найдено
        </h2>
      )}
      {moviesOnThePage.length > 0 &&
        (isShortMoviesChecked
          ? moviesOnThePage.length < shortMovies.length
          : moviesOnThePage.length < filteredMovies.length) &&
        currentLocation === 'movies' && (
          <MoreBtn
            moviesOnThePage={moviesOnThePage}
            setMoviesOnThePage={setMoviesOnThePage}
            cardsInARow={cardsInARow}
            filteredMovies={filteredMovies}
            shortMovies={shortMovies}
            maxInitialCardsOnThePage={maxInitialCardsOnThePage}
            isShortMoviesChecked={isShortMoviesChecked}
            currentLocation={currentLocation}
          />
        )}
    </div>
  );
};

MoviesCardList.propTypes = {
  movies: PropTypes.array,
  setMovies: PropTypes.func,
  isShortMoviesChecked: PropTypes.bool,
  isLoading: PropTypes.bool,
  formData: PropTypes.string,
  filteredMovies: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  moviesOnThePage: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),
  cardsInARow: PropTypes.number,
  setMoviesOnThePage: PropTypes.func,
  setIsShortMoviesChecked: PropTypes.func,
  currentLocation: PropTypes.string,
  setIsLoading: PropTypes.func,
  setFilteredMovies: PropTypes.func,
  setShortMovies: PropTypes.func,
  setCardsInARow: PropTypes.func,
  setMaxInitialCardsOnThePage: PropTypes.func,
  setIsMoviesFound: PropTypes.func,
  setIsCardLikeRequested: PropTypes.func,
  isCardLikeRequested: PropTypes.bool,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func,
  shortMovies: PropTypes.array,
  maxInitialCardsOnThePage: PropTypes.number,
  isMoviesFound: PropTypes.bool
};

export default MoviesCardList;
