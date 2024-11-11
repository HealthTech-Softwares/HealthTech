import styles from './principales.module.css';
import logoMental from '../assets/logo_mentalsync.png';
import logoUsuario from '../assets/user.png';

export function NavBarMental(){
    return(
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid d-flex align-items-center">
                <a class="navbar-brand d-flex align-items-center" href="#">
                <img src={logoMental} alt="Logo" class={`d-inline-block align-text-top ${styles.logoNav}`}/>
                MentalSync
                </a>
                <img src={logoUsuario} alt="Usuario" class={`${styles.logoNav}`} />
            </div>
        </nav>
    )
}

export function InfoPsicologo(props){
    return(
        <div class={`card ${styles.myCardInfoPsico} mb-3`}>
            <div class="card-body">
                <div className="row">
                    <div className="col-3 text-center">
                        <img src={logoUsuario} alt="Psicólogo" className={`mx-auto mb-3 ${styles.logoPsico}`} />
                        <h5 class="card-title">{props.nombre}</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">{props.especialidad}</h6>        
                    </div>
                    <div className="col-9 d-flex flex-column justify-content-between">
                        <p class="card-text">{props.descripcion}</p>
                        <div className='d-flex justify-content-end'>
                           <BotonAccion nombre="Reservar cita"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function InputInfo(){
    return(
        <input type="text" className="form-control" placeholder="Código/Nombre"/>
    )
}

export function SelectInfo(props){
    return(
        <select className="form-select">
            <option value="1">{props.valor1}</option>
            <option value="2">{props.valor2}</option>
            <option value="3">{props.valor3}</option>
            <option value="4">{props.valor4}</option>
        </select>
    )
}

export function BotonAccion(props){
    return(
        <button type="submit" className="btn btn-primary">{props.nombre}</button>
    )
}

export function NombrePantalla(props){
    return(
        <h2 className='mb-3 mt-3'>{props.nombre}</h2>
    )
}
