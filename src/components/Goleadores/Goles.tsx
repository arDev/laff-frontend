import { useNavigate } from "react-router";
import Busqueda from "../Busqueda/Busqueda";
import { useGoleadores } from "../../customHook/useGoleadores";
import { IGoleadores } from "../../interfaces/IGoleadores";
import { useState } from "react";
import { appSetting } from "../../settings/appSettings";


const Goles = () => {
    const [busqueda, setBusqueda] = useState<string>("")

    const { goleadores, setGoleadores } = useGoleadores(busqueda)

    const navigate = useNavigate()

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
        { }

        navigate("/goleadores/anotargol")
    }



    function borrarGol(id: number): void {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "DELETE",
            headers: myHeaders,
        };

        fetch(appSetting.urlApi + "/laff/api.php?request=goles&id=" + id, requestOptions)
            .then((response) => response.json())
            .then((result) => {
                alert(result.msg)
                setGoleadores(goleadores.filter(j => j.id != id))
            })
            .catch((error) => console.error(error));

    }

    return (
        <section className="mt-4">
            <div className="container">
                <h3><i className="bi  bi-pencil-square iconNavbar"></i>Goles</h3>
                <Busqueda
                    placeholder="Buscar Goles"
                    onKeyDownHandle={handleChange}
                />
                <div className="mb-4">
                    Se encontraron {goleadores.length} resultados
                    <button className="btn btn-primary float-end" onClick={() => handleClickNuevo()} >Anotar Gol</button>
                </div>
                <hr />
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Apellido y Nombre</th>
                            <th scope="col">Goles</th>
                            <th scope="col">Fecha</th>
                            <th scope="col"><div className="float-end">Acciones</div></th>
                        </tr>
                    </thead>
                    <tbody>
                        {

                            goleadores.length < 1 ? <></> :
                                goleadores.map((goleador: IGoleadores, i: number) =>
                                (
                                    <tr key={i}>
                                        <td scope="row">{goleador.id}</td>
                                        <td>{goleador.apellido}, {goleador.nombre}</td>
                                        <td>{goleador.goles}</td>
                                        <td>{goleador.fecha}</td>
                                        <td>
                                            <div className="float-end">
                                                <button type="button" className="btn btn-danger float-end" onClick={() => borrarGol(goleador.id)}>
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
        </section >
    )
}

export default Goles;