import { PDFViewer } from "@react-pdf/renderer";
import Pdf from "./Pdf";
import { useLocation } from "react-router";

const Carnet = () => {

    const location = useLocation(); // useLocation para acceder al estado
    const { persona, carnet, ficha } = location.state || {}; // Accede al estado pasado

    return (
        <div className="container">
            <PDFViewer width={"100%"} height={window.innerHeight-56}>
                <Pdf persona = { persona } carnet = {carnet} ficha ={ficha}/>
            </PDFViewer>
        </div>

    )
}

export default Carnet;