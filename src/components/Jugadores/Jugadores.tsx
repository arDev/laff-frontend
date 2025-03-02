import { useEffect } from "react";
import Busqueda from "../Busqueda/Busqueda";
import "bootstrap-icons/font/bootstrap-icons.css";
import { IPersona } from "../../interfaces/IPersona";
import { Link, useNavigate } from "react-router";
import useDate from "../../customHook/useDate";
import useAPI from "../../customHook/useAPI";

function Jugadores() {
    const navigate = useNavigate();
    const { data, callFetch } = useAPI<IPersona>()

    useEffect(() => 
    {
        callFetch("persona","Limpiar",null,null)
        callFetch("persona","GET",null,null)
    },[]
    )

    const handleChange = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            callFetch("persona","GET",null,"&filtro=" + e.currentTarget.value)
        }
        if (e.key === 'Escape') {
            callFetch("persona","GET",null,null)
            e.currentTarget.value = ""
        }
    }

    const {today} = useDate()

    const handleClickNuevo = () => {
        navigate("/jugadores/nuevo",{ state : { persona: { fechaNacimiento: today(), id : 0 }} })
    }

    function borrarJugador(jugador : IPersona): void {
        callFetch("persona","DELETE",jugador,null) 
    }

    return (
        <section className="mt-4">
            <div className="container">
                <h3><i className="bi bi-person-fill iconNavbar"></i>Jugadores</h3>
                <Busqueda
                    placeholder="Buscar Jugadores"
                    onKeyDownHandle={handleChange}
                />
                <div className="mb-4">
                    Se encontraron {data?.length} resultados
                    <button className="btn btn-primary float-end" onClick={() => handleClickNuevo()} >Nuevo Jugador</button>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Dni</th>
                            <th scope="col">Carnet</th>
                            <th scope="col">Actualmente</th>
                            <th scope="col"><div className="float-end">Acciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {   data === null || data.length < 1  ? <></> :
                            data.map((jugador: IPersona, i: number) =>
                            (
                                <tr key={i}>
                                    <td scope="row">{jugador.id}</td>
                                    <td>{jugador.apellido}, {jugador.nombre}</td>
                                    <td>{jugador.nroDoc}</td>
                                    <td>{jugador.carnet}</td>
                                    <td>{jugador.labelEquipo != '' ? 
                                    <span className="text-success">{jugador.labelEquipo}</span> : 
                                    <span className="text-danger">Libre</span>
                                    }</td>
                                    <td>
                                        <div className="float-end">
                                            <Link to="/jugadores/nuevo" className="btn btn-secondary me-1  " state={{ persona: jugador }} ><i className="bi bi-pencil-square"></i></Link>
                                            <Link to="/carnet" className="btn btn-secondary me-1 " state={{ persona: jugador, carnet:true }} ><i className="bi bi-person-vcard"></i></Link>
                                            <Link to="/carnet" className="btn btn-secondary me-1 " state={{ persona: jugador,carnet:true,ficha:true }} ><i className="bi bi-person-vcard"></i></Link>
                                            <button type="button" className="btn btn-danger float-end" onClick={() => borrarJugador(jugador)}>
                                                <i className="bi bi-arrow-down-square"></i>
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            )
                            )}

                    </tbody>
                </table>
            </div>

            { /*            <FichaPersona persona={persona} /> */}
        </section >

    )
}

export default Jugadores;