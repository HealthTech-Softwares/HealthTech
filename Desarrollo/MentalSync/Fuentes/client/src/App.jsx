import { useEffect, useContext } from 'react';
import { FuncionChat } from './components/general/crear_chat/FuncionChat';
import { AuthProvider, AuthContext } from './context/AuthContext';
import Rutas from './routes/index.routes';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AppContent() {
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios.get('/api/pacientes/perfil', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then(res => {
          setUser(res.data);
        })
        .catch(err => {
          console.log("Token inválido o expirado");
          localStorage.removeItem("token");
          navigate('/login');
        });
    } else {
      navigate('/login');
    }
  }, []);

  return <Rutas />;
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
