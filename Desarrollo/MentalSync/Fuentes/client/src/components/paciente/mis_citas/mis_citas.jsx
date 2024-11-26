import styles from "./mis_citas.module.css";
import { BotonAccion, NavBarMental } from "../../principales";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { getCitasPacienteRequest } from "../../../api/citas";

export function MisCitas() {
  // Peticion de datos
  const { data: [citas], loading, error, mensaje } = useFetchData([
    getCitasPacienteRequest
  ]);
  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <h2 className="mb-4 mt-3">Mis citas</h2>
            </div>
          </div>
      {loading ? (<div>Cargando...</div>) : error ? (<h1>{mensaje}</h1>) : (
          <div className="row justify-content-center ">
            <div className="col-12">
              <div className={`card ${styles.myCard} mb-3`}>
                <div className="card-body m-3">
                  <div className="row align-items-center">
                    <div className="col-12">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Fecha</th>
                            <th scope="col">Horario</th>
                            <th scope="col">Estado</th>
                            <th scope="col">Psicólogo</th>
                            <th scope="col">Motivo</th>
                            <th scope="col">Diagnóstico</th>
                            <th scope="col">Comentario</th>
                            <th scope="col"></th>
                          </tr>
                        </thead>
                        <tbody>
                          {citas.map((cita) => (  
                            <tr key={cita.idcita}>
                              <td>{cita.fecha}</td>
                              <td>{cita.hora}</td>
                              <td>{cita.estado}</td>
                              <td>{`${cita.psicologo_nombre} ${cita.psicologo_apellidop}`}</td>
                              <td>{cita.motivo}</td>
                              <td>{cita.diagnostico_nombre}</td>
                              <td>{cita.comentario}</td>
                              <td>
                                <Link to={`/calificar-psicologo/${cita.idcita}`}>
                                  <BotonAccion nombre="Calificar" />
                                </Link>
                              </td>
                            </tr>
                          ))}
                          <tr>
                            <td>23/09/2024</td>
                            <td>08:00 am</td>
                            <td>Pendiente</td>
                            <td>Carlos, Salazar Huaman</td>
                            <td>motivo prueba</td>
                            <td>dignostico prueba</td>
                            <td>comentario prueba</td>
                            <td>
                              <Link to="/calificar-psicologo">
                                <BotonAccion nombre="Calificar" />
                              </Link>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="row m-2">
                    <div className="col-12 d-flex justify-content-end">
                      <Link to="/principal">
                        <BotonAccion nombre="Regresar" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      )}
        </div>
      </section>
    </div>
  );
}
