import logoMental from '../../assets/logo_mentalsync.png';
import { BotonAccion } from '../principales';
import styles from './inicio.module.css';
import { Link } from 'react-router-dom';

export function FormInicioSesion(){
  return (
    <div className="col-6">
      <h2 className={`text-center mb-4 ${styles.subtitle}`}>Iniciar sesión</h2>
      <form className="row g-3 d-flex flex-column align-items-center">
          <div className="col-6">
              <label htmlFor="inputEmail4" className="form-label">Correo electrónico</label>
              <input type="email" className="form-control" id="inputEmail4"/>
          </div>
          <div className="col-6">
              <label htmlFor="inputPassword4" className="form-label">Contraseña</label>
              <input type="password" className="form-control" id="inputPassword4"/>
          </div>
          <div className="col-6">
              <label htmlFor="inputPassword4" className="form-label">¿No tiene una cuenta?
                <Link to="/crear-cuenta">
                  <a href="#" className='ms-2'><b>Cree una</b></a> 
                </Link> 
              </label>
          </div>
          <div className="col-12 text-center">
              <Link to="/principal">
                <BotonAccion nombre="Ingresar"/>
              </Link>
          </div>
      </form>
    </div>
  )
}

export function Inicio() {
  return (
    <div className={`container-fluid ${styles.containerFluid}`}>
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-6 text-center">
            <img src={logoMental} alt="Logo" className={styles.logo} />
            <h1 className={styles.title}>MentalSync</h1>
        </div>
        <FormInicioSesion/>
      </div>
    </div>
  )
}
