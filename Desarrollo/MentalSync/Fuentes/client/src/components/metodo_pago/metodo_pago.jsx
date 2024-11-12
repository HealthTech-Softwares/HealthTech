import met from './metodo_pago.module.css';
import styles from '../principales.module.css';
import MetPago from '../../assets/metodo_pago.png';
import { BotonAccion, NavBarMental, NombrePantalla } from '../principales';
import { Link } from 'react-router-dom';

export function LabelMbTres(props){
    return(
        <div>
            <label for="exampleInputEmail1" class="form-label">{props.propiedad}</label>
            <input type="text" className={`form-control mb-3`} placeholder={`${props.ejemplo}`}/>
        </div>
    )
}

export function CardPago(){
    return(
        <div class={`card ${met.myCard}`}>
            <div class="card-body">
                <form>
                    <div className="row m-2">
                        <div className="col-12">
                            <LabelMbTres propiedad="Nombre del titular" ejemplo="Juan Perez"/>
                            <LabelMbTres propiedad="Número de tarjeta" ejemplo="@example.com"/>
                            <LabelMbTres propiedad="Fecha de vencimiento (MM/YYYY)" ejemplo="1111 - 1111 - 1111 - 1111"/>
                            <LabelMbTres propiedad="Código de seguridad (CVV)" ejemplo="111"/>
                        </div>
                    </div>
                    <div className="row m-2">
                        <div className="col-12 d-flex justify-content-end">
                            <Link to="/cita-reservada">
                                <BotonAccion nombre="Realizar pago"/>
                            </Link>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export function MetodoPago(){
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>
            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Método de pago"/>
                            <div className="row mb-5">
                                <div className="col-5 ms-5 d-flex justify-content-center align-items-center">
                                    <img src={MetPago} alt="MétodoPago" className={`${met.imagenPago}`} />
                                </div>
                                <div className="col-5 ms-5">
                                    <CardPago/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}