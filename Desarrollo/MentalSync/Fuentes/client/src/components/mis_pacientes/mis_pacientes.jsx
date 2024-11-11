import styles from './mis_pacientes.module.css';
import logoMental from '../../assets/logo_mentalsync.png';
import logoUsuario from '../../assets/user.png';

export function MisPacientes(){
    return(
        <body className={`${styles.fondo}`}>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid d-flex align-items-center">
                    <a class="navbar-brand d-flex align-items-center" href="#">
                        <img src={logoMental} alt="Logo" class={`d-inline-block align-text-top ${styles.logoNav}`}/>
                    MentalSync
                    </a>
                    <img src={logoUsuario} alt="Usuario" class={`${styles.logoNav}`} />
                </div>
            </nav>

            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <h2 className='mb-3 mt-3'>Mis pacientes</h2>
                            <form>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Código/Nombre"/>
                                    </div>
                                    <div className="col-3">
                                        <select className="form-select">
                                            <option value="1">Estado</option>
                                            <option value="2">En proceso</option>
                                            <option value="3">Solo cita</option>
                                            <option value="4">Completado</option>
                                        </select>
                                    </div>
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary">Buscar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`row justify-content-center`}>
                        <div className="col-3">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Santos Jiggets</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: U0304</h6>
                                            <p>Última cita: 23/09/2024</p>
                                            <button className='btn btn-primary text-center'>Generar diagnóstico</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Olivia Zacarias</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: U0215</h6>
                                            <p>Última cita: 17/07/2024</p>
                                            <button className='btn btn-primary text-center'>Ver historia clínica</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Charlotte Abonza</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: U0321</h6>
                                            <p>Última cita: 20/06/2024</p>
                                            <button className='btn btn-primary text-center'>Ver historia clínica</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Daniel Shivley</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: U0123</h6>
                                            <p>Última cita: 14/02/2024</p>
                                            <button className='btn btn-primary text-center'>Ver historia clínica</button>
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