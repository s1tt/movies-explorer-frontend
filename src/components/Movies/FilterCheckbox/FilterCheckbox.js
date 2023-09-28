import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import './FilterCheckbox.css';

const FilterCheckbox = ({ isShortMoviesChecked, setIsShortMoviesChecked, currentLocation }) => {
  useEffect(() => {
    const storedValue = getIsShortMoviesCheckedFromLocalStorage();
    if (storedValue !== null) {
      setIsShortMoviesChecked(storedValue);
    }
  }, [isShortMoviesChecked]);

  const handleCheckboxChange = () => {
    setIsShortMoviesChecked(!isShortMoviesChecked);
    localStorage.setItem(`${currentLocation}_isShortMoviesChecked`, !isShortMoviesChecked);
  };

  const getIsShortMoviesCheckedFromLocalStorage = () => {
    return JSON.parse(localStorage.getItem(`${currentLocation}_isShortMoviesChecked`));
  };

  return (
    <div className="filter">
      <label className="filter__label">
        <input
          className="filter__checkbox"
          type="checkbox"
          name="filterCheckbox"
          id="filterCheckbox"
          onChange={handleCheckboxChange}
          checked={isShortMoviesChecked}
        />
        <span className="filter__tumbler"></span>
        <span className="filter__text">Короткометражки</span>
      </label>
    </div>
  );
};

FilterCheckbox.propTypes = {
  isShortMoviesChecked: PropTypes.bool,
  setIsShortMoviesChecked: PropTypes.func,
  currentLocation: PropTypes.string
};

export default FilterCheckbox;
