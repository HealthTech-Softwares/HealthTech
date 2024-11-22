import axios from "./axios";

// Buscar Psicologo
export const psicologosRequest = async () => await axios.get("/psicologos");

// Perfil Psicologo
export const perfilPsicologoRequest = async () => await axios.get("/psicologo/perfil");
