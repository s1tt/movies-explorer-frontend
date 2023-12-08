import PropTypes from 'prop-types';
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

ValidationError.propTypes = {
  validation: PropTypes.object,
  property: PropTypes.string
};

export default ValidationError;
