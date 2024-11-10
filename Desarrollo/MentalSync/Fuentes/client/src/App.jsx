import { useState } from 'react'
import './App.css'
import { BuscarPsico } from './components/pantalla_principal_paciente/buscar_psico'
import { Inicio } from './components/inicio_sesion/inicio'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        {/* <Inicio/> */}
        <BuscarPsico/>
      </div>
    </>
  )
}

export default App
