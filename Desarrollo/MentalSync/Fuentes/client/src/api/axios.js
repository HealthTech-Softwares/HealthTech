import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_API_BASE_URL,
  withCredentials: true
})

export default instance;