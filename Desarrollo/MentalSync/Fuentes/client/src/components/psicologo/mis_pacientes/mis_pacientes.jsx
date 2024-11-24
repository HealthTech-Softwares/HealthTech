import mis from "./mis_pacientes.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  InputInfoSinLabel,
  NavBarMental,
  NombrePantalla,
  PacienteConFoto,
} from "../../principales";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { pacientesPsicologoRequest } from "../../../api/citas";

export function SelectEstado() {
  return (
    <select className="form-select">
      <option value="1">Estado</option>
      <option value="2">En proceso</option>
      <option value="3">Solo cita</option>
      <option value="4">Completado</option>
    </select>
  );
}

export function MisPacientes() {
  // Peticion de datos
  const { data: [pacientes], loading, error, mensaje } = useFetchData([pacientesPsicologoRequest]);

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      {loading ? (
        <div>Cargando ...</div>
      ) : error ? (<h1>{ mensaje }</h1>) : (
        <section>
          <div className="container-fluid">
            <div className="row ms-4">
              <div className="col-12">
                <NombrePantalla nombre="Mis pacientes" />
                <form>
                  <div className="row mb-4">
                    <div className="col-3">
                      <InputInfoSinLabel />
                    </div>
                    <div className="col-3">
                      <SelectEstado />
                    </div>
                    <div className="col-1">
                      <BotonAccion nombre="Buscar" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={`row justify-content-center`}>
              {pacientes.length === 0 ? (<p>No hay pacientes para mostrar</p>) : (pacientes.map((paciente) => (
                <div className="col-3" key={paciente.idpaciente}>
                  <div className={`card ${mis.myCard} mb-3`}>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-12 text-center">
                          <PacienteConFoto
                            foto={paciente.foto}
                            nombre={paciente.nombre + " " + paciente.apellidop}
                            dni={paciente.dni}
                            labelFecha={paciente.estado === "Pendiente" ? "Proxima cita" : "Última cita"}
                            fecha={paciente.fecha}
                          />
                          <Link to={paciente.estado === "Pendiente" ? `/generar-diagnostico/${paciente.idcita}` : `/historia-clinica/${paciente.idpaciente}`}>
                            <BotonAccion nombre={paciente.estado === "Pendiente" ? "Generar diagnóstico" : "Ver historia clínica"} />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
