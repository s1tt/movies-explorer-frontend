import PropTypes from 'prop-types';
import { createContext, useContext, useState } from 'react';

const MoviesOnThePageContext = createContext();

export function MoviesOnThePageProvider({ children }) {
  const [moviesOnThePage, setMoviesOnThePage] = useState([]);

  return (
    <MoviesOnThePageContext.Provider value={{ moviesOnThePage, setMoviesOnThePage }}>
      {children}
    </MoviesOnThePageContext.Provider>
  );
}

MoviesOnThePageProvider.propTypes = {
  children: PropTypes.node
};

export function useMoviesOnThePage() {
  return useContext(MoviesOnThePageContext);
}
