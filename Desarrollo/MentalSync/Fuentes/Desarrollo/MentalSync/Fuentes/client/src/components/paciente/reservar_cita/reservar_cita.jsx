import styles from "../../principales.module.css";
import {
  BotonAccion,
  InputInfoConLabel,
  NavBarMental,
  NombrePantalla,
} from "../../principales";
import { useNavigate, useParams } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { psicologoRequest } from "../../../api/psicologos";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { createCitaRequest } from "../../../api/citas";

export function ReservaCita() {
  const { idpsicologo } = useParams();
  // Peticion de datos
  const {
    data: [psicologo],
    loading,
    error,
    mensaje,
  } = useFetchData([() => psicologoRequest(idpsicologo)]);

  // Configurar useForm
  const { register, handleSubmit } = useForm();

  // Redireccion
  const navigate = useNavigate();

  // Envio del form con idpsicologo
  const onSubmit = async (data) => {
    try {
      const datosCompletos = {
        ...data, // Datos del formulario
        idpsicologo, // Agregar el idpsicologo desde useParams
      };
      console.log(datosCompletos);
      await createCitaRequest(datosCompletos);
      alert("Cita creada satisfactoriamente :)");
      navigate("/principal");
    } catch (error) {
      console.error("Error al actualizar cita: ", error);
      alert(error.response.data.message);
    }
  };

  // Estado para días y horarios
  const [diaSeleccionado, setDiaSeleccionado] = useState("");

  // Generar opciones de días y horarios dinámicamente
  const diasDisponibles =
    psicologo?.horarios.map((horario) => horario.dia) || [];

  const horariosPorDia =
    psicologo?.horarios.reduce((acc, horario) => {
      acc[horario.dia] = horario.turnos.map((turno) => ({
        idhorario: turno.idhorario,
        rango: `${formatearHora(turno.hora_inicio)} - ${formatearHora(
          turno.hora_fin
        )}`,
      }));
      return acc;
    }, {}) || {};

  // Manejadores de cambios
  const handleDiaChange = (e) => {
    setDiaSeleccionado(e.target.value);
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
        <b>Cargando ...</b>
      ) : error ? (
        <b>{mensaje}</b>
      ) : (
        <section>
          <div className="container-fluid">
            <div className="row ms-4">
              <div className="col-12">
                <NombrePantalla nombre="Reservar cita" />
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-5">
                      <label htmlFor="dia" className="form-label">
                        Día de atención
                      </label>
                      <select
                        className="form-select"
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
                    <div className="col-5">
                      <label htmlFor="horario" className="form-label">
                        Horario disponible
                      </label>
                      <select
                        className="form-select"
                        id="horario"
                        disabled={!diaSeleccionado}
                        {...register("idhorario", { required: true })}
                      >
                        <option value="">Selecciona un horario</option>
                        {diaSeleccionado &&
                          horariosPorDia[diaSeleccionado]?.map((horario) => (
                            <option
                              key={horario.idhorario}
                              value={horario.idhorario}
                            >
                              {horario.rango}
                            </option>
                          ))}
                      </select>
                    </div>
                  </div>
                  <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-10">
                      <label htmlFor="descripcion" className="form-label">
                        Motivo
                      </label>
                      <textarea
                        className="form-control"
                        id="descripcion"
                        rows="4"
                        maxLength="255"
                        placeholder="Ingrese el motivo de la cita"
                        {...register("motivo", { required: true })}
                      ></textarea>
                    </div>
                  </div>
                  <div className="row mb-3 d-flex justify-content-center">
                    <div className="col-10">
                      <div className="form-check">
                        <input
                          className="form-check-input"
                          type="checkbox"
                          id="secondCheckbox"
                          {...register("online")}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="secondCheckbox"
                        >
                          Consulta Online
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="row mb-4">
                    <div className="col-10 d-flex justify-content-end">
                      <BotonAccion nombre="Completar cita" />
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
