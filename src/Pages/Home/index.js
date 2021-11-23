import './styles.css';
import Header from '../../Components/Header';
import VotingImage from '../../assets/img/voting-homepage-voter.png';
import TextingImage from '../../assets/img/texting-homepage-voter.png';
import {
  MAIN_TEXT_HP,
  MAIN_SUBTEXT_HP,
  MAIN_BUTTON,
  SUBMAIN_TEXT_HP,
  SUBMAIN_SUBTEXT_HP,
  DISCOVER_POLL_BUTTON
} from '../../constants/texts';

function Home() {
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
          <div id="button-init-voter-homepage">
            <p>{MAIN_BUTTON}</p>
          </div>
        </div>
        <img id="main-image-homepage" src={VotingImage}></img>
      </div>

      <div id="second-content-homepage">
        <img id="main-image-homepage" src={TextingImage}></img>
        <div id="header-text-main-content-container">
          <div id="header-text-container">
            <p id="header-text-main-content">
              {SUBMAIN_TEXT_HP}
            </p>
            <p id="description-text-main-homepage">
              {SUBMAIN_SUBTEXT_HP}
            </p>
          </div>
          <div id="button-init-voter-homepage">
            <p>{DISCOVER_POLL_BUTTON}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
