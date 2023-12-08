import PropTypes from 'prop-types';
import React from 'react';
import './Blackout.css';

const Blackout = ({ closeBurgerWithOverlay }) => {
  return <div className="blackout" onClick={closeBurgerWithOverlay}></div>;
};

Blackout.propTypes = {
  closeBurgerWithOverlay: PropTypes.func
};

export default Blackout;
