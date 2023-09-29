import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import { tokenCheck } from '../../utils/MainApi';
import { errorHandler, popUpAlertMessages } from '../../utils/constants';
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
          console.log(res);
          setIsLoggedIn(true);
          setCurrentUser(res);
        })
        .catch((err) => {
          setIsPopUpOpened(true);
          setPopUpMessages({ title: popUpAlertMessages.titles.error, message: errorHandler(err) });
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
      {location.pathname === '/' ||
      location.pathname === '/profile' ||
      location.pathname === '/movies' ||
      location.pathname === '/saved-movies' ? (
        <Header isLoggedIn={isLoggedIn} />
      ) : null}

      <CurrentUserContext.Provider
        value={{
          currentUser,
          isPopUpOpened,
          setIsPopUpOpened,
          setPopUpMessages,
          popUpMessages,
          isLoggedIn
        }}>
        <Content
          setIsLoggedIn={setIsLoggedIn}
          isLoggedIn={isLoggedIn}
          currentUser={currentUser}
          setCurrentUser={setCurrentUser}
          setIsPopUpOpened={setIsPopUpOpened}
          setPopUpMessages={setPopUpMessages}
        />
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
