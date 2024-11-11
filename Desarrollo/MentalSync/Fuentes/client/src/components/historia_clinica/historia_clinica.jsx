import { NavBarMental } from '../principales';
import styles from '../principales.module.css';
import his from './historia_clinica.module.css';

export function HistoriaClinica(){
    return(
        <body className={`${styles.fondo}`}>
            <NavBarMental/>
        </body>
    )
}