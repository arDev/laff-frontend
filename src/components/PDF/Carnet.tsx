import { PDFViewer } from "@react-pdf/renderer";
import Pdf from "./Pdf";
import { useLocation } from "react-router";

const Carnet = () => {

    const location = useLocation(); // useLocation para acceder al estado
    const { persona } = location.state || {}; // Accede al estado pasado

    return (
        <div className="container">
            <PDFViewer width={800} height={800}>
                <Pdf persona = { persona }/>
            </PDFViewer>
        </div>

    )
}

export default Carnet;