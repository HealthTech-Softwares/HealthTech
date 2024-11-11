import logoMental from '../../assets/logo_mentalsync.png'
import logoUsuario from '../../assets/user.png'
import styles from './buscar_psico.module.css'

export function BuscarPsico(){
    return (
        <body className={`${styles.fondo}`}>
            <nav class="navbar bg-body-tertiary">
                <div class="container-fluid d-flex align-items-center">
                    <a class="navbar-brand d-flex align-items-center" href="#">
                    <img src={logoMental} alt="Logo" class={`d-inline-block align-text-top ${styles.logoNav}`}/>
                    Mentalsync
                    </a>
                    <img src={logoUsuario} alt="Usuario" class={`${styles.logoNav}`} />
                </div>
            </nav>

            <section className='vh-100'>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12 m-3">
                            <h1 className='mb-3'>Buscar Psicólogo</h1>
                            <form>
                                <div className="row">
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
                                    <div className="col-2">
                                        <button type="submit" className="btn btn-primary">Buscar</button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`row m-3 justify-content-center`}>
                        <div className="col-12">
                            <div class={`card ${styles.myCard}`}>
                                <div class="card-body">
                                    <div className="row">
                                        <div className="col-3 text-center">
                                            <img src={logoUsuario} alt="Psicólogo" className={`${styles.logoPsico}`} />
                                            <h5 class="card-title">Ruperta Martinez Orbegón</h5>
                                            <h6 class="card-subtitle mb-2 text-body-secondary">Terapeuta</h6>
                                        </div>
                                        <div className="col-9 d-flex flex-column justify-content-between">
                                            <p class="card-text">Soy un psicólogo especializado en terapia de pareja, dedicado a ayudar a las personas a mejorar la comunicación, resolver conflictos y fortalecer su relación.</p>
                                            <div className='d-flex justify-content-end'>
                                                <button className='btn btn-primary'>Reserva cita</button>
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