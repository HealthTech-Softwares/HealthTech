import axios from "./axios";

export const loginRequest = async (user) => axios.post("/login", user);

export const verifyTokenRequest = async (token) => axios.get("/verify", token);

export const registerRequest = async (user) => axios.post("/pacientes", user);

export const notificacionesPacienteRequest = async () =>
  axios.get("/notificaciones_paciente");

export const notificacionesPsicologoRequest = async () =>
  axios.get("/notificaciones_psicologo");
