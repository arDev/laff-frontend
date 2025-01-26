import "bootstrap-icons/font/bootstrap-icons.css";
import { IEquipo } from "../../interfaces/IEquipo";
import { useState } from "react";
import { useEquipos } from "../../customHook/useEquipos";
import Busqueda from "../Busqueda/Busqueda";
import { Link, useNavigate } from "react-router";

function Equipos() {
    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState<string>("")

    const { equipos } = useEquipos(busqueda);

    const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            setBusqueda(e.currentTarget.value)
        }
        if (e.key === 'Escape') {
            setBusqueda("")
            e.currentTarget.value = ""
        }
    }

    const handleClickNuevo = () => {
        navigate("/equipos/nuevo")
    }



    return (
        <section className="mt-4">
            <div className="container">
                <h3><i className="bi bi-person-fill iconNavbar"></i>Equipos</h3>
                <Busqueda
                    placeholder="Buscar Equipos"
                    onKeyDownHandle={handleChange}
                />
                <div className="mb-4">
                    Se encontraron {equipos.length} resultados
                    <button className="btn btn-primary float-end" onClick={() => handleClickNuevo()} >Nuevo</button>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Orden</th>
                            <th scope="col">Detalles</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {equipos.length < 1 ? <></> :
                            equipos.map((equipo: IEquipo, i: number) =>
                            (
                                <tr key={i}>
                                    <td>{equipo.id}</td>
                                    <td>{equipo.nombre}</td>
                                    <td>{equipo.orden}</td>
                                    <td>{equipo.detalles}</td>
                                    <td>
                                    <div className="float-end">
                                            <Link to="/equipos/nuevo" className="btn btn-secondary me-1  " state={{ equipo: equipo }} ><i className="bi bi-pencil-square"></i></Link>
                                            <button type="button" className="btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
                                                <i className="bi bi-arrow-down-square"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </section>
    )
}

export default Equipos;