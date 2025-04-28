import axios from "./axios";

// Buscar Psicologo
export const psicologosRequest = async () => await axios.get("/psicologos");
