import { mainApi } from './constants';

const checkResponse = async (res) => {
  if (res.ok) {
    return res.json();
  }
  const data = await res.json();
  const errorMessage = `Ошибка: ${res.status} - ${data.message}`;
  return Promise.reject({ status: res.status, message: errorMessage });
};

const tokenCheck = async (token) => {
  const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
  };

  const response = await fetch(`${mainApi}users/me/`, requestOptions);

  return checkResponse(response);
};

const registration = async (name, email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name,
      email,
      password
    })
  };
  const response = await fetch(`${mainApi}signup`, requestOptions);

  return checkResponse(response); // Перенесите вызов checkResponse сюда
};

const login = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email,
      password
    })
  };
  const response = await fetch(`${mainApi}signin`, requestOptions);

  return checkResponse(response);
};

const getUserInfo = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  const response = await fetch(`${mainApi}users/me/`, requestOptions);

  return checkResponse(response);
};

const updateUserInfo = async (userInfo) => {
  const requestOptions = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify(userInfo)
  };

  const response = await fetch(`${mainApi}users/me/`, requestOptions);

  return checkResponse(response);
};

const getFavoriteMovies = async () => {
  const requestOptions = {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    }
  };
  const response = await fetch(`${mainApi}movies/`, requestOptions);

  return checkResponse(response);
};

const addToFavorite = async (movie) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId
  } = movie;
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      nameRU,
      nameEN,
      thumbnail,
      movieId
    })
  };
  const response = await fetch(`${mainApi}movies/`, requestOptions);

  return checkResponse(response);
};

const removeFromFavorite = async (movieId) => {
  const requestOptions = {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`
    },
    body: JSON.stringify({
      movieId
    })
  };
  const response = await fetch(`${mainApi}movies/${movieId}`, requestOptions);

  return checkResponse(response);
};

export {
  addToFavorite,
  getFavoriteMovies,
  getUserInfo,
  login,
  registration,
  removeFromFavorite,
  tokenCheck,
  updateUserInfo
};
