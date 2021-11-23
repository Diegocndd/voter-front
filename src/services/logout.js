import api from "./api";

const logoutRequest = (username) => {

    const data = {
        username: username,
    };

    return api.post('/logout', data);
}

export default logoutRequest;