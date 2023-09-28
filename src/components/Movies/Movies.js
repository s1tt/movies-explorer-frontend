import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import Preloader from '../Preloader/Preloader';
import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

const Movies = ({
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
  const [globalMovies, setGlobalMovies] = useState([]);
  const [shortGlobalMovies, setShortGlobalMovies] = useState([]);
  const [filteredGlobalMovies, setFilteredGlobalMovies] = useState([]);
  const [formDataForGlobalMovies, setFormDataForGlobalMovies] = useState('');
  const [isShortGlobalMoviesChecked, setIsShortGlobalMoviesChecked] = useState(false);
  const [moviesOnTheGlobalPage, setMoviesOnTheGlobalPage] = useState([]);

  const [isGlobalMoviesFound, setIsGlobalMoviesFound] = useState(false);

  useEffect(() => {
    if (isShortGlobalMoviesChecked) {
      setMoviesOnTheGlobalPage(shortGlobalMovies.slice(0, maxInitialCardsOnThePage));
      localStorage.setItem(
        `${currentLocation}_moviesOnThePage`,
        JSON.stringify(shortGlobalMovies.slice(0, maxInitialCardsOnThePage))
      );
    } else {
      const filteredGlobalMovies =
        JSON.parse(localStorage.getItem(`${currentLocation}_filteredMovies`)) || [];

      setMoviesOnTheGlobalPage(filteredGlobalMovies.slice(0, maxInitialCardsOnThePage));
      localStorage.setItem(
        `${currentLocation}_moviesOnThePage`,
        JSON.stringify(filteredGlobalMovies.slice(0, maxInitialCardsOnThePage))
      );
    }
  }, [isShortGlobalMoviesChecked, formDataForGlobalMovies, filteredGlobalMovies, cardsInARow]);

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <div className="movies__search-form">
          <SearchForm
            moviesOnThePage={moviesOnTheGlobalPage}
            setMoviesOnThePage={setMoviesOnTheGlobalPage}
            cardsInARow={cardsInARow}
            shortMovies={shortGlobalMovies}
            setShortMovies={setShortGlobalMovies}
            setIsMoviesFound={setIsGlobalMoviesFound}
            movies={globalMovies}
            setMovies={setGlobalMovies}
            setFilteredMovies={setFilteredGlobalMovies}
            isShortMoviesChecked={isShortGlobalMoviesChecked}
            setIsShortMoviesChecked={setIsShortGlobalMoviesChecked}
            isLoading={isLoading}
            setIsLoading={setIsLoading}
            formData={formDataForGlobalMovies}
            setFormData={setFormDataForGlobalMovies}
            currentLocation={currentLocation}
            setIsPopUpOpened={setIsPopUpOpened}
            setPopUpMessages={setPopUpMessages}
          />
        </div>
        <div className="movies__card-list">
          {isLoading ? (
            <Preloader />
          ) : (
            <MoviesCardList
              setIsPopUpOpened={setIsPopUpOpened}
              setPopUpMessages={setPopUpMessages}
              isCardLikeRequested={isCardLikeRequested}
              setIsCardLikeRequested={setIsCardLikeRequested}
              isMoviesFound={isGlobalMoviesFound}
              cardsInARow={cardsInARow}
              setCardsInARow={setCardsInARow}
              maxInitialCardsOnThePage={maxInitialCardsOnThePage}
              setMaxInitialCardsOnThePage={setMaxInitialCardsOnThePage}
              shortMovies={shortGlobalMovies}
              setShortMovies={setShortGlobalMovies}
              moviesOnThePage={moviesOnTheGlobalPage}
              setMoviesOnThePage={setMoviesOnTheGlobalPage}
              setMovies={setGlobalMovies}
              movies={globalMovies}
              filteredMovies={filteredGlobalMovies}
              setFilteredMovies={setFilteredGlobalMovies}
              setFormData={setFormDataForGlobalMovies}
              formData={formDataForGlobalMovies}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              setIsShortMoviesChecked={setIsShortGlobalMoviesChecked}
              isShortMoviesChecked={isShortGlobalMoviesChecked}
              currentLocation={currentLocation}
            />
          )}
        </div>
      </div>
    </section>
  );
};

Movies.propTypes = {
  formData: PropTypes.string,
  setFormData: PropTypes.func,
  moviesOnThePage: PropTypes.array,
  setMoviesOnThePage: PropTypes.func,
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  currentLocation: PropTypes.string,
  isCardLikeRequested: PropTypes.bool,
  setIsCardLikeRequested: PropTypes.func,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func,
  cardsInARow: PropTypes.number,
  setCardsInARow: PropTypes.func,
  maxInitialCardsOnThePage: PropTypes.number,
  setMaxInitialCardsOnThePage: PropTypes.func
};

export default Movies;
