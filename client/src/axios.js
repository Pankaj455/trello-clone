import axios from "axios";

const instance = axios.create({
  // baseURL: "https://crello-apis-production.up.railway.app/api/v1/",
  baseURL: "http://localhost:4000/api/v1/",
});

export default instance;
