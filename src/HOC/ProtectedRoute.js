import PropTypes from 'prop-types';
import React, { useContext, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { popUpAlertMessages } from '../utils/constants';

const ProtectedRoute = ({ element: Component, ...props }) => {
  const value = useContext(CurrentUserContext);

  useEffect(() => {
    if (!value.isLoggedIn && props.isAuthNeeded) {
      value.setIsPopUpOpened(true);
      value.setPopUpMessages({
        title: popUpAlertMessages.titles.error,
        message: popUpAlertMessages.messages.errors.notLoggedIn
      });
    }
  }, []);

  if (value.isLoggedIn && props.isAuthNeeded) {
    return <Component {...props} />;
  } else if (!value.isLoggedIn && props.isAuthNeeded) {
    return <Navigate to="/" replace="true" />;
  } else if (value.isLoggedIn && !props.isAuthNeeded) {
    return <Navigate to="/movies" replace="true" />;
  } else {
    return <Component {...props} />;
  }
};

ProtectedRoute.propTypes = {
  element: PropTypes.func,
  isAuthNeeded: PropTypes.bool
};

export default ProtectedRoute;
