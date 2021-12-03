import './styles.css';
import Header from '../../Components/Header';
import InputText from '../../Components/InputText';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import loginRequest from '../../services/login';
import dataRequest from '../../services/getUserData';

import {loginUser} from '../../store/ducks/auth';
import {setUserData} from '../../store/ducks/userData';

function Login() {
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [errorLogin, setErrorLogin] = useState(false);

  const questionCurrent = useSelector(
    (store) => store.app,
  );

  const validateLogin = () => {
    setErrorLogin(false);

    loginRequest({login, password})
      .then(res => {
        let token = res.data;
        dispatch(loginUser(token));
        dataRequest()
          .then(result => {
            if (result.status === 200) {
              dispatch(setUserData(result.data));
              navigation('/dashboard');
            } else {
              setErrorLogin(true);
            }
          })
          .catch(err => console.error(err));
      })
      .catch(() => setErrorLogin(true));
  }

  return (
    <div>
      <Header />
      <div id="main-container-createaccount">
        <p id="title-create-account">Login</p>
        <InputText
          titleInput="Usuário ou Email"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <InputText
          type="password"
          titleInput="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <div id="forgot-password-container">
          <p id="text-forgot-password" onClick={() => navigation('/forgot-password')}>Esqueci minha senha</p>
        </div>
        <div id="register-button-container">
          <p id="text-forgot-password" onClick={() => navigation('/register')}>Criar uma conta</p>
        </div>
        {errorLogin ? (
          <div>
            <p id="text-error-login">Usuário e/ou senha incorretos!</p>
          </div>
        ) : null}
        <div id="button-login" onClick={() => validateLogin()}>
          <p>ENTRAR</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
