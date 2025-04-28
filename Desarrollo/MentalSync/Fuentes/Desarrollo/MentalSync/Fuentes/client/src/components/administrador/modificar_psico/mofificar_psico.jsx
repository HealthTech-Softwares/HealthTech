import { useParams } from "react-router-dom";
import { psicologoRequest } from "../../../api/psicologos";
import { useFetchData } from "../../../hooks/useFetchData";
import {
  NavBarMental,
  NombrePantalla,
  PsicologoConFoto,
} from "../../principales";
import { LabelModifDatosSoloLectura } from "../../paciente/modificar_datos_paciente/modificar_datos_paciente";

export function ModificarPsicoAdmin() {
  // Obtener idpsicologo
  const { idpsicologo } = useParams();
  // Peticion de datos
  const {
    data: [psicologo],
    loading,
    error,
    mensaje,
  } = useFetchData([() => psicologoRequest(idpsicologo)]);

  return (
    <div
      style={{
        backgroundColor: "rgb(228, 228, 227)",
        minHeight: "100vh",
        minWidth: "100vw",
      }}
    >
      <NavBarMental />
      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <NombrePantalla nombre="Datos del Psicologo" />
            </div>
            {loading ? (
              <b>Cargando ...</b>
            ) : error ? (
              <b>{mensaje}</b>
            ) : (
              <div className="row justify-content-center">
                <div className="col-3">
                  <div
                    className="card mb-3"
                    style={{
                      backgroundColor: "#e6e8fe",
                      width: "70%",
                      margin: "auto",
                    }}
                  >
                    <div className="card-body">
                      <div className="row-align-items-center">
                        <div className="col-12 text-center">
                          <PsicologoConFoto
                            foto={psicologo.foto}
                            nombre={`${psicologo.nombre} ${psicologo.apellidop}`}
                            identificador={psicologo.dni}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-9">
                  <div className="row m-2">
                    <div className="col-5">
                      <LabelModifDatosSoloLectura
                        propiedad="Nombre"
                        ejemplo={psicologo.nombre}
                      />
                    </div>
                    <div className="col-5">
                      <LabelModifDatosSoloLectura
                        propiedad="Apellidos"
                        ejemplo={
                          psicologo.apellidop + " " + psicologo.apellidom
                        }
                      />
                    </div>
                  </div>
                  <ul className="list-group col-10">
                    <li className="list-group-item">
                      <input
                        className="form-check-input me-3"
                        type="checkbox"
                        id="secondCheckbox"
                        checked={psicologo.consulta_online}
                        disabled
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
                        checked={psicologo.disponibilidad}
                        disabled
                      />
                      <label
                        className="form-check-label"
                        htmlFor="firstCheckbox"
                      >
                        Disponibilidad
                      </label>
                    </li>
                  </ul>
                  <div className="row m-2">
                    <div className="col-10">
                      <label htmlFor="descripcion" className="form-label">
                        Descripción
                      </label>
                      <textarea
                        className="form-control"
                        id="descripcion"
                        rows="4"
                        placeholder={psicologo.descripcion}
                        disabled
                      ></textarea>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
