import styles from './generar_diagnostico.module.css';
import logoMental from '../../assets/logo_mentalsync.png';
import logoUsuario from '../../assets/user.png';

export function GenerarDiagnostico() {
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
                            <h2 className='mb-4 mt-3'>Generar diagnóstico</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="col-12">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-3 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`mb-3 ${styles.logoPsico}`} />
                                            <h5 class="card-title">Santos Jiggets</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">ID: U0304</h6>
                                            <p><b>Última cita:</b> 23/09/24</p>
                                            <button className='btn btn-primary text-center'>Ver historia clínica</button>
                                        </div>
                                        <div className="col-9">
                                            <form>
                                                <div className="row m-2">
                                                    <div className="col-6">
                                                        <label for="exampleInputEmail1" class="form-label">Coloque aquí su diagnóstico</label>
                                                        <div class="form-floating mb-4">
                                                            <textarea class="form-control h-50" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                                        </div>

                                                        <label for="exampleInputEmail1" class="form-label">Notas (opcional)</label>
                                                        <div class="form-floating">
                                                            <textarea class="form-control h-50" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                                        </div>
                                                    </div>
                                                    <div className="col-6">
                                                        <label for="exampleInputEmail1" class="form-label">Firma digital</label>
                                                        <div class="form-floating">
                                                            <textarea class="form-control h-50" placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                                                        </div>
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
