import { NavBarMental } from "../../principales";
import styles from "../../principales.module.css";
import his from "../generar_diagnostico/generar_diagnostico.module.css";
import { NombrePantalla, PacienteConFoto, BotonAccion } from "../../principales";
import { Link } from "react-router-dom";

export function TablaHistClin() {
  return (
    <div class={`card ${his.myCard} mb-3`}>
      <div class="card-body">
        <div className="row align-items-center">
          <div className="col-3 text-center">
            <PacienteConFoto
              nombre="Santos Jiggets"
              identificador="12345678"
              ultimaCita="23/09/24"
            />
          </div>
          <div className="col-9">
            <table className="table w-90">
              <thead>
                <tr>
                  <th scope="col">Fecha</th>
                  <th scope="col">Diagnóstico</th>
                  <th scope="col">Notas</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>23/09/2024</td>
                  <td>Trastorno de Ansiedad Generalizada (TAG)</td>
                  <td>La paciente tiene problemas para dormir</td>
                </tr>
                <tr>
                  <td>20/08/2024</td>
                  <td>Trastorno de Ansiedad Generalizada (TAG)</td>
                  <td>La paciente presenta fatiga muscular</td>
                </tr>
                <tr>
                  <td>12/02/2023</td>
                  <td>Trastorno Disfórico Premenstrual (TDPM)</td>
                  <td>La paciente tiene cuadros de ansiedad</td>
                </tr>
              </tbody>
            </table>
            <div className="row m-2">
              <div className="col-12 d-flex justify-content-end">
                <Link to="/mis-pacientes">
                  <BotonAccion nombre="Regresar" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function HistoriaClinica() {
  return (
    <div className={`${styles.fondo}`}>
      <NavBarMental />

      <section>
        <div className="container-fluid">
          <div className="row ms-4">
            <div className="col-12">
              <NombrePantalla nombre="Historia clínica" />
            </div>
          </div>
          <div className="row justify-content-center ">
            <div className="col-12">
              <TablaHistClin />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
