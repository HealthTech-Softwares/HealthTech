import styles from './lista_psicologos.module.css';
import logoMental from '../../assets/logo_mentalsync.png'
import logoUsuario from '../../assets/user.png'

export function ListaPsicologos(){
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
                            <h2 className='mb-3 mt-3'>Lista de psicólogos</h2>
                            <form>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Código/Nombre"/>
                                    </div>
                                    <div className="col-3">
                                        <select className="form-select">
                                            <option value="1">Especialidad</option>
                                            <option value="2">Terapia Infantil</option>
                                            <option value="3">Terapia de Pareja</option>
                                            <option value="4">Terapia Grupal</option>
                                            <option value="5">Desórdenes mentales</option>
                                        </select>
                                    </div>
                                    <div className="col-1 text-center">
                                        <button type="submit" className="btn btn-primary">Buscar</button>
                                    </div>
                                    <div className="col-2 text-center">
                                        <button type="submit" className="btn btn-light">Agregar psicólogo</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`row justify-content-center`}>
                        <div className="col-4">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Richard Trejo</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: P005</h6>
                                            <p>Psicología clínica</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <button className='btn btn-primary text-center mx-2'>Ver datos</button>
                                                    <button className='btn btn-primary text-center mx-2'>Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Dani Cotrina</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: P013</h6>
                                            <p>Trastorno del sueño</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <button className='btn btn-primary text-center mx-2'>Ver datos</button>
                                                    <button className='btn btn-primary text-center mx-2'>Eliminar</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Ana Coelho</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: P021</h6>
                                            <p>Ansiedad</p>
                                            <div className="row">
                                                <div className="col-12">
                                                    <button className='btn btn-primary text-center mx-2'>Ver datos</button>
                                                    <button className='btn btn-primary text-center mx-2'>Eliminar</button>
                                                </div>
                                            </div>
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