import axios from "./axios";

// Pacientes de un psicologo
export const pacientesPsicologoRequest = async () => await axios.get("/citas/pacientes");
