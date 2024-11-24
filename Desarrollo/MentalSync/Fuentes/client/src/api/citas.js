import axios from "./axios";

// Pacientes de un psicologo
export const pacientesPsicologoRequest = async () => await axios.get("/citas/pacientes");

// Datos de un paciente en ultima cita
export const pacientePsicologoRequest = async (idpaciente) => await axios.get(`/last-cita/${idpaciente}`);

// Historial de citas de un paciente y un psicologo
export const citasPacientePsicologoRequest = async (idpaciente) => await axios.get(`/citas/pacientes/${idpaciente}`);