import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
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

      <Content setIsLoggedIn={setIsLoggedIn} />

      {location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ? (
        <Footer />
      ) : null}
    </div>
  );
}

export default App;
