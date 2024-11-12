import modi from './modificar_datos_psicologo.module.css';
import styles from '../principales.module.css';
import { BotonAccion, NavBarMental, NombrePantalla, PsicologoConFoto } from '../principales';
import { LabelModifDatosSoloLectura, LabelModifDatosEditar } from '../modificar_datos_paciente/modificar_datos_paciente';
import { Link } from 'react-router-dom';

export function ModificarDatosPsicologo() {
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental />

            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Modificar datos de psicólogo"/>
                        </div>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="col-3">
                            <div class={`card ${modi.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PsicologoConFoto nombre="Richard Trejo" identificador="ID: P0005" especialidad="Psicología clínica"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <form>
                                <div className="row m-2">
                                    <div className="col-5">
                                        <LabelModifDatosSoloLectura propiedad="Nombres" ejemplo="Richard Alberto"/>
                                        <LabelModifDatosSoloLectura propiedad="Fecha de nacimiento" ejemplo="12/09/1978"/>
                                        <LabelModifDatosEditar propiedad="Especialidad" ejemplo="Psicología clínica"/>
                                        
                                        <label for="exampleInputEmail1" class="form-label">Horario de atención</label>
                                        <select className="form-select w-80 mb-4">
                                            <option value="1">8:00 AM - 10:00 AM</option>
                                            <option value="2">10:00 AM - 12:00 PM</option>
                                            <option value="3">12:00 PM - 14:00 PM</option>
                                            <option value="4">14:00 PM - 16:00 PM</option>
                                            <option value="5">16:00 PM - 18:00 PM</option>
                                        </select>
                                    </div>
                                    <div className="col-5">
                                        <LabelModifDatosSoloLectura propiedad="Apellidos" ejemplo="Trejo Quispe"/>
                                        <LabelModifDatosSoloLectura propiedad="Identificador" ejemplo="P0005"/>
                                        <ul class="list-group">
                                            <li class="list-group-item">
                                                <input class="form-check-input me-3" type="checkbox" value="" id="firstCheckbox"/>
                                                <label class="form-check-label" for="firstCheckbox">Disponibilidad</label>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="row m-2">
                                    <div className="col-10 d-flex justify-content-end">
                                        <Link to="/mis-pacientes">
                                            <BotonAccion nombre="Guardar cambios"/>
                                        </Link>  
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