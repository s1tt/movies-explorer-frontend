import { useEffect, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import SavedMovies from '../Movies/SavedMovies/SavedMovies';
import NotFound from '../NotFound/NotFound';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const location = useLocation();
  useEffect(() => {
    console.log(isLoggedIn + ' isLoggedIn');
  }, [isLoggedIn]);

  return (
    <div className="App">
      {location.pathname === '/' ||
      location.pathname === '/profile' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ? (
        <Header isLoggedIn={isLoggedIn} />
      ) : null}
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
      {location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default App;
