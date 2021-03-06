import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import './styles.css';
import logo from '../../assets/img/logo-voter.png'
import { VscChromeClose, VscMenu } from "react-icons/vsc";

import {
  DISCOVER_POLL,
  ABOUT_US,
  HOME,
  MENU,
} from '../../constants/texts';
import { useSelector, useDispatch } from 'react-redux';
import logoutRequest from '../../services/logout';
import {logoutUser} from '../../store/ducks/auth';
import {clearUserData} from '../../store/ducks/userData';
import alt from '../../constants/altsImg';
import { BiLogOut } from "react-icons/bi";

function Header() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const currentLocation = location.pathname;
  const [showSideBar, setShowSideBar] = useState(false);
  const {isLogged} = useSelector(
    (store) => store.app.auth,
  );
  const userData = useSelector(
    (store) => store.app.userData?.data,
  );

  const goToScreen = (screen) => {
    setShowSideBar(false);
    navigation(screen);
  }

  const logout = () => {
    const {username} = userData;
    logoutRequest(username)
      .then(res => {
        dispatch(logoutUser());
        dispatch(clearUserData());
        navigation('/login');
      })
      .catch(err => console.error(err));
  }

  return (
    <div id="header-container">
      <div id="header-left-container">
        <div id="logo-voter" onClick={() => navigation('/')}>
          <img src={logo} width={110} alt={alt.LOGO_VOTER}></img>
        </div>

        <div id="list-header">
          <ul>
            <li
              style={{color: currentLocation === '/discover' ? 'black' : '#F56038'}}
              onClick={() => navigation('/discover')}
            >
              {DISCOVER_POLL}
            </li>
            <li
              style={{color: currentLocation === '/about-us' ? 'black' : '#F56038'}}
              onClick={() => navigation('/about-us')}
            >
              {ABOUT_US}
            </li>
            <li 
              style={{color: currentLocation === '/' ? 'black' : '#F56038'}}
              onClick={() => navigation('/')}
            >
              {HOME}
            </li>
          </ul>
        </div>
      </div>

      {!isLogged ? (
        <div id="login-signup-bar">
          <div id="login-button" onClick={() => navigation('/login')}>{MENU.LOGIN}</div>
          <div id="signup-button" onClick={() => navigation('/create-account')}>{MENU.CREATE_ACCOUNT}</div>
        </div>
      ) : (
        <div id="profile-dashboard-bar">
          <div id="login-button" onClick={() => navigation('/profile')}>{MENU.PROFILE}</div>
          <div id="signup-button" onClick={() => navigation('/dashboard')}>{MENU.DASHBOARD}</div>
          <div id="logout-container" onClick={() => logout()}>
            <BiLogOut color="#F56038" size={25} />
            <div id="logout-button">{MENU.LOGOUT}</div>
          </div>
        </div> 
      )}

      <div id="menu-logo-hamburger" onClick={() => setShowSideBar(true)}>
        <VscMenu color='#F56038' size={30} />
      </div>

      <div id="sidebar-menu" style={{display: showSideBar ? 'flex' : 'none'}}>
        <div id="content-sidebar">
          <VscChromeClose color='white' size={30} id="icon-close-sidebar" onClick={() => setShowSideBar(false)} />
          <p className="text-sidebar" onClick={() => goToScreen('/')}>{HOME}</p>
          <p className="text-sidebar" onClick={() => goToScreen('/about-us')}>{ABOUT_US}</p>
          <p className="text-sidebar" onClick={() => goToScreen('/discover')}>{DISCOVER_POLL}</p>
          {!isLogged ? (
            <>
              <p className="text-sidebar" onClick={() => goToScreen('/login')}>{MENU.LOGIN}</p>
              <p className="text-sidebar" onClick={() => goToScreen('/create-account')}>{MENU.CREATE_ACCOUNT}</p>
            </>
          ) : (
            <>
              <p className="text-sidebar" onClick={() => goToScreen('/profile')}>{MENU.PROFILE}</p>
              <p className="text-sidebar" onClick={() => goToScreen('/dashboard')}>{MENU.DASHBOARD}</p>
              <p className="text-sidebar" onClick={() => logout()}>Sair</p>
            </> 
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
