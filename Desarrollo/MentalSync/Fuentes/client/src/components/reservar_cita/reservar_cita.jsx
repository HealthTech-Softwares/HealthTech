import styles from './reservar_cita.module.css'
import logoMental from '../../assets/logo_mentalsync.png'
import logoUsuario from '../../assets/user.png'

export function ReservaCita(){
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
                            <h2 className='mb-5 mt-3'>Reservar cita</h2>
                            <form>
                                <div className="row mb-5 d-flex justify-content-center">
                                    <div className="col-5 ms-5">
                                        <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                        <input type="text" className={`form-control w-75`} placeholder="Juan Pérez"/>
                                    </div>
                                    <div className="col-5 ms-5">
                                        <label for="exampleInputEmail1" class="form-label">Correo electrónico</label>
                                        <input type="text" className={`form-control w-75`} placeholder="@example.com"/>
                                    </div>
                                </div>
                                <div className="row mb-5 d-flex justify-content-center">
                                    <div className="col-5 ms-5">
                                        <label for="exampleInputEmail1" class="form-label">Teléfono</label>
                                        <input type="text" className={`form-control w-75`} placeholder="+51 --- --- ---"/>
                                    </div>
                                    <div className="col-5 ms-5">
                                        <label for="exampleInputEmail1" class="form-label">Seleccionar horario</label>
                                        <select className="form-select w-75">
                                            <option value="1">8:00 AM - 10:00 AM</option>
                                            <option value="2">10:00 AM - 12:00 PM</option>
                                            <option value="3">12:00 PM - 14:00 PM</option>
                                            <option value="4">14:00 PM - 16:00 PM</option>
                                            <option value="5">16:00 PM - 18:00 PM</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-10 d-flex justify-content-end">
                                        <button type="submit" className="btn btn-primary">Reservar cita</button>
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