import React from 'react';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';

import cardData from '../../../utils/data';
import Footer from '../../Footer/Footer';
import Header from '../../Header/Header';

const SavedMovies = () => {
  const filtredCardData = cardData.filter((movie) => movie.isLiked === true);
  return (
    <>
      <Header />
      <section className="movies">
        <div className="movies__wrapper">
          <div className="movies__search-form">
            <SearchForm />
          </div>
          <div className="movies__filter">
            <FilterCheckbox />
          </div>
          <div className="movies__card-list">
            <MoviesCardList cardData={filtredCardData} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SavedMovies;
