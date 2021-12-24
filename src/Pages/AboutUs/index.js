import './styles.css';
import Header from '../../Components/Header';
import alt from '../../constants/altsImg';
import OpinionAboutUs from '../../assets/img/opinion-about-us.png';

function AboutUs() {
  return (
    <div>
      <Header />
      <div id="main-content-aboutus">
        <img src={OpinionAboutUs} id="image-option-aboutus" alt={alt.ABOUT_US} />
        <div id="text-aboutus">
          <p id="title-aboutus">Olá, nós somos a Voter!</p>
          <div>
            <p className='text-aboutus-middle'>Nós somos uma forma simples e democrática de criar votações e descobrir a opinião das pessoas.</p>
            <p className='text-aboutus-middle'>Nascemos com o sonho de criar um ambiente livre e justo na internet, permitindo que todas as pessoas possuam voz e sejam ouvidas.</p>
            <p className='text-aboutus-middle'>É <b>fácil, seguro e rápido</b>. Com a Voter, você cria votações em segundos, permite que seu público vote em suas enquetes sem fazer cadastros longos e demorados e ainda veja o resultado das suas votações ao vivo.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
