import api from "./api";
import {store} from '../store';

const dataRequest = () => {
    let token = store.getState().app.auth.token;

    return api.get('/get-user-data', { headers: { Authorization: 'Bearer ' + token }});
}

export default dataRequest;
