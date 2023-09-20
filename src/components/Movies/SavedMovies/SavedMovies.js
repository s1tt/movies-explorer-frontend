import React from 'react';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import cardData from '../../../utils/data';

const SavedMovies = () => {
  const filtredCardData = cardData.filter((movie) => movie.isLiked === true);
  return (
    <>
      <section className="movies">
        <div className="movies__wrapper">
          <div className="movies__search-form">
            <SearchForm />
          </div>
          <div className="movies__card-list">
            <MoviesCardList cardData={filtredCardData} />
          </div>
        </div>
      </section>
    </>
  );
};

export default SavedMovies;
