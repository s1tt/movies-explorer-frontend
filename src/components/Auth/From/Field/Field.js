import React from 'react';
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
  return (
    <>
      <label className="field" htmlFor={htmlFor}>
        {fieldName}
      </label>
      <input
        type={inputType}
        name={inputName}
        id={inputId}
        placeholder={inputPlaceholder}
        className={`field__input ${error ? 'field__input_error' : ''}`}
        value={value}
        onChange={onChange}
        onFocus={onFocus}
      />
      <div className="validation-errors">
        {validation.properties.map((property, index) => (
          <ValidationError key={index + property} validation={validation} property={property} />
        ))}
      </div>
    </>
  );
};

export default Field;
