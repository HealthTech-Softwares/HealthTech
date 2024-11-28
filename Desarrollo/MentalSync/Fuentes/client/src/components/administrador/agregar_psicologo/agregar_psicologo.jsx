import styles from "../../principales.module.css";
import {
  BotonAccion,
  InputInfoConLabelDoce,
  NavBarAdmin,
  NombrePantalla,
  SelectInfoConLabelDoce,
} from "../../principales";
import { Link } from "react-router-dom";

export function AgregarPsicologo() {
  return (
    <div className={`${styles.fondo}`}>
      <NavBarAdmin />

      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <NombrePantalla nombre="Agregar psicólogo" />
            </div>
          </div>
          <div className="row ms-4 me-4">
            <div className="col-12">
              <div className={`card ${styles.myCardAgregar} mb-3`}>
                <div className="card-body">
                  <div className="row">
                    <div className="col-4 d-flex flex-column justify-content-center align-items-center">
                      <img
                        src="https://i.ibb.co/kyNqMYh/user.png"
                        alt="psico"
                      />
                    </div>
                    <div className="col-8">
                      <form>
                        <div className="row mb-3 d-flex justify-content-center">
                          <div className="col-6">
                            <InputInfoConLabelDoce
                              propiedad="Nombre"
                              ejemplo="Nombres"
                            />

                            <InputInfoConLabelDoce
                              propiedad="Correo"
                              ejemplo="example@example.com"
                            />

                            <SelectInfoConLabelDoce
                              propiedad="Especialidad"
                              valor1="Especialidad"
                              valor2="Psicología infantil"
                              valor3="Psicología clínica"
                              valor4="Psicología familiar"
                              valor5="Psicología de pareja"
                            />

                            <SelectInfoConLabelDoce
                              propiedad="Seleccionar horario"
                              valor1="8:00 AM - 10:00 AM"
                              valor2="10:00 AM - 12:00 PM"
                              valor3="12:00 PM - 14:00 PM"
                              valor4="14:00 PM - 16:00 PM"
                              valor5="16:00 PM - 18:00 PM"
                            />
                          </div>
                          <div className="col-6">
                            <InputInfoConLabelDoce
                              propiedad="Apellidos"
                              ejemplo="Apellidos"
                            />
                            <InputInfoConLabelDoce
                              propiedad="DNI"
                              ejemplo="12345678"
                            />
                            <ul className="list-group w-75">
                              <li className="list-group-item">
                                <input
                                  className="form-check-input me-3"
                                  type="checkbox"
                                  value=""
                                  id="firstCheckbox"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="firstCheckbox"
                                >
                                  Disponibilidad
                                </label>
                              </li>
                              <li className="list-group-item">
                                <input
                                  className="form-check-input me-3"
                                  type="checkbox"
                                  value=""
                                  id="secondCheckbox"
                                />
                                <label
                                  className="form-check-label"
                                  htmlFor="secondCheckbox"
                                >
                                  Consulta online
                                </label>
                              </li>
                            </ul>
                          </div>
                        </div>
                        <div className="row mb-4">
                          <div className="col-10 d-flex justify-content-end">
                            <Link to="/lista-psicologos">
                              <BotonAccion nombre="Crear psicólogo" />
                            </Link>
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
    </div>
  );
}
