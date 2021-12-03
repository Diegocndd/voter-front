import api from "./api";
import {store} from '../store';

const createPoll = (dataUser) => {
    const {id_user, title, free, publicPoll, qty_options, limit_date} = dataUser;
    const token = store.getState().app.auth.token;
    const data = {
        id_user,
        title,
        free,
        public: publicPoll,
        limit_date,
        qty_options,
    };

    return api.post('/create-poll', data, { headers: { Authorization: 'Bearer ' + token }});
}

export default createPoll;