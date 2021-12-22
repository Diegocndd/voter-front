import api from "./api";
import {store} from '../store';

const deleteUser = (idUser) => {
    const token = store.getState().app.auth.token;

    const data = {
        id_user: idUser,
    };

    return api.post(`/delete-account`, data, { headers: { Authorization: 'Bearer ' + token }});
}

export default deleteUser;
