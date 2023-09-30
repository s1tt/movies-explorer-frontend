import PropTypes from 'prop-types';
import React, { useEffect } from 'react';
import { useFormBlocking } from '../../../contexts/FormBlockingContext';
import './FilterCheckbox.css';

const FilterCheckbox = ({ isShortMoviesChecked, setIsShortMoviesChecked, currentLocation }) => {
  const { isFormSubmitting } = useFormBlocking();
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
      <label className={`filter__label ${isFormSubmitting ? 'filter__label_disabled' : ''}`}>
        <input
          className="filter__checkbox"
          type="checkbox"
          name="filterCheckbox"
          id="filterCheckbox"
          onChange={handleCheckboxChange}
          checked={isShortMoviesChecked}
          disabled={isFormSubmitting}
        />
        <span
          className={`filter__tumbler ${
            isFormSubmitting ? 'filter__tumbler_disabled' : ''
          }`}></span>
        <span className={`filter__text ${isFormSubmitting ? 'filter__text_disabled' : ''}`}>
          Короткометражки
        </span>
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
