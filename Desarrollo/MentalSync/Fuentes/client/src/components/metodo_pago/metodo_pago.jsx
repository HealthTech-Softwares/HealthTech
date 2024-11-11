import styles from './metodo_pago.module.css';
import logoMental from '../../assets/logo_mentalsync.png';
import logoUsuario from '../../assets/user.png';
import MetPago from '../../assets/metodo_pago.png';

export function MetodoPago(){
    return(
        <body>
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
                            <h2 className='mb-5 mt-3'>Método de pago</h2>
                            <div className="row mb-5">
                                <div className="col-5 ms-5 d-flex justify-content-center align-items-center">
                                    <img src={MetPago} alt="MétodoPago" className={`${styles.imagenPago}`} />
                                </div>
                                <div className="col-5 ms-5">
                                    <div class={`card ${styles.myCard}`}>
                                        <div class="card-body">
                                            <form>
                                                <div className="row m-2">
                                                    <div className="col-12">
                                                        <label for="exampleInputEmail1" class="form-label">Nombre del titular</label>
                                                        <input type="text" className={`form-control mb-3`}placeholder="Juan Pérez"/>

                                                        <label for="exampleInputEmail1" class="form-label">Número de tarjeta</label>
                                                        <input type="text" className={`form-control mb-3`} placeholder="@example.com"/>

                                                        <label for="exampleInputEmail1" class="form-label">Fecha de vencimiento (MM/YYYY)</label>
                                                        <input type="text" className={`form-control mb-3`} placeholder="1111 - 1111 - 1111 - 1111"/>

                                                        <label for="exampleInputEmail1" class="form-label">Código de seguridad (CVV)</label>
                                                        <input type="text" className={`form-control mb-3`} placeholder="111"/>
                                                    </div>
                                                </div>
                                                <div className="row m-2">
                                                    <div className="col-12 d-flex justify-content-end">
                                                        <button type="submit" className="btn btn-primary">Reservar cita</button>
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