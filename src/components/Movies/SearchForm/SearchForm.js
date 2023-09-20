import React from 'react';
import findIco from '../../../images/find.svg';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className="search-form">
      <input type="text" className="search-form__input" placeholder="Фильм" />
      <button type="submit" className="search-form__btn">
        <img className="search-form__btn-icon" src={findIco} alt="find" />
      </button>
    </form>
  );
};

export default SearchForm;
