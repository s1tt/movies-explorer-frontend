import PropTypes from 'prop-types';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import './Content.css';

const Content = ({ setIsLoggedIn }) => {
  return (
    <main className="content">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signup" element={<Register setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path="/signin" element={<Login setIsLoggedIn={setIsLoggedIn} />} />

        <Route exact path="/profile" element={<Profile setIsLoggedIn={setIsLoggedIn} />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/saved-movies" element={<SavedMovies />} />
        <Route exact path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404"></Navigate>} />
      </Routes>
    </main>
  );
};

Content.propTypes = {
  setIsLoggedIn: PropTypes.func
};

export default Content;
