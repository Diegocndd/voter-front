import './styles.css';
import Header from '../../Components/Header';
import InputText from '../../Components/InputText';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import createAccount from '../../services/createAccount';
import { useNavigate } from 'react-router-dom';

function CreateAccount() {
  const navigation = useNavigate();
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [email, setEmail] = useState('');
  const [dateBirth, setDateBirth] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorEmpty, setErrorEmpty] = useState(false);
  const [errorLengthPassword, setErrorLengthPassword] = useState(false);
  const [errorEmailFormat, setErrorEmailFormat] = useState(false);
  const [errorNumericPassword, setErrorNumericPassword] = useState(false);
  const [errorDifferentPassword, setErrorDifferentPassword] = useState(false);

  const updateBirth = (date) => {
    if (date === '') {
      setDateBirth('');
    }

    if (date) {
      setDateBirth(
        date
          .replace(/\D/g, '')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .replace(/(\d{2})(\d)/, '$1/$2')
          .replace(/(\/\d{4})\d+?$/, '$1')
      );
    } else {
      return null;
    }
  };

  const validateDataUser = () => {
    const validPassword = /[0-9]/;
    const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    
    setErrorEmpty(false);
    setErrorEmailFormat(false);
    setErrorDifferentPassword(false);
    setErrorLengthPassword(false);
    setErrorNumericPassword(false);

    if (password.length < 6) {
      setErrorLengthPassword(true);
    }

    if (!validPassword.test(password)) {
      setErrorNumericPassword(true);
    }

    if (password !== confirmPassword) {
      setErrorDifferentPassword(true);
    }

    if (!validEmail.test(email)) {
      setErrorEmailFormat(true);
    }

    if (
      email === '' ||
      name === '' ||
      dateBirth === '' ||
      surname === '' ||
      username === ''
    ) {
      setErrorEmpty(true);
    }

    if (!errorDifferentPassword && !errorEmailFormat && !errorEmpty && !errorLengthPassword && !errorNumericPassword) {
      createAccount({name, surname, username, email, dateBirth, password})
        .then(res => {
          if (res.status === 200) {
            navigation('/login');
          }
        })
        .catch(err => console.log(err));
    }

  }

  return (
    <div>
      <Header />
      <div id="main-container-createaccount">
        <p id="title-create-account">Criar uma conta</p>
        {errorEmpty ? <p className="error-text-empty">Todos os dados devem ser preenchidos!</p> : null}
        <InputText
          titleInput="Nome"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <InputText
          titleInput="Sobrenome"
          value={surname}
          onChange={e => setSurname(e.target.value)}
        />
        <InputText
          titleInput="Nome de Usuário"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <InputText
          titleInput="Email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        {errorEmailFormat ? <p className="error-text">O email está com formato errado!</p> : null}
        <InputText
          titleInput="Data de Nascimento"
          value={dateBirth}
          onChange={e => updateBirth(e.target.value)}
        />
        <InputText
          type="password"
          titleInput="Senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errorLengthPassword ? <p className="error-text">A senha não pode possuir menos de 6 dígitos!</p> : null}
        {errorNumericPassword ? <p className="error-text">Sua senha deve possuir pelo menos algum dígito numério (0-9)!</p> : null}

        <InputText
          type="password"
          titleInput="Confirmar Senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {errorDifferentPassword ? <p className="error-text">As senhas não conferem!</p> : null}

        <div id="button-create-account" onClick={() => validateDataUser()}>
          <p>CRIAR CONTA</p>
        </div>
        <div style={{justifyContent: 'center', alignItems: 'center', flexDirection: 'column', display: 'flex', marginTop: 10}}>
          <GoogleLogin
            clientId={''}
            buttonText="Cadastre-se usando sua conta do Google"
            onSuccess={() => console.log('sucesso')}
            cookiePolicy="single_host_origin"
            isSignedIn
          />
        </div>
      </div>
    </div>
  );
}

export default CreateAccount;
