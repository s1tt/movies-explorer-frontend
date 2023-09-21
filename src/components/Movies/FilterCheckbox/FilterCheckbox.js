import React from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = () => {
  return (
    <div className="filter">
      <label className="filter__label">
        <input
          className="filter__checkbox"
          type="checkbox"
          name="filterCheckbox"
          id="filterCheckbox"
        />
        <span className="filter__tumbler"></span>
        <span className="filter__text">Короткометражки</span>
      </label>
    </div>
  );
};

export default FilterCheckbox;
