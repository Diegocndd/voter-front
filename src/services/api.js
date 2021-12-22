import axios from "axios";

const api = axios.create({
  baseURL: "http://192.168.15.8:5000",
});

export default api;