import PropTypes from 'prop-types';
import React from 'react';
import closeIcon from '../../images/cross.svg';
import './PopUp.css';

const PopUp = ({ isPopUpOpened, setIsPopUpOpened, popUpMessages }) => {
  const closePopUpWithOverlay = (e) => {
    if (e.target === e.currentTarget) {
      // Проверяем, был ли клик именно на область попапа, а не на его содержимое
      setIsPopUpOpened(false);
    }
  };
  return (
    <div
      className={`popup ${isPopUpOpened ? 'popup_active' : ''}`}
      onClick={(e) => closePopUpWithOverlay(e)}>
      <div className="popup__wrapper">
        <h2 className="popup__title">{popUpMessages.title}</h2>
        <p className="popup__text">{popUpMessages.message}</p>
        <button
          className="popup__close-button"
          type="button"
          onClick={() => setIsPopUpOpened(false)}>
          <img className="popup__close-icon" src={closeIcon} alt="Кнопка закрыть" />
        </button>
      </div>
    </div>
  );
};

PopUp.propTypes = {
  isPopUpOpened: PropTypes.bool,
  setIsPopUpOpened: PropTypes.func,
  popUpMessages: PropTypes.shape({
    title: PropTypes.string,
    message: PropTypes.string
  })
};

export default PopUp;
