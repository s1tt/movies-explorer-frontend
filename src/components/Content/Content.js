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

const Content = ({ setIsPopUpOpened, setPopUpMessages }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isCardLikeRequested, setIsCardLikeRequested] = useState(false);
  const [cardsInARow, setCardsInARow] = useState(0);
  const [maxInitialCardsOnThePage, setMaxInitialCardsOnThePage] = useState(0);

  const currentLocation = useLocation().pathname.slice(1, useLocation().pathname.length);

  return (
    <main className="content">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route
          exact
          path="/signup"
          element={
            <ProtectedRoute
              element={Register}
              isAuthNeeded={false}
              setIsPopUpOpened={setIsPopUpOpened}
              setPopUpMessages={setPopUpMessages}
            />
          }
        />
        <Route
          exact
          path="/signin"
          element={
            <ProtectedRoute
              element={Login}
              isAuthNeeded={false}
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
              element={Profile}
              isAuthNeeded={true}
              setPopUpMessages={setPopUpMessages}
              setIsPopUpOpened={setIsPopUpOpened}
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
              isAuthNeeded={true}
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
              isAuthNeeded={true}
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
  currentUser: PropTypes.object,
  setIsPopUpOpened: PropTypes.func,
  setPopUpMessages: PropTypes.func
};

export default Content;
