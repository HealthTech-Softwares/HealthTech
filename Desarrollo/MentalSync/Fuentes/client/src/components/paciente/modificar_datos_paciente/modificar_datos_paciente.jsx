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
      console.error("Error al actulizar usuario: ", error);
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
            <h2>Cargando ...</h2>
          ) : error ? (
            <h2>{mensaje}</h2>
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
                <form onSubmit={handleSubmit(onSubmit)}>
                  <label htmlFor="inputCorreo" className="form-label">
                    Correo:
                  </label>
                  <input
                    type="text"
                    id="inputCorreo"
                    className="form-control w-80 mb-4"
                    placeholder={paciente.correo}
                    {...register("correo", {
                      required: {
                        value: true,
                        message: `Correo es requerido`,
                      },
                      pattern: {
                        value:
                          /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                        message: "Correo no válido",
                      },
                    })}
                  />
                  {errors.correo && (
                    <p className="text-danger">{errors.correo.message}</p>
                  )}
                  <label htmlFor="password" className="form-label">
                    Nueva contraseña:
                  </label>
                  <input
                    id="password"
                    className="form-control w-80 mb-4"
                    type="password"
                    placeholder="contraseña"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "Contaseña es requerida",
                      },
                      minLength: {
                        value: 6,
                        message: "La contraseña debe ser mayor a 6 caracteres",
                      },
                    })}
                  />
                  {errors.password && (
                    <p className="text-danger">{errors.password.message}</p>
                  )}
                  <label htmlFor="confirmarPassword" className="form-label">
                    Confirmar contraseña:
                  </label>
                  <input
                    id="confirmarPassword"
                    className="form-control w-80 mb-4"
                    placeholder="nueva contraseña"
                    type="password"
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
                    <p className="text-danger">
                      {errors.confirmarPassword.message}
                    </p>
                  )}
                  <button type="submit" className="btn btn-primary">
                    Guardar cambios
                  </button>
                </form>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
}
