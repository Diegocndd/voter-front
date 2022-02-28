import './styles.css';
import Header from '../../Components/Header';
import InputText from '../../Components/InputText';
import { useEffect, useState } from 'react';
import createAccount from '../../services/createAccount';
import { useNavigate } from 'react-router-dom';
import getUserData from '../../services/getUserData';
import { useSelector } from 'react-redux';
import {setUserData} from '../../store/ducks/userData';
import dataRequest from '../../services/getUserData';
import {store} from '../../store';
import updateUser from '../../services/updateUser';
import { useDispatch } from 'react-redux';
import deleteUser from '../../services/deleteUser';
import {logoutUser} from '../../store/ducks/auth';
import {clearUserData} from '../../store/ducks/userData';

const formateDate = (oldDate) => {
  const date = oldDate.split('T')[0] + ' ' + oldDate.split('T')[1].split('.')[0];
  const year = date.split(' ')[0].split('-')[0];
  const month = date.split(' ')[0].split('-')[1];
  const day = date.split(' ')[0].split('-')[2];
  return day + '/' + month + '/' + year;
}

function Profile() {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const userData = store.getState().app.userData.data;
  const [name, setName] = useState(userData.name);
  const [surname, setSurname] = useState(userData.surname);
  const [email, setEmail] = useState(userData.email);
  const [dateBirth, setDateBirth] = useState(formateDate(userData.birth));
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState(userData.username);
  const [errorEmpty, setErrorEmpty] = useState(false);
  const [errorLengthPassword, setErrorLengthPassword] = useState(false);
  const [errorEmailFormat, setErrorEmailFormat] = useState(false);
  const [errorNumericPassword, setErrorNumericPassword] = useState(false);
  const [errorDifferentPassword, setErrorDifferentPassword] = useState(false);
  const [errorDeleteAccount, setErrorDeleteAccount] = useState(false);
  const [completeUpdate, setCompleteUpdate] = useState(false);
  const [modalDeleteUser, setModalDeleteUser] = useState(false);

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

  function convertDateString(data) {
    var dia  = data.split("/")[0];
    var mes  = data.split("/")[1];
    var ano  = data.split("/")[2];
  
    return ano + '-' + ("0"+mes).slice(-2) + '-' + ("0"+dia).slice(-2);
  }

  const validateDataUser = () => {
    const validPassword = /[0-9]/;
    const validEmail = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    
    setErrorDeleteAccount(false);
    setCompleteUpdate(false);
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
      updateUser({
        id_user: userData.id_user,
        name: name,
        surname: surname,
        email: email,
        birth: convertDateString(dateBirth),
        password: password,
        username: username,
      })
        .then(res => {
          if (res.status === 200) {
            setCompleteUpdate(true);
            dataRequest()
              .then(result => {
                if (result.status === 200) {
                  dispatch(setUserData(result.data));
                }
              })
          }
        });
    }

  }

  const confirmDeleteUser = () => {
    deleteUser(userData.id_user)
      .then(res => {
        if (res.status === 200) {
          dispatch(logoutUser());
          dispatch(clearUserData());
          navigation('/');
        }
      })
      .catch(err => setErrorDeleteAccount(true));
  }

  return (
    <div>
      <Header />
      <div id="main-container-createaccount">
        {modalDeleteUser ? (
          <div className='modal-delete-poll'>
                <div style={{marginBottom: 20}}>
                  <p id="title-modal-delete-poll">Tem certeza que deseja deletar a sua conta?</p>
                  <p>Essa ação é irreversível! Todos os seus dados e suas votações serão excluídos.</p>
                </div>
                <div id="footer-buttons-container">
                  <div id="cancel-button-modal" onClick={() => setModalDeleteUser(false)}>Cancelar</div>
                  <div id="delete-button-modal" onClick={() => confirmDeleteUser()}>Deletar</div>
                </div>
          </div>
        ) : null}
        <p id="title-create-account">Perfil</p>
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
          titleInput="Nova senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        {errorLengthPassword ? <p className="error-text">A senha não pode possuir menos de 6 dígitos!</p> : null}
        {errorNumericPassword ? <p className="error-text">Sua senha deve possuir pelo menos algum dígito numério (0-9)!</p> : null}

        <InputText
          type="password"
          titleInput="Confirmar nova senha"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
        />
        {errorDifferentPassword ? <p className="error-text">As senhas não conferem!</p> : null}
        {errorDeleteAccount ? <p className="error-text">Não foi possível deletar sua conta! Tente novamente mais tarde.</p> : null}
        {completeUpdate ? <p className="complete-update-text">Perfil atualizado com êxito!</p> : null}

        <div id="button-create-account" onClick={() => validateDataUser()}>
          <p>SALVAR ALTERAÇÕES</p>
        </div>
        <div id="button-delete-account" onClick={() => setModalDeleteUser(true)}>
          <p>EXCLUIR CONTA</p>
        </div>
      </div>
    </div>
  );
}

export default Profile;
