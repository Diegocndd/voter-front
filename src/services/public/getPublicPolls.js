import api from "../api";

const getPublicPolls = () => {

    return api.get('/get-public-polls');
}

export default getPublicPolls;
