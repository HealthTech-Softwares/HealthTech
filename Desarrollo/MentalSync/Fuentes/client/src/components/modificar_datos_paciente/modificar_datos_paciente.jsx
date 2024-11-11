import styles from './modificar_datos_paciente.module.css';
import logoMental from '../../assets/logo_mentalsync.png';
import logoUsuario from '../../assets/user.png';

export function ModificarDatosPaciente() {
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
                            <h2 className='mb-4 mt-3'>Modificar datos del paciente</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="col-3">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Santos Jiggets</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: U0304</h6>
                                            <p><b>Última cita:</b> 23/09/24</p>
                                            <button className='btn btn-primary text-center'>Ver historia clínica</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <form>
                                <div className="row m-2">
                                    <div className="col-5">
                                        <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                        <input type="text" className={`form-control w-80 mb-4`} placeholder="Nombre" readOnly />

                                        <label for="exampleInputEmail1" class="form-label">Fecha de nacimiento</label>
                                        <input type="text" className={`form-control w-80 mb-4`} placeholder="Fecha" readOnly />

                                        <label for="exampleInputEmail1" class="form-label">Dirección</label>
                                        <input type="text" className={`form-control w-80 mb-4`} placeholder="Dirección" />
                                    </div>
                                    <div className="col-5">
                                        <label for="exampleInputEmail1" class="form-label">Apellidos</label>
                                        <input type="text" className={`form-control w-80 mb-4`} placeholder="Nombre" readOnly />

                                        <label for="exampleInputEmail1" class="form-label">Identificador</label>
                                        <input type="text" className={`form-control w-80 mb-4`} placeholder="Identificador" readOnly />

                                        <label for="exampleInputEmail1" class="form-label">Correo</label>
                                        <input type="text" className={`form-control w-80 mb-4`} placeholder="@example.com" />
                                    </div>
                                </div>
                                <div className="row m-2">
                                    <div className="col-10 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary">Aceptar cambios</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}