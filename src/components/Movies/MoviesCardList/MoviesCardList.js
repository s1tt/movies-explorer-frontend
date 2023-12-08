import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useMoviesOnThePage } from '../../../contexts/MoviesOnThePageContext';
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
  cardsInARow,
  setCardsInARow,
  maxInitialCardsOnThePage,
  setMaxInitialCardsOnThePage,
  isMoviesFound,
  setIsCardLikeRequested,
  isCardLikeRequested,
  setIsPopUpOpened,
  setPopUpMessages
}) => {
  const { moviesOnThePage } = useMoviesOnThePage();
  const { width } = useCurrentDevice();

  useEffect(() => {
    let newCardsInARow = cardsOnDeviceWidth.oneCardInARow.addCards;
    let newMaxInitialCardsOnThePage = cardsOnDeviceWidth.oneCardInARow.maxInitialCards;

    if (width >= cardsOnDeviceWidth.fourCardsInARow.width) {
      newCardsInARow = cardsOnDeviceWidth.fourCardsInARow.addCards;
      newMaxInitialCardsOnThePage = cardsOnDeviceWidth.fourCardsInARow.maxInitialCards;
    } else if (width >= cardsOnDeviceWidth.threeCardsInARow.width) {
      newCardsInARow = cardsOnDeviceWidth.threeCardsInARow.addCards;
      newMaxInitialCardsOnThePage = cardsOnDeviceWidth.threeCardsInARow.maxInitialCards;
    } else if (width >= cardsOnDeviceWidth.twoCardsInARow.width) {
      newCardsInARow = cardsOnDeviceWidth.twoCardsInARow.addCards;
      newMaxInitialCardsOnThePage = cardsOnDeviceWidth.twoCardsInARow.maxInitialCards;
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
                setIsCardLikeRequested={setIsCardLikeRequested}
                isCardLikeRequested={isCardLikeRequested}
                setIsPopUpOpened={setIsPopUpOpened}
                setPopUpMessages={setPopUpMessages}
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
            moviesOnThePage.length > 1 ? '' : 'movies-card-list__empty_active'
          }`}>
          Ничего не найдено
        </h2>
      )}

      {JSON.parse(localStorage.getItem('movies_filteredMovies')) &&
        moviesOnThePage.length < JSON.parse(localStorage.getItem('movies_filteredMovies')).length &&
        currentLocation === 'movies' && (
          <MoreBtn
            cardsInARow={cardsInARow}
            maxInitialCardsOnThePage={maxInitialCardsOnThePage}
            isShortMoviesChecked={isShortMoviesChecked}
            currentLocation={currentLocation}
          />
        )}
    </div>
  );
};

MoviesCardList.propTypes = {
  isShortMoviesChecked: PropTypes.bool,
  isLoading: PropTypes.bool,
  formData: PropTypes.string,
  cardsInARow: PropTypes.number,
  setIsShortMoviesChecked: PropTypes.func,
  currentLocation: PropTypes.string,
  setIsLoading: PropTypes.func,
  setCardsInARow: PropTypes.func,
  setMaxInitialCardsOnThePage: PropTypes.func,
  setIsMoviesFound: PropTypes.func,
  setIsCardLikeRequested: PropTypes.func,
  isCardLikeRequested: PropTypes.bool,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func,
  maxInitialCardsOnThePage: PropTypes.number,
  isMoviesFound: PropTypes.bool
};

export default MoviesCardList;
