import modi from "./modificar_datos_paciente.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  NavBarMental,
  NombrePantalla,
  PacienteConFoto,
} from "../../principales";
import { Link, useNavigate } from "react-router-dom";
import { useFetchData } from "../../../hooks/useFetchData";
import {
  perfilPacienteRequest,
  putPacienteRequest,
} from "../../../api/pacientes";
import { useForm } from "react-hook-form";

export function LabelModifDatosSoloLectura(props) {
  return (
    <div>
      <label htmlFor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <input
        type="text"
        className="form-control w-80 mb-4"
        placeholder={`${props.ejemplo}`}
        readOnly
      />
    </div>
  );
}

export function LabelModifDatosEditar(props) {
  return (
    <div>
      <label htmlFor="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <input
        type="text"
        className="form-control w-80 mb-4"
        placeholder={`${props.ejemplo}`}
      />
    </div>
  );
}

export function ModificarDatosPaciente() {
  // Peticion de datos
  const {
    data: [paciente],
    loading,
    error,
    mensaje,
  } = useFetchData([perfilPacienteRequest]);

  // Redireccion
  const navigate = useNavigate();

  // Formulario
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  // Envio del form
  const onSubmit = async (data) => {
    console.log(data);
    try {
      await putPacienteRequest(data);
      alert("Usuario paciente actualizado correctamente");
      navigate("/principal");
    } catch (error) {
      console.error("Error al actualizar usuario: ", error);
      alert("Hubo un error: ", error);
      reset();
    }
  };

  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />

      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <NombrePantalla nombre="Modificar datos de paciente" />
            </div>
          </div>
          {loading ? (
            <b>Cargando ...</b>
          ) : error ? (
            <b>{mensaje}</b>
          ) : (
            <>
              <div className="row justify-content-center">
                <div className="col-3">
                  <div className={`card ${modi.myCard} mb-3`}>
                    <div className="card-body">
                      <div className="row align-items-center">
                        <div className="col-12 text-center">
                          <PacienteConFoto
                            foto={paciente.foto}
                            nombre={paciente.nombre + " " + paciente.apellidop}
                            dni={paciente.dni}
                            ultimaCita="23/09/2024"
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
                        propiedad="Nombres"
                        ejemplo={paciente.nombre}
                      />
                    </div>
                    <div className="col-5">
                      <LabelModifDatosSoloLectura
                        propiedad="Apellidos"
                        ejemplo={paciente.apellidop + " " + paciente.apellidom}
                      />
                    </div>
                  </div>
                </div>
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
                  <div className="row mb-3">
                    <div className="col-12">
                      <label htmlFor="inputCorreo" className="form-label">
                        Correo:
                      </label>
                      <input
                        type="text"
                        id="inputCorreo"
                        className="form-control"
                        placeholder={paciente.correo}
                        {...register("correo", {
                          required: {
                            value: true,
                            message: "Correo es requerido",
                          },
                          pattern: {
                            value:
                              /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                            message: "Correo no válido",
                          },
                        })}
                      />
                      {errors.correo && (
                        <p className="text-danger mt-1">
                          {errors.correo.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <label htmlFor="password" className="form-label">
                        Nueva contraseña:
                      </label>
                      <input
                        id="password"
                        className="form-control"
                        type="password"
                        placeholder="contraseña"
                        {...register("password", {
                          required: {
                            value: true,
                            message: "Contraseña es requerida",
                          },
                          minLength: {
                            value: 6,
                            message:
                              "La contraseña debe ser mayor a 6 caracteres",
                          },
                        })}
                      />
                      {errors.password && (
                        <p className="text-danger mt-1">
                          {errors.password.message}
                        </p>
                      )}
                    </div>

                    <div className="col-md-6">
                      <label
                        htmlFor="confirmarPassword"
                        className="form-label"
                      >
                        Confirmar contraseña:
                      </label>
                      <input
                        id="confirmarPassword"
                        className="form-control"
                        type="password"
                        placeholder="nueva contraseña"
                        {...register("confirmarPassword", {
                          required: {
                            value: true,
                            message: "Confirmar contraseña es requerido",
                          },
                          validate: (value) =>
                            value === getValues("password") ||
                            "Las contraseñas no coinciden",
                        })}
                      />
                      {errors.confirmarPassword && (
                        <p className="text-danger mt-1">
                          {errors.confirmarPassword.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="row">
                    <div className="col-12 text-center">
                      <button type="submit" className="btn btn-primary mt-3">
                        Guardar cambios
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}


