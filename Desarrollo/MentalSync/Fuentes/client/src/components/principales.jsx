import styles from './principales.module.css';
import logoMental from '../assets/logo_mentalsync.png';
import logoUsuario from '../assets/bell.png';
import { Link } from 'react-router-dom';

export function NavBarMental(){
    return(
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid d-flex align-items-center">
                <Link to="/principal">
                    <a class="navbar-brand d-flex align-items-center" href="#">
                        <img src={logoMental} alt="Logo" class={`d-inline-block align-text-top ${styles.logoNav}`}/>
                    MentalSync
                    </a>
                </Link>
                <Link to="/notificaciones">
                    <a href="#">
                        <img src={logoUsuario} alt="Usuario" class={`${styles.logoNav}`} />
                    </a>
                </Link>
                
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
                            <Link to="/reserva-cita">
                                <BotonAccion nombre="Reservar cita"/>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function InputInfoSinLabel(){
    return(
        <input type="text" className="form-control" placeholder='Código/Nombre'/>
    )
}

export function InputInfoConLabel(props){
    return(
        <div className="col-5 ms-5">
            <label for="exampleInputEmail1" class="form-label">{props.propiedad}</label>
            <input type="text" className={`form-control w-75`} placeholder={`${props.ejemplo}`}/>
        </div>
    )
}

export function InputInfoConLabelDoce(props){
    return(
        <div className="col-12 mb-3">
            <label for="exampleInputEmail1" class="form-label">{props.propiedad}</label>
            <input type="text" className={`form-control w-75`} placeholder={`${props.ejemplo}`}/>
        </div>
    )
}

export function SelectInfoConLabel(props){
    return(
        <div className="col-5 ms-5">
            <label for="exampleInputEmail1" class="form-label">{props.propiedad}</label>
            <select className="form-select w-75">
                <option value="1">{props.valor1}</option>
                <option value="2">{props.valor2}</option>
                <option value="3">{props.valor3}</option>
                <option value="4">{props.valor4}</option>
                <option value="5">{props.valor5}</option>
            </select>
        </div>
    )
}

export function SelectInfoConLabelDoce(props){
    return(
        <div className="col-12 mb-3">
            <label for="exampleInputEmail1" class="form-label">{props.propiedad}</label>
            <select className="form-select w-75">
                <option value="1">{props.valor1}</option>
                <option value="2">{props.valor2}</option>
                <option value="3">{props.valor3}</option>
                <option value="4">{props.valor4}</option>
                <option value="5">{props.valor5}</option>
            </select>
        </div>
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

export function EnlaceLabel(props){
    return(
        <div>
            <label for="exampleInputEmail1" class="form-label">Enlace</label>
            <input type="text" className={`form-control mb-3`}placeholder={`${props.enlace}`} readOnly/>
        </div>
    )
}

export function PacienteConFoto(props){
    return(
        <div>
            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
            <h5 class="card-title">{props.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">DNI: {props.identificador}</h6>
            <p><b>Última cita: </b>{props.ultimaCita}</p>
        </div>
    )
}

export function PsicologoConFoto(props){
    return(
        <div>
            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
            <h5 class="card-title">{props.nombre}</h5>
            <h6 class="card-subtitle mb-2 text-body-secondary">DNI: {props.identificador}</h6>
            <p>{props.especialidad}</p>
        </div>
    )
}