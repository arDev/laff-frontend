import "bootstrap-icons/font/bootstrap-icons.css";
import { IEquipo } from "../../interfaces/IEquipo";
import { useEffect } from "react";
import Busqueda from "../Busqueda/Busqueda";
import { Link, useNavigate } from "react-router";
import useAPI from "../../customHook/useAPI";

function Equipos() {
    const navigate = useNavigate();
    const {data, callFetch} = useAPI<IEquipo>();

    const getEquipos = () =>
    {
        callFetch("equipo","GET",null,null)
    }

    useEffect(() => {
        getEquipos()
    }
    ,[])

    const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callFetch("equipo","GET",null,"&filtro=" + e.currentTarget.value)
        }
        if (e.key === 'Escape') {
            e.currentTarget.value = ""
            getEquipos()
        }
    }

    const handleClickNuevo = () => {
        navigate("/equipos/nuevo")
    }

    function borrarEquipo(equip :IEquipo) {
        callFetch("equipo","DELETE",equip,null)
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
                    Se encontraron {data?.length} resultados
                    <button className="btn btn-primary float-end" onClick={() => handleClickNuevo()} >Nuevo Equipo</button>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Orden</th>
                            <th scope="col">Detalles</th>
                            <th scope="col"><div className="float-end">Acciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        { data === null || data.length < 1 ? <></> :
                            data.map((equipo: IEquipo, i: number) =>
                            (
                                <tr key={i}>
                                    <td>{equipo.id}</td>
                                    <td>{equipo.nombre}</td>
                                    <td>{equipo.orden}</td>
                                    <td>{equipo.detalles}</td>
                                    <td>
                                        <div className="float-end">
                                            <Link to="/equipos/nuevo" className="btn btn-secondary me-1  " state={{ equipo: equipo }} ><i className="bi bi-pencil-square"></i></Link>
                                            <Link to="/listadojugadores" className="btn btn-secondary me-1 " state={{ equipo: equipo }} ><i className="bi bi-person-vcard"></i></Link>
                                            <button type="button" className="btn btn-danger float-end" onClick={() => borrarEquipo(equipo)}>
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