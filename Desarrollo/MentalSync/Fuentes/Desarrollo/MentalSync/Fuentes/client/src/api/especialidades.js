import axios from "./axios";

// Buscar Especialidades
export const especialidesRequest = async () => await axios.get("/especialidades");
