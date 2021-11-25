import api from "./api";

export const forgotPasswordEmailRequest = (userData) => {
    const {email} = userData;
    let idPassword;
    let password;
    let data;

    if (userData.idPassword && userData.password) {
        idPassword = userData.idPassword;
        password = userData.password;

        data = {
            password: password,
            id: idPassword,
        };
    } else {
        data = {
            email: email,
        };
    }

    return api.post('/change-password', data);
}
