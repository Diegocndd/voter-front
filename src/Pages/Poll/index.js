import Header from '../../Components/Header';
import { useEffect, useState } from 'react';
import getPoll from '../../services/public/getPoll';
import getAlternatives from '../../services/public/getAlternatives';
import FingerprintJS from '@fingerprintjs/fingerprintjs'
import './styles.css';
import visiterAlreadyVote from '../../services/public/visiterAlreadyVote';
import votePoll from '../../services/public/votePoll';
import getUser from '../../services/public/getUser';
import ChatPoll from '../../Components/ChartPoll';
import { useNavigate } from 'react-router';

const fpPromise = FingerprintJS.load()

function Poll() {
  const navigation = useNavigate();
  const [pollData, setPollData] = useState({});
  const [idPoll, setIdPoll] = useState(null);
  const [pollCreator, setPollCreator] = useState('');
  const [alternatives, setAlternatives] = useState([]);
  const [chartAlternatives, setChartAlternatives] = useState([]);
  const [visitorId, setVisitorId] = useState([]);
  const [userVoted, setUserVoted] = useState(false);
  const [chosenAlternativeId, setChosenAlternativeId] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    let idPoll = queryParams.get('id');
    setIdPoll(idPoll);
    (async () => {
      const fp = await fpPromise;
      const result = await fp.get();
      setVisitorId(result.visitorId);

      visiterAlreadyVote({idPoll, idVisitor: result.visitorId})
        .then(res => setUserVoted(res.data === "True"))
        .catch(err => setUserVoted(false));
    })();

    getPoll(idPoll)
      .then(res => {
        setPollData(res.data);
        getAlternatives(idPoll)
          .then(result => {
            if (result.status === 200) {
              setAlternatives(result.data);
              getUser(res.data.id_user)
                .then(resultUser => setPollCreator(resultUser.data))
            }
          })
      });
  }, []);

  useEffect(() => {
    let alternativesFormat = [];

    alternatives.map(alt => {
      const {description, qty_votes} = alt;
      alternativesFormat.push([description, qty_votes]);
    })

    setChartAlternatives(alternativesFormat);
  }, [alternatives]);

  const voteAlternative = () => {
    const voteData = {
      idAlternative: chosenAlternativeId,
      idVisitor: visitorId,
      idPoll: idPoll,
    }

    votePoll(voteData)
      .then(res => window.location.reload())
  }

  const chosenAlternative = (event) => {
    setChosenAlternativeId(event.target.value);
  }

  return (
    <div>
      <Header />
      <div id="container-public-poll">
        <div id="container-header-poll">
          <p id="title-poll-vote">{pollData.title}</p>
          <p id="username-author-poll">por {pollCreator}</p>
        </div>
        {userVoted ? (
          <div id="container-alert-visitor">
            <p id="alert-visitor-voted">Resultado Parcial da Votação</p>
            <ChatPoll alternatives={chartAlternatives} />
            <p id="alert-visitor-voted">Você já votou nessa enquete. Não é possível votar novamente!</p>
          </div>
        ) : (
          <>
            <div style={{marginBottom: 70, marginTop: 70}}>
              {alternatives.map(alternative => {
                return (
                  <div className="alternative-container" onChange={chosenAlternative.bind(this)}>
                    <p>{alternative.description}</p>
                    <input type="radio" id="public" name="alternative" value={alternative.id_alternative} />
                  </div>
                );
              })}
            </div>
            <div id="button-vote-poll" onClick={() => voteAlternative()}>
              <p>Votar</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Poll;
