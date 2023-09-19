import { Navigate, Route, Routes } from 'react-router-dom';
import './App.css';
import Login from './components/Login/Login';
import Main from './components/Main/Main';
import Movies from './components/Movies/Movies';
import SavedMovies from './components/Movies/SavedMovies/SavedMovies';
import NotFound from './components/NotFound/NotFound';
import Profile from './components/Profile/Profile';
import Register from './components/Register/Register';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route exact path="/signup" element={<Register />} />
        <Route exact path="/signin" element={<Login />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/movies" element={<Movies />} />
        <Route exact path="/saved-movies" element={<SavedMovies />} />
        <Route exact path="/404" element={<NotFound />} />
        <Route path="*" element={<Navigate to="/404"></Navigate>} />
      </Routes>
    </div>
  );
}

export default App;
