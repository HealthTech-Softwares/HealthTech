import { useState, useEffect } from "react"

export const useFetchData = (apiCalls) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(false);
      try {
        const response = await Promise.all(apiCalls.map((call) => call()));
        const results = response.map((res) => res.data);
        console.log(results);
        setData(results);
      } catch (error) {
        setError(true);
        console.log(error);
        setMensaje(error?.response?.data?.message || "Ocurrió un error inesperado");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {data, loading, error, mensaje}
}
