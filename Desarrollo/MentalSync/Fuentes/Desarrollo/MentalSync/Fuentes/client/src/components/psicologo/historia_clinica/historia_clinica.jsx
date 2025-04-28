import { NavBarMental } from "../../principales";
import styles from "../../principales.module.css";
import his from "../generar_diagnostico/generar_diagnostico.module.css";
import {
  NombrePantalla,
  PacienteConFoto,
  BotonAccion,
} from "../../principales";
import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import {
  citasPacientePsicologoRequest,
  pacientePsicologoRequest,
} from "../../../api/citas";

export function TablaHistClin({ citas, paciente }) {
  return (
    <div className={`card ${his.myCard} mb-3`}>
      <div className="card-body">
        <div className="row align-items-center">
          <div className="col-3 text-center">
            <PacienteConFoto
              nombre={paciente.nombre + " " + paciente.apellidop}
              foto={paciente.foto}
              dni={paciente.dni}
              labelFecha={
                paciente.estado === "Pendiente" ? "Proxima cita" : "Última cita"
              }
              fecha={paciente.fecha}
            />
          </div>
          <div className="col-9">
            <table className="table w-90">
              <thead>
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Hora</th>
                  <th scope="col">Motivo</th>
                  <th scope="col">Diagnóstico</th>
                  <th scope="col">Notas</th>
                </tr>
              </thead>
              <tbody>
                {citas.map((cita) => (
                  <tr key={cita.idcita}>
                    <td>{cita.fecha}</td>
                    <td>{cita.hora}</td>
                    <td>{cita.motivo}</td>
                    <td>{cita.diagnostico}</td>
                    <td>{cita.comentario}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="row m-2">
              <div className="col-12 d-flex justify-content-end">
                <Link to="/mis-pacientes">
                  <BotonAccion nombre="Regresar" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HistoriaClinica() {
  // Obtener el parametro
  const { idpaciente } = useParams();
  // Peticion de datos
  const {
    data: [citas, paciente],
    loading,
    error,
    mensaje,
  } = useFetchData([
    () => citasPacientePsicologoRequest(idpaciente),
    () => pacientePsicologoRequest(idpaciente),
  ]);

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      {loading ? (
        <b>Cargando ...</b>
      ) : error ? (
        <b>{mensaje}</b>
      ) : (
        <section>
          <div className="container-fluid">
            <div className="row ms-4">
              <div className="col-12">
                <NombrePantalla nombre="Historia clínica" />
              </div>
            </div>
            <div className="row justify-content-center ">
              <div className="col-12">
                {citas.length === 0 ? (
                  <p>El paciente no tiene citas</p>
                ) : (
                  <TablaHistClin citas={citas} paciente={paciente[0]} />
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
