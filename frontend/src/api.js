import axios from "axios";

const BASE_URL = "http://localhost:5000/api/users";

export const api = axios.create({
  baseURL: BASE_URL,
});
