import api from "./api";

const loginRequest = (dataUser) => {
    const {login, password} = dataUser;

    const data = {
        login: login,
        password: password,
    };

    return api.post('/login', data);
}

export default loginRequest;