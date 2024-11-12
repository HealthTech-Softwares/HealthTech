import React, { useEffect, useState } from "react";
// estilos
import styles from "../../components/pantalla_principal_paciente/buscar_psico.module.css";
// uso de api
import { psicologosRequest } from "../../api/test.buscar.psico.js";

// Componente de psicolgos
const CardPsicologo = ({ id, nombre, foto, descripcion }) => {
  return (
    <div className={`card ${styles.myCard} mb-3`}>
      <div className="card-body">
        <div className="row">
          <div className="col-3 text-center">
            <img
              src={foto}
              alt="Psicólogo"
              className={`mx-auto mb-3 ${styles.logoPsico}`}
            />
            <h5 className="card-title">{nombre}</h5>
          </div>
          <div className="col-9 d-flex flex-column justify-content-between">
            <p className="card-text">{descripcion}</p>
            <div className="d-flex justify-content-end">
              <button
                className="btn btn-primary"
                onClick={() =>
                  window.open(`https://example.com/${id}`, "_blank")
                }
              >
                Reserva cita
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Funcion para retornar datos
function verPsicologos() {
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);
  // tambien se puede agregar si hay un error

  useEffect(() => {
    const obtenerPsicologos = async () => {
      try {
        const response = await psicologosRequest();
        console.log(response.data);
        setPsicologos(response.data);
      } catch (error) {
        console.error("Error al cargar psicologos: ", error);
        // setError(true)
      } finally {
        setLoading(false);
      }
    };
    obtenerPsicologos();
  }, []);
  return { psicologos, loading };
}
// Pagina principal
const Test_Buscar = () => {
  const { psicologos, loading } = verPsicologos();
  return (
    <div className={`row justify-content-center`}>
      <div className="col-12">
        {loading ? (
          <div>Cargando</div>
        ) : (
          <>
            {psicologos.map((psico) => (
              <CardPsicologo
                key={psico.idpsicologo}
                id={psico.idpsicologo}
                nombre={psico.nombre}
                foto={psico.foto}
                descripcion={psico.descripcion}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Test_Buscar;
