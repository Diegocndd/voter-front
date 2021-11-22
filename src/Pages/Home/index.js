import './styles.css';
import Header from '../../Components/Header';
import VotingImage from '../../assets/img/voting-homepage-voter.png';
import TextingImage from '../../assets/img/texting-homepage-voter.png';

function Home() {
  return (
    <div>
      <Header />
      <div id="main-content-homepage">
        <div id="header-text-main-content-container">
          <div id="header-text-container">
            <p id="header-text-main-content">
              Crie votações, ouça o público
            </p>
            <p id="description-text-main-homepage">
              Uma forma rápida, prática e democrática de compartilhar seu ponto de vista e descobrir a opinião de outras pessoas
            </p>
          </div>
          <div id="button-init-voter-homepage">
            <p>Começar agora</p>
          </div>
        </div>
        <img id="main-image-homepage" src={VotingImage}></img>
      </div>

      <div id="second-content-homepage">
        <img id="main-image-homepage" src={TextingImage}></img>
        <div id="header-text-main-content-container">
          <div id="header-text-container">
            <p id="header-text-main-content">
              Descubra sobre o que o público está pensando
            </p>
            <p id="description-text-main-homepage">
              Com o voter você pode descobrir um mundo de opiniões e pontos de vista completamente novo.
            </p>
          </div>
          <div id="button-init-voter-homepage">
            <p>Encontre uma votação</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
