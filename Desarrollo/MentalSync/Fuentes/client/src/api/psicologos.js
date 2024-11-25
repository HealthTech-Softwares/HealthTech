import axios from "./axios";

// Buscar Psicologo
export const psicologosRequest = async () => await axios.get("/psicologos");

// Perfil Psicologo
export const perfilPsicologoRequest = async () => await axios.get("/psicologo/perfil");

// Datos de un psicologo para paciente
export const psicologoRequest = async (idpsicologo) => await axios.get(`/psicologos/${idpsicologo}`);
