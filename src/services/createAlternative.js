import api from "./api";
import {store} from '../store';

const createAlternative = (dataUser) => {
    const {id_poll, description} = dataUser;
    const token = store.getState().app.auth.token;
    const data = {
        id_poll,
        description,
        qty_votes: 0,
    };

    return api.post('/create-alternative', data, { headers: { Authorization: 'Bearer ' + token }});
}

export default createAlternative;