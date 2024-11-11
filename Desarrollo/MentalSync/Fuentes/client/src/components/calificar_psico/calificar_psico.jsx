import styles from './calificar_psico.module.css';
import logoMental from '../../assets/logo_mentalsync.png';
import logoUsuario from '../../assets/user.png';

export function CalificarPsico() {
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
                            <h2 className='mb-4 mt-3'>Califique a su psicólogo</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="col-12">
                            <div class={`card ${styles.myCard} mb-3`}>
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
                                                        <label for="exampleInputEmail1" class="form-label">Enlace</label>
                                                        <input type="text" className={`form-control mb-3`}placeholder="URL de Google Forms" readOnly/>
                                                    </div>
                                                </div>
                                                <div className="row m-2">
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button type="submit" className="btn btn-primary">Aceptar</button>
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