import logoMental from "../../assets/logo_mentalsync.png";
import { BotonAccion } from "../principales";
import styles from "./inicio.module.css";
import { Link } from "react-router-dom";

export function FormCrearCuenta() {
  return (
    <div className="col-6">
      <h2 className={`text-center mb-2 ${styles.subtitle}`}>Crear cuenta</h2>
      <form className="row d-flex flex-column align-items-center">
        <div className="col-6 mb-2">
          <label className="form-label">Nombres</label>
          <input type="text" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Apellido paterno</label>
          <input type="text" className="form-control" id="inputPassword4" />
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Apellido materno</label>
          <input type="text" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">DNI</label>
          <input type="text" className="form-control" id="inputPassword4" />
        </div>
        <div className="col-6 mb-2">
          <label for="exampleInputEmail1" class="form-label">
            Género
          </label>
          <select className="form-select">
            <option value="1">Masculino</option>
            <option value="2">Femenino</option>
            <option value="3">Prefiero no decirlo</option>
          </select>
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" id="inputEmail4" />
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="inputPassword4" />
        </div>
        <div className="col-12 text-center">
          <Link to="/principal">
            <BotonAccion nombre="Ingresar" />
          </Link>
        </div>
      </form>
    </div>
  );
}

export function CrearCuenta() {
  return (
    <div className={`container-fluid ${styles.containerFluid}`}>
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-6 text-center">
          <img src={logoMental} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>MentalSync</h1>
        </div>
        <FormCrearCuenta />
      </div>
    </div>
  );
}
