import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFormBlocking } from '../../../contexts/FormBlockingContext';
import { useMoviesOnThePage } from '../../../contexts/MoviesOnThePageContext';
import cardCrossIco from '../../../images/card-cross-ico.svg';
import { addToFavorite, removeFromFavorite } from '../../../utils/MainApi';
import { errorHandler, popUpAlertMessages } from '../../../utils/constants';
import './MoviesCard.css';

const MoviesCard = ({ movie, setIsCardLikeRequested, setIsPopUpOpened, setPopUpMessages }) => {
  const { moviesOnThePage, setMoviesOnThePage } = useMoviesOnThePage();
  const location = useLocation();
  const { isFormSubmitting, setIsFormSubmitting } = useFormBlocking();

  const calculateDuration = (movie) => {
    const hours = Math.floor(movie.duration / 60);
    const minutes = Math.floor(movie.duration % 60);
    return `${hours ? hours + 'ч' : ''}${minutes}м`;
  };

  const toggleLikeMovie = (e, movie) => {
    if (e.target.checked) {
      handlerAddToFavorites(e, movie);
    } else {
      handlerRemoveFromFavorites(e, movie);
    }
  };

  const handlerAddToFavorites = (e, movie) => {
    e.preventDefault();
    setIsCardLikeRequested(true);
    setIsFormSubmitting(true);
    const {
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      id
    } = movie;

    addToFavorite({
      country,
      director,
      duration,
      year,
      description,
      image: `${'https://api.nomoreparties.co/'}${image.url}`,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail: `${'https://api.nomoreparties.co/'}${image.formats.thumbnail.url}`,
      movieId: id
    })
      .then((res) => {
        if (res.movie) {
          const likedMovie = res.movie;

          const savedMoviesData = localStorage.getItem('saved-movies_movies');
          const likedMovies = savedMoviesData ? JSON.parse(savedMoviesData) : [];
          const newLikedMovies = [...likedMovies, likedMovie];
          localStorage.setItem(`saved-movies_movies`, JSON.stringify(newLikedMovies));
          e.target.checked = true;
        }
      })
      .catch((err) => {
        console.log(err);
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(err) });
      })
      .finally(() => {
        setIsFormSubmitting(false);
        setIsCardLikeRequested(false);
      });
  };

  const handlerRemoveFromFavorites = (e, movie) => {
    e.preventDefault();
    setIsFormSubmitting(true);
    setIsCardLikeRequested(true);
    const favoriteMovies = JSON.parse(localStorage.getItem('saved-movies_movies')) || [];

    const targetMovie =
      location.pathname === '/movies'
        ? favoriteMovies.find((favoriteMovie) => favoriteMovie.movieId === movie.id)
        : movie;

    removeFromFavorite(targetMovie._id)
      .then(() => {
        if (location.pathname === '/saved-movies') {
          // Обновляем хранилище для списка фильмов
          const favoriteMoviesLocal = JSON.parse(localStorage.getItem('saved-movies_movies'));
          const newFavoriteMoviesLocal = favoriteMoviesLocal
            ? favoriteMoviesLocal.filter((movie) => movie.movieId !== targetMovie.movieId)
            : [];

          localStorage.setItem('saved-movies_movies', JSON.stringify(newFavoriteMoviesLocal));

          // Обновляем хранилище для отфильтрованных фильмов
          const filteredMoviesLocal = JSON.parse(
            localStorage.getItem('saved-movies_filteredMovies')
          );
          const newFilteredMovies = filteredMoviesLocal
            ? filteredMoviesLocal.filter((movie) => movie.movieId !== targetMovie.movieId)
            : [];

          localStorage.setItem('saved-movies_filteredMovies', JSON.stringify(newFilteredMovies));

          // Обновляем хранилище для коротких фильмов
          const shortMoviesLocal = JSON.parse(localStorage.getItem('saved-movies_shortMovies'));
          const newShortMoviesLocal = shortMoviesLocal
            ? shortMoviesLocal.filter((movie) => movie.movieId !== targetMovie.movieId)
            : [];
          localStorage.setItem('saved-movies_shortMovies', JSON.stringify(newShortMoviesLocal));

          // Обновляем  фильмы на странице
          const newMoviesOnThePage = moviesOnThePage
            ? moviesOnThePage.filter((movie) => movie.movieId !== targetMovie.movieId)
            : [];

          setMoviesOnThePage(newMoviesOnThePage);
        }
      })
      .catch((err) => {
        console.log(err);
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(err) });
      })
      .finally(() => {
        e.target.checked = false;
        setIsFormSubmitting(false);
      });
  };

  const isDefaultChecked = (movie) => {
    const favoriteMovies = JSON.parse(localStorage.getItem('saved-movies_movies')) || [];

    if (favoriteMovies && movie) {
      return favoriteMovies.some((favoriteMovie) => favoriteMovie.movieId === movie.id);
    }
  };
  return (
    <article className="card">
      <a href={movie.trailerLink} className="card__trailer-link" target="_blank" rel="noreferrer">
        <div className="card__img-wrapper">
          <img
            className="card__img"
            src={
              location.pathname === '/saved-movies'
                ? movie.image
                : `${'https://api.nomoreparties.co/'}${movie.image.url}`
            }
            alt={`Картинка к фильму ${movie.nameRU}`}
          />
        </div>
        <div className="card__about">
          <div className="card__description">
            <h2 className="card__title">{movie.nameRU}</h2>
            <span className="card__duration-time">{calculateDuration(movie)}</span>
          </div>
        </div>
      </a>
      {location.pathname === '/movies' ? (
        <label htmlFor={`favorite-${movie.id}`} className="card__favorite-checkbox-label">
          <input
            className="card__favorite-checkbox"
            type="checkbox"
            name={`favorite-${movie.id}`}
            id={`favorite-${movie.id}`}
            onClick={(e) => toggleLikeMovie(e, movie)}
            defaultChecked={isDefaultChecked(movie)}
            disabled={isFormSubmitting}
          />
          <span
            className={`card__favorite-checkmark ${
              isFormSubmitting ? 'card__favorite-checkmark_disabled' : ''
            }`}></span>
        </label>
      ) : (
        <button
          className="card__cross-btn"
          disabled={isFormSubmitting}
          type="button"
          onClick={(e) => handlerRemoveFromFavorites(e, movie)}>
          <img className="card__cross-ico" src={cardCrossIco} alt="Иконка удаления из избранного" />
        </button>
      )}
    </article>
  );
};

MoviesCard.propTypes = {
  isLoading: PropTypes.bool,
  setIsLoading: PropTypes.func,
  movie: PropTypes.shape({
    country: PropTypes.string,
    director: PropTypes.string,
    year: PropTypes.string,
    description: PropTypes.string,
    trailerLink: PropTypes.string,
    nameEN: PropTypes.string,
    _id: PropTypes.string,
    id: PropTypes.number,
    movieId: PropTypes.number,
    image: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.shape({
        formats: PropTypes.shape({
          thumbnail: PropTypes.shape({
            url: PropTypes.string
          })
        }),
        url: PropTypes.string
      })
    ]),
    nameRU: PropTypes.string,
    duration: PropTypes.number
  }),
  setIsCardLikeRequested: PropTypes.func,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default MoviesCard;
