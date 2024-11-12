import styles from '../principales.module.css'
import { BotonAccion, InputInfoConLabel, NavBarMental, NombrePantalla, SelectInfoConLabel } from '../principales'
import { Link } from 'react-router-dom'

export function ReservaCita(){
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>

            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Reservar cita"/>
                            <form>
                                <div className="row mb-5 d-flex justify-content-center">
                                    <InputInfoConLabel propiedad="Nombre" ejemplo="Juan Perez"/>
                                    <InputInfoConLabel propiedad="Correo electrónico" ejemplo="@example.com"/>
                                </div>
                                <div className="row mb-5 d-flex justify-content-center">
                                    <InputInfoConLabel propiedad="Teléfono" ejemplo="+51 --- --- ---"/>
                                    <SelectInfoConLabel propiedad="Seleccionar horario" valor1="8:00 AM - 10:00 AM" valor2="10:00 AM - 12:00 PM" valor3="12:00 PM - 14:00 PM" valor4="14:00 PM - 16:00 PM" valor5="16:00 PM - 18:00 PM"/>
                                </div>
                                <div className="row mb-4">
                                    <div className="col-10 d-flex justify-content-end">
                                        <Link to="/metodo-pago">
                                            <BotonAccion nombre="Completar cita"/>
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