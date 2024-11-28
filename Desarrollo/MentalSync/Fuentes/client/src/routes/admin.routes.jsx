import { Route } from "react-router-dom";
import { ListaPsicologos } from "../components/administrador/lista_psicologos/lista_psicologos";
import { AgregarPsicologo } from "../components/administrador/agregar_psicologo/agregar_psicologo";
import { ModificarPsicoAdmin } from "../components/administrador/modificar_psico/mofificar_psico";

export default function RutasAdmin() {
  return (
    <>
      <Route path="/lista-psicologos" element={<ListaPsicologos />} />
      <Route path="/agregar-psicologo" element={<AgregarPsicologo />} />
      <Route
        path="/modificar-datos-psicologo/:idpsicologo"
        element={<ModificarPsicoAdmin />}
      />
      {/* <Route path='/notificaciones' element={ <Notificaciones /> } /> */}
    </>
  );
}
