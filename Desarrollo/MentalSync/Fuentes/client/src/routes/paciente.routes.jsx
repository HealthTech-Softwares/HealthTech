import { Route } from "react-router-dom";
import { BuscarPsico } from "../components/paciente/pantalla_principal_paciente/buscar_psico"
import { ReservaCita } from "../components/paciente/reservar_cita/reservar_cita"
import { MetodoPago } from "../components/paciente/metodo_pago/metodo_pago"
import { CalificarPsico } from "../components/paciente/calificar_psico/calificar_psico"
import { MisCitas } from "../components/paciente/mis_citas/mis_citas"
import { CitaVirtual } from "../components/paciente/cita_virtual/cita_virtual"
import { ModificarDatosPaciente } from "../components/paciente/modificar_datos_paciente/modificar_datos_paciente"
// import { Notificaciones } from "../components/general/notificaciones/notificaciones"

export default function RutasPaciente() {
  return (
    <>
      <Route path="/principal" element={<BuscarPsico />} />
      <Route path="/reserva-cita/:idpsicologo" element={<ReservaCita />} />
      <Route path="/metodo-pago" element={<MetodoPago />} />
      <Route path="/calificar-psicologo" element={<CalificarPsico />} />
      <Route path="/mis-citas" element={<MisCitas />} />
      <Route path="/cita-reservada" element={<CitaVirtual />} />
      <Route path="/modificar-datos-paciente" element={<ModificarDatosPaciente />} />
      {/* <Route path='/notificaciones' element={ <Notificaciones /> } /> */}
    </>
  )
}
