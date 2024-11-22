import mis from "../../psicologo/mis_pacientes/mis_pacientes.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  InputInfoSinLabel,
  NavBarAdmin,
  NombrePantalla,
  PsicologoConFoto,
  SelectInfo,
} from "../../principales";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { psicologosRequest } from "../../../api/test.buscar.psico";
import { especialidesRequest } from "../../../api/especialidades";

export function BotonesOpciones(props) {
  return (
    <div className="row">
      <div className="col-12">
        <Link to={`/modificar-datos-psicologo/${props.id}`}>
          <button className="btn btn-primary text-center mx-2">
            Ver datos
          </button>
          {/* Arreglar para solo que vea el administrador a los psicólogos */}
        </Link>
        <Link to="/lista-psicologos">
          <button className="btn btn-primary text-center mx-2">Eliminar</button>
        </Link>
      </div>
    </div>
  );
}

export function ListaPsicologos() {
  const [especialidades, setEspecialidades] = useState([]);
  const [psicologos, setPsicologos] = useState([]);
  const [loading, setLoading] = useState(true);

  // Filtro de datos
  const [filtroNombre, setFiltroNombre] = useState("");
  const [filtroEspecialidad, setFiltroEspecialidad] = useState("");

  const handleFiltroNombreChange = (e) => {
    setFiltroNombre(e.target.value);
  }

  const handleFiltroEspecialidadChange = (e) => {
    setFiltroEspecialidad(e.target.value);
  }

  useEffect(() => {
    const obtenerDatos = async () => {
      try {
        setLoading(true);
        const [especialidadesResponse, psicologosResponse] = await Promise.all([especialidesRequest(), psicologosRequest()]);
        setEspecialidades(especialidadesResponse.data);
        setPsicologos(psicologosResponse.data);
      } catch (error) {
        console.error("Error al cargar los datos: ", error);
      } finally {
        setLoading(false);
      }
    }
    obtenerDatos();
  }, []);

  // Filtracion de datos
  const datosFiltrados = psicologos.filter((psico) => {
    const coincideNombre = psico.nombre.toLowerCase().includes(filtroNombre.toLowerCase());
    const coincideEspecialidad = filtroEspecialidad === "" || psico.especialidades.some((esp) => esp.nombre === filtroEspecialidad);
    return coincideNombre && coincideEspecialidad;
  });

  // Paginacion
  const [page, setPage] = useState(1);
  const itemsPerPage = 9;
  // Calculos de la paginacion
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
      <NavBarAdmin />
      {loading ? (<div>Cargando ...</div>) : (
        <>
          {console.log(especialidades)}
          <section>
            <div className="container-fluid">
              <div className="row ms-4">
                <div className="col-12">
                  <NombrePantalla nombre="Lista de psicólogos" />
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
                      {/* Filtor por especialidad */}
                      <div className="col-3">
                        <SelectInfo
                          descripcion="Todas las especialidades"
                          options={especialidades}
                          filtro={filtroEspecialidad}
                          handleFiltroChange={handleFiltroEspecialidadChange}
                        />
                      </div>
                      <div className="col-1 text-center">
                        <BotonAccion nombre="Buscar" />
                      </div>
                      <div className="col-2 text-center">
                        <Link to="/agregar-psicologo">
                          <button type="submit" className="btn btn-light">
                            Agregar psicólogo
                          </button>
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
              <div className={`row justify-content-center`}>
                {currentData.map((psico) => (
                  <div className="col-4" key={psico.idpsicologo}>
                    <div className={`card ${mis.myCard} mb-3`}>
                      <div className="card-body">
                        <div className="row align-items-center">
                          <div className="col-12 text-center">
                            <PsicologoConFoto
                              foto={psico.foto}
                              nombre={psico.nombre + " " + psico.apellidop}
                              identificador={psico.dni}
                            />
                            <BotonesOpciones id={psico.idpsicologo} />
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
          </section>
        </>
      )}
    </div>
  );
}
