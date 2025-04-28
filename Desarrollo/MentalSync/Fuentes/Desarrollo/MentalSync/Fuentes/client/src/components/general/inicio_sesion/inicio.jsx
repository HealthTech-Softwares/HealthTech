import logoMental from "../../../assets/logo_mentalsync.png";
import { BotonAccion } from "../../principales";
import styles from "./inicio.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function FormInicioSesion({ error, onSubmit, register, errors }) {
  return (
    <div className="col-6">
      {<div className="text-center text-danger">{error}</div>}
      <h2 className={`text-center mb-4 ${styles.subtitle}`}>Iniciar sesión</h2>
      <form
        className="row g-3 d-flex flex-column align-items-center"
        onSubmit={onSubmit}
      >
        <div className="col-6">
          <label htmlFor="inputEmail4" className="form-label">
            Correo electrónico
          </label>
          <input
            type="email"
            className="form-control"
            id="inputEmail4"
            {...register("correo", { required: true })}
          />
          {errors.correo && <p className="text-danger">Correo es requerido</p>}
        </div>
        <div className="col-6">
          <label htmlFor="inputPassword4" className="form-label">
            Contraseña
          </label>
          <input
            type="password"
            className="form-control"
            id="inputPassword4"
            {...register("contrasenia", { required: true })}
          />
          {errors.contrasenia && (
            <p className="text-danger">Constraseña es requerida</p>
          )}
        </div>
        <div className="col-6">
          <label htmlFor="inputPassword4" className="form-label">
            ¿No tiene una cuenta?
            <Link to="/crear-cuenta" className="ms-2">
              <b>Cree una</b>
            </Link>
          </label>
        </div>
        <div className="col-12 text-center">
          <BotonAccion nombre="Ingresar" />
        </div>
      </form>
    </div>
  );
}

export function Inicio() {
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const { user, signin, error, isAuthenticated } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signin(data);
  });

  useEffect(() => {
    if (error === "Contraseña incorrecta") {
      setValue("contrasenia", "");
    } else if (error === "Usuario no encontrado") {
      reset();
    }
  }, [error]);

  useEffect(() => {
    if (isAuthenticated) {
      console.log(user.rol);
      switch (user.rol) {
        case "Paciente":
          navigate("/principal");
          break;
        case "Psicologo":
          navigate("/mis-pacientes");
          break;
        case "Administrador":
          navigate("/lista-psicologos");
          break;
        default:
          navigate("/404");
          break;
      }
    }
  }, [isAuthenticated]);

  return (
    <div className={`container-fluid ${styles.containerFluid}`}>
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-6 text-center">
          <img src={logoMental} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>MentalSync</h1>
        </div>
        <FormInicioSesion
          error={error}
          onSubmit={onSubmit}
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
