import axios from "axios";

const instance = axios.create({
  baseURL: "https://crello-apis.onrender.com/api/v1/",
});

export default instance;
