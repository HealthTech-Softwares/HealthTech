import { BotonAccion, NavBarMental, NombrePantalla, SelectInfo, InfoPsicologo, InputInfoSinLabel } from '../principales'
import styles from '../principales.module.css'
import { Link } from 'react-router-dom'
import { especialidesRequest } from '../../api/especialidades'
import { psicologosRequest } from '../../api/test.buscar.psico'
import React, { useState, useEffect } from 'react'

export function BuscarPsico() {
    const [especialidades, setEspecialidades] = useState([]);
    const [psicolgos, setPsicologos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    let isMounted = true; // Bandera para asegurar que el componente está montado

    const obtenerDatos = async () => {
        try {
            setLoading(true);
            const [especialidadesResponse, psicologosResponse] = await Promise.all([
                especialidesRequest(),
                psicologosRequest()
            ]);
            if (isMounted) { // Solo actualizamos el estado si el componente sigue montado
                setEspecialidades(especialidadesResponse.data);
                setPsicologos(psicologosResponse.data);
            }
        } catch (error) {
            console.error("Error al cargar los datos: ", error);
            // setError(true);
        } finally {
            if (isMounted) {
                setLoading(false);
            }
        }
    };

    obtenerDatos();

    return () => {
        isMounted = false; // Limpiar cuando el componente se desmonte
    };
}, []);

    return (
        <div className={`${styles.fondo}`}>
            <NavBarMental />
            {loading ? (<div>Cargando...</div>) : (
                <>
                    <section>
                <div className="container-fluid">
                    <div className="row ms-4">
                        <div className="col-12">
                            <NombrePantalla nombre="Buscar psicólogo"/>
                            <form>
                                <div className="row mb-4">
                                    <div className="col-3">
                                        <InputInfoSinLabel/>
                                    </div>
                                    <div className="col-3">
                                        <SelectInfo props={especialidades} />
                                    </div>
                                    <div className="col-1 text-center">
                                        <BotonAccion nombre="Buscar"/>
                                    </div>
                                    <div className="col-1">
                                        <Link to="/mis-citas">
                                            <button type="submit" className="btn btn-dark">Mis citas</button>
                                        </Link>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={`row justify-content-center`}>
                                <div className="col-12">
                                    {psicolgos.map((psico) => (
                                        <InfoPsicologo
                                            key={psico.idpsicologo}
                                            dni={psico.dni}
                                            nombre={psico.nombre}
                                            descripcion={psico.descripcion}
                                            foto={psico.foto}
                                        />
                                    ))}
                        </div>
                    </div>
                </div>
            </section>
                </>)}
            
        </div>
    )
}