import api from "../api";

const getPoll = (idpoll) => {

    return api.get('/get-poll', {
        params: {
            id_poll: idpoll,
        },
    });
}

export default getPoll;