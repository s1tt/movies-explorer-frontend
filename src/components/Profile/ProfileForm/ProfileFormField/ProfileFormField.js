import React from 'react';
import ValidationError from '../../../Auth/From/ValidationError/ValidationError';
import './ProfileFormField.css';

const ProfileFormField = ({
  htmlFor,
  fieldName,
  inputType,
  inputName,
  inputId,
  inputPlaceholder,
  validation,
  error
}) => {
  return (
    <label htmlFor={htmlFor} className="profile__label">
      <div className="profile__field">
        <span className="profile__field-name">{fieldName}</span>
        <input
          type={inputType}
          name={inputName}
          id={inputId}
          className={`profile__input ${error ? 'profile__input_error' : ''}`}
          value={validation.target.value}
          placeholder={inputPlaceholder}
          onChange={(e) => validation.target.onChange(e)}
          onFocus={(e) => validation.target.onFocus(e)}
        />
      </div>
      <div className="validation-errors profile__errors">
        {validation.properties.map((property, index) => (
          <ValidationError key={index + property} validation={validation} property={property} />
        ))}
      </div>
    </label>
  );
};

export default ProfileFormField;
