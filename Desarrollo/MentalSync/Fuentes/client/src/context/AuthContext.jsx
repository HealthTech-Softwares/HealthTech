import { createContext, useContext, useState, useEffect } from 'react'
import { loginRequest, verifyTokenRequest } from '../api/auth'
import Cookies from 'js-cookie'

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) { 
    throw new Error("useAuth debe usarse dentro de un AuthProvider");
  }
  return context;
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  // Iniciar sesion
  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      // console.log(res)
      setUser(res.data);
      setIsAuthenticated(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  // Salir de la sesion
  const logout = () => {
    Cookies.remove("token");
    setUser(null);
    setIsAuthenticated(false);
  }

  // Limpiar errores
  useEffect(() => {
    if (error != "") {
      const timer = setTimeout(() => { 
        setError("");
      }, 3000)
      return () => clearTimeout(timer);
    }
  }, [error])

  // Verificar token
  useEffect(() => {
    async function checkLogin () {
      const cookies = Cookies.get();
      if (!cookies.token) {
        setIsAuthenticated(false);
        setUser(null)
        setLoading(false);
        return;
      }

      try {
        const res = await verifyTokenRequest(cookies.token);
        if (!res.data) return setIsAuthenticated(false);
        setIsAuthenticated(true);
        setUser(res.data);
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setUser(null);
        setLoading(false);
      }
    }
    checkLogin();
  }, [])
  
  return (
    <AuthContext.Provider value={{
      signin,
      user,
      isAuthenticated,
      error,
      loading,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;
