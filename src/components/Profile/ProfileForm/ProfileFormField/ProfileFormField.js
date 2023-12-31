import PropTypes from 'prop-types';
import React from 'react';
import { useFormBlocking } from '../../../../contexts/FormBlockingContext';
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
  const { isFormSubmitting } = useFormBlocking();
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
          disabled={isFormSubmitting}
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

ProfileFormField.propTypes = {
  htmlFor: PropTypes.string,
  fieldName: PropTypes.string,
  inputType: PropTypes.string,
  inputName: PropTypes.string,
  inputId: PropTypes.string,
  inputPlaceholder: PropTypes.string,
  validation: PropTypes.object,
  error: PropTypes.bool
};

export default ProfileFormField;
