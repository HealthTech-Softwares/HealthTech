import axios from "./axios";

// Pacientes de un psicologo
export const pacientesPsicologoRequest = async () => await axios.get("/citas/pacientes");

// Historial de citas de un paciente y un psicologo
export const citasPacientePsicologoRequest = async (idpaciente) => await axios.get(`/citas/pacientes/${idpaciente}`);