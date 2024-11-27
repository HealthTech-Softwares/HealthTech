import axios from "./axios";

// Perfil paciente
export const perfilPacienteRequest = async () =>
  await axios.get("/pacientes/perfil");

// Actualizar correo y contraseña de paciente
export const putPacienteRequest = async (data) =>
  await axios.put("/pacientes", data);
