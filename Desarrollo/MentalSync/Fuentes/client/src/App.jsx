import { useState } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Inicio } from "./components/inicio_sesion/inicio";
import { BuscarPsico } from "./components/pantalla_principal_paciente/buscar_psico";
import { ReservaCita } from "./components/reservar_cita/reservar_cita";
import { MetodoPago } from "./components/metodo_pago/metodo_pago";
import { CalificarPsico } from "./components/calificar_psico/calificar_psico";
import { MisCitas } from "./components/mis_citas/mis_citas";
import { CitaVirtual } from "./components/cita_virtual/cita_virtual";
import { GenerarDiagnostico } from "./components/generar_diagnostico/generar_diagnostico";
import { ModificarDatosPaciente } from "./components/modificar_datos_paciente/modificar_datos_paciente";
import { ModificarDatosPsicologo } from "./components/modificar_datos_psicologo/modificar_datos_psicologo";
import { MisPacientes } from "./components/mis_pacientes/mis_pacientes";
import { ListaPsicologos } from "./components/lista_psicologos/lista_psicologos";
import { HistoriaClinica } from "./components/historia_clinica/historia_clinica";
import { Notificaciones } from "./components/notificaciones/notificaciones";
import { AgregarPsicologo } from "./components/agregar_psicologo/agregar_psicologo";
import { CrearCuenta } from "./components/inicio_sesion/crear_cuenta";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Routes>
        {/* Pantalla Inicial */}
        <Route path="/" element={<Inicio />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />
        <Route path="*" element={<Inicio />} />
        <Route path="/notificaciones" element={<Notificaciones />} />

        {/* Pantallas Paciente */}
        <Route path="/principal" element={<BuscarPsico />} />
        <Route path="/reserva-cita" element={<ReservaCita />} />
        <Route path="/metodo-pago" element={<MetodoPago />} />
        <Route path="/calificar-psicologo" element={<CalificarPsico />} />
        <Route path="/mis-citas" element={<MisCitas />} />
        <Route path="/cita-reservada" element={<CitaVirtual />} />
        <Route
          path="/modificar-datos-paciente"
          element={<ModificarDatosPaciente />}
        />

        {/* Pantallas Psicólogo */}
        <Route path="/generar-diagnostico" element={<GenerarDiagnostico />} />
        <Route
          path="/modificar-datos-psicologo"
          element={<ModificarDatosPsicologo />}
        />
        <Route path="/mis-pacientes" element={<MisPacientes />} />
        <Route path="/historia-clinica" element={<HistoriaClinica />} />

        {/* Pantallas Administrador */}
        <Route path="/lista-psicologos" element={<ListaPsicologos />} />
        <Route path="/agregar-psicologo" element={<AgregarPsicologo />} />
      </Routes>
    </>
  );
}

export default App;
