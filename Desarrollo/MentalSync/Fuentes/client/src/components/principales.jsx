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

export function InfoPsicologo(){
    return(
        <div class={`card ${styles.myCardInfoPsico} mb-3`}>
            <div class="card-body">
                <div className="row">
                    <div className="col-3 text-center">
                        <img src={logoUsuario} alt="Psicólogo" className={`mx-auto mb-3 ${styles.logoPsico}`} />
                        <h5 class="card-title">Ruperta Martinez Orbegón</h5>
                        <h6 class="card-subtitle mb-2 text-body-secondary">Terapeuta</h6>
                    </div>
                    <div className="col-9 d-flex flex-column justify-content-between">
                        <p class="card-text">Soy un psicólogo especializado en terapia de pareja, dedicado a ayudar a las personas a mejorar la comunicación, resolver conflictos y fortalecer su relación. Mi enfoque se centra en crear un espacio seguro y de confianza donde ambas partes puedan expresar sus emociones y preocupaciones, y trabajar juntos para encontrar soluciones que promuevan el bienestar emocional y la armonía en la relación. </p>
                        <div className='d-flex justify-content-end'>
                            <button className='btn btn-primary'>Reserva cita</button>
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

export function SelectInfo(){
    return(
        <select className="form-select">
            <option value="1">Especialidad</option>
            <option value="2">Terapia Infantil</option>
            <option value="3">Terapia de Pareja</option>
            <option value="4">Terapia Grupal</option>
            <option value="5">Desórdenes mentales</option>
        </select>
    )
}

export function BotonBuscar(){
    return(
        <button type="submit" className="btn btn-primary">Buscar</button>
    )
}

export function NombrePantalla(props){
    return(
        <h2 className='mb-3 mt-3'>{props.nombre}</h2>
    )
}