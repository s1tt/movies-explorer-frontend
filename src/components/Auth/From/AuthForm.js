import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../../Logo/Logo';
import './AuthForm.css';
import Button from './Button/Button';
import Field from './Field/Field';

const AuthForm = ({
  title,
  properties,
  handleSubmitForm,
  buttonText,
  question,
  questionLinkText,
  questionLinkTo
}) => {
  //TODO возможно перенести выше
  //TODO А надо ли класс лого
  return (
    <section className="auth-form">
      <div className="auth-form__wrapper">
        <Logo />
        <h1 className="auth-form__title">{title}</h1>
        <form onSubmit={handleSubmitForm} className="auth-form__form">
          <div className="auth-form__fields">
            {properties.map(
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
                <Field
                  key={index}
                  htmlFor={htmlFor}
                  fieldName={fieldName}
                  inputType={inputType}
                  inputName={inputName}
                  inputId={inputId}
                  inputPlaceholder={inputPlaceholder}
                  value={validation.target.value}
                  onChange={(e) => validation.target.onChange(e)}
                  onFocus={(e) => validation.target.onFocus(e)}
                  validation={validation}
                  error={error}
                />
              )
            )}
          </div>

          <Button buttonText={buttonText} />
        </form>
        <p className="auth-form__question">
          {question}&nbsp;
          <Link to={questionLinkTo} className="auth-form__question-link">
            {questionLinkText}
          </Link>
        </p>
      </div>
    </section>
  );
};

export default AuthForm;
