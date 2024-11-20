import logoMental from "../../assets/logo_mentalsync.png";
import { BotonAccion } from "../../principales";
import styles from "./inicio.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";
import { useForm } from "react-hook-form";
import { useEffect } from "react";

export function FormCrearCuenta({ error, onSubmit, register,  errors }) {
  return (
    <div className="col-6">
      {<div className="text-center text-danger">{ error }</div> }
      <h2 className={`text-center mb-2 ${styles.subtitle}`}>Crear cuenta</h2>
      <form className="row d-flex flex-column align-items-center" onSubmit={onSubmit}>
        <div className="col-6 mb-2">
          <label className="form-label">Nombres</label>
          <input type="text" className="form-control" id="inputEmail4" {...register("nombre", { required: true })} />
          { errors.nombre && <p className="text-danger">Nombre es requerido</p> }
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Apellido paterno</label>
          <input type="text" className="form-control" id="inputPassword4" {...register("apellidop", { required: true })} />
          { errors.apellidop && <p className="text-danger">Apellido paterno es requerido</p> }
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Apellido materno</label>
          <input type="text" className="form-control" id="inputEmail4" {...register("apellidom", { required: true })} />
          { errors.apellidom && <p className="text-danger">Apellido materno es requerido</p> }
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">DNI</label>
          <input
            type="text"
            className="form-control"
            id="inputDNI"
            {...register("dni", {
              required: "El DNI es requerido",
              pattern: {
                value: /^\d{8}$/,
                message: "El DNI debe tener exactamente 8 números",
              },
            })}
          />
          {errors.dni && <p className="text-danger">{errors.dni.message}</p>}
        </div>
        <div className="col-6 mb-2">
          <label for="exampleInputEmail1" class="form-label">
            Género
          </label>
          <select className="form-select" {...register("genero", { required: true })}>
            <option value="">Seleccione su género</option>
            <option value="Masculino">Masculino</option>
            <option value="Femenino">Femenino</option>
            <option value="Prefiero no decirlo">Prefiero no decirlo</option>
          </select>
          {errors.genero && <p className="text-danger">Por favor, selecciona un género</p>}
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Correo electrónico</label>
          <input type="email" className="form-control" id="inputEmail4" {...register("correo", { required: true })} />
          { errors.correo && <p className="text-danger">Correo es requerido</p> }
        </div>
        <div className="col-6 mb-2">
          <label className="form-label">Contraseña</label>
          <input type="password" className="form-control" id="inputPassword4"  {...register("contrasenia", { required: true })} />
          { errors.contrasenia && <p className="text-danger">Contraseña es requerida</p> }
        </div>
        <div className="col-12 text-center">
          <BotonAccion nombre="Ingresar" />
        </div>
      </form>
    </div>
  );
}

export function CrearCuenta() {
  const { register, handleSubmit, setValue, formState: { errors } } = useForm();
  const { signup, error } = useAuth();

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    signup(data);
  })

  useEffect(() => {
    if (error === "Registro exitoso") {
      navigate("/");
    } else if (error === "El correo ingresado ya existe") {
      setValue("correo", "");
    } else if (error === "El DNI ingresado ya existe") {
      setValue("dni", "");
    }
  }, [error]);

  return (
    <div className={`container-fluid ${styles.containerFluid}`}>
      <div className="row align-items-center justify-content-center vh-100">
        <div className="col-6 text-center">
          <img src={logoMental} alt="Logo" className={styles.logo} />
          <h1 className={styles.title}>MentalSync</h1>
        </div>
        <FormCrearCuenta error={error} onSubmit={onSubmit} register={register} errors={errors} />
      </div>
    </div>
  );
}
