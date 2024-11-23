import axios from "./axios";

// Perfil paciente
export const perfilPacienteRequest = async () => await axios.get("/pacientes/perfil");