import PropTypes from 'prop-types';
import React from 'react';
import { useFormBlocking } from '../../../../contexts/FormBlockingContext';
import './Button.css';

const Button = ({ buttonText, properties }) => {
  const { isFormSubmitting } = useFormBlocking();
  return (
    <button
      className="auth-form__button"
      type="submit"
      disabled={properties.some((property) => property.error === true) || isFormSubmitting}>
      {buttonText}
    </button>
  );
};

Button.propTypes = {
  buttonText: PropTypes.string,
  properties: PropTypes.array
};

export default Button;
