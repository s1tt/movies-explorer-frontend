import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { getFavoriteMovies } from '../../../utils/MainApi';
import { errorHandler, popUpAlertMessages } from '../../../utils/constants';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

const SavedMovies = ({
  isLoading,
  setIsLoading,
  cardsInARow,
  setCardsInARow,
  maxInitialCardsOnThePage,
  setMaxInitialCardsOnThePage,
  isCardLikeRequested,
  setIsCardLikeRequested,
  currentLocation,
  setIsPopUpOpened,
  setPopUpMessages
}) => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  const [shortFavoriteMovies, setShortFavoriteMovies] = useState([]);
  const [filteredFavoriteMovies, setFilteredFavoriteMovies] = useState([]);
  const [formDataForFavoriteMovies, setFormDataForFavoriteMovies] = useState('');
  const [isShortFavoriteMoviesChecked, setIsShortFavoriteMoviesChecked] = useState(false);
  const [moviesOnTheFavoritePage, setMoviesOnTheFavoritePage] = useState([]);
  const [isFavoriteMoviesFound, setIsFavoriteMoviesFound] = useState(false);

  useEffect(() => {
    getFavoriteMovies()
      .then((data) => {
        setFavoriteMovies(data);
        localStorage.setItem(`${currentLocation}_movies`, JSON.stringify(data));
        setMoviesOnTheFavoritePage(data);
      })
      .then(() => {
        const shortFavoriteMoviesArray = filterShortMovies(
          JSON.parse(localStorage.getItem(`${currentLocation}_movies`))
        );
        setShortFavoriteMovies(shortFavoriteMoviesArray);
        localStorage.setItem(
          `${currentLocation}_shortMovies`,
          JSON.stringify(shortFavoriteMoviesArray)
        );
      })
      .catch((error) => {
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(error) });
      });
  }, [isCardLikeRequested]);

  useEffect(() => {
    if (isShortFavoriteMoviesChecked) {
      setMoviesOnTheFavoritePage(shortFavoriteMovies);
      localStorage.setItem(
        `${currentLocation}_moviesOnThePage`,
        JSON.stringify(shortFavoriteMovies)
      );
    } else {
      if (formDataForFavoriteMovies.length > 0) {
        setMoviesOnTheFavoritePage(filteredFavoriteMovies);
        localStorage.setItem(
          `${currentLocation}_moviesOnThePage`,
          JSON.stringify(filteredFavoriteMovies)
        );
      } else {
        setMoviesOnTheFavoritePage(favoriteMovies);
        localStorage.setItem(`${currentLocation}_moviesOnThePage`, JSON.stringify(favoriteMovies));
      }
    }
  }, [isShortFavoriteMoviesChecked]);

  useEffect(() => {
    if (isShortFavoriteMoviesChecked) {
      setMoviesOnTheFavoritePage(filterShortMovies(filteredFavoriteMovies));
      localStorage.setItem(
        `${currentLocation}_moviesOnThePage`,
        JSON.stringify(filterShortMovies(filteredFavoriteMovies))
      );
    } else {
      setMoviesOnTheFavoritePage(filteredFavoriteMovies);
      localStorage.setItem(
        `${currentLocation}_moviesOnThePage`,
        JSON.stringify(filteredFavoriteMovies)
      );
    }
  }, [filteredFavoriteMovies]);

  const filterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration < 40);
  };

  return (
    <>
      <section className="movies">
        <div className="movies__wrapper">
          <div className="movies__search-form">
            <SearchForm
              moviesOnThePage={moviesOnTheFavoritePage}
              setMoviesOnThePage={setMoviesOnTheFavoritePage}
              shortMovies={shortFavoriteMovies}
              setShortMovies={setShortFavoriteMovies}
              setIsMoviesFound={setIsFavoriteMoviesFound}
              movies={favoriteMovies}
              setMovies={setFavoriteMovies}
              setFilteredMovies={setFilteredFavoriteMovies}
              isShortMoviesChecked={isShortFavoriteMoviesChecked}
              setIsShortMoviesChecked={setIsShortFavoriteMoviesChecked}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              formData={formDataForFavoriteMovies}
              setFormData={setFormDataForFavoriteMovies}
              currentLocation={currentLocation}
              setIsPopUpOpened={setIsPopUpOpened}
              setPopUpMessages={setPopUpMessages}
            />
          </div>
          <div className="movies__card-list">
            <MoviesCardList
              setIsPopUpOpened={setIsPopUpOpened}
              setPopUpMessages={setPopUpMessages}
              isCardLikeRequested={isCardLikeRequested}
              setIsCardLikeRequested={setIsCardLikeRequested}
              isMoviesFound={isFavoriteMoviesFound}
              cardsInARow={cardsInARow}
              setCardsInARow={setCardsInARow}
              maxInitialCardsOnThePage={maxInitialCardsOnThePage}
              setMaxInitialCardsOnThePage={setMaxInitialCardsOnThePage}
              shortMovies={shortFavoriteMovies}
              setShortMovies={setShortFavoriteMovies}
              moviesOnThePage={moviesOnTheFavoritePage}
              setMoviesOnThePage={setMoviesOnTheFavoritePage}
              movies={favoriteMovies}
              setMovies={setFavoriteMovies}
              filteredMovies={filteredFavoriteMovies}
              setFilteredMovies={setFilteredFavoriteMovies}
              currentLocation={currentLocation}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              isShortMoviesChecked={isShortFavoriteMoviesChecked}
              setIsShortMoviesChecked={setIsShortFavoriteMoviesChecked}
            />
          </div>
        </div>
      </section>
    </>
  );
};

SavedMovies.propTypes = {
  formData: PropTypes.string,
  setFormData: PropTypes.func,
  moviesOnThePage: PropTypes.array,
  setMoviesOnThePage: PropTypes.func,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  currentLocation: PropTypes.string,
  cardsInARow: PropTypes.number,
  setCardsInARow: PropTypes.func,
  maxInitialCardsOnThePage: PropTypes.number,
  setMaxInitialCardsOnThePage: PropTypes.func,
  isCardLikeRequested: PropTypes.bool,
  setIsCardLikeRequested: PropTypes.func,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default SavedMovies;
