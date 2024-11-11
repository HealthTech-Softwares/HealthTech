import styles from './mis_citas.module.css';
import logoMental from '../../assets/logo_mentalsync.png';
import logoUsuario from '../../assets/user.png';
import { BotonAccion, SelectInfo } from '../principales';

export function MisCitas(){
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
                            <h2 className='mb-4 mt-3'>Mis citas</h2>
                        </div>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="col-12">
                            <div class={`card ${styles.myCard} mb-3`}>
                                <div class="card-body m-3">
                                    <div className="row align-items-center mb-4">
                                        <div className="col-3">
                                            <SelectInfo valor1="Fecha" valor2="1" valor3="2" valor4="3"/>
                                        </div>
                                        <div className="col-3">
                                            <SelectInfo valor1="Psicólogo" valor2="P1" valor3="P2" valor4="P3"/>
                                        </div>
                                        <div className="col-3">
                                            <SelectInfo valor1="Especialidad" valor2="E1" valor3="E2" valor4="E3"/>
                                        </div>
                                    </div>
                                    <div className="row align-items-center">
                                        <div className="col-12">
                                            <table class="table">
                                                <thead>
                                                    <tr>
                                                        <th scope="col">Fecha</th>
                                                        <th scope="col">Psicólogo</th>
                                                        <th scope="col">Especialidad</th>
                                                        <th scope="col">Estado</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>23/09/2024</td>
                                                        <td>Carlos, Salazar Huaman</td>
                                                        <td>Psicología Clínica</td>
                                                        <td>Proceso</td>
                                                    </tr>
                                                    <tr>
                                                        <td>20/08/2024</td>
                                                        <td>Juan, Cáceres Condori</td>
                                                        <td>Psicología Infantil</td>
                                                        <td>Completado</td>
                                                    </tr>
                                                    <tr>
                                                        <td>12/02/2023</td>
                                                        <td>Ana, Torres Paredes</td>
                                                        <td>Psicología Familiar</td>
                                                        <td>Completado</td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                    <div className="row m-2">
                                        <div className="col-12 d-flex justify-content-end">
                                            <BotonAccion nombre="Regresar"/>
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