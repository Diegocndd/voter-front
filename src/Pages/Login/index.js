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

  const questionCurrent = useSelector(
    (store) => store.app,
  );

  const validateLogin = () => {
    loginRequest({login, password})
      .then(res => {
        let token = res.data;
        let username = login;
        dispatch(loginUser(token));
        dataRequest({username, token})
          .then(result => {
            dispatch(setUserData(result.data));
            navigation('/dashboard');
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
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
        <div id="button-login" onClick={() => validateLogin()}>
          <p>ENTRAR</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
