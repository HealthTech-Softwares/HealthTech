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
  LabelModifDatosEditar,
} from "../../paciente/modificar_datos_paciente/modificar_datos_paciente";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { perfilPsicologoRequest } from "../../../api/psicologos";

export function ModificarDatosPsicologo() {
  const [psicologo, setPsicologo] = useState([]);
  const [loading, setLoading] = useState(true);
  const [consultaOnline, setConsultaOnline] = useState(false);
  const [disponibilidad, setDisponibilidad] = useState(false);
  const [descripcion, setDescripcion] = useState(""); // Estado para la descripción

  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        setLoading(true);
        const psicologoResponse = await perfilPsicologoRequest();
        setPsicologo(psicologoResponse.data);
        setConsultaOnline(psicologoResponse.data.consulta_online);
        setDisponibilidad(psicologoResponse.data.disponible);
        setDescripcion(psicologoResponse.data.descripcion || ""); // Cargar la descripción existente
      } catch (error) {
        console.error("Error al cargar el perfil: ", error);
        // setError(true);
      } finally {
        setLoading(false);
      }
    };
    obtenerPerfil();
  }, []);

  // Manejadores de cambios
  const handleConsultaOnlineChange = (e) => {
    setConsultaOnline(e.target.checked);
  };

  const handleDisponibilidadChange = (e) => {
    setDisponibilidad(e.target.checked);
  };

  const handleDescripcionChange = (e) => {
    setDescripcion(e.target.value);
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
              <div className="row justify-content-center ">
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
                        <label htmlFor="horario" className="form-label">
                          Horario de atención
                        </label>
                        <select className="form-select w-80 mb-5" id="horario">
                          <option value="1">8:00 AM - 10:00 AM</option>
                          <option value="2">10:00 AM - 12:00 PM</option>
                          <option value="3">12:00 PM - 14:00 PM</option>
                          <option value="4">14:00 PM - 16:00 PM</option>
                          <option value="5">16:00 PM - 18:00 PM</option>
                        </select>
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
                            <label className="form-check-label" htmlFor="firstCheckbox">
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
                            <label className="form-check-label" htmlFor="firstCheckbox">
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
                      <div className="col-10 d-flex justify-content-end">
                        <Link to="/mis-pacientes">
                          <BotonAccion nombre="Guardar cambios" />
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}