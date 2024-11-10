import logoMental from '../../assets/logo_mentalsync.png';
import './inicio.css';

export function Inicio() {
  return (
    <div className="container">
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-6 text-center">
            <img src={logoMental} alt="Logo" />
            <h1>Mentalsync</h1>
        </div>
        <div className="col-6">
            <h2 className='text-center mb-4'>Iniciar sesión</h2>
            <form class="row g-3 d-flex flex-column align-items-center">
                <div class="col-6">
                    <label for="inputEmail4" class="form-label">Correo electrónico</label>
                    <input type="email" class="form-control" id="inputEmail4"/>
                </div>
                <div class="col-6">
                    <label for="inputPassword4" class="form-label">Contraseña</label>
                    <input type="password" class="form-control" id="inputPassword4"/>
                </div>
                <div class="col-12 text-center">
                    <button type="submit" class="btn btn-primary">Ingresar</button>
                </div>
                </form>
        </div>
      </div>
    </div>
  )
}