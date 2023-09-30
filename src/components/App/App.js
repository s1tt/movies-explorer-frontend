import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { FormBlockingProvider } from '../../contexts/FormBlockingContext';
import { MoviesOnThePageProvider } from '../../contexts/MoviesOnThePageContext';
import { tokenCheck } from '../../utils/MainApi';
import Content from '../Content/Content';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import PopUp from '../PopUp/PopUp';
import Preloader from '../Preloader/Preloader';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isTokenChecked, setIsTokenChecked] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);
  const location = useLocation();

  const [isPopUpOpened, setIsPopUpOpened] = useState(false);
  const [popUpMessages, setPopUpMessages] = useState({});

  useEffect(() => {
    setIsTokenChecked(false);
    const jwt = localStorage.getItem('token');
    if (jwt) {
      tokenCheck(jwt)
        .then((res) => {
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => setIsTokenChecked(true));
    } else {
      setIsTokenChecked(true);
    }
  }, [isLoggedIn]);

  if (!isTokenChecked) {
    return (
      <section className="App">
        <div className="App__token-check">
          <Preloader />
        </div>
      </section>
    );
  }

  return (
    <div className="App">
      <CurrentUserContext.Provider
        value={{
          currentUser,
          setIsPopUpOpened,
          setPopUpMessages,
          popUpMessages,
          isLoggedIn,
          setIsLoggedIn
        }}>
        {location.pathname === '/' ||
        location.pathname === '/profile' ||
        location.pathname === '/movies' ||
        location.pathname === '/saved-movies' ? (
          <Header />
        ) : null}
        <FormBlockingProvider>
          <MoviesOnThePageProvider>
            <Content setIsPopUpOpened={setIsPopUpOpened} setPopUpMessages={setPopUpMessages} />
          </MoviesOnThePageProvider>
        </FormBlockingProvider>
      </CurrentUserContext.Provider>

      {location.pathname === '/' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ? (
        <Footer />
      ) : null}
      <PopUp
        isPopUpOpened={isPopUpOpened}
        setIsPopUpOpened={setIsPopUpOpened}
        popUpMessages={popUpMessages}
      />
    </div>
  );
}

export default App;
