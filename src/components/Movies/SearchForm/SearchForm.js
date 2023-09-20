import React from 'react';
import findIco from '../../../images/find.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className="search-form">
      <div className="search-form__field">
        <input type="text" className="search-form__input" placeholder="Фильм" />
        <button type="submit" className="search-form__btn">
          <img className="search-form__btn-icon" src={findIco} alt="find" />
        </button>
      </div>
      <FilterCheckbox />
    </form>
  );
};

export default SearchForm;
