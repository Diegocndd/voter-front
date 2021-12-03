import Header from '../../Components/Header';
import { useEffect, useState } from 'react';
import getPoll from '../../services/public/getPoll';
import getAlternatives from '../../services/public/getAlternatives';
import './styles.css';

function Poll() {
  const [pollData, setPollData] = useState({});
  const [alternatives, setAlternatives] = useState([]);
  const queryParams = new URLSearchParams(window.location.search);

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
      <div id="container-public-poll">
        <div id="container-header-poll">
          <p id="title-poll-vote">{pollData.title}</p>
          <p id="username-author-poll">por auxion</p>
        </div>
        <div style={{marginBottom: 70, marginTop: 70}}>
          {alternatives.map(alternative => {
            return (
              <div className="alternative-container">
                <p>{alternative.description}</p>
                <input type="radio" id="public" name="permission" value="unica" />
              </div>
            );
          })}
        </div>
        <div id="button-vote-poll">
          <p>Votar</p>
        </div>
      </div>
    </div>
  );
}

export default Poll;
