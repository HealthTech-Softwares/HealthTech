import axios from "./axios";

export const loginRequest = async (user) => axios.post("/login", user);

export const verifyTokenRequest = async () => axios.get("/verify");
