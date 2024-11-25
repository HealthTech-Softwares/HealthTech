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
import { useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";
import { usePagination } from "../../../hooks/usePagination";

export function BuscarPsico() {
  // Peticion de datos
  const {
    data: [especialidades, psicologos],
    loading,
  } = useFetchData([especialidesRequest, psicologosRequest]);

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");
  const [filtroConsultaOnline, setFiltroConsultaOnline] = useState(false);

  const handleFiltroNombreChange = (e) => {
    setPage(1);
    setFiltroNombre(e.target.value);
  };

  const handleFiltroEspecialidadChange = (e) => {
    setPage(1);
    setFiltroEspecialidad(e.target.value);
  };

  const handleFiltroConsultaOnlineChange = (e) => {
    setPage(1);
    setFiltroConsultaOnline(e.target.checked);
  };

  // Filtrar psicologos
  const datosFiltrados = (psicologos || []).filter((psico) => {
    const coincideNombre = psico.nombre
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());
    const coincideEspecialidad =
      filtroEspecialidad === "" ||
      psico.especialidades.some((esp) => esp.nombre === filtroEspecialidad);
    const coincideConsultaOnline =
      !filtroConsultaOnline || psico.consulta_online === filtroConsultaOnline;
    return coincideNombre && coincideEspecialidad && coincideConsultaOnline;
  });

  // Paginacion
  const itemsPerPage = 10;
  const {
    currentData,
    page,
    setPage,
    endIndex,
    handleNextPage,
    handlePreviousPage,
  } = usePagination(datosFiltrados, itemsPerPage);

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
                        <label className="form-check-label ms-2" htmlFor="online">
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
