import gen from "./generar_diagnostico.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  NavBarMental,
  NombrePantalla,
  PacienteConFoto,
} from "../../principales";
import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { citaRequest } from "../../../api/citas";
import { diagnosticosRequest } from "../../../api/diagnostico";

export function TextosAreas(props) {
  return (
    <div>
      <label htmlFor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <div className="form-floating mb-4">
        <textarea
          className="form-control h-50"
          id="floatingTextarea"
        ></textarea>
      </div>
    </div>
  );
}

export function GenerarDiagnostico() {
  // Obtener el parametro de cita
  const { idcita } = useParams();
  // Peticion de datos
  const { data: [cita, diagnosticos], loading, error, mensaje } = useFetchData([
    () => citaRequest(idcita),
    diagnosticosRequest
  ]);

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      {loading
        ? (<div>Cargando ...</div>)
        : error ? (<h1>{mensaje}</h1>)
        : (      
      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <NombrePantalla nombre="Generar diagnóstico" />
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <div className={`${gen.myInfo}`}>
                <p>
                  <b>Motivo: </b>{cita.motivo}
                </p>
                <p>
                  <b>Fecha y hora: </b>{cita.fecha + " " + cita.hora}
                </p>
                <p>
                  <b>Online: </b>{cita.online ? "Si" : "No"}
                </p>
              </div>
            </div>
          </div>

          <div className="row justify-content-center ">
            <div className="col-12">
              <div className={`card ${gen.myCard} mb-3`}>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-3 text-center">
                      <PacienteConFoto
                        foto={cita.foto}
                        nombre={cita.nombre + " " + cita.apellidop}
                        dni={cita.dni}
                        
                      />
                      <Link to={`/historia-clinica/${cita.idpaciente}`} >
                        <BotonAccion nombre="Ver historia clínica" />
                      </Link>
                    </div>
                    <div className="col-9">
                      <form>
                        <div className="row m-2">
                          <div className="col-6">
                            <label
                              htmlFor="exampleInputEmail1"
                              className="form-label"
                            >
                              Diagnóstico
                            </label>
                            <select
                              className="form-select mb-4"
                              aria-label="Default select example"
                            >
                              <option value="">Seleccione un diagnóstico</option>
                              {diagnosticos.map((dg) => (
                                <option value={dg.iddiagnostico}>{dg.nombre}</option>
                              ))}
                            </select>
                            <TextosAreas propiedad="Notas (opcional)" />
                          </div>
                        </div>
                        <div className="row m-2">
                          <div className="col-12 d-flex justify-content-end">
                            <BotonAccion nombre="Aceptar" />
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
        )
      }
    </div>
  );
}
