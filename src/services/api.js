import axios from "axios";
import { IP_SERVICE } from "../constants/api";

const api = axios.create({
  baseURL: `http://${IP_SERVICE}:5000`,
});

export default api;