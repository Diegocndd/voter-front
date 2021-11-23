import './styles.css';
import Header from '../../Components/Header';
import { useSelector } from 'react-redux';

function Dashboard() {
  const userData = useSelector(
      (store) => store.app.userData.data[0],
  );
  
  console.log(userData);

  return (
    <div>
      <Header />
      <p>Painel de Controle</p>
    </div>
  );
}

export default Dashboard;
