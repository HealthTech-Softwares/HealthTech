import gen from "./generar_diagnostico.module.css";
import styles from "../../principales.module.css";
import {
  BotonAccion,
  NavBarMental,
  NombrePantalla,
  PacienteConFoto,
} from "../../principales";
import { Link } from "react-router-dom";

export function TextosAreas(props) {
  return (
    <div>
      <label for="exampleInputEmail1" className="form-label">
        {props.propiedad}
      </label>
      <div className="form-floating mb-4">
        <textarea className="form-control h-50" id="floatingTextarea"></textarea>
      </div>
    </div>
  );
}

export function GenerarDiagnostico() {
  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />

      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <NombrePantalla nombre="Generar diagnóstico" />
            </div>
          </div>
          <div className="row justify-content-center ">
            <div className="col-12">
              <div className={`card ${gen.myCard} mb-3`}>
                <div className="card-body">
                  <div className="row align-items-center">
                    <div className="col-3 text-center">
                      <PacienteConFoto
                        nombre="Santos Jiggets"
                        identificador="12345678"
                        ultimaCita="23/09/24"
                      />
                      <Link to="/historia-clinica">
                        <BotonAccion nombre="Ver historia clínica" />
                      </Link>
                    </div>
                    <div className="col-9">
                      <form>
                        <div className="row m-2">
                          <div className="col-6">
                            <TextosAreas propiedad="Coloque aquí su diagnóstico" />
                            <TextosAreas propiedad="Notas (opcional)" />
                          </div>
                          <div className="col-6">
                            <TextosAreas propiedad="Firma digital" />
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
    </div>
  );
}
