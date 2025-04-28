import axios from "./axios";

// Datos de la ultima cita de los pacientes de un psicologo
export const pacientesPsicologoRequest = async () => await axios.get("/citas/pacientes");

// Datos de la ultima cita de un pacietne con un psicologo
export const pacientePsicologoRequest = async (idpaciente) => await axios.get(`/last-cita/${idpaciente}`);

// Historial de citas entre un paciente y un psicologo
export const citasPacientePsicologoRequest = async (idpaciente) => await axios.get(`/citas/pacientes/${idpaciente}`);

// Datos de una cita por su id
export const citaRequest = async (idcita) => await axios.get(`/cita/${idcita}`);

// Crear cita por parte de paciente
export const createCitaRequest = async (data) => await axios.post("/cita", data);

// Actualizar una cita por parte del psicologo
export const putCitaRequest = async (idcita, data) => await axios.put(`/cita/${idcita}`, data);

// Obtener todas las citas del paciente logeado
export const getCitasPacienteRequest = async () => await axios.get("/citas_paciente");

// Obtener todas las citas del psicologo logeado
export const getCitasPsicologoRequest = async () => await axios.get("/citas_psicologo");