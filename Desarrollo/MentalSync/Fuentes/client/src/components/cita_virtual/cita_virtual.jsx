import cit from './cita_virtual.module.css';
import styles from '../principales.module.css';
import { BotonAccion, NavBarMental, NombrePantalla } from '../principales';
import { Link } from 'react-router-dom';

export function CardCitaReservada(){
    return(
        <div class={`card ${cit.myCard}`}>
            <div class="card-body">
                <div className='text-center'>
                    <NombrePantalla nombre="Cita reservada"/>
                </div>
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
                        <Link to="/principal">
                            <BotonAccion nombre="Aceptar"/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export function CitaVirtual() {
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>

            <section className='d-flex justify-content-center align-items-center' style={{ minHeight: '80vh' }}>
                <div className="container-fluid">
                    <div className="row justify-content-center">
                        <div className="col-12">
                            <CardCitaReservada/>
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