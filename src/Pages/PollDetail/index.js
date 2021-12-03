import './styles.css';
import Header from '../../Components/Header';
import { useEffect, useState } from 'react';
import getPoll from '../../services/public/getPoll';
import getAlternatives from '../../services/public/getAlternatives';

function PollDetail() {
  const [pollData, setPollData] = useState({});
  const [alternatives, setAlternatives] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);

  return (
    <div>
      <Header />
      <p>Votação detalhes {queryParams.get('id')}</p>
    </div>
  );
}

export default PollDetail;
