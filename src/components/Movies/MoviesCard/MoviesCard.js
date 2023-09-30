import PropTypes from 'prop-types';
import React from 'react';
import { useLocation } from 'react-router-dom';
import { useFormBlocking } from '../../../contexts/FormBlockingContext';
import cardCrossIco from '../../../images/card-cross-ico.svg';
import { addToFavorite, removeFromFavorite } from '../../../utils/MainApi';
import { errorHandler, popUpAlertMessages } from '../../../utils/constants';
import './MoviesCard.css';

const MoviesCard = ({
  movie,
  setMovies,
  setIsCardLikeRequested,
  setIsPopUpOpened,
  setPopUpMessages,
  setMoviesOnThePage,
  setFilteredMovies
}) => {
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
      handlerRemoveFromFavorites(movie);
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
          const likedMovies = JSON.parse(localStorage.getItem('saved-movies_movies'));
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

  const handlerRemoveFromFavorites = (movie) => {
    setIsFormSubmitting(true);
    setIsCardLikeRequested(true);
    const favoriteMovies = JSON.parse(localStorage.getItem('saved-movies_movies')) || null;
    const filteredFavoriteMovies =
      JSON.parse(localStorage.getItem('saved-movies_filteredMovies')) || null;

    const targetMovie =
      location.pathname === '/movies'
        ? favoriteMovies.find((favoriteMovie) => favoriteMovie.movieId === movie.id)
        : movie;

    removeFromFavorite(targetMovie._id)
      .then((res) => {
        if (res) {
          //удаляем фильм из общего списка
          const newFavoriteMovies = favoriteMovies.filter((movie) => movie._id !== targetMovie._id);
          localStorage.setItem(`saved-movies_movies`, JSON.stringify(newFavoriteMovies));
          setMovies(newFavoriteMovies);
          //удаляем фильм из отфильтрованных
          if (filteredFavoriteMovies) {
            const newFilteredFavoriteMovies = filteredFavoriteMovies.filter(
              (movie) => movie._id !== targetMovie._id
            );
            setFilteredMovies(newFilteredFavoriteMovies);
            if (location.pathname === '/saved-movies') {
              setMoviesOnThePage(newFilteredFavoriteMovies);
            }
          } else {
            if (location.pathname === '/saved-movies') {
              setMoviesOnThePage(newFavoriteMovies); //
            }
          }
        }
      })
      .catch((err) => {
        console.log(err);
        setIsPopUpOpened(true);
        setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(err) });
      })
      .finally(() => {
        setIsCardLikeRequested(false);
        setIsFormSubmitting(false);
      });
  };

  const isDefaultChecked = (movie) => {
    const favoriteMovies = JSON.parse(localStorage.getItem('saved-movies_movies')) || null;

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
          onClick={() => handlerRemoveFromFavorites(movie)}>
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
  setMovies: PropTypes.func,
  setIsCardLikeRequested: PropTypes.func,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func,
  setMoviesOnThePage: PropTypes.func,
  setFilteredMovies: PropTypes.func
};

export default MoviesCard;
