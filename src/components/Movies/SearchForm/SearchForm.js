import React from 'react';
import findIco from '../../../images/find.svg';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className="search__form">
      <input type="text" className="search__input" placeholder="Фильм" />
      <button type="submit" className="search__btn">
        <img className="search__btn-icon" src={findIco} alt="find" />
      </button>
    </form>
  );
};

export default SearchForm;
