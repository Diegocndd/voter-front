import './styles.css';
import Header from '../../Components/Header';
import { useSelector } from 'react-redux';
import { AiFillPlusCircle } from "react-icons/ai";
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import getPolls from '../../services/getPolls';
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";
import CreatedPollModal from '../../Components/Modal/CreatedPoll';
import {IN_PROGRESS_POLL, CLOSED_POLL} from '../../constants/texts';

function Dashboard() {
  const navigation = useNavigate();
  const [userPolls, setUserPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createdPoll, setCreatedPoll] = useState(false);
  const userData = useSelector(
    store => store.app.userData.data,
  );

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    let idPollCreated = queryParams.get('created_poll');
    if (idPollCreated) {
      setCreatedPoll(idPollCreated);
    }

    getPolls()
      .then(res => {
        if (res.status === 200) {
          setUserPolls(res.data);
          setLoading(false);
        }
      });
  }, []);

  return (
    <div>
      <Header />
      {createdPoll ? (
        <CreatedPollModal idPoll={createdPoll} />
      ) : null}
      <div id="main-dashboard-container">
        {!loading ? (
          <div id="dashboard-container">
            <div id="button-add-poll" onClick={() => navigation('/create-poll')}>
              <AiFillPlusCircle size={60} color="#3c2a4d" id="button-poll" />
            </div>
            <p id="current-polls" className="text-header-poll">{IN_PROGRESS_POLL}</p>
              {userPolls.map(poll => {
                console.log(poll);
                if (!poll.closed) {
                  return (
                    <div className="container-poll" onClick={() => navigation(`/poll-detail?id=${poll.id_poll}`)}>
                      <p id="title-poll">{poll.title}</p>
                      <p id="qtd-votes-poll">Quantidade de Votos: {poll.qty_votes}</p>
                      <p>http://localhost:3000/poll?id={poll.id_poll}</p>
                    </div>
                  );
                }
              })}
            <p id="closed-polls" className="text-header-poll">{CLOSED_POLL}</p>
              {userPolls.map(poll => {
                if (poll.closed) {
                  return (
                    <div className="container-poll" onClick={() => navigation(`/poll-detail?id=${poll.id_poll}`)}>
                      <p id="title-poll">{poll.title}</p>
                      <p id="qtd-votes-poll">Quantidade de Votos: {poll.qty_votes}</p>
                    </div>
                  );
                }
              })}
          </div>
        ) : (
          <div id="loading_icon">
            <Hypnosis color={'#F56038'} width="100px" height="100px" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
