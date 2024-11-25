import styles from "../../principales.module.css";
import {
  BotonAccion,
  InputInfoConLabel,
  NavBarMental,
  NombrePantalla,
} from "../../principales";
import { Link, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { psicologoRequest } from "../../../api/psicologos";
import { useState } from "react";

export function ReservaCita() {
  const { idpsicologo } = useParams();
  // Peticion de datos
  const {
    data: [psicologo],
    loading,
    error,
    mensaje,
  } = useFetchData([() => psicologoRequest(idpsicologo)]);

  // Estado para días y horarios
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [horarioSeleccionado, setHorarioSeleccionado] = useState("");

  // Generar opciones de días y horarios dinámicamente
  const diasDisponibles =
    psicologo?.horarios.map((horario) => horario.dia) || [];
  const horariosPorDia =
    psicologo?.horarios.reduce((acc, horario) => {
      acc[horario.dia] = horario.turnos.map(
        (turno) =>
          `${formatearHora(turno.hora_inicio)} - ${formatearHora(
            turno.hora_fin
          )}`
      );
      return acc;
    }, {}) || {};

  // Manejadores de cambios
  const handleDiaChange = (e) => {
    setDiaSeleccionado(e.target.value);
    setHorarioSeleccionado(""); // Resetear el horario seleccionado
  };

  const handleHorarioChange = (e) => {
    setHorarioSeleccionado(e.target.value);
  };

  // Formatear hora a formato legible
  function formatearHora(hora) {
    const [h, m] = hora.split(":");
    const amPm = h >= 12 ? "PM" : "AM";
    const hora12 = h % 12 || 12;
    return `${hora12}:${m} ${amPm}`;
  }

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      {loading ? (
        <div>Cargando ...</div>
      ) : error ? (
        <h1>{mensaje}</h1>
      ) : (
        <section>
          <div className="container-fluid">
            <div className="row ms-4">
              <div className="col-12">
                <NombrePantalla nombre="Reservar cita" />
                <form>
                  <div className="row mb-3 d-flex justify-content-center">
                    <InputInfoConLabel
                      propiedad="Nombre"
                      ejemplo={psicologo.nombre}
                    />
                    <InputInfoConLabel
                      propiedad="Apellidos"
                      ejemplo={psicologo.apellidop + " " + psicologo.apellidom}
                    />
                  </div>
                  <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-5 ms-5">
                      <label htmlFor="dia" className="form-label">
                        Día de atención
                      </label>
                      <select
                        className="form-select w-75"
                        id="dia"
                        value={diaSeleccionado}
                        onChange={handleDiaChange}
                      >
                        <option value="">Selecciona un día</option>
                        {diasDisponibles.map((dia) => (
                          <option key={dia} value={dia}>
                            {dia}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-5 ms-5">
                      <label htmlFor="horario" className="form-label">
                        Horario disponible
                      </label>
                      <select
                        className="form-select w-75"
                        id="horario"
                        value={horarioSeleccionado}
                        onChange={handleHorarioChange}
                        disabled={!diaSeleccionado} // Desactivar si no hay día seleccionado
                      >
                        <option value="">Selecciona un horario</option>
                        {diaSeleccionado &&
                          horariosPorDia[diaSeleccionado]?.map((horario) => (
                            <option key={horario} value={horario}>
                              {horario}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-8">
                      <label htmlFor="descripcion" className="form-label">
                        Motivo
                      </label>
                      <textarea
                        className="form-control"
                        id="descripcion"
                        rows="4"
                      ></textarea>
                      <ul className="list-group col-5 mt-4 w-25">
                        <li className="list-group-item">
                          <input
                            className="form-check-input me-3"
                            type="checkbox"
                            id="secondCheckbox"
                          />
                          <label
                            className="form-check-label"
                            htmlFor="secondCheckbox"
                          >
                            Consulta Online
                          </label>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="row mb-4">
                    <div className="col-10 d-flex justify-content-end">
                      <Link to="/metodo-pago">
                        <BotonAccion nombre="Completar cita" />
                      </Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
