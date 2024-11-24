import modi from "./modificar_datos_paciente.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  NavBarMental,
  NombrePantalla,
  PacienteConFoto,
} from "../../principales";
import { Link } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { perfilPacienteRequest } from "../../../api/pacientes";
import { useAuth } from "../../../context/AuthContext";

export function LabelModifDatosSoloLectura(props) {
  return (
    <div>
      <label htmlFor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <input
        type="text"
        className="form-control w-80 mb-4"
        placeholder={`${props.ejemplo}`}
        readOnly
      />
    </div>
  );
}

export function LabelModifDatosEditar(props) {
  return (
    <div>
      <label htmlFor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <input
        type="text"
        className="form-control w-80 mb-4"
        placeholder={`${props.ejemplo}`}
      />
    </div>
  );
}

export function ModificarDatosPaciente() {
  // Peticion de datos
  const { data: [paciente], loading } = useFetchData([perfilPacienteRequest]);
  const { user } = useAuth();

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      {loading ? (
        <div>Cargando ...</div>
      ) : (
          
      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <NombrePantalla nombre="Modificar datos de paciente" />
            </div>
          </div>
          <div className="row justify-content-center">
            <div className="col-3">
              <div className={`card ${modi.myCard} mb-3`}>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-12 text-center">
                      <PacienteConFoto
                        foto={paciente.foto}
                        nombre={paciente.nombre + " " + paciente.apellidop}
                        dni={paciente.dni}
                        ultimaCita="23/09/2024"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-9">
              <form>
                <div className="row m-2">
                  <div className="col-5">
                    <LabelModifDatosSoloLectura
                      propiedad="Nombres"
                      ejemplo={paciente.nombre}
                    />
                    <LabelModifDatosSoloLectura
                      propiedad="DNI"
                      ejemplo={paciente.dni}
                    />
                  </div>
                  <div className="col-5">
                    <LabelModifDatosSoloLectura
                      propiedad="Apellidos"
                      ejemplo={paciente.apellidop + " " + paciente.apellidom}
                    />
                    <LabelModifDatosEditar
                      propiedad="Correo electrónico"
                      ejemplo={user.correo}
                    />
                  </div>
                </div>
                <div className="row m-2">
                  <div className="col-10 d-flex justify-content-end">
                    <Link to="/principal">
                      <BotonAccion nombre="Guardar cambios" />
                    </Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      )}
    </div>
  );
}
