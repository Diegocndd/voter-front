import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import Header from '../../Components/Header';
import Hypnosis from "react-cssfx-loading/lib/Hypnosis";

import getPublicPolls from '../../services/public/getPublicPolls';
import similarity from '../../utils/similarity';
import colors from '../../constants/colors';

import './styles.css';

function Discover() {
  const navigation = useNavigate();
  const [polls, setPolls] = useState([]);
  const [currentPolls, setCurrentPolls] = useState([]);
  const [filteredPolls, setFilteredPolls] = useState([]);
  const [remainderPolls, setRemainderPolls] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [loadingData, setLoadingData] = useState(true);

  const loadMoreData = () => {
    if (remainderPolls.length > 0) {
      let arrAux = [...remainderPolls];
      let newValues = arrAux.splice(0, 10);
      setCurrentPolls(currentPolls.concat(newValues));
      setRemainderPolls(arrAux);
    }
  }

  useEffect(() => {
    getPublicPolls()
      .then(res => {
        console.log(res)
        if (res.status === 200) {
          setPolls([...res.data]);
          let dataPoll = res.data;
          setCurrentPolls(dataPoll.splice(0, 10));
          setRemainderPolls(dataPoll);
          setLoadingData(false);
        }
      })
  }, []);

  function compareArray(a, b) {
    if (a[1] < b[1]) {
      return 1;
    }

    if (a[1] > b[1]) {
      return -1;
    }

    return 0;
  }
  

  const filterPolls = () => {
    if (searchText !== '') {
      const results = [];
      let filtered = [];

      for (let i = 0; i < polls.length; i++) {
        results.push([i, similarity(searchText, polls[i].title)]); 
      }

      results.sort(compareArray);
      let aux = [...results.splice(0, 6)];

      for (let i = 0; i < aux.length; i++) {
        filtered.push(polls[aux[i][0]]);
      }

      setFilteredPolls(filtered);
    }
  }

  const goToPoll = (idPoll) => {
    navigation(`/poll?id=${idPoll}`);
  }

  useEffect(() => {
    filterPolls();
  }, [searchText]);

  window.onscroll = function(ev) {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
      loadMoreData();
    }
  };

  return (
    <div>
      <Header />
      <div id="main-container-discover-polls">
        <input
          type={'text'}
          id='search-public-poll'
          placeholder='Buscar vota????o'
          onChange={e => setSearchText(e.target.value)}
        >
        </input>
        {!loadingData ? (
          <>
            {searchText !== '' ? (
            <>
            {filteredPolls.map(poll => {
              const {qty_votes} = poll;
              return (
                <div className='container-main-poll' onClick={() => goToPoll(poll.id_poll)}>
                  <div className='lateral-bar-poll-container'></div>
                  <div className='public-poll-container'>
                    <p className='title-public-poll'>{poll.title}</p>
                    <p className='qtyvotes-public-poll'>{qty_votes === 0 ? 'Nenhum voto' : `${qty_votes} voto`}{qty_votes > 1 ? 's' : ''}</p>
                  </div>
                </div>
              )
            })}
          </>            
          ) : (
            <>
              {currentPolls.map(poll => {
                const {qty_votes} = poll;
                return (
                  <div className='container-main-poll' onClick={() => goToPoll(poll.id_poll)}>
                    <div className='lateral-bar-poll-container'></div>
                    <div className='public-poll-container'>
                      <p className='title-public-poll'>{poll.title}</p>
                      <p className='qtyvotes-public-poll'>{qty_votes === 0 ? 'Nenhum voto' : `${qty_votes} voto`}{qty_votes > 1 ? 's' : ''}</p>
                    </div>
                  </div>
                )
              })}
          </>
        )}
          </>
        ) : (
        <div id="loading_icon">
          <Hypnosis color={colors.MAIN_COLOR} width="100px" height="100px" />
        </div>
        )}
      </div>
    </div>
  );
}

export default Discover;
