import Header from '../../Components/Header';
import { useNavigate } from 'react-router';
import { useSelector } from 'react-redux';
import { useState } from 'react';

import InputText from '../../Components/InputText';
import { AiFillPlusCircle } from "react-icons/ai";
import { BsFillTrashFill } from "react-icons/bs";
import Calendar from 'react-calendar';
import ReactTooltip from 'react-tooltip';
import { AiFillQuestionCircle } from "react-icons/ai";
import HeaderPoll from './HeaderPoll';

import createPollAPI from '../../services/createPoll';
import createAlternative from '../../services/createAlternative';
import {CREATE_POLL} from '../../constants/texts';

import './styles.css';
import './calendar.css';

function CreatePoll() {
  const navigation = useNavigate();
  const [title, setTitle] = useState('');
  const [qtyOptions, setQtyOptions] = useState(1);
  const [theme, setTheme] = useState('#F56038');
  const [visibility, setVisibility] = useState('');
  const [themeImage, setThemeImage] = useState(3);
  const [limitDate, setLimitDate] = useState(new Date());
  const [timeDate, setTimeDate] = useState('');
  const [errorTitle, setErrorTitle] = useState(false);
  const [errorServer, setErrorServer] = useState(false);
  const [errorQtyOptions, setErrorQtyOptions] = useState(false);
  const [errorEmptyOption, setErrorEmptyOption] = useState(false);
  const [options, setOptions] = useState([{
    id: 1,
    value: '',
  }]);
  const dataUser = useSelector(
    (store) => store.app.userData.data,
  );

  const updateOption = (id, value) => {
    let newOption = options;
    newOption[id - 1].value = value;
    setOptions(newOption);
  }

  const addOption = () => {
    let newOption = options;
    newOption.push({id: qtyOptions + 1, value: ''});
    setOptions(newOption);
    setQtyOptions(qtyOptions + 1);
  }

  const deleteOption = (id) => {
    let newOptions = options;
    newOptions.splice(id - 1, 1);

    let initialIndex = 1;

    for (let index = 0; index < newOptions.length; index++) {
      newOptions[index].id = initialIndex;
      initialIndex += 1;
    }

    setQtyOptions(qtyOptions - 1);
    setOptions(newOptions)
  }

  const visibilityPoll = (event) => {
    setVisibility(event.target.value);
  }

  const createPoll = () => {
    const hour = timeDate.split(':')[0] - 3;
    const minute = timeDate.split(':')[1];
    limitDate.setHours(hour, minute, 0);

    let date = new Date();
    date = limitDate.getUTCFullYear() + '-' +
        ('00' + (limitDate.getUTCMonth()+1)).slice(-2) + '-' +
        ('00' + limitDate.getUTCDate()).slice(-2) + ' ' + 
        ('00' + limitDate.getUTCHours()).slice(-2) + ':' + 
        ('00' + limitDate.getUTCMinutes()).slice(-2) + ':' + 
        ('00' + limitDate.getUTCSeconds()).slice(-2);

    const qtyOptions = options.length;
    let isEmptyOption = false;
    let thereIsError = false;

    options.forEach(option => {
      if (option.value === '') {
        isEmptyOption = true;
      }
    });

    setErrorServer(false);
    setErrorQtyOptions(false);
    setErrorTitle(false);
    setErrorEmptyOption(false);

    if (qtyOptions < 2) {
      setErrorQtyOptions(true);
      thereIsError = true;
    };

    if (title.length === 0) {
      setErrorTitle(true);
      thereIsError = true;
    };

    if (isEmptyOption) {
      setErrorEmptyOption(true);
      thereIsError = true;
    };

    if (!thereIsError) {
      const {id_user} = dataUser;
      let publicPoll = 1;

      if (visibility === "privada") {
        publicPoll = 0;
      }
  
      let errorServer = false;

      createPollAPI({
        title,
        id_user,
        publicPoll,
        options,
        qty_options: qtyOptions,
        limit_date: date,
        color: theme,
      })
        .then(res => {
          if (res.status === 200) {
            const idPoll = parseInt(res.data, 10);
            options.forEach(option => {
              createAlternative({description: option.value, id_poll: idPoll})
                .catch(err => {
                  errorServer = true;
                  setErrorServer(true);
                });
            });

            if (!errorServer) {
              navigation('/dashboard?created_poll=' + idPoll);
            }
          }
        })
        .catch(err => setErrorServer(true));
    }
  }

  const onTimeChange = (event, time) => {
    setTimeDate(event.target.value);
  }

  const setThemeColor = (color) => {
    setTheme(color);
  }

  return (
    <div>
      <Header />
      <HeaderPoll
        setThemeColor={setThemeColor}
        onTimeChange={onTimeChange}
        setLimitDate={setLimitDate}
        visibilityPoll={visibilityPoll}
        createPoll={createPoll}
      />
      <div id='main-create-poll-container' style={{backgroundColor: theme}}>
        <div id='content-create-poll'>
          <p id="title-create-poll">{CREATE_POLL.CREATE_POLL}</p>
          <div id="form-create-poll">
            <InputText
              titleInput="Título da Votação"
              value={title}
              onChange={e => setTitle(e.target.value)}
              titleBold
            />

            <p id="title-visibility"><b>{CREATE_POLL.OPTIONS}</b></p>
            <div id="options-poll">
              {options.map(option => {
                return (
                  <div className="option-poll-container">
                    <input
                      type="text"
                      value={options.value}
                      placeholder={`Opção ${option.id}`}
                      className="input-poll-option"
                      onChange={e => updateOption(option.id, e.target.value)}
                    />
                    {option.id === options[options.length - 1].id ? (
                      <div id="icons-add-remove">
                        <AiFillPlusCircle className="icon-poll-create" color="#F56038" size={25} onClick={() => addOption()} />
                        {option.id !== 1 ? <BsFillTrashFill className="icon-poll-create" color="#F56038" size={25} id="trash-icon" onClick={() => deleteOption(option.id)} /> : null}
                      </div>
                    ) : (
                      <div style={{height: 25, width: 63}}>
                        <BsFillTrashFill className="icon-poll-create" color="#F56038" size={25} id="trash-icon" onClick={() => deleteOption(option.id)} />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
          {errorTitle ? <p id="alert-error-poll">{CREATE_POLL.ERROR_TITLE}</p> : null}
          {errorQtyOptions ? <p id="alert-error-poll">{CREATE_POLL.ERROR_MINIMUN_OPTIONS}</p> : null}
          {errorEmptyOption ? <p id="alert-error-poll">{CREATE_POLL.ERROR_DESCRIPT_OPTIONS}</p> : null}
          {errorServer ? <p id="alert-error-poll">{CREATE_POLL.ERROR_GENERAL}</p> : null}
        </div>
      </div>
    </div>
  );
}

export default CreatePoll;
