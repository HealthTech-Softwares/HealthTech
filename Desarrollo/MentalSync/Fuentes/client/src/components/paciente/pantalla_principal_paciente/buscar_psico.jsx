import {
  NavBarMental,
  NombrePantalla,
  InfoPsicologo,
  InputInfoSinLabel,
} from "../../principales";
import styles from "../../principales.module.css";
import { Link } from "react-router-dom";
import { especialidesRequest } from "../../../api/especialidades";
import { psicologosRequest } from "../../../api/test.buscar.psico";
import React, { useState, useEffect } from "react";

export function BuscarPsico() {
  const [especialidades, setEspecialidades] = useState([]);
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtracion de datos
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const [filtroConsultaOnline, setFiltroConsultaOnline] = useState(false);

  const handleFiltroNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  }

  const handleFiltroEspecialidadChange = (e) => {
    setFiltroEspecialidad(e.target.value);
  }

  const handleFiltroConsultaOnlineChange = (e) => {
    setFiltroConsultaOnline(e.target.checked);
  }

  useEffect(() => {
    let isMounted = true; // Bandera para asegurar que el componente está montado

    const obtenerDatos = async () => {
      try {
        setLoading(true);
        const [especialidadesResponse, psicologosResponse] = await Promise.all([
          especialidesRequest(),
          psicologosRequest(),
        ]);
        if (isMounted) {
          // Solo actualizamos el estado si el componente sigue montado
          setEspecialidades(especialidadesResponse.data);
          setPsicologos(psicologosResponse.data);
        }
      } catch (error) {
        console.error("Error al cargar los datos: ", error);
        // setError(true);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    obtenerDatos();

    return () => {
      isMounted = false; // Limpiar cuando el componente se desmonte
    };
  }, []);

  const datosFiltrados = psicologos.filter((psico) => {
    const coincideNombre = psico.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEspecialidad = filtroEspecialidad === "" || psico.especialidades.some((esp) => esp.nombre === filtroEspecialidad);
    const coincideConsultaOnline = !filtroConsultaOnline || psico.consulta_online === filtroConsultaOnline;
    return coincideNombre && coincideEspecialidad && coincideConsultaOnline;
  });

  // Valores para la paginacion
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

  // Calculo de la paginacion
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = datosFiltrados.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (endIndex < datosFiltrados.length) setPage(page + 1);
  };

  const handlePreviousPage = () => {
    if (startIndex > 0) setPage(page - 1);
  };

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />
      {loading ? (
        <div>Cargando...</div>
      ) : (
        <>
          <section>
            <div className="container-fluid">
              <div className="row ms-4">
                <div className="col-12">
                  <NombrePantalla nombre="Buscar psicólogo" />
                  <form>
                    <div className="row mb-4">
                      {/* Filtro por nombre */}
                      <div className="col-3">
                        <InputInfoSinLabel 
                          value={filtroNombre} 
                          onChange={handleFiltroNombreChange} 
                          placeholder="Buscar por nombre"
                        />
                      </div>

                      {/* Filtro por especialidad */}
                      <div className="col-3">
                        <select 
                          className="form-select" 
                          value={filtroEspecialidad} 
                          onChange={handleFiltroEspecialidadChange}
                        >
                          <option value="">Todas las especialidades</option>
                          {especialidades.map((esp) => (
                            <option key={esp.idespecialidad} value={esp.nombre}>
                              {esp.nombre}
                            </option>
                          ))}
                        </select>
                      </div>

                        {/* Filtro por consulta online */}
                        <div className="col-2 mt-2">
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id="online"
                            checked={filtroConsultaOnline}
                            onChange={handleFiltroConsultaOnlineChange}
                          />
                          <label className="form-check-label" htmlFor="online">
                            Consulta online
                          </label>
                        </div>

                      {/* Enlace a "Mis citas" */}
                      <div className="col-1">
                        <Link to="/mis-citas">
                          <button type="submit" className="btn btn-dark">
                            Mis citas
                          </button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`row justify-content-center`}>
                <div className="col-12">
                  {currentData.map((psico) => (
                    <InfoPsicologo
                      key={psico.idpsicologo}
                      idpsicologo={psico.idpsicologo}
                      dni={psico.dni}
                      nombre={`${psico.nombre} ${psico.apellidop}`}
                      descripcion={psico.descripcion}
                      foto={psico.foto}
                      especialidades={psico.especialidades} // Pasa el array completo de especialidades
                      consulta_online={psico.consulta_online} // Pasa el valor booleano
                    />
                  ))}
                </div>
                <div className="d-flex p-2 justify-content-center gap-2">
                  <button
                    className="btn btn-light"
                    onClick={handlePreviousPage}
                    disabled={page === 1}
                  >
                    Anterior
                  </button>
                  <button
                    className="btn btn-light"
                    onClick={handleNextPage}
                    disabled={endIndex >= datosFiltrados.length}
                  >
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </div>
  );
}
