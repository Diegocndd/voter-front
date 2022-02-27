import { useEffect, useState } from 'react';

import FingerprintJS from '@fingerprintjs/fingerprintjs';
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import {Helmet} from 'react-helmet';

import Header from '../../Components/Header';
import ChatPoll from '../../Components/ChartPoll';
import { IoCloseCircle } from "react-icons/io5";

import getPoll from '../../services/public/getPoll';
import getAlternatives from '../../services/public/getAlternatives';
import visiterAlreadyVote from '../../services/public/visiterAlreadyVote';
import votePoll from '../../services/public/votePoll';
import getUser from '../../services/public/getUser';
import isClosedPoll from '../../services/public/isClosedPoll';

import alt from '../../constants/altsImg';
import NotFoundImage from '../../assets/img/not-found-poll.png';
import colors from '../../constants/colors';

import 'reactjs-popup/dist/index.css';
import './styles.css';

const fpPromise = FingerprintJS.load();

function Poll() {
  const [loadingData, setLoadingData] = useState(true);
  const [pollData, setPollData] = useState({});
  const [popUp, setPopUp] = useState(true);
  const [idPoll, setIdPoll] = useState(null);
  const [isPollClosed, setIsPollClosed] = useState(false);
  const [colorPoll, setColorPoll] = useState('#F56038');
  const [pollCreator, setPollCreator] = useState('');
  const [alternatives, setAlternatives] = useState([]);
  const [chartAlternatives, setChartAlternatives] = useState([]);
  const [errorNotPollFound, setErrorNotPollFound] = useState(true);
  const [visitorId, setVisitorId] = useState([]);
  const [userVoted, setUserVoted] = useState(false);
  const [chosenAlternativeId, setChosenAlternativeId] = useState(null);
  const queryParams = new URLSearchParams(window.location.search);

  const loadData = (responseFst, responseSnd, responseTrd) => {
    if (responseFst && responseSnd && responseTrd) setLoadingData(false);
  }

  useEffect(() => {
    let idPoll = window.location.hash.split('?')[1].split('=')[1];
    let responseFst, responseSnd, responseTrd = false;

    setIdPoll(idPoll);

    getPoll(idPoll)
      .then(res => {
        (async () => {
          const fp = await fpPromise;
          const result = await fp.get();
          setVisitorId(result.visitorId);
    
          visiterAlreadyVote({idPoll, idVisitor: result.visitorId})
            .then(res => {
              responseTrd = true;
              loadData(responseFst, responseSnd, responseTrd);
              setUserVoted(res.data === "True")
            })
            .catch(err => {
              responseTrd = true;
              loadData(responseFst, responseSnd, responseTrd);
              setUserVoted(false)
            });
        })();

        setErrorNotPollFound(false);
        setPollData(res.data);
        if (res.data.color) {
          setColorPoll('#' + res.data.color);
        }
        getAlternatives(idPoll)
          .then(result => {
            if (result.status === 200) {
              responseFst = true;
              loadData(responseFst, responseSnd, responseTrd);
              setAlternatives(result.data);
              getUser(res.data.id_user)
                .then(resultUser => setPollCreator(resultUser.data))
            }
          })
      })
      .catch(err => {
        setLoadingData(false);
        setErrorNotPollFound(true);
      });
    
    isClosedPoll(idPoll)
      .then(isClosed => {
        responseSnd = true;
        loadData(responseFst, responseSnd);
        setIsPollClosed(isClosed.data === 'Yes');
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
      <Helmet>
          <meta charSet="utf-8" />
          <title>{pollData.title ? pollData.title + ' | Voter' : 'Voter'}</title>
      </Helmet>
      <Header />
      <div id='container-poll-general' style={{backgroundColor: colorPoll}}>
        <div id='container-public-poll'>
          {loadingData ? (
            <div id="loading_icon">
              <Hypnosis color={colors.MAIN_COLOR} width="100px" height="100px" />
            </div>
            ) : (
            <div>
              {isPollClosed && !errorNotPollFound ? <div>A votação não está mais disponível!</div> : 
                (<div>{!errorNotPollFound ? (
                  <div id="container-public-poll2">
                    <div id="container-header-poll">
                      <p id="title-poll-vote">{pollData.title}</p>
                      <p id="username-author-poll">por {pollCreator}</p>
                    </div>
                    {userVoted ? (
                      <div id="container-alert-visitor">
                        <p id="alert-visitor-voted">Resultado Parcial da Votação</p>
                        <ChatPoll alternatives={chartAlternatives} />
                        {popUp ? (
                          <div id='container-popup-poll'>
                            <p id="alert-visitor-voted-text">Você já votou nessa enquete. Não é possível votar novamente!</p>
                            <IoCloseCircle color='white' id='icon-close-popup' onClick={() => setPopUp(false)} style={{cursor: 'pointer'}}/>
                          </div>
                        ) : null}
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
                ) : (
                  <div style={{marginTop: -40, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    <p id="text-not-found-poll">Não encontramos a votação!</p>
                    <p id="subtext-not-found-poll">Verifique se o endereço está correto.</p>
                    <img src={NotFoundImage} id="not-found-image-poll" alt={alt.NOT_FOUND_POLL}></img>
                  </div>
                )}</div>
              )}
            </div> 
          )}
        </div> 
      </div>
    </div>
  );
}

export default Poll;
