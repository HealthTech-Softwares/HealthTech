import { useState, useEffect } from "react"

export const useFetchData = (apiCalls) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await Promise.all(apiCalls.map((call) => call()));
        const results = response.map((res) => res.data);
        setData(results);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  return {data, loading}
}
