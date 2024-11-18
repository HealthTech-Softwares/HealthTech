import { AuthProvider } from './context/AuthContext'
import Rutas from './routes/index.routes'

function App() {

  return (
    <AuthProvider>
      <Rutas />
    </AuthProvider>
  )
}

export default App
