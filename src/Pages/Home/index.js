import './styles.css';
import Header from '../../Components/Header';
import VotingImage from '../../assets/img/voting-homepage-voter.png';
import TextingImage from '../../assets/img/texting-homepage-voter.png';
import { useEffect } from 'react';

import alt from '../../constants/altsImg';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import {
  MAIN_TEXT_HP,
  MAIN_SUBTEXT_HP,
  MAIN_BUTTON,
  SUBMAIN_TEXT_HP,
  SUBMAIN_SUBTEXT_HP,
  DISCOVER_POLL_BUTTON
} from '../../constants/texts';



function Home() {
  const navigation = useNavigate();
  const {isLogged} = useSelector(
    (store) => store.app.auth,
  );

  return (
    <div>
      <Header />
      <div id="main-content-homepage">
        <div id="header-text-main-content-container">
          <div id="header-text-container">
            <p id="header-text-main-content">
              {MAIN_TEXT_HP}
            </p>
            <p id="description-text-main-homepage">
              {MAIN_SUBTEXT_HP}
            </p>
          </div>
          <div id="button-init-voter-homepage" onClick={() => isLogged ? navigation('/dashboard') : navigation('/login')}>
            <p>{MAIN_BUTTON}</p>
          </div>
        </div>
        <img id="main-image-homepage" src={VotingImage} alt={alt.VOTING_IMAGE}></img>
      </div>

      <div id="second-content-homepage">
        <img id="submain-image-homepage" src={TextingImage} alt={alt.CHOOSING_IMAGE}></img>
        <div id="header-text-submain-content-container">
          <div id="header-text-container">
            <p id="header-text-main-content">
              {SUBMAIN_TEXT_HP}
            </p>
            <p id="description-text-main-homepage">
              {SUBMAIN_SUBTEXT_HP}
            </p>
          </div>
          <div id="button-init-voter-homepage" onClick={() => navigation('/discover')}>
            <p>{DISCOVER_POLL_BUTTON}</p>
          </div>
        </div>
      </div>

    </div>
  );
}

export default Home;
