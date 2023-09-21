import { Divide as Hamburger } from 'hamburger-react';
import PropTypes from 'prop-types';
import React from 'react';
import './BurgerBtn.css';

const BurgerBtn = ({ open, setOpen, toggleScrollLock }) => {
  return (
    <div className={`burger ${open ? 'burger_open' : ''}`} onClick={toggleScrollLock}>
      <Hamburger
        toggled={open}
        toggle={setOpen}
        color="#fff"
        size={28}
        label="Show menu"
        hideOutline={false}
      />
    </div>
  );
};

BurgerBtn.propTypes = {
  open: PropTypes.bool,
  setOpen: PropTypes.func,
  toggleScrollLock: PropTypes.func
};
export default BurgerBtn;
