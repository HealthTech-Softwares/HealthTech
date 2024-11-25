import styles from "./principales.module.css";
import logoMental from "../assets/logo_mentalsync.png";
import logoUsuario from "../assets/user.png";
import logoCampana from "../assets/bell.png";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export function NavBarMental() {
  const {user} = useAuth();
  let ruta = "";
  let ruta2 = "";
  switch (user.rol) {
    case "Paciente":
      ruta = "/principal";
      ruta2 = "/modificar-datos-paciente";
      break;
    case "Psicologo":
      ruta = "/mis-pacientes";
      ruta2 = "/modificar-datos-psicologo";
      break;
    case "Administrador":
      ruta = "/lista-psicologos";
      ruta2 = '/';
      break;
    default:
      ruta = "/404";
      ruta2 = "/403";
      break;
  }
  
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center">
        <Link
          className="navbar-brand d-flex align-items-center"
          to={ ruta }
        >
          <img
            src={logoMental}
            alt="Logo"
            className={`d-inline-block align-text-top ${styles.logoNav}`}
          />
          MentalSync
        </Link>

        <div className="col-6 d-flex justify-content-end">
          <Link to="/notificaciones">
            <img
              src={logoCampana}
              alt="Campana"
              className={`${styles.logoNav}`}
            />
          </Link>

          <Link to={ ruta2 } >
            <img
              src={logoUsuario}
              alt="Usuario"
              className={`${styles.logoNav}`}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}

export function NavBarAdmin(){
  const {user} = useAuth();
  let ruta = "/lista-psicologos";
  
  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid d-flex align-items-center">
        <Link
          className="navbar-brand d-flex align-items-center"
          to={ ruta }
        >
          <img
            src={logoMental}
            alt="Logo"
            className={`d-inline-block align-text-top ${styles.logoNav}`}
          />
          MentalSync
        </Link>

        <div className="col-6 d-flex justify-content-end">
          <Link to="/notificaciones">
            <img
              src={logoCampana}
              alt="Campana"
              className={`${styles.logoNav}`}
            />
          </Link>
        </div>
      </div>
    </nav>
  );
}


export function InfoPsicologo(props) {
  return (
    <div className={`card ${styles.myCardInfoPsico} mb-3`}>
      <div className="card-body">
        <div className="row">
          {/* Imagen y datos básicos */}
          <div className="col-3 text-center">
            <img
              src={props.foto}
              alt="Psicólogo"
              className={`mx-auto mb-3 ${styles.logoPsico}`}
            />
            <h5 className="card-title">{props.nombre}</h5>
            <h6 className="card-subtitle mb-2 text-body-secondary">
              DNI: {props.dni}
            </h6>
          </div>
          
          {/* Detalles del psicólogo */}
          <div className="col-9 d-flex flex-column justify-content-between">
            <p className="card-text">{props.descripcion}</p>
            
            {/* Listado de especialidades */}
            <p className="card-text">
              <strong>Especialidades:</strong>{" "}
              {props.especialidades.length > 0 ? (
                props.especialidades.map((especialidad) => especialidad.nombre).join(', ')
              ) : (
                "No especificadas"
              )}
            </p>
            
            {/* Consulta Online */}
            <p className="card-text">
              <strong>Consulta Online:</strong>{" "}
              {props.consulta_online ? "Sí" : "No"}
            </p>
            
            {/* Botón para reservar cita */}
            <div className="d-flex justify-content-end">
              <Link to={`/reserva-cita/${props.idpsicologo}`}>
                <BotonAccion nombre="Reservar cita" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


export function InputInfoSinLabel(props) {
  return (
    <input type="text" className="form-control" placeholder={props.placeholder} onChange={props.onChange} />
  );
}

export function InputInfoConLabel(props) {
  return (
    <div className="col-5 ms-5">
      <label hmtlfor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <input
        type="text"
        className={`form-control w-75`}
        placeholder={`${props.ejemplo}`}
      />
    </div>
  );
}

export function InputInfoConLabelDoce(props) {
  return (
    <div className="col-12 mb-3">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <input
        type="text"
        className={`form-control w-75`}
        placeholder={`${props.ejemplo}`}
      />
    </div>
  );
}

export function SelectInfoConLabel(props) {
  return (
    <div className="col-5 ms-5">
      <label htmlFor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <select className="form-select w-75">
        <option value="1">{props.valor1}</option>
        <option value="2">{props.valor2}</option>
        <option value="3">{props.valor3}</option>
        <option value="4">{props.valor4}</option>
        <option value="5">{props.valor5}</option>
      </select>
    </div>
  );
}

export function SelectInfoConLabelDoce(props) {
  return (
    <div className="col-12 mb-3">
      <label htmlfor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <select className="form-select w-75">
        <option value="1">{props.valor1}</option>
        <option value="2">{props.valor2}</option>
        <option value="3">{props.valor3}</option>
        <option value="4">{props.valor4}</option>
        <option value="5">{props.valor5}</option>
      </select>
    </div>
  );
}

export function SelectInfo({ descripcion, options, filtro, handleFiltroChange }) {
  return (
    <select
      className="form-select"
      value={filtro}
      onChange={handleFiltroChange}
    >
      <option value="">{descripcion}</option>
      {options.map((option, index) => (
        <option key={index} value={option.nombre }>
          {option.nombre}
        </option>
      ))}
    </select>
  );
}

export function BotonAccion(props) {
  return (
    <button type="submit" className="btn btn-primary">
      {props.nombre}
    </button>
  );
}

export function NombrePantalla(props) {
  return <h2 className="mb-3 mt-3">{props.nombre}</h2>;
}

export function EnlaceLabel(props) {
  return (
    <div>
      <label for="exampleInputEmail1" className="form-label">
        Enlace
      </label>
      <input
        type="text"
        className={`form-control mb-3`}
        placeholder={`${props.enlace}`}
        readOnly
      />
    </div>
  );
}

export function PacienteConFoto(props) {
  return (
    <div>
      <img
        src={props.foto}
        alt="Psicólogo"
        className={`mb-3 ${styles.logoPsico}`}
      />
      <h5 className="card-title">{props.nombre}</h5>
      <h6 className="card-subtitle mb-2 text-body-secondary">
        DNI: {props.dni}
      </h6>
      {/* Renderizar <p> solo si labelFecha y fecha están definidos */}
      {props.labelFecha && props.fecha && (
        <p>
          <b>{props.labelFecha + ": "}</b>
          {props.fecha}
        </p>
      )}
    </div>
  );
}


export function PsicologoConFoto(props) {
  return (
    <div>
      <img
        src={props.foto}
        alt="Psicólogo"
        className={`mb-3 ${styles.logoPsico}`}
      />
      <h5 className="card-title">{props.nombre}</h5>
      <h6 className="card-subtitle mb-2 text-body-secondary">
        DNI: {props.identificador}
      </h6>
    </div>
  );
}
