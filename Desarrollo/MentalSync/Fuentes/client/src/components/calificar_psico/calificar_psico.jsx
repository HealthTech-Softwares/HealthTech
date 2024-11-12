import cali from './calificar_psico.module.css';
import styles from '../principales.module.css';
import logoUsuario from '../../assets/user.png';
import { BotonAccion, EnlaceLabel, NavBarMental, NombrePantalla } from '../principales';
import { Link } from 'react-router-dom';

export function CalificarPsico() {
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>

            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Calificar psicólogo"/>
                        </div>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="col-12">
                            <div class={`card ${cali.myCardCalificarPsico} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-4 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Ruperta Martinez Orbegón</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">Terapeuta</h6>
                                            <p className='m-0'><b>Fecha de cita:</b> 11/11/24</p>
                                        </div>
                                        <div className="col-8">
                                            <form>
                                                <div className="row m-2">
                                                    <div className="col-12">
                                                        <EnlaceLabel enlace="URL de Google Forms" />
                                                    </div>
                                                </div>
                                                <div className="row m-2">
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <Link to="/mis-citas">
                                                            <BotonAccion nombre="Aceptar"/>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}