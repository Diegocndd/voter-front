import axios from "axios";
import { IP_SERVICE } from "../constants/api";

const api = axios.create({
  baseURL: `${IP_SERVICE}`,
});

export default api;