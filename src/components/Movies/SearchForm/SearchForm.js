import React from 'react';
import findIco from '../../../images/find.svg';
import FilterCheckbox from '../FilterCheckbox/FilterCheckbox';
import './SearchForm.css';

const SearchForm = () => {
  return (
    <form className="search-form">
      <div className="search-form__field">
        <label htmlFor="search-form" className="search-form__label">
          <input
            type="text"
            className="search-form__input"
            placeholder="Фильм"
            name="search-form"
            id="search-form"
            required="required"
            minLength={2}
            maxLength={20}
          />
        </label>
        <button type="submit" className="search-form__btn">
          <img className="search-form__btn-icon" src={findIco} alt="find" />
        </button>
      </div>
      <FilterCheckbox />
    </form>
  );
};

export default SearchForm;
