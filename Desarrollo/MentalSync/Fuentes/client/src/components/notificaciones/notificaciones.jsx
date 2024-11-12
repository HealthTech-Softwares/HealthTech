import styles from '../principales.module.css';
import { NavBarMental, NombrePantalla } from '../principales';
import { Link } from 'react-router-dom';

export function PopNotif(props) {
  return (
    <div className="row">
      <div className="col-12">
        <div className={`card m-3 ${styles.myCard}`}>
          <div className="card-body">
            <h4>{props.nombre}</h4>
            <h5>De: {props.persona}</h5>
            <h6>{props.descripcion}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Notificaciones() {
  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      <section>
        <div className="container-fluid">
          <div className="row ms-4 me-4">
            <div className="col-12 d-flex justify-content-between">
              <NombrePantalla nombre="Notificaciones" />
              <div className="d-flex align-items-center justify-content-end">
                <Link to="/">
                  <button className="btn btn-primary">Cerrar sesión</button>
                </Link>
              </div>
            </div>
          </div>
          <div className="row ms-4 me-4">
            <div className="col-12">
              <PopNotif
                nombre="Recordatorio de renovación"
                persona="Administrador"
                descripcion="Hola, queremos recordarte que debes renovar tu información pronto para seguir disfrutando de nuestros servicios."
              />
              <PopNotif
                nombre="Cancelación de cita"
                persona="Olivia"
                descripcion="Lamentablemente, debo cancelar nuestra cita para mañana. Disculpa por cualquier inconveniente; podemos reagendar si te parece bien."
              />
              <PopNotif
                nombre="Pensamientos intrusivos"
                persona="Santos"
                descripcion="A veces siento que mi mente se llena de pensamientos que no quiero. Sé que no son reales, pero siguen apareciendo sin que los pueda controlar."
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
