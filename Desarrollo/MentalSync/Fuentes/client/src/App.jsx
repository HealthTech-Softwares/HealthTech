import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Inicio } from './components/inicio_sesion/inicio'
import { BuscarPsico } from './components/pantalla_principal_paciente/buscar_psico'
import { ReservaCita } from './components/reservar_cita/reservar_cita'
import { MetodoPago} from './components/metodo_pago/metodo_pago'
import { CalificarPsico } from './components/calificar_psico/calificar_psico'
import { MisCitas } from './components/mis_citas/mis_citas'
import { CitaVirtual } from './components/cita_virtual/cita_virtual'
import { GenerarDiagnostico } from './components/generar_diagnostico/generar_diagnostico'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        {/* Pantalla Inicial */}
        <Route path="/" element={<Inicio/>}/>

        {/* Pantallas Paciente */}
        <Route path="/principal" element={<BuscarPsico/>}/>
        <Route path="/reserva-cita" element={<ReservaCita/>}/>
        <Route path="/metodo-pago" element={<MetodoPago/>}/>
        <Route path="/calificar-psicologo" element={<CalificarPsico/>}/>
        <Route path="/mis-citas" element={<MisCitas/>}/>
        <Route path="/cita-reservada" element={<CitaVirtual/>}/>

        {/* Pantallas Psicólogo */}
        <Route path='/generar-diagnostico' element={<GenerarDiagnostico/>}/>

        {/* Pantallas Administrador */}
        <Route path="*" element={<Inicio/>}/>
      </Routes>
    </>
  )
}

export default App
