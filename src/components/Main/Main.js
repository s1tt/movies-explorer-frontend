import React from 'react';
import AboutMe from './AboutMe/AboutMe';
import AboutProject from './AboutProject/AboutProject';
import './Main.css';
import Portfolio from './Portfolio/Portfolio';
import Promo from './Promo/Promo';
import Techs from './Techs/Techs';

function Main() {
  return (
    <main className="content">
      {/* <Header /> */}
      <Promo />
      <AboutProject />
      <Techs />
      <AboutMe />
      <Portfolio />
      {/* <Footer /> */}
    </main>
  );
}

export default Main;
