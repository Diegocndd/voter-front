import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import Header from '../../Components/Header';

import QRCode from 'react-qr-code';
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";

import getPoll from '../../services/public/getPoll';
import getAlternatives from '../../services/public/getAlternatives';
import ChartPoll from '../../Components/ChartPoll';
import deletePoll from '../../services/deletePoll';
import colors from '../../constants/colors';

import './styles.css';

function PollDetail() {
  const navigation = useNavigate();
  const [pollData, setPollData] = useState({});
  const [alternatives, setAlternatives] = useState([]);
  const [chartAlternatives, setChartAlternatives] = useState(null);
  const [localTime, setLocalTime] = useState(null);
  const [loading, setLoading] = useState(true);
  const [limitDate, setLimitDate] = useState(null);
  const [isClosedDate, setIsClosedDate] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const queryParams = new URLSearchParams(window.location.search);
  const url = `http://192.168.15.5:3000/poll?id=${queryParams.get('id')}`;

  const formatAlternatives = (alternativesOpts) => {
    let alternativesFormat = [];

    alternativesOpts.map(alt => {
      const {description, qty_votes} = alt;
      alternativesFormat.push([description, qty_votes]);
    })

    setChartAlternatives(alternativesFormat);
  };

  useEffect(() => {
    let idPoll = queryParams.get('id');

    getPoll(idPoll)
      .then(res => {
        setPollData(res.data);
        getAlternatives(idPoll)
          .then(result => {
            if (result.status === 200) {
              setAlternatives(result.data);
              formatAlternatives(result.data);
            }
          })
      })
      .catch(err => navigation('/dashboard'));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 700);
  }, []);

  const ISOStringToNormalDate = (oldDate) => {
    return oldDate.split('T')[0] + ' ' + oldDate.split('T')[1].split('.')[0];
  }

  useEffect(() => {
    const limitDatePoll = pollData.limit_date;
    console.log('aaaa', limitDatePoll);
    if (limitDatePoll) {
      const tzoffset = (new Date()).getTimezoneOffset() * 60000;
      const localISODate = (new Date(Date.now() - tzoffset)).toISOString().slice(0, -1);
      const actualDate = ISOStringToNormalDate(localISODate);
      const limitDate = ISOStringToNormalDate(limitDatePoll);
  
      setLocalTime(localISODate);
      setLimitDate(limitDate);
    
      const date1Updated = new Date(actualDate.replace(/-/g,'/'));  
      const date2Updated = new Date(limitDate.replace(/-/g,'/'));
  
      setIsClosedDate(date1Updated > date2Updated)
    }
  }, [pollData]);

  const formatDate = (date) => {
    // yyyy-mm-dd hh:mm:ss to dd/mm/yyyy hh:mm
    let newDate = date;

    if (date) {
      const year = date.split(' ')[0].split('-')[0];
      const month = date.split(' ')[0].split('-')[1];
      const day = date.split(' ')[0].split('-')[2];
      const hour = date.split(' ')[1].split(':')[0];
      const minute = date.split(' ')[1].split(':')[1];
      newDate = day + '/' + month + '/' + year + ' ' + hour + ':' + minute;
    }

    return newDate;
  }

  const confirmDeletePoll = () => {
    deletePoll(queryParams.get('id'))
      .then(res => {
        if (res.status === 200) {
          navigation('/dashboard');
        }
      });
  }

  return (
    <div>
      <Header />
      {openModal ? (
        <div className='modal-delete-poll'>
              <div style={{marginBottom: 20}}>
                <p id="title-modal-delete-poll">Tem certeza que deseja deletar a votação?</p>
                <p>Essa ação é irreversível! Você não terá mais acesso aos dados dessa votação.</p>
              </div>
              <div id="footer-buttons-container">
                <div id="cancel-button-modal" onClick={() => setOpenModal(false)}>Cancelar</div>
                <div id="delete-button-modal" onClick={() => confirmDeletePoll()}>Deletar</div>
              </div>
        </div>
      ) : null}
      {loading ? (
        <div id='loading-container'>
          <Hypnosis color={colors.MAIN_COLOR} width="100px" height="100px" />
        </div>
      ) : (
        <div id="content-poll-detail">
        <p id="title-poll-detail">{pollData.title}</p>
        <div>
          {pollData.qty_votes === 0 ? (
            <p className="votes-poll-text">Sua votação ainda não possui nenhum voto!</p>
          ) : (
            <p className="votes-poll-text">Sua votação já possui <b>{pollData.qty_votes}</b> {pollData.qty_votes > 1 ? 'votos' : 'voto'} </p>
          )}
        </div>

        <div id="datelimit-poll">
          {isClosedDate ? (
            <p id="datelimit-poll-text" style={{color: '#F01E1E'}}><b>Votação encerrada!</b></p>
          ) : (
            <p id="datelimit-poll-text">A votação encerrá dia <b>{formatDate(limitDate)}</b></p>
          )}
        </div>

        <div id="qr-code-poll">
          <QRCode value={url} size={200} />
        </div>

        <div id="url-poll-container" onClick={()=> window.open(url, "_blank")}>
          <p id="url-poll-text">{url}</p>
        </div>

        {pollData.qty_votes !== 0 ? (
          <div>
            {chartAlternatives ? (
              <ChartPoll alternatives={chartAlternatives} />
            ) : null}
          </div>
        ) : null}

        <div id="delete-poll-container" onClick={() => setOpenModal(true)}>
          <p>EXCLUIR VOTAÇÃO</p>
        </div>
      </div>
      )}
    </div>
  );
}

export default PollDetail;
