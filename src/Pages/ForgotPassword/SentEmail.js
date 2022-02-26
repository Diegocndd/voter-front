import './styles.css';
import Header from '../../Components/Header';
import CheckMark from '../../Components/CheckMark';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';

function SentEmail() {
  const navigation = useNavigate();
  const [changedPassword, setChangedPassword] = useState(false);

  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    setChangedPassword(window.location.hash.split('?')[1].split('=')[1]);
  }, []);

  return (
    <div>
      <Header />
      <CheckMark />
      <div id="container-completed-send-email">
        {!changedPassword ? (
          <p id="text-completed-sent-email">
            Enviamos um email para mudança de senha! Verifique sua caixa de entrada ou caixa de spam.
          </p>
        ) : (
          <p id="text-completed-sent-email">
            Sua senha foi modificada com sucesso! <p id="return-login" onClick={() => navigation('/login')}> Retornar à página de Login. </p>
          </p>
        )}
      </div>
    </div>
  );
}

export default SentEmail;
