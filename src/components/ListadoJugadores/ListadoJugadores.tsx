import { PDFViewer } from "@react-pdf/renderer";
import Listado from "./Listado";
import { useLocation } from "react-router";

const ListadoJugadores = () => {

    const location = useLocation(); // useLocation para acceder al estado
    const { equipo } = location.state || {}; // Accede al estado pasado

    return (
        <div className="container">
            <PDFViewer width={"100%"}  height={800}>
                <Listado equipo = { equipo }/>
            </PDFViewer>
        </div>

    )
}

export default ListadoJugadores;