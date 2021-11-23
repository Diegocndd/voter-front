import './styles.css';
import Header from '../../Components/Header';
import InputText from '../../Components/InputText';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigation = useNavigate();
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

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
        <div id="button-login">
          <p>CRIAR CONTA</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
