import { useEffect } from "react";
import useAPI from "../../customHook/useAPI";
import { IHistorial } from "../../interfaces/IHistorial";

type props = {
    id?: number
}

const Historial = ({ id }: props) => {

    const { data: historialData, callFetch: callHistorial } = useAPI<IHistorial>();


    useEffect(() => {
        if (id !== undefined && id > 0)
            callHistorial("historial", "GET", null, "&id=" + id)
    }
        , []
    )

    return (
        <>
            <h4>Historial</h4>
            <hr></hr>
            <div className="col">
                <table className="table">
                    <thead>
                        <tr>
                            <td>#</td>
                            <td>nombre</td>
                            <td>desde</td>
                            <td>hasta</td>
                        </tr>
                    </thead>
                    <tbody>
                        {historialData != null && historialData.length > 0 ?
                            historialData.map((i) => (
                                <tr key={i.id}>
                                    <td>{i.id}</td>
                                    <td>{i.nombre}</td>
                                    <td>{i.desde}</td>
                                    <td>{i.hasta ?? 'Actualmente'}</td>
                                </tr>
                            ))

                            : <></>}
                    </tbody>
                </table>
            </div>
        </>)

}
export default Historial;