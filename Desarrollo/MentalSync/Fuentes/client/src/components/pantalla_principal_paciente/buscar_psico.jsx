import Info from 'three/examples/jsm/renderers/common/Info.js'
import logoMental from '../../assets/logo_mentalsync.png'
import logoUsuario from '../../assets/user.png'
import { BotonBuscar, InputInfo, NavBarMental, NombrePantalla, SelectInfo } from '../principales'
import { InfoPsicologo } from '../principales'
import styles from '../principales.module.css'

export function BuscarPsico(){
    return (
        <body className={`${styles.fondo}`}>
            <NavBarMental/>
            <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Buscar Psicólogo"/>
                            <form>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <InputInfo/>
                                    </div>
                                    <div className="col-3">
                                        <SelectInfo/>
                                    </div>
                                    <div className="col-2">
                                        <BotonBuscar/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`row justify-content-center`}>
                        <div className="col-12">
                            <InfoPsicologo/>
                            <InfoPsicologo/>
                            <InfoPsicologo/>
                        </div>
                    </div>
                </div>
            </section>
        </body>
    )
}