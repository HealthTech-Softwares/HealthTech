import mis from './mis_pacientes.module.css';
import styles from '../principales.module.css';
import { BotonAccion, InputInfoSinLabel, NavBarMental, NombrePantalla, PacienteConFoto } from '../principales';
import { Link } from 'react-router-dom';

export function SelectEstado(){
    return(
        <select className="form-select">
            <option value="1">Estado</option>
            <option value="2">En proceso</option>
            <option value="3">Solo cita</option>
            <option value="4">Completado</option>
        </select>
    )
}

export function MisPacientes(){
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>

            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Mis pacientes"/>
                            <form>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <InputInfoSinLabel/>
                                    </div>
                                    <div className="col-3">
                                        <SelectEstado/>
                                    </div>
                                    <div className="col-1">
                                        <BotonAccion nombre="Buscar"/>
                                    </div>
                                    <div className="col-2">
                                        <Link to="/modificar-datos-psicologo">
                                            <BotonAccion nombre="Editar datos"/>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`row justify-content-center`}>
                        <div className="col-3">
                            <div class={`card ${mis.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PacienteConFoto nombre="Santos Jiggets" identificador="ID: U0304" ultimaCita="23/09/2024"/>
                                            <Link to="/generar-diagnostico">
                                                <BotonAccion nombre="Generar diagnóstico"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div class={`card ${mis.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PacienteConFoto nombre="Olivia Zacarias" identificador="ID: U0215" ultimaCita="17/07/2024"/>
                                            <Link to="/historia-clinica">
                                                <BotonAccion nombre="Ver historia clínica"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div class={`card ${mis.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PacienteConFoto nombre="Charlotte Abonza" identificador="ID: U0321" ultimaCita="20/06/2024"/>
                                            <Link to="/historia-clinica">
                                                <BotonAccion nombre="Ver historia clínica"/>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-3">
                            <div class={`card ${mis.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PacienteConFoto nombre="Daniel Shivley" identificador="ID: U0123" ultimaCita="14/02/2024"/>
                                            <Link to="/historia-clinica">
                                                <BotonAccion nombre="Ver historia clínica"/>
                                            </Link>
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