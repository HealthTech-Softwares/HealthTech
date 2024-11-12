import modi from '../modificar_datos_paciente/modificar_datos_paciente.module.css';
import styles from '../principales.module.css';
import { BotonAccion, NavBarMental, NombrePantalla, PacienteConFoto } from '../principales';
import { Link } from 'react-router-dom';

export function LabelModifDatosSoloLectura(props){
    return(
        <div>
            <label for="exampleInputEmail1" class="form-label">{props.propiedad}</label>
            <input type="text" className={`form-control w-80 mb-4`} placeholder={`${props.ejemplo}`} readOnly />
        </div>
    )
}

export function LabelModifDatosEditar(props){
    return(
        <div>
            <label for="exampleInputEmail1" class="form-label">{props.propiedad}</label>
            <input type="text" className={`form-control w-80 mb-4`} placeholder={`${props.ejemplo}`} />
        </div>
    )
}

export function ModificarDatosPaciente() {
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>

            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Modificar datos de paciente"/>
                        </div>
                    </div>
                    <div className="row justify-content-center ">
                        <div className="col-3">
                            <div class={`card ${modi.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PacienteConFoto nombre="Santos Jiggets" identificador="12345678" ultimaCita="23/09/2024"/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-9">
                            <form>
                                <div className="row m-2">
                                    <div className="col-5">
                                        <LabelModifDatosSoloLectura propiedad="Nombres" ejemplo="Santos Carlos"/>
                                        <LabelModifDatosSoloLectura propiedad="Fecha de nacimiento" ejemplo="1/04/1989"/>
                                        <LabelModifDatosEditar propiedad="Dirección" ejemplo="Av Mi Casa 209"/>
                                    </div>
                                    <div className="col-5">
                                        <LabelModifDatosSoloLectura propiedad="Apellidos" ejemplo="Jigget Rojas"/>
                                        <LabelModifDatosSoloLectura propiedad="DNI" ejemplo="12345678"/>
                                        <LabelModifDatosEditar propiedad="Correo electrónico" ejemplo="@example.com"/>
                                    </div>
                                </div>
                                <div className="row m-2">
                                    <div className="col-10 d-flex justify-content-end">
                                        <Link to="/principal">
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