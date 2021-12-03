import api from "./api";
import {store} from '../store';

const getPolls = () => {
    let token = store.getState().app.auth.token;

    return api.get('/get-polls', { headers: { Authorization: 'Bearer ' + token }});
}

export default getPolls;