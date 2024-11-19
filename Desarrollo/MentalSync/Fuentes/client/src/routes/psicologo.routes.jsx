import { Route } from "react-router-dom";
import { GenerarDiagnostico } from "../components/generar_diagnostico/generar_diagnostico"
import { ModificarDatosPsicologo } from "../components/modificar_datos_psicologo/modificar_datos_psicologo"
import { MisPacientes } from "../components/mis_pacientes/mis_pacientes"
import { HistoriaClinica } from "../components/historia_clinica/historia_clinica"
import { Notificaciones } from "../components/notificaciones/notificaciones"

export default function RutasPsicologo() {
  return (
    <>
      <Route path="/generar-diagnostico" element={<GenerarDiagnostico />} />
      <Route path="/modificar-datos-psicologo" element={<ModificarDatosPsicologo />} />
      <Route path="/mis-pacientes" element={<MisPacientes />} />
      <Route path="/historia-clinica" element={<HistoriaClinica />} />
      <Route path='/notificaciones' element={ <Notificaciones /> } />
    </>
  )
}
