import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import findIco from '../../../images/find.svg';
import { getMovies } from '../../../utils/MoviesApi';
import { errorHandler, popUpAlertMessages } from '../../../utils/constants';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = ({
  isLoading,
  setIsLoading,
  isShortMoviesChecked,
  setIsShortMoviesChecked,
  formData,
  setFormData,
  currentLocation,
  setFilteredMovies,
  setMovies,
  setIsMoviesFound,
  shortMovies,
  setShortMovies,
  moviesOnThePage,
  setMoviesOnThePage,
  setIsPopUpOpened,
  setPopUpMessages
}) => {
  // сброс формы при перезагрузке страницы в сохраненных
  useEffect(() => {
    if (currentLocation === 'saved-movies') {
      setFormData('');
      localStorage.setItem(`${currentLocation}_formData`, JSON.stringify(''));
    }
  }, []);

  //Фильтруем данные по поисковому запросу после каждого сабмита формы
  useEffect(() => {
    setIsMoviesFound(false);
    //сброс чекбокса после сабмита формы
    setIsShortMoviesChecked(false);
    localStorage.setItem(`${currentLocation}_isShortMoviesChecked`, false);

    setFormData(JSON.parse(localStorage.getItem(`${currentLocation}_formData`)));

    const movies = JSON.parse(localStorage.getItem(`${currentLocation}_movies`));

    if (movies && formData) {
      const filteredMovies = filterMovies(movies, formData);
      setFilteredMovies(filteredMovies);
      //запись отфильтрованных фильмов в локал сторадж
      localStorage.setItem(`${currentLocation}_filteredMovies`, JSON.stringify(filteredMovies));
      setIsMoviesFound(true);

      //запись отфильтрованных коротких фильмов в локал сторадж
      const shortMovies = filterShortMovies(filteredMovies);
      setShortMovies(shortMovies);
      localStorage.setItem(`${currentLocation}_shortMovies`, JSON.stringify(shortMovies));
    }
  }, [isLoading, formData]);

  const filterShortMovies = (movies) => {
    return movies.filter((movie) => movie.duration < 40);
  };

  //функция фильтрации Фильмов по запросу в строке
  const filterMovies = (movies, searchTerm) => {
    const searchTermLowerCase = searchTerm.toLowerCase();
    return movies.filter((movie) => {
      const nameRU = movie.nameRU.toLowerCase();
      const nameEN = movie.nameEN.toLowerCase();

      return nameRU.includes(searchTermLowerCase) || nameEN.includes(searchTermLowerCase);
    });
  };

  //если хранилище пусто, берем с сервера
  const getCardsFromTheServer = () => {
    setIsLoading(true);
    if (localStorage.getItem(`${currentLocation}_movies`) === null) {
      getMovies()
        .then((res) => {
          localStorage.setItem(`${currentLocation}_movies`, JSON.stringify(res));
          setMovies(res);
        })
        .catch((error) => {
          setIsPopUpOpened(true);
          setPopUpMessages({
            title: popUpAlertMessages.titles.error,
            message: errorHandler(error)
          });
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setIsLoading(false);
    }
  };

  //обработчик сабмита формы в зависимости от текущей страницы

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (
      e.target.searchForm.value.trim().length < 1 ||
      e.target.searchForm.value.trim().length > 20
    ) {
      setIsPopUpOpened(true);
      setPopUpMessages({
        title: popUpAlertMessages.titles.error,
        message: popUpAlertMessages.messages.errors.emptyField
      });
      return;
    }

    if (currentLocation === 'movies') {
      getCardsFromTheServer();
    }

    setFormData(e.target.searchForm.value);
    localStorage.setItem(`${currentLocation}_formData`, JSON.stringify(e.target.searchForm.value));
  };

  return (
    <form className="search-form" onSubmit={handleSubmitForm}>
      <div className="search-form__field">
        <label htmlFor="search-form" className="search-form__label">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            name="search-form"
            id="searchForm"
            defaultValue={formData}
          />
        </label>
        <button type="submit" className="search-form__btn">
          <img className="search-form__btn-icon" src={findIco} alt="Иконка поиска фильма" />
        </button>
      </div>
      <FilterCheckbox
        moviesOnThePage={moviesOnThePage}
        setMoviesOnThePage={setMoviesOnThePage}
        shortMovies={shortMovies}
        setShortMovies={setShortMovies}
        isShortMoviesChecked={isShortMoviesChecked}
        setIsShortMoviesChecked={setIsShortMoviesChecked}
        currentLocation={currentLocation}
      />
    </form>
  );
};

SearchForm.propTypes = {
  movies: PropTypes.array,
  setMovies: PropTypes.func,
  isLoading: PropTypes.bool,
  formData: PropTypes.string,
  isShortMoviesChecked: PropTypes.bool,
  setIsShortMoviesChecked: PropTypes.func,
  setFormData: PropTypes.func,
  setIsLoading: PropTypes.func,
  setFilteredMovies: PropTypes.func,
  currentLocation: PropTypes.string,
  setShortMovies: PropTypes.func,
  setMoviesOnThePage: PropTypes.func,
  setIsMoviesFound: PropTypes.func,
  shortMovies: PropTypes.array,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func,
  moviesOnThePage: PropTypes.array
};

export default SearchForm;
