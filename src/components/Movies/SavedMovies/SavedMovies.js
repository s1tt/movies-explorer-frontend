import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { useMoviesOnThePage } from '../../../contexts/MoviesOnThePageContext';
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
  const { setMoviesOnThePage } = useMoviesOnThePage();

  const [formDataForFavoriteMovies, setFormDataForFavoriteMovies] = useState('');
  const [isShortFavoriteMoviesChecked, setIsShortFavoriteMoviesChecked] = useState(false);
  const [isFavoriteMoviesFound, setIsFavoriteMoviesFound] = useState(false);

  useEffect(() => {
    localStorage.setItem(`${currentLocation}_filteredMovies`, JSON.stringify([]));

    getFavoriteMovies()
      .then((data) => {
        localStorage.setItem(`${currentLocation}_movies`, JSON.stringify(data));
        setMoviesOnThePage(data);
      })
      .then(() => {
        const shortFavoriteMoviesArray = filterShortMovies(
          JSON.parse(localStorage.getItem(`${currentLocation}_movies`))
        );
        localStorage.setItem(
          `${currentLocation}_shortMovies`,
          JSON.stringify(shortFavoriteMoviesArray)
        );
      })
      .catch((error) => {
        console.log(error);
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(error) });
      });
  }, []); //загружаем данные с сервера при каждом рендере компонента

  useEffect(() => {
    if (isShortFavoriteMoviesChecked) {
      const shortMovies = JSON.parse(localStorage.getItem(`${currentLocation}_shortMovies`)) || [];
      setMoviesOnThePage(shortMovies);
    } else {
      //проверка фильруем все карточки или после поиска
      if (formDataForFavoriteMovies.length > 0) {
        setMoviesOnThePage(JSON.parse(localStorage.getItem(`${currentLocation}_filteredMovies`)));
      } else {
        setMoviesOnThePage(JSON.parse(localStorage.getItem(`${currentLocation}_movies`)));
      }
    }
  }, [isShortFavoriteMoviesChecked]); //переключение коротких и длинных фильмов

  useEffect(() => {
    const filteredMovies =
      JSON.parse(localStorage.getItem(`${currentLocation}_filteredMovies`)) || [];
    setMoviesOnThePage(filteredMovies);
  }, [formDataForFavoriteMovies]); // отображение карточек после поиска

  const filterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration < 40);
  };

  return (
    <>
      <section className="movies">
        <div className="movies__wrapper">
          <div className="movies__search-form">
            <SearchForm
              setIsMoviesFound={setIsFavoriteMoviesFound}
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
