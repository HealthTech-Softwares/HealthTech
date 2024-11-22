import { Route } from "react-router-dom";
import { ListaPsicologos } from "../components/administrador/lista_psicologos/lista_psicologos"
import { AgregarPsicologo } from "../components/administrador/agregar_psicologo/agregar_psicologo"
import { Notificaciones } from "../components/general/notificaciones/notificaciones"

export default function RutasAdmin() {
  return (
    <>
      <Route path="/lista-psicologos" element={<ListaPsicologos />} />
      <Route path="/agregar-psicologo" element={<AgregarPsicologo />} />
      <Route path='/notificaciones' element={ <Notificaciones /> } />
    </>
  )
}
