import { useEffect, useState } from 'react';

const useValidation = (value, validations) => {
  const [isEmpty, setIsEmpty] = useState(true);
  const [minLengthError, setMinLengthError] = useState(false);
  const [maxLengthError, setMaxLengthError] = useState(false);
  const [isEmailError, setIsEmailError] = useState(false);
  const [isInputValid, setIsInputValid] = useState(false);
  const [isNameValidError, setIsNameValidError] = useState(false);
  const [errorMessage, setErrorMessage] = useState({});

  useEffect(() => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const re2 = /^[a-zA-Zа-яА-Я\s-]*$/;

    const errors = {}; // Создайте объект для ошибок

    for (const validation in validations) {
      switch (validation) {
        case 'minLength':
          if (value.length < validations[validation]) {
            setMinLengthError(true);
            errors.minLengthError = 'Минимальное количество символов: ' + validations[validation];
          } else {
            setMinLengthError(false);
            errors.minLengthError = '';
          }
          break;
        case 'maxLength':
          if (value.length > validations[validation]) {
            setMaxLengthError(true);
            errors.maxLengthError = 'Максимальное количество символов: ' + validations[validation];
          } else {
            setMaxLengthError(false);
            errors.maxLengthError = '';
          }
          break;
        case 'isEmpty':
          if (value) {
            setIsEmpty(false);
            errors.isEmpty = '';
          } else {
            setIsEmpty(true);
            errors.isEmpty = 'Поле не может быть пустым';
          }
          break;
        case 'isEmail':
          if (re.test(String(value).toLowerCase())) {
            setIsEmailError(false);
            errors.isEmailError = '';
          } else {
            setIsEmailError(true);
            errors.isEmailError = 'Некорректный адрес электронной почты';
          }
          break;
        case 'isNameValidError':
          if (re2.test(String(value).toLowerCase())) {
            setIsNameValidError(false);
            errors.isNameValidError = '';
          } else {
            setIsNameValidError(true);
            errors.isNameValidError =
              'Имя должно содержать только латиницу, кириллицу, пробел или дефис';
          }
          break;
      }
    }

    setErrorMessage(errors);
  }, [value]);

  useEffect(() => {
    setIsInputValid(
      isEmpty || minLengthError || maxLengthError || isEmailError || isNameValidError
    );
  }, [isEmpty, minLengthError, maxLengthError, isEmailError, isNameValidError]);

  return {
    isEmpty,
    minLengthError,
    maxLengthError,
    isEmailError,
    isInputValid,
    errorMessage,
    isNameValidError
  };
};

export default useValidation;
