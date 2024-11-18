import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Inicio } from '../components/inicio_sesion/inicio'
import { CrearCuenta } from '../components/inicio_sesion/crear_cuenta'
import { PrivateRoute } from './private.routes'
import RutasPaciente from './paciente.routes'
import RutasPsicologo from './psicologo.routes'
import RutasAdmin from './admin.routes'
import ErrorPage from '../pages/ErrorPage'

export default function Rutas() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path='/' element={<Inicio />} />
        <Route path="/crear-cuenta" element={<CrearCuenta />} />

        {/* Rutas protegidas por rol */}
        <Route element={<PrivateRoute requiredRole="Paciente"/>} >
          {RutasPaciente()}
        </Route>
        <Route element={<PrivateRoute requiredRole="Psicologo"/>} >
          {RutasPsicologo()}
        </Route>
        <Route element={<PrivateRoute requiredRole="Administrador"/>} >
          {RutasAdmin()}
        </Route>

        {/* Manejo de errores */}
        <Route path='/403' element={ <ErrorPage code={403} message={"No autorizado"} /> } />
        <Route path='*' element={ <ErrorPage code={404} message={"No encontrado"} /> } />
      </Routes>
    </BrowserRouter>
  )
}
