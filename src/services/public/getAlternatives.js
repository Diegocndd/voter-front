import api from "../api";

const getAlternatives = (idpoll) => {

    return api.get('/get-public-alternatives', {
        params: {
            id_poll: idpoll,
        },
    });
}

export default getAlternatives;