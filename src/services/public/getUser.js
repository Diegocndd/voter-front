import api from "../api";

const getUser = (idUser) => api.get(`/get-username?id_user=${idUser}`);

export default getUser;