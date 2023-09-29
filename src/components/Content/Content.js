import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router';
import ProtectedRoute from '../../HOC/ProtectedRoute';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import './Content.css';

const Content = ({
  isLoggedIn,
  setIsLoggedIn,
  setCurrentUser,
  currentUser,
  setIsPopUpOpened,
  setPopUpMessages
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCardLikeRequested, setIsCardLikeRequested] = useState(false);
  const [cardsInARow, setCardsInARow] = useState(null);
  const [maxInitialCardsOnThePage, setMaxInitialCardsOnThePage] = useState(null);
  //

  const currentLocation = useLocation().pathname.slice(1, useLocation().pathname.length);

  return (
    <main className="content">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          exact
          path="/signup"
          element={
            <Register
              setIsLoggedIn={setIsLoggedIn}
              setIsPopUpOpened={setIsPopUpOpened}
              setPopUpMessages={setPopUpMessages}
            />
          }
        />
        <Route
          exact
          path="/signin"
          element={
            <Login
              setIsLoggedIn={setIsLoggedIn}
              setIsPopUpOpened={setIsPopUpOpened}
              setPopUpMessages={setPopUpMessages}
            />
          }
        />

        <Route
          exact
          path="/profile"
          element={
            <ProtectedRoute
              setPopUpMessages={setPopUpMessages}
              setIsPopUpOpened={setIsPopUpOpened}
              element={Profile}
              setIsLoggedIn={setIsLoggedIn}
              isLoggedIn={isLoggedIn}
              setCurrentUser={setCurrentUser}
              currentUser={currentUser}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
            />
          }
        />
        <Route
          exact
          path="/movies"
          element={
            <ProtectedRoute
              element={Movies}
              isCardLikeRequested={isCardLikeRequested}
              setIsCardLikeRequested={setIsCardLikeRequested}
              cardsInARow={cardsInARow}
              setCardsInARow={setCardsInARow}
              maxInitialCardsOnThePage={maxInitialCardsOnThePage}
              setMaxInitialCardsOnThePage={setMaxInitialCardsOnThePage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              currentLocation={currentLocation}
              setIsPopUpOpened={setIsPopUpOpened}
              setPopUpMessages={setPopUpMessages}
            />
          }
        />
        <Route
          exact
          path="/saved-movies"
          element={
            <ProtectedRoute
              element={SavedMovies}
              isCardLikeRequested={isCardLikeRequested}
              setIsCardLikeRequested={setIsCardLikeRequested}
              cardsInARow={cardsInARow}
              setCardsInARow={setCardsInARow}
              maxInitialCardsOnThePage={maxInitialCardsOnThePage}
              setMaxInitialCardsOnThePage={setMaxInitialCardsOnThePage}
              isLoading={isLoading}
              setIsLoading={setIsLoading}
              currentLocation={currentLocation}
              setIsPopUpOpened={setIsPopUpOpened}
              setPopUpMessages={setPopUpMessages}
            />
          }
        />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </main>
  );
};

Content.propTypes = {
  setIsLoggedIn: PropTypes.func,
  isLoggedIn: PropTypes.bool,
  setCurrentUser: PropTypes.func,
  currentUser: PropTypes.object,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default Content;
