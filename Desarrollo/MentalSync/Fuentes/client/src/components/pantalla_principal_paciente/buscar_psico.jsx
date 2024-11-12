import { BotonAccion, NavBarMental, NombrePantalla, SelectInfo, InfoPsicologo, InputInfoSinLabel } from '../principales'
import styles from '../principales.module.css'
import { Link } from 'react-router-dom'

export function BuscarPsico(){
    return (
        <body className={`${styles.fondo}`}>
            <NavBarMental/>
            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Buscar psicólogo"/>
                            <form>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <InputInfoSinLabel/>
                                    </div>
                                    <div className="col-3">
                                        <SelectInfo valor1="Especialidad" valor2="Psicología clínica" valor3="Psicología infantil" valor4="Psicología de pareja"/>
                                    </div>
                                    <div className="col-1 text-center">
                                        <BotonAccion nombre="Buscar"/>
                                    </div>
                                    <div className="col-1">
                                        <Link to="/mis-citas">
                                            <button type="submit" className="btn btn-dark">Mis citas</button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`row justify-content-center`}>
                        <div className="col-12">
                            <InfoPsicologo nombre="Ruperta Matinez Obergon" especialidad="Psicología clínica" descripcion="Soy un psicólogo especializado en terapia de pareja, dedicado a ayudar a las personas a mejorar la comunicación, resolver conflictos y fortalecer su relación. Mi enfoque se centra en crear un espacio seguro y de confianza donde ambas partes puedan expresar sus emociones y preocupaciones, y trabajar juntos para encontrar soluciones que promuevan el bienestar emocional y la armonía en la relación."/>

                            <InfoPsicologo nombre="Juanito Perez Gutierrez" especialidad="Psicología infantil" descripcion="Soy un psicólogo especializado en terapia de pareja, dedicado a ayudar a las personas a mejorar la comunicación, resolver conflictos y fortalecer su relación. Mi enfoque se centra en crear un espacio seguro y de confianza donde ambas partes puedan expresar sus emociones y preocupaciones, y trabajar juntos para encontrar soluciones que promuevan el bienestar emocional y la armonía en la relación."/>

                            <InfoPsicologo nombre="Betzabeth Coronación Musayón" especialidad="Psicología de pareja" descripcion="Soy un psicólogo especializado en terapia de pareja, dedicado a ayudar a las personas a mejorar la comunicación, resolver conflictos y fortalecer su relación. Mi enfoque se centra en crear un espacio seguro y de confianza donde ambas partes puedan expresar sus emociones y preocupaciones, y trabajar juntos para encontrar soluciones que promuevan el bienestar emocional y la armonía en la relación."/>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}