import styles from "../../principales.module.css";
import { NavBarMental, NombrePantalla } from "../../principales";
import { Link } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import Loading from "../../../pages/Loading";
import { useFetchData } from "../../../hooks/useFetchData";
import {
  notificacionesPacienteRequest,
  notificacionesPsicologoRequest,
} from "../../../api/auth";

export function PopNotif(props) {
  return (
    <div className="row">
      <div className="col-12">
        <div className={`card m-3 ${styles.myCard}`}>
          <div className="card-body">
            <h4>{props.nombre}</h4>
            <h6>{props.descripcion}</h6>
            <h6>{props.fecha}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Notificaciones() {
  // Verificar autenticacion
  const { user, isAuthenticated, loading, logout } = useAuth();

  // Define qué request usar dependiendo del rol del usuario
  const request =
    user?.rol === "Psicologo"
      ? notificacionesPsicologoRequest
      : notificacionesPacienteRequest;

  // Usa la hook con el request correspondiente
  const {
    data: [notificaciones],
    loading: ld,
    error,
    mensaje,
  } = useFetchData([request]);

  // Si está cargando la autenticación, muestra el componente de carga
  if (loading) return <Loading />;

  // Si el usuario no está autenticado, redirige o muestra un mensaje
  if (!isAuthenticated) {
    return <p>No tienes acceso. Por favor, inicia sesión.</p>;
  }

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      <section>
        <div className="container-fluid">
          <div className="row ms-4 me-4">
            <div className="col-12 d-flex justify-content-between">
              <NombrePantalla nombre="Notificaciones" />
              <div className="d-flex align-items-center justify-content-end">
              </div>
            </div>
          </div>
          {ld ? (
            <b>Cargando ...</b>
          ) : error ? (
            <b>{mensaje}</b>
          ) : (
            <>
              <div className="row ms-4 me-4">
                <div className="col-12">
                  {notificaciones.length === 0 ? (
                    <b>No hay notificaciones para mostrar</b>
                  ) : (
                    notificaciones.map((notificacion) => (
                      <PopNotif
                        key={notificacion.idnotificacion}
                        nombre={notificacion.titulo}
                        descripcion={notificacion.mensaje}
                        fecha={notificacion.fecha_creacion}
                      />
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
  return;
}
