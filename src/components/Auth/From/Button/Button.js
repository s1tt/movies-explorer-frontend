import React from 'react';
import './Button.css';

const Button = ({ buttonText }) => {
  return (
    <button className="auth-form__button" type="submit">
      {buttonText}
    </button>
  );
};

export default Button;
