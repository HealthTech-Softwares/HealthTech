import styles from '../principales.module.css'
import { BotonAccion, InputInfoConLabel, NavBarMental, NombrePantalla, SelectInfoConLabel } from '../principales'

export function AgregarPsicologo(){
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>

            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Agregar psicólogo"/>
                        </div>
                    </div>
                    <div className="row ms-4 me-4">
                        <div className="col-12">
                            <div class={`card ${styles.myCardAgregar} mb-3`}>
                                <div class="card-body">
                                    <div className="row">
                                        <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                                            <label for="formFileLg" class="form-label">Seleccione foto de perfil</label>
                                            <input class="form-control form-control-lg" id="formFileLg" type="file" accept="image/*" />
                                            </div>
                                        <div className="col-8">
                                            <form>
                                                <div className="row mb-3 d-flex justify-content-center">
                                                    <InputInfoConLabel propiedad="Nombre" ejemplo="Nombres"/>
                                                    <InputInfoConLabel propiedad="Apellidos" ejemplo="Apellidos"/>
                                                </div>
                                                <div className="row mb-3 d-flex justify-content-center">
                                                    <InputInfoConLabel propiedad="Fecha de nacimiento" ejemplo="DD/MM/YYYY"/>
                                                    <InputInfoConLabel propiedad="Identificador" ejemplo="P0000"/>
                                                </div>
                                                <div className="row mb-3 d-flex justify-content-center">
                                                    <SelectInfoConLabel propiedad="Especialidad" valor1="Especialidad" valor2="Psicología infantil" valor3="Psicología clínica" valor4="Psicología familiar" valor5="Psicología de pareja"/>
                                                    
                                                    <InputInfoConLabel propiedad="Disponibilidad" ejemplo="Lunes, Miércoles,Viernes"/>
                                                </div>
                                                <div className="row mb-3 d-flex justify-content-center">
                                                    <SelectInfoConLabel propiedad="Seleccionar horario" valor1="8:00 AM - 10:00 AM" valor2="10:00 AM - 12:00 PM" valor3="12:00 PM - 14:00 PM" valor4="14:00 PM - 16:00 PM" valor5="16:00 PM - 18:00 PM"/>
                                                </div>
                                                <div className="row mb-4">
                                                    <div className="col-10 d-flex justify-content-end">
                                                        <BotonAccion nombre="Crear psicólogo"/>
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