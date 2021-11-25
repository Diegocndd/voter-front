import './styles.css';
import Header from '../../Components/Header';
import InputText from '../../Components/InputText';
import {forgotPasswordEmailRequest} from '../../services/forgotPassword';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import {
  FORGOT_MY_PASSWORD,
  INSTRUCTIONS_EMAIL,
  ERROR_SEND_EMAIL,
} from '../../constants/texts';

function ForgotPassword() {
  const navigation = useNavigate();
  const [email, setEmail] = useState('');
  const [errorSendEmail, setErrorSendEmail] = useState(false);
  const [errorChangePassword, setErrorChangePassword] = useState(false);
  const [errorDifferentPassword, setErrorDifferentPassword] = useState(false);
  const [errorLengthPassword, setErrorLengthPassword] = useState(false);
  const [errorNumericPassword, setErrorNumericPassword] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [idPassword, setIdPassword] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    setIdPassword(queryParams.get('id'));
  }, []);

  const sendEmail = () => {
    setErrorSendEmail(false);

    forgotPasswordEmailRequest({email})
      .then(res => {
        if (res.status === 200) {
          navigation('/sent-email');
        }
      })
      .catch(err => setErrorSendEmail(true));
  }

  const changePassword = () => {

    const validPassword = /[0-9]/;
    
    setErrorDifferentPassword(false);
    setErrorChangePassword(false);
    setErrorNumericPassword(false);
    setErrorLengthPassword(false);
  
    if (password.length < 6) {
      setErrorLengthPassword(true);
    } else if (!validPassword.test(password)) {
      setErrorNumericPassword(true);
    } else if (password !== confirmPassword) {
      setErrorDifferentPassword(true);
    } else {
      forgotPasswordEmailRequest({idPassword, password})
        .then(res => {
          if (res.status === 200) {
            navigation('/sent-email?concluded=true');
          }
        })
        .catch(err => setErrorChangePassword(true));
    }
  }

  return (
    <div>
      <Header />
      {!idPassword ? (
        <div id="main-content-forgot-password">
          <p id="title-forgot-password">{FORGOT_MY_PASSWORD}</p>
          <p id="title-input">{INSTRUCTIONS_EMAIL}</p>
          <InputText
            titleInput="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          {errorSendEmail ? <p id="error-email-password">{ERROR_SEND_EMAIL}</p> : null}
          <div id="button-send-email-password" onClick={() => sendEmail()}>
            <p id="text-button-send-email">Enviar Email</p>
          </div>
        </div>
      ) : (
        <div id="main-content-forgot-password">
          <p id="title-forgot-password">Insira sua nova senha!</p>
          <InputText
            titleInput="Nova Senha"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <InputText
            titleInput="Confirme a senha"
            value={confirmPassword}
            type="password"
            onChange={e => setConfirmPassword(e.target.value)}
          />
          {errorChangePassword ? <p id="error-email-password">Ocorreu um erro ao modificar sua senha! Verifique se você está no link correto.</p> : null}
          {errorDifferentPassword ? <p id="error-email-password">As senhas não são iguais!</p> : null}
          {errorLengthPassword ? <p id="error-email-password">A senha não pode possuir menos de 6 caracteres!</p> : null}
          {errorNumericPassword ? <p id="error-email-password">A senha deve possuir pelo menos um dígito numérico!</p> : null}
          <div id="button-send-email-password" onClick={() => changePassword()}>
            <p id="text-button-send-email">Mudar Senha</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ForgotPassword;
