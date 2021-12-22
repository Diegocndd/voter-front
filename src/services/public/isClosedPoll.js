import api from "../api";

const isClosedPoll = (idpoll) => {
    return api.get('/is-closed-poll', {
        params: {
            id_poll: idpoll,
        },
    });
}

export default isClosedPoll;