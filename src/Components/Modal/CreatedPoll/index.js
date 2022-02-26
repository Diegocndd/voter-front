import { useState } from 'react';

import Modal from 'react-modal';
import QRCode from 'react-qr-code';
import { SocialIcon } from 'react-social-icons';
import { VscChromeClose } from "react-icons/vsc";

import { IP_SERVICE } from '../../../constants/api';

import './styles.css';

function CreatedPollModal({ idPoll }) {
  const [modalIsOpen, setIsOpen] = useState(true);
  let url = `${process.env.REACT_APP_DOMAIN}/poll?id=${idPoll}`;
  let encodedUrl = url;

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      style={{
        width: 100,
      }}
    >
      <div id="content-modal-create-poll">
        <div id="container-icon-close-modal">
          <VscChromeClose color='black' size={40} id="icon-close-modal" onClick={() => closeModal()} />
        </div>
        <p id="title-modal-created">Sua votação foi criada!</p>
        <QRCode value={url} />
        <p id="subtitle-link-create-poll">Acesse o link <u>{url}</u> e compartilhe nas redes sociais:</p>
        <div id="social-icons-modal">
          <SocialIcon url={`https://facebook.com/sharer/sharer.php?u=${encodedUrl}`}/>
          <SocialIcon url={`https://twitter.com/intent/tweet?text=${encodedUrl}`}/>
          <SocialIcon url={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`} />
        </div>
      </div>
    </Modal>
  );
}

export default CreatedPollModal;
