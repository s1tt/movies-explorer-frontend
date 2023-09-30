import PropTypes from 'prop-types';
import React, { createContext, useContext, useState } from 'react';

const FormBlockingContext = createContext();

export function FormBlockingProvider({ children }) {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);

  return (
    <FormBlockingContext.Provider value={{ isFormSubmitting, setIsFormSubmitting }}>
      {children}
    </FormBlockingContext.Provider>
  );
}

FormBlockingProvider.propTypes = {
  children: PropTypes.node
};

export function useFormBlocking() {
  return useContext(FormBlockingContext);
}
