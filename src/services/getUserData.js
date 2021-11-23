import api from "./api";

const dataRequest = (userData) => {
    const {username, token} = userData;

    const data = {
        username: username,
        token: token,
    };

    return api.get('/get-user-data', {
        params: data,
    });
}

export default dataRequest;