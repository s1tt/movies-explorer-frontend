import PropTypes from 'prop-types';
import React from 'react';
import { useFormBlocking } from '../../../../contexts/FormBlockingContext';
import ValidationError from '../ValidationError/ValidationError';
import './Field.css';

const Field = ({
  htmlFor,
  fieldName,
  inputType,
  inputName,
  inputId,
  inputPlaceholder,
  value,
  onChange,
  onFocus,
  validation,
  error
}) => {
  const { isFormSubmitting } = useFormBlocking();
  return (
    <>
      <label className="auth-form__label" htmlFor={htmlFor}>
        {fieldName}
      </label>
      <input
        type={inputType}
        name={inputName}
        id={inputId}
        placeholder={inputPlaceholder}
        className={`auth-form__input ${error ? 'auth-form__input_error' : ''}`}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
        disabled={isFormSubmitting}
      />
      <div className="validation-errors">
        {validation.properties.map((property, index) => (
          <ValidationError key={index + property} validation={validation} property={property} />
        ))}
      </div>
    </>
  );
};

Field.propTypes = {
  htmlFor: PropTypes.string,
  fieldName: PropTypes.string,
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  inputId: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  validation: PropTypes.object,
  error: PropTypes.bool
};

export default Field;
