import api from "./api";
import {store} from '../store';

const updateUser = (userData) => {
    const token = store.getState().app.auth.token;

    return api.post(`/update-user`, userData, { headers: { Authorization: 'Bearer ' + token }});
}

export default updateUser;
