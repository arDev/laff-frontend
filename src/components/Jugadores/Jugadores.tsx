import { useState } from "react";
import Busqueda from "../Busqueda/Busqueda";
import { useJugadores } from "../../customHook/useJugadores";
import "bootstrap-icons/font/bootstrap-icons.css";
import { IPersona } from "../../interfaces/IPersona";
import { Link, useNavigate } from "react-router";
//import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
//import Pdf from "../PDF/Pdf";


function Jugadores() {

    const navigate = useNavigate();
    const [busqueda, setBusqueda] = useState<string>("")

    const { jugadores } = useJugadores(busqueda);

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
        { /*
        setPersona({
            id: 0,
            apellido: "",
            nombre: "",
            nroDoc: "",
            fechaNacimiento: new Date(1980, 1, 1, 0, 0, 0, 0),
            direccion: "",
            localidad: "",
            provincia: "",
            telefono: "",
            carnet: 0,
            email: "",
            observaciones: "",
            value: "",
            label: "",
            deBase: 0
        }); */ }

        navigate("/jugadores/nuevo")
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
                    Se encontraron {jugadores.length} resultados
                    <button className="btn btn-primary float-end" onClick={() => handleClickNuevo()} >Nuevo</button>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nombre</th>
                            <th scope="col">Dni</th>
                            <th scope="col">Carnet</th>
                            <th scope="col"><div className="float-end">Acciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {jugadores.length < 1 ? <></> :
                            jugadores.map((jugador: IPersona, i: number) =>
                            (
                                <tr key={i}>
                                    <td scope="row">{jugador.id}</td>
                                    <td>{jugador.apellido}, {jugador.nombre}</td>
                                    <td>{jugador.nroDoc}</td>
                                    <td>{jugador.carnet}</td>
                                    <td>
                                        <div className="float-end">
                                            <Link to="/jugadores/nuevo" className="btn btn-secondary me-1  " state={{ persona: jugador }} ><i className="bi bi-pencil-square"></i></Link>
                                            <Link to="/carnet" className="btn btn-secondary me-1 " state={{ persona: jugador }} ><i className="bi bi-person-vcard"></i></Link>
                                            <button type="button" className="btn btn-danger float-end" data-bs-toggle="modal" data-bs-target="#exampleModal">
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