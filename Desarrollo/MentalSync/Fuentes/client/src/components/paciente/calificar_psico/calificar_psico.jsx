import cali from "./calificar_psico.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  EnlaceLabel,
  NavBarMental,
  NombrePantalla,
} from "../../principales";
import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { citaRequest } from "../../../api/citas";

export function CalificarPsico() {
  // Obtener parametro de cita
  const { idcita } = useParams();

  // Peticion de daton
  const { data: [cita], loading, error, mensaje} = useFetchData([
    () => citaRequest(idcita)
  ])

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />

      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <NombrePantalla nombre="Calificar psicólogo" />
            </div>
          </div>
          <div className="row justify-content-center ">
            <div className="col-12">
              <div className={`card ${cali.myCardCalificarPsico} mb-3`}>
                <div className="card-body">
                  <div className="row align-items-center">
                    {loading ? (<h3>Cargando...</h3>) : error ? (<h2>{mensaje}</h2>) : (
                      <div className="col-4 text-center">
                        <img
                          src={cita.foto_psicologo}
                          alt="Psicólogo"
                          className={`mb-3 ${styles.logoPsico}`}
                        />
                        <h5 className="card-title">{cita.nombre_psicologo}</h5>
                        <p className="m-0">
                          <b>Fecha de cita:</b>{cita.fecha}
                        </p>
                      </div>
                    )}
                    <div className="col-8">
                      <form>
                        <div className="row m-2">
                          <div className="col-12">
                            <EnlaceLabel enlace="https://example.com/" />
                          </div>
                        </div>
                        <div className="row m-2">
                          <div className="col-12 d-flex justify-content-end">
                            <Link to="/mis-citas">
                              <BotonAccion nombre="Aceptar" />
                            </Link>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
