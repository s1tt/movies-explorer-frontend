import React from 'react';
import useValidation from './useValidation';

const useInput = (initialValue, validations) => {
  const [value, setValue] = React.useState(initialValue);
  const [isDirty, setIsDirty] = React.useState(false);
  const valid = useValidation(value, validations);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onFocus = () => {
    setIsDirty(true);
  };

  return { value, setValue, isDirty, onChange, onFocus, ...valid };
};

export default useInput;
