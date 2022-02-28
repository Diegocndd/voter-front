import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MdColorLens, MdSettings } from "react-icons/md";

import ChristmasTheme from '../../../assets/img/themes/christmas.jpg';
import Church from '../../../assets/img/themes/church.jpg';
import Manifestation from '../../../assets/img/themes/manifestation.jpg';

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';


import ReactTooltip from 'react-tooltip';
import { AiFillQuestionCircle } from "react-icons/ai";
import {CREATE_POLL} from '../../../constants/texts';
import {VscChromeClose} from 'react-icons/vsc';

import './styles.css';

const colors = [['#FFAA3C', '#4A4F74', '#FA9494', '#984063'], ['#007AFF', '#4CD964', '#8E8E93', '#EE4504'], ['#2D142C', '#8FB9A8', '#FEFAD4', '#FCBB6D'], ['#3EACA8', '#E17A47', '#A6206A', '#5A5050']];

function HeaderPoll(props) {
  const [modalTheme, setModalTheme] = useState(false);
  const [modalSettings, setModalSettings] = useState(false);
  const {
    onTimeChange,
    setThemeColor,
    setLimitDate,
    visibilityPoll,
    createPoll,
    displayModalSettings,
    closeModalSettings,
    errorInvalidDate,
    errorVisibility,
  } = props;

  useEffect(() => {
    setModalSettings(displayModalSettings);
  }, [displayModalSettings]);

  return (
    <div id='container-header-poll' style={{display: 'flex', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'center', width: '100%'}}>
      <ReactTooltip />
      <div id='option-container-header-poll' className='dropdown-option' onClick={() => {
        if (modalSettings) {
          setModalSettings(false);
        }
        setModalTheme(!modalTheme);
      }}>
        <MdColorLens color='#181A18' size={22} />
        <p className='text-option-header-poll'>Tema</p>
      </div>
      <div id='option-container-header-poll' onClick={() => {
        if (modalTheme) setModalTheme(false);
        setModalSettings(!modalSettings)
      }}>
        <MdSettings color='#181A18' size={22} />
        <p className='text-option-header-poll'>Configurações</p>
      </div>
      <div id='option-create-poll-button' onClick={() => createPoll()}>
        <p>Criar</p>
      </div>
    
      {modalTheme ? (
        <div id='content-theme-modal'>
          <div id='header-theme-modal'>
            <p>Escolha um tema para a votação</p>
            <VscChromeClose color='#000' size={28} id='close-theme-modal' onClick={() => setModalTheme(false)} /> 
          </div>
          <div id='palette-options-themes'>
            {colors.map(row => {
              return (
                <div className='container-4-options'>
                  {row.map(color => {
                    return (<div className='option-theme-modal' style={{backgroundColor: color}} onClick={() => setThemeColor(color)}></div>);
                  })}
                </div>
              )
            })}
          </div>
        </div>
      ) : null}

      {modalSettings ? (
        <div id='content-settings-modal' style={{height: errorInvalidDate || errorVisibility ? 500 : 400}}>
          <VscChromeClose
            color='#000'
            size={28} id='icon-close-settings-modal'
            onClick={() => {
              setModalSettings(false);
              closeModalSettings();
            }}
          /> 
          <p id="title-visibility"><b>{CREATE_POLL.DEADLINE}</b></p>
          <div id="calendar-container">
            <div id='datetime-input'>
              <input type='date' id='input-hour' onChange={(e) => {
                const date = e.target.value;
                const day = date.split('-')[2];
                const month = date.split('-')[1];
                const year = date.split('-')[0]; 
                const newDate = new Date(`${month}/${day}/${year}`);
                setLimitDate(newDate);
              }}></input>
              <input type='time' id='input-hour' onChange={onTimeChange}></input>
            </div>
          </div>

          <div>
            <p id="title-visibility"><b>{CREATE_POLL.POLL_VISIBILITY}</b></p>
            <div id="visibility-poll" onChange={visibilityPoll.bind(this)}>
              <div id="radio-input">
                <input type="radio" id="public" name="visibility" value="publica" />
                <p>{CREATE_POLL.PUBLIC}{'\u00A0'}</p>
                <AiFillQuestionCircle size={15} color={'black'} data-tip='A votação ficará disponível para toda a comunidade.'/>
              </div>

              <div id="radio-input">
                <input type="radio" id="public" name="visibility" value="privada" />
                <p>{CREATE_POLL.PRIVATE}{'\u00A0'}</p>
                <AiFillQuestionCircle size={15} color={'black'} data-tip='Apenas pessoas com o link da votação poderão votar.'/>
              </div>
            </div>
          </div>

          <div id="error-container-settings">
            {errorInvalidDate ? <p id="alert-error-poll-settings">Insira uma data válida com horário!</p> : null}
            {errorVisibility ? <p id="alert-error-poll-settings">Defina se sua votação será pública ou privada!</p> : null}
          </div>
        </div>
      ) : null}

    </div>
  );
}

export default HeaderPoll;
