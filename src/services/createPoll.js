import api from "./api";
import {store} from '../store';

const createPoll = (dataUser) => {
    const {id_user, title, publicPoll, qty_options, limit_date, color} = dataUser;
    const token = store.getState().app.auth.token;
    const data = {
        id_user,
        title,
        public: publicPoll,
        limit_date,
        qty_options,
        color: color.substring(1),
    };

    return api.post('/create-poll', data, { headers: { Authorization: 'Bearer ' + token }});
}

export default createPoll;