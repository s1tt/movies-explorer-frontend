import React from 'react';
import FilterCheckbox from './FilterCheckbox/FilterCheckbox';
import './Movies.css';
import MoviesCardList from './MoviesCardList/MoviesCardList';
import SearchForm from './SearchForm/SearchForm';

import cardData from '../../utils/data';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';

const Movies = () => {
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
            <MoviesCardList cardData={cardData} />
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Movies;
