import axios from "./axios";

// Buscar Psicologo
export const psicologosRequest = async () => await axios.get("/psicologos");

// Buscar Psicologo
export const psicologosRequestAdmin = async () => await axios.get("/psicologos/admin");

// Perfil Psicologo
export const perfilPsicologoRequest = async () => await axios.get("/psicologo/perfil");

// Datos de un psicologo para paciente
export const psicologoRequest = async (idpsicologo) => await axios.get(`/psicologos/${idpsicologo}`);
