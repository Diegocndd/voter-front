import './styles.css';
import Header from '../../Components/Header';
import QRCode from 'react-qr-code';

import { useEffect, useState } from 'react';
import getPoll from '../../services/public/getPoll';
import getAlternatives from '../../services/public/getAlternatives';

function PollDetail() {
  const [pollData, setPollData] = useState({});
  const [alternatives, setAlternatives] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);
  const url = `http://localhost:3000/poll?id=${queryParams.get('id')}`;

  useEffect(() => {
    let idPoll = queryParams.get('id');

    getPoll(idPoll)
      .then(res => {
        setPollData(res.data);
        getAlternatives(idPoll)
          .then(result => {
            if (result.status === 200) {
              setAlternatives(result.data);
            }
          })
      });
  }, []);

  return (
    <div>
      <Header />
      <div id="content-poll-detail">
        <p id="title-poll-detail">{pollData.title}</p>
        <div id="qr-code-poll">
          <QRCode value={url} size={200} />
        </div>
        <div id="url-poll-container" onClick={()=> window.open(url, "_blank")}>
          <p id="url-poll-text">{url}</p>
        </div>
        <div>
          {pollData.qty_votes === 0 ? (
            <p className="votes-poll-text">Sua votação ainda não possui nenhum voto!</p>
          ) : (
            <p className="votes-poll-text">Sua votação já possui <b>{pollData.qty_votes}</b> {pollData.qty_votes > 1 ? 'votos' : 'voto'} </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default PollDetail;
