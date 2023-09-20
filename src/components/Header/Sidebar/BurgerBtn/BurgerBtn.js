import { disableBodyScroll, enableBodyScroll } from 'body-scroll-lock';
import { Divide as Hamburger } from 'hamburger-react';
import PropTypes from 'prop-types';
import React from 'react';
import './BurgerBtn.css';

const BurgerBtn = ({ open, setOpen }) => {
  const toggleScrollLock = () => {
    console.log(open + '!!!!!!!!!!!!!!!!');
    if (!open) {
      disableBodyScroll(document.body);
    } else {
      enableBodyScroll(document.body);
    }
  };
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
  setOpen: PropTypes.func
};
export default BurgerBtn;
