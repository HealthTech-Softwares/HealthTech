import modi from "./modificar_datos_psicologo.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  NavBarMental,
  NombrePantalla,
  PsicologoConFoto,
} from "../../principales";
import {
  LabelModifDatosSoloLectura,
} from "../../paciente/modificar_datos_paciente/modificar_datos_paciente";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { perfilPsicologoRequest } from "../../../api/psicologos";

export function ModificarDatosPsicologo() {
  const [psicologo, setPsicologo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consultaOnline, setConsultaOnline] = useState(false);
  const [disponibilidad, setDisponibilidad] = useState(false);
  const [descripcion, setDescripcion] = useState("");
  const [especialidad, setEspecialidad] = useState("");

  // Estados para días y horarios
  const [diaSeleccionado, setDiaSeleccionado] = useState("");
  const [nuevoHorario, setNuevoHorario] = useState("");
  const [horarios, setHorarios] = useState({
    Lunes: ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM"],
    Martes: ["12:00 PM - 14:00 PM", "14:00 PM - 16:00 PM"],
    Miércoles: ["16:00 PM - 18:00 PM", "18:00 PM - 20:00 PM"],
    Jueves: ["8:00 AM - 10:00 AM", "10:00 AM - 12:00 PM"],
    Viernes: ["12:00 PM - 14:00 PM", "14:00 PM - 16:00 PM"],
  });

  // Opciones de días y horarios
  const diasDisponibles = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes"];
  const opcionesHorarios = [
    "8:00 AM - 10:00 AM",
    "10:00 AM - 12:00 PM",
    "12:00 PM - 14:00 PM",
    "14:00 PM - 16:00 PM",
    "16:00 PM - 18:00 PM",
    "18:00 PM - 20:00 PM",
  ];

  // Estados y funciones para especialidades dinámicas
  const [listaEspecialidades, setListaEspecialidades] = useState([
    "Psicología Clínica",
    "Psicología Educativa",
    "Psicología Organizacional",
    "Psicología Infantil",
    "Terapia Familiar",
  ]);
  const [nuevaEspecialidad, setNuevaEspecialidad] = useState("");

  const agregarEspecialidad = () => {
    if (
      nuevaEspecialidad.trim() !== "" &&
      !listaEspecialidades.includes(nuevaEspecialidad)
    ) {
      setListaEspecialidades((prev) => [...prev, nuevaEspecialidad]);
      setNuevaEspecialidad("");
    } else {
      alert("La especialidad ya existe o está vacía.");
    }
  };

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        setLoading(true);
        const psicologoResponse = await perfilPsicologoRequest();
        setPsicologo(psicologoResponse.data);
        setConsultaOnline(psicologoResponse.data.consulta_online);
        setDisponibilidad(psicologoResponse.data.disponible);
        setDescripcion(psicologoResponse.data.descripcion || "");
        setEspecialidad(psicologoResponse.data.especialidad || "");
      } catch (error) {
        console.error("Error al cargar el perfil: ", error);
      } finally {
        setLoading(false);
      }
    };
    obtenerPerfil();
  }, []);

  // Manejadores de cambios
  const handleDiaChange = (e) => {
    setDiaSeleccionado(e.target.value);
  };

  const handleNuevoHorarioChange = (e) => {
    setNuevoHorario(e.target.value);
  };

  const agregarHorario = () => {
    if (diaSeleccionado && nuevoHorario) {
      setHorarios((prevHorarios) => ({
        ...prevHorarios,
        [diaSeleccionado]: [...prevHorarios[diaSeleccionado], nuevoHorario],
      }));
      setNuevoHorario("");
    }
  };

  const handleConsultaOnlineChange = (e) => {
    setConsultaOnline(e.target.checked);
  };

  const handleDisponibilidadChange = (e) => {
    setDisponibilidad(e.target.checked);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
  };

  const handleEspecialidadChange = (e) => {
    setEspecialidad(e.target.value);
  };

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      {loading ? (
        <div>Cargando ...</div>
      ) : (
        <>
          <section>
            <div className="container-fluid">
              <div className="row ms-4">
                <div className="col-12">
                  <NombrePantalla nombre="Modificar datos de psicólogo" />
                </div>
              </div>
              <div className="row justify-content-center">
                <div className="col-3">
                  <div className={`card ${modi.myCard} mb-3`}>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-12 text-center">
                          <PsicologoConFoto
                            foto={psicologo.foto}
                            nombre={psicologo.nombre}
                            identificador={psicologo.dni}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  <form>
                    <div className="row m-2">
                      <div className="col-5">
                        <LabelModifDatosSoloLectura
                          propiedad="Nombres"
                          ejemplo={psicologo.nombre}
                        />
                        <label htmlFor="dia" className="form-label">
                          Día de atención
                        </label>
                        <select
                          className="form-select w-80 mb-3"
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

                        <label htmlFor="horarios" className="form-label">
                          Horarios disponibles
                        </label>
                        <ul>
                          {horarios[diaSeleccionado]?.map((horario, index) => (
                            <li key={index}>{horario}</li>
                          ))}
                        </ul>

                        <label htmlFor="nuevoHorario" className="form-label">
                          Añadir nuevo horario
                        </label>
                        <select
                          className="form-select w-80 mb-3"
                          id="nuevoHorario"
                          value={nuevoHorario}
                          onChange={handleNuevoHorarioChange}
                        >
                          <option value="">Selecciona un horario</option>
                          {opcionesHorarios.map((horario) => (
                            <option key={horario} value={horario}>
                              {horario}
                            </option>
                          ))}
                        </select>
                        <button
                          type="button"
                          className="btn btn-primary"
                          onClick={agregarHorario}
                          disabled={!diaSeleccionado || !nuevoHorario}
                        >
                          Agregar horario
                        </button>
                      </div>
                      <div className="col-5">
                        <LabelModifDatosSoloLectura
                          propiedad="Apellidos"
                          ejemplo={`${psicologo.apellidop} ${psicologo.apellidom}`}
                        />
                        <ul className="list-group">
                          <li className="list-group-item">
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              id="secondCheckbox"
                              checked={consultaOnline}
                              onChange={handleConsultaOnlineChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="secondCheckbox"
                            >
                              Consulta Online
                            </label>
                          </li>
                          <li className="list-group-item">
                            <input
                              className="form-check-input me-3"
                              type="checkbox"
                              id="firstCheckbox"
                              checked={disponibilidad}
                              onChange={handleDisponibilidadChange}
                            />
                            <label
                              className="form-check-label"
                              htmlFor="firstCheckbox"
                            >
                              Disponibilidad
                            </label>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="row m-2">
                      <div className="col-10">
                        <label htmlFor="descripcion" className="form-label">
                          Descripción
                        </label>
                        <textarea
                          className="form-control"
                          id="descripcion"
                          rows="4"
                          value={descripcion}
                          onChange={handleDescripcionChange}
                        ></textarea>
                      </div>
                    </div>
                    <div className="row m-2">
                      <div className="col-5">
                        <label htmlFor="especialidad" className="form-label">
                          Especialidad
                        </label>
                        <select
                          className="form-select"
                          id="especialidad"
                          value={especialidad}
                          onChange={handleEspecialidadChange}
                        >
                          <option value="">Selecciona una especialidad</option>
                          {listaEspecialidades.map((esp, index) => (
                            <option key={index} value={esp}>
                              {esp}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-5">
                        <label htmlFor="nuevaEspecialidad" className="form-label">
                          Añadir nueva especialidad
                        </label>
                        <div className="input-group mb-3">
                          <input
                            type="text"
                            className="form-control"
                            id="nuevaEspecialidad"
                            placeholder="Nueva especialidad"
                            value={nuevaEspecialidad}
                            onChange={(e) => setNuevaEspecialidad(e.target.value)}
                          />
                          <button
                            type="button"
                            className="btn btn-primary"
                            onClick={agregarEspecialidad}
                          >
                            Agregar
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
          <footer className="fixed-bottom">
            <Link to={"/mis-pacientes"}>
              <BotonAccion nombre="Guardar Cambios" />
            </Link>
          </footer>
        </>
      )}
    </div>
  );
}

