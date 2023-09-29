import PropTypes from 'prop-types';
import React from 'react';
import './Button.css';

const Button = ({ buttonText, properties }) => {
  return (
    <button
      className="auth-form__button"
      type="submit"
      disabled={properties.some((property) => property.error === true)}>
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string,
  properties: PropTypes.array
};

export default Button;
