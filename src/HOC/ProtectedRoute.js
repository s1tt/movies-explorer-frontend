import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { popUpAlertMessages } from '../utils/constants';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const value = useContext(CurrentUserContext);

  useEffect(() => {
    if (!value.isLoggedIn) {
      value.setIsPopUpOpened(true);
      value.setPopUpMessages({
        title: popUpAlertMessages.titles.error,
        message: popUpAlertMessages.messages.errors.notLoggedIn
      });
    }
  }, []);

  if (value.isLoggedIn) {
    return <Component {...props} />;
  } else {
    return <Navigate to="/" replace="true" />;
  }
};

ProtectedRoute.propTypes = {
  element: PropTypes.func
};

export default ProtectedRoute;
