import React from 'react';
import './ProfileForm.css';
import ProfileFormField from './ProfileFormField/ProfileFormField';

const ProfileForm = ({ handleSubmitForm, properties, name, email, isUserInfoChanged }) => {
  console.log(properties);

  return (
    <form className="profile__form" onSubmit={handleSubmitForm}>
      <div className="profile__fields">
        {properties &&
          properties.map(
            (
              {
                htmlFor,
                fieldName,
                inputType,
                inputName,
                inputId,
                inputPlaceholder,
                validation,
                error
              },
              index
            ) => (
              <ProfileFormField
                key={index}
                htmlFor={htmlFor}
                fieldName={fieldName}
                inputType={inputType}
                inputName={inputName}
                inputId={inputId}
                inputPlaceholder={inputPlaceholder}
                validation={validation}
                error={error}
              />
            )
          )}
      </div>
      <button
        type="submit"
        disabled={email.isInputValid || name.isInputValid || !isUserInfoChanged}
        className="profile__btn-edit">
        Редактировать
      </button>
    </form>
  );
};

export default ProfileForm;