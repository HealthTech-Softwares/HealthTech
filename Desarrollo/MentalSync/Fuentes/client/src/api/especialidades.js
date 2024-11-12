import axios from "axios";
import { API } from "./const.js";

// Buscar Especialidades
export const especialidesRequest = async () =>
  await axios.get(`${API}/especialidades`);
