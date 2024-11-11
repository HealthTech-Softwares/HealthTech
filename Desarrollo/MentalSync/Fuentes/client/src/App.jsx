import { useState } from 'react'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Inicio } from './components/inicio_sesion/inicio'
import { BuscarPsico } from './components/pantalla_principal_paciente/buscar_psico'
import { ReservaCita } from './components/reservar_cita/reservar_cita'
import { MetodoPago} from './components/metodo_pago/metodo_pago'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Routes>
        <Route path="/" element={<Inicio/>}/>
        <Route path="/principal" element={<BuscarPsico/>}/>
        <Route path="/reserva-cita" element={<ReservaCita/>}/>
        <Route path="/metodo-pago" element={<MetodoPago/>}/>
      </Routes>
    </>
  )
}

export default App
