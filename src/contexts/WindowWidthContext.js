import PropTypes from 'prop-types';
import React, { createContext, useContext, useEffect, useState } from 'react';
import { deviceWidth } from '../utils/constants';

const WindowWidthContext = createContext();

const WindowWidthProvider = ({ children }) => {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const getCurrentDevice = () => {
    if (windowWidth > deviceWidth.tablet.width) {
      return 'desktop';
    } else if (windowWidth <= deviceWidth.tablet.width && windowWidth > deviceWidth.mobile.width) {
      return 'tablet';
    } else {
      return 'mobile';
    }
  };

  return (
    <WindowWidthContext.Provider value={getCurrentDevice()}>{children}</WindowWidthContext.Provider>
  );
};

const useCurrentDevice = () => useContext(WindowWidthContext);

WindowWidthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
export { WindowWidthProvider, useCurrentDevice };
