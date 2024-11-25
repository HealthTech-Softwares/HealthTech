import styles from "../../principales.module.css";
import {
  BotonAccion,
  InputInfoConLabel,
  InputInfoConLabelDoce,
  NavBarAdmin,
  NavBarMental,
  NombrePantalla,
  SelectInfoConLabel,
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
                      <label htmlfor="formFileLg" className="form-label">
                        Seleccione foto de perfil
                      </label>
                      <input
                        className="form-control form-control-lg"
                        id="formFileLg"
                        type="file"
                        accept="image/*"
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
                              propiedad="Fecha de nacimiento"
                              ejemplo="DD/MM/YYYY"
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
                              propiedad="Identificador"
                              ejemplo="P0000"
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
                                  htmlfor="firstCheckbox"
                                >
                                  Disponibilidad
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
