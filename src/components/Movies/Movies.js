import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useMoviesOnThePage } from '../../contexts/MoviesOnThePageContext';
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
  const { setMoviesOnThePage } = useMoviesOnThePage();

  const [formDataForGlobalMovies, setFormDataForGlobalMovies] = useState('');
  const [isShortGlobalMoviesChecked, setIsShortGlobalMoviesChecked] = useState(false);
  //

  const [isGlobalMoviesFound, setIsGlobalMoviesFound] = useState(false);

  useEffect(() => {
    getFilteredMovies();
  }, [isLoading, cardsInARow, formDataForGlobalMovies]); //отображение карточек при первом запросе, перезагрузке страницы, сабмита формы

  useEffect(() => {
    if (isShortGlobalMoviesChecked) {
      const shortMovies = JSON.parse(localStorage.getItem(`${currentLocation}_shortMovies`)) || [];
      setMoviesOnThePage(shortMovies.slice(0, maxInitialCardsOnThePage));
    } else {
      getFilteredMovies();
    }
  }, [isShortGlobalMoviesChecked]); //переключение коротких и длинных фильмов

  const getFilteredMovies = () => {
    const filteredGlobalMovies =
      JSON.parse(localStorage.getItem(`${currentLocation}_filteredMovies`)) || [];
    setMoviesOnThePage(filteredGlobalMovies.slice(0, maxInitialCardsOnThePage));
  };

  return (
    <section className="movies">
      <div className="movies__wrapper">
        <div className="movies__search-form">
          <SearchForm
            cardsInARow={cardsInARow}
            setIsMoviesFound={setIsGlobalMoviesFound}
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
