import { useState } from "react";
import Busqueda from "../Busqueda/Busqueda";
import { useJugadores } from "../../customHook/useJugadores";
import "bootstrap-icons/font/bootstrap-icons.css";
import { IPersona } from "../../interfaces/IPersona";
import FichaPersona from "./FichaPersona";
//import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
//import Pdf from "../PDF/Pdf";


function Jugadores() {

    const [busqueda, setBusqueda] = useState<string>("")

    const [persona, setPersona] = useState<IPersona>()

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

    const handleClickModificacion = (persona: IPersona) => {
        setPersona(persona);
    }

    const handleClickNuevo = () => {
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
            value:"", 
            label:""
        });
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
                    <button className="btn btn-primary float-end" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleClickNuevo()}>Nuevo</button>
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
                                            <button type="button" className="btn btn-warning iconNavbar" data-bs-toggle="modal" data-bs-target="#exampleModal" onClick={() => handleClickModificacion(jugador)}>
                                                <i className="bi bi-pencil-square"></i>
                                            </button>
                                            <button type="button" className="btn btn-danger" data-bs-toggle="modal" data-bs-target="#exampleModal">
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
            { /*
            <PDFDownloadLink document={<Pdf />} fileName='invoice.pdf'>
                <div >
                    <span>Download</span>
                </div>
            </PDFDownloadLink>
            <PDFViewer width={800}>
                <Pdf />
            </PDFViewer>*/
        }
            <FichaPersona persona={persona} /> 
        </section >

    )
}

export default Jugadores;