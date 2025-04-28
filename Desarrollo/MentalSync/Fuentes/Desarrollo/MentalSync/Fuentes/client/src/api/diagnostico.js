import axios from "./axios";

// Obtener diagnosticos
export const diagnosticosRequest = async () => await axios.get("/diagnostico");
