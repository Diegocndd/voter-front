import api from "./api";
import {store} from '../store';

const deletePoll = (idPoll) => {
    const token = store.getState().app.auth.token;

    const data = {
        id_poll: idPoll,
    };

    return api.post(`/delete-poll`, data, { headers: { Authorization: 'Bearer ' + token }});
}

export default deletePoll;
