import { moviesApi } from './constants';

const getMovies = async (req, res) => {
  res = await fetch(moviesApi);
  return await res.json();
};

export { getMovies };
