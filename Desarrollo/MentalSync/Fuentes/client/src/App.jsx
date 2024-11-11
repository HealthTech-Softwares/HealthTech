import { useState } from 'react'
import './App.css'
import { BuscarPsico } from './components/pantalla_principal_paciente/buscar_psico'
import { Inicio } from './components/inicio_sesion/inicio'
import { ReservaCita } from './components/reservar_cita/reservar_cita'
import { MetodoPago } from './components/metodo_pago/metodo_pago'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <MetodoPago/>
      </div>
    </>
  )
}

export default App
