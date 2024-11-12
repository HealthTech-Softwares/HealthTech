import mis from '../mis_pacientes/mis_pacientes.module.css';
import styles from '../principales.module.css';
import { BotonAccion, NavBarMental, NombrePantalla, PsicologoConFoto, SelectInfo } from '../principales';
import { Link } from 'react-router-dom';

export function BotonesOpciones(){
    return(
        <div className="row">
            <div className="col-12">
                <Link to="/modificar-datos-psicologo">
                    <button className='btn btn-primary text-center mx-2'>Ver datos</button>
                    {/* Arreglar para solo que vea el administrador a los psicólogos */}
                </Link>
                <Link to="/lista-psicologos">
                    <button className='btn btn-primary text-center mx-2'>Eliminar</button>
                </Link>
            </div>
        </div>
    )
}

export function ListaPsicologos(){
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>

            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Lista de psicólogos"/>
                            <form>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <input type="text" className="form-control" placeholder="Código/Nombre"/>
                                    </div>
                                    <div className="col-3">
                                        <SelectInfo valor1="Especialidad" valor2="Psicología clínica" valor3="Psicología infantil" valor4="Psicología de pareja"/>
                                    </div>
                                    <div className="col-1 text-center">
                                        <BotonAccion nombre="Buscar"/>
                                    </div>
                                    <div className="col-2 text-center">
                                        <Link to="/agregar-psicologo">
                                            <button type="submit" className="btn btn-light">Agregar psicólogo</button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`row justify-content-center`}>
                        <div className="col-4">
                            <div class={`card ${mis.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PsicologoConFoto nombre="Richard Trejo" identificador="ID: P0005" especialidad="Psicología clínica"/>
                                            <BotonesOpciones/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class={`card ${mis.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PsicologoConFoto nombre="Darni Cotrina" identificador="ID: P0013" especialidad="Terapia Familiar"/>
                                            <BotonesOpciones/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4">
                            <div class={`card ${mis.myCard} mb-3`}>
                                <div class="card-body">
                                    <div className="row align-items-center">
                                        <div className="col-12 text-center">
                                            <PsicologoConFoto nombre="Ana Coelho" identificador="ID: P0021" especialidad="Ansiedad"/>
                                            <BotonesOpciones/>
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