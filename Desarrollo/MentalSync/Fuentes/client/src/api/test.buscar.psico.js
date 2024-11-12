import axios from "axios";
import { API } from "./const.js";

// Buscar Psicologo
export const psicologosRequest = async () =>
  await axios.get(`${API}/psicologos`);
