import styles from './cita_virtual.module.css';
import logoMental from '../../assets/logo_mentalsync.png';
import logoUsuario from '../../assets/user.png';

export function CitaVirtual() {
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

            <section className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <div class={`card ${styles.myCard}`}>
                                <div class="card-body">
                                    <h2 className='text-center'>Cita reservada</h2>
                                    <form>
                                        <div className="row m-2">
                                            <div className="col-12">
                                                <h4>Detalles:</h4>
                                            </div>
                                        </div>
                                        <div className="row m-2">
                                            <div className="col-12">
                                                <table className={`table`}>
                                                    <tbody>
                                                        <tr>
                                                            <th scope='row'>Nombre</th>
                                                            <td>Juan Perez</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope='row'>Correo electrónico</th>
                                                            <td>@example.com</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope='row'>Teléfono</th>
                                                            <td>+51 --- --- ---</td>
                                                        </tr>
                                                        <tr>
                                                            <th scope='row'>Horario</th>
                                                            <td>8:00 AM - 10:00 AM</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div className="row m-2">
                                            <div className="col-12 d-flex justify-content-end">
                                                <button type="submit" className="btn btn-primary">Asistir a cita online</button>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row justify-content-center">
                        <div className="col-12 d-flex flex-column align-items-center mt-5">
                            <label for="exampleInputEmail1" class="form-label">Enlace de la reunión:</label>
                            <input type="text" className="form-control w-50" placeholder="URL de la reunión de Zoom" readOnly/>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}