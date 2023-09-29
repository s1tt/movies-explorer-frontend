import React from 'react';
import './ValidationError.css';

const ValidationError = ({ validation, property }) => {
  return (
    <>
      {validation.target.isDirty && validation.target[property] && (
        <div className="validation-errors__error">{validation.target.errorMessage[property]}</div>
      )}
    </>
  );
};

export default ValidationError;
