import mis from "./mis_pacientes.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  InputInfoSinLabel,
  NavBarMental,
  NombrePantalla,
  PacienteConFoto,
} from "../../principales";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useFetchData } from "../../../hooks/useFetchData";
import { usePagination } from "../../../hooks/usePagination";
import { pacientesPsicologoRequest } from "../../../api/citas";

export function MisPacientes() {
  // Peticion de datos
  const {
    data: [pacientes],
    loading,
    error,
    mensaje,
  } = useFetchData([pacientesPsicologoRequest]);

  // Filtros
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEstado, setFiltroEstado] = useState("");

  const handleFiltroNombreChange = (e) => {
    setPage(1);
    setFiltroNombre(e.target.value);
  };

  const handleFiltroEstadoChange = (e) => {
    setPage(1);
    setFiltroEstado(e.target.value);
  };

  // Filtrar pacientes
  const datosFiltrados = (pacientes || []).filter((pac) => {
    const coincideNombre = pac.nombre
      .toLowerCase()
      .includes(filtroNombre.toLowerCase());
    const coincideEstado =
      filtroEstado === "" ||
      pac.estado.includes(filtroEstado);
    return coincideNombre && coincideEstado;
  });

  // Paginacion
  const itemsPerPage = 1;
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
        <div>Cargando ...</div>
      ) : error ? (
        <h1>{mensaje}</h1>
      ) : (
        <section>
          <div className="container-fluid">
            <div className="row ms-4">
              <div className="col-12">
                <NombrePantalla nombre="Mis pacientes" />
                <form>
                  <div className="row mb-4">
                    <div className="col-3">
                      <InputInfoSinLabel onChange={handleFiltroNombreChange} />
                    </div>
                    <div className="col-3">
                        <select
                          className="form-select"
                          value={filtroEstado}
                          onChange={handleFiltroEstadoChange}
                        >
                          <option value="">Estado</option>
                          <option value="Pendiente">Pendiente</option>
                          <option value="Ausente">Ausente</option>
                          <option value="Realizado">Realizado</option>
                        </select>
                    </div>
                    <div className="col-1">
                      <BotonAccion nombre="Buscar" />
                    </div>
                  </div>
                </form>
              </div>
            </div>
            <div className={`row justify-content-center`}>
              <div className="col-12 d-flex justify-content-center">
                {currentData.map((paciente) => (
                    <div className="col-3" key={paciente.idpaciente}>
                      <div className={`card ${mis.myCard} mb-3`}>
                        <div className="card-body">
                          <div className="row align-items-center">
                            <div className="col-12 text-center">
                              <PacienteConFoto
                                foto={paciente.foto}
                                nombre={
                                  paciente.nombre + " " + paciente.apellidop
                                }
                                dni={paciente.dni}
                                labelFecha={
                                  paciente.estado === "Pendiente"
                                    ? "Proxima cita"
                                    : "Última cita"
                                }
                                fecha={paciente.fecha}
                              />
                              <Link
                                to={
                                  paciente.estado === "Pendiente"
                                    ? `/generar-diagnostico/${paciente.idcita}`
                                    : `/historia-clinica/${paciente.idpaciente}`
                                }
                              >
                                <BotonAccion
                                  nombre={
                                    paciente.estado === "Pendiente"
                                      ? "Generar diagnóstico"
                                      : "Ver historia clínica"
                                  }
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
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
      )}
    </div>
  );
}
