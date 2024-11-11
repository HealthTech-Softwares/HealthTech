import logoMental from '../../assets/logo_mentalsync.png';
import styles from './inicio.module.css';

export function Inicio() {
  return (
    <div className={`container-fluid ${styles.containerFluid}`}>
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-6 text-center">
            <img src={logoMental} alt="Logo" className={styles.logo} />
            <h1 className={styles.title}>MentalSync</h1>
        </div>
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
                <div className="col-12 text-center">
                    <button type="submit" className="btn btn-primary">Ingresar</button>
                </div>
            </form>
        </div>
      </div>
    </div>
  )
}
