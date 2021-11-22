import { useNavigate, useLocation } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/img/logo-preto.png'
import MenuHamburger from '../../assets/img/hamburger-menu-icon.png';

function Header() {
  const navigation = useNavigate();
  const location = useLocation();
  const currentLocation = location.pathname;

  return (
    <div id="header-container">
      <div id="header-left-container">
        <div id="logo-voter">
          <img src={logo} width={200} height={80} alt="desc"></img>
        </div>

        <div id="list-header">
          <ul>
            <li>Descobrir uma votação</li>
            <li>Sobre Nós</li>
            <li 
              style={{color: currentLocation === '/' ? 'black' : '#F56038'}}
              onClick={() => navigation('/')}
            >
              Início
            </li>
          </ul>
        </div>
      </div>

      <div id="login-signup-bar">
        <div id="login-button">Entrar</div>
        <div id="signup-button" onClick={() => navigation('/create-account')}>Criar conta</div>
      </div>

      <div id="menu-logo-hamburger">
        <img src={MenuHamburger} width={30} alt="desc"/>
      </div>
    </div>
  );
}

export default Header;
