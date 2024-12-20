import { Route } from "react-router-dom";
import { GenerarDiagnostico } from "../components/psicologo/generar_diagnostico/generar_diagnostico"
import { ModificarDatosPsicologo } from "../components/psicologo/modificar_datos_psicologo/modificar_datos_psicologo"
import { MisPacientes } from "../components/psicologo/mis_pacientes/mis_pacientes"
import { HistoriaClinica } from "../components/psicologo/historia_clinica/historia_clinica"
// import { Notificaciones } from "../components/general/notificaciones/notificaciones"

export default function RutasPsicologo() {
  return (
    <>
      <Route path="/generar-diagnostico/:idcita" element={<GenerarDiagnostico />} />
      <Route path="/modificar-datos-psicologo" element={<ModificarDatosPsicologo />} />
      <Route path="/mis-pacientes" element={<MisPacientes />} />
      <Route path="/historia-clinica/:idpaciente" element={<HistoriaClinica />} />
      {/* <Route path='/notificaciones' element={ <Notificaciones /> } /> */}
    </>
  )
}
