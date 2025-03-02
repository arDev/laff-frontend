import { useEffect, useState } from "react"
import { ITabla } from "../../interfaces/ITabla"
import { appSetting } from "../../settings/appSettings"

const Tabla = () => {
    const [tabla, setTabla] = useState<ITabla[]>([])

    useEffect(() => {
        CargarTabla()
    }, [])

    const CargarTabla = () => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch(appSetting.urlApi + "/laff/api.php?request=tabla", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                setTabla(result)
            }
            )
            .catch((error) => console.error(error));

    }
    function actualizar(): void {
        CargarTabla()
    }

    return (
        <section className="mt-4">
            <div className="container">
                <h3><i className="bi bi-list-ol iconNavbar"></i>Tabla de Goleadores</h3>
                <hr />
                <div className="row">
                    <div className="col">
                        <button className="btn btn-primary float-end" onClick={() => actualizar()}><i className="bi bi-arrow-clockwise me-2"></i>Actualizar</button>
                    </div>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Apellido y Nombre</th>
                            <th scope="col">Equipo</th>
                            <th scope="col"><div className="float-end">Goles</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            tabla.length < 1 ? <></> :
                                tabla.map((pos: ITabla, i: number) =>
                                (
                                    <tr key={i}>
                                        <td>{i + 1}</td>
                                        <td>{pos.apellido}, {pos.nombre}</td>
                                        <td>{pos.equipo}</td>
                                        <td><div className="float-end">{pos.goles}</div></td>
                                    </tr>
                                ))
                        }
                    </tbody>
                </table>
            </div>
        </section >
    )

}

export default Tabla;