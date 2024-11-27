import gen from "./generar_diagnostico.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  NavBarMental,
  NombrePantalla,
  PacienteConFoto,
} from "../../principales";
import { Link, useParams, useNavigate } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import { citaRequest, putCitaRequest } from "../../../api/citas";
import { diagnosticosRequest } from "../../../api/diagnostico";
import { useForm } from "react-hook-form";

export function GenerarDiagnostico() {
  // Obtener el parametro de cita
  const { idcita } = useParams();

  // Redireccion
  const navigate = useNavigate();

  // Peticion de datos
  const {
    data: [cita, diagnosticos],
    loading,
    error,
    mensaje,
  } = useFetchData([() => citaRequest(idcita), diagnosticosRequest]);

  // Configurar useForm
  const { register, handleSubmit } = useForm();

  // Envio del formulario
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await putCitaRequest(idcita, data);
      alert("Cita actualizada correctamente");
      navigate("/mis-pacientes");
    } catch (error) {
      console.error("Error al actualizar cita: ", error);
      alert("Hubo un error al actualizar la cita ...");
    }
  };

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
                <NombrePantalla nombre="Generar diagnóstico" />
              </div>
            </div>

            <div className="row">
              <div className="col-12">
                <div className={`${gen.myInfo}`}>
                  <p>
                    <b>Motivo: </b>
                    {cita.motivo}
                  </p>
                  <p>
                    <b>Fecha y hora: </b>
                    {cita.fecha + " " + cita.hora}
                  </p>
                  <p>
                    <b>Online: </b>
                    {cita.online ? "Si" : "No"}
                  </p>
                </div>
              </div>
            </div>

            <div className="row justify-content-center ">
              <div className="col-12">
                <div className={`card ${gen.myCard} mb-3`}>
                  <div className="card-body">
                    <div className="row align-items-center">
                      <div className="col-3 text-center">
                        <PacienteConFoto
                          foto={cita.foto_paciente}
                          nombre={
                            cita.nombre_paciente + " " + cita.apellidop_paciente
                          }
                          dni={cita.dni_paciente}
                        />
                        <Link to={`/historia-clinica/${cita.idpaciente}`}>
                          <BotonAccion nombre="Ver historia clínica" />
                        </Link>
                      </div>
                      <div className="col-9">
                        <form onSubmit={handleSubmit(onSubmit)}>
                          <div className="row justify-content-center">
                            <div className="col-8">
                              {/* Diagnostico */}
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label text-center d-block"
                              >
                                Diagnóstico
                              </label>
                              <select
                                className="form-select mb-4"
                                {...register("iddiagnostico", {
                                  required: true,
                                })}
                              >
                                <option value="">
                                  Seleccione un diagnóstico
                                </option>
                                {diagnosticos.map((dg) => (
                                  <option
                                    key={dg.iddiagnostico}
                                    value={dg.iddiagnostico}
                                  >
                                    {dg.nombre}
                                  </option>
                                ))}
                              </select>
                              {/* Estado */}
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label text-center d-block"
                              >
                                Estado
                              </label>
                              <select
                                className="form-select mb-4"
                                {...register("estado", { required: true })}
                              >
                                <option value="">Seleccione el estado</option>
                                <option value="Pendiente">Pendiente</option>
                                <option value="Ausente">Ausente</option>
                                <option value="Realizado">Realizado</option>
                              </select>
                              {/* Comentario */}
                              <label
                                htmlFor="exampleInputEmail1"
                                className="form-label text-center d-block"
                              >
                                Comentarios
                              </label>
                              <div className="form-floating mb-4">
                                <textarea
                                  className="form-control h-50"
                                  {...register("comentario", {
                                    required: true,
                                  })}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          <div className="row m-2">
                            <div className="col-12 d-flex justify-content-end">
                              <BotonAccion nombre="Aceptar" />
                            </div>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
