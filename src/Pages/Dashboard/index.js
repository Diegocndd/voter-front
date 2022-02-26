import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Header from '../../Components/Header';
import CreatedPollModal from '../../Components/Modal/CreatedPoll';

import { AiFillPlusCircle } from "react-icons/ai";
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";

import EmptyDashboard from '../../assets/img/empty-dashboard.png';
import alt from '../../constants/altsImg';
import colors from '../../constants/colors';
import getPolls from '../../services/getPolls';

import './styles.css';

function Dashboard() {
  const navigation = useNavigate();
  const [userPolls, setUserPolls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [createdPoll, setCreatedPoll] = useState(false);

  useEffect(() => {
    let idPollCreated = window.location.hash.split('?')[1]?.split('=')[1];

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

  const ISOStringToNormalDate = (oldDate) => {
    return oldDate.split('T')[0] + ' ' + oldDate.split('T')[1].split('.')[0];
  }

  const isClosedDate = (poll) => {
    const limitDatePoll = poll.limit_date;
    if (limitDatePoll) {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;
      const localISODate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
      const actualDate = ISOStringToNormalDate(localISODate);
      const limitDate = ISOStringToNormalDate(limitDatePoll);
    
      const date1Updated = new Date(actualDate.replace(/-/g,'/'));  
      const date2Updated = new Date(limitDate.replace(/-/g,'/'));

      return(date1Updated > date2Updated);
    }
  }

  const renderPoll = (poll) => {
    return (
      <div className="container-poll" onClick={() => navigation(`/poll-detail?id=${poll.id_poll}`)}>
        <div id="title-poll-container">
          <p id="title-poll">{poll.title.substring(0, 35)}{poll.title.length >= 35 ? '...' : null}</p>
        </div>
        <div id="qty_votes-container">
          {poll.qty_votes === 0 ? (
            <p>Não há votos ainda</p>
          ) : (
            <p>{poll.qty_votes} {poll.qty_votes === 1 ? 'voto' : 'votos'}</p>
          )}
        </div>
        <div id="progress-poll-container">
          {!isClosedDate(poll) ? (
            <p>Em andamento</p>
          ) : (
            <p>Encerrada</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div>
        {createdPoll ? (
          <CreatedPollModal idPoll={createdPoll} />
        ) : null}
      </div>
      <Header />
      <div id="main-dashboard-container">
        {!loading ? (
          <div id="dashboard-container">
            <div id="button-add-poll" onClick={() => navigation('/create-poll')}>
              <AiFillPlusCircle size={60} color="#3c2a4d" id="button-poll" />
            </div>
            {userPolls.length > 0 ? (
              <p id="header-dashboard-title">Suas Votações</p>
            ) : (
              <div id="text-empty-board-container">
                <p>Você ainda não possui votações!</p>
              </div>
            )}
            {userPolls.length > 0 ? (
              userPolls.map(poll => renderPoll(poll))
            ) : (
              <div id="img-empty-board">
                <img src={EmptyDashboard} id="empty-board-image" alt={alt.EMPTY_DASHBOARD}></img>
              </div>
            )}
          </div>
        ) : (
          <div id="loading_icon">
            <Hypnosis color={colors.MAIN_COLOR} width="100px" height="100px" />
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
