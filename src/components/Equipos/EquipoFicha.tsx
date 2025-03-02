import { Link, useLocation, useNavigate } from "react-router";
import { ErrorMessage } from "@hookform/error-message"
import { SetStateAction, useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import AsyncSelect from "react-select/async"
import Requerido from "../MsgCampos/Requerido"
import { IEquipo } from "../../interfaces/IEquipo";
import FileResizer from "react-image-file-resizer";
import { IPersona } from "../../interfaces/IPersona";
import { SelectInstance } from "react-select";
import blackImg from "../../assets/sinImagen.jpg"
import "./EquipoFicha.css"
import { useEquipo } from "../../customHook/useEquipo";
import { useDivisiones } from "../../customHook/useDivisiones"
import { appSetting } from "../../settings/appSettings";
import useAPI from "../../customHook/useAPI";

type FichaEquip = {
    equipoParam?: IEquipo
}

const EquipoFicha = ({ equipoParam }: FichaEquip) => {
    const { callFetch } = useAPI<IEquipo>();
    const asyncRef = useRef<SelectInstance | null>(null);
    const navigate = useNavigate()
    const { divisiones } = useDivisiones()
    //const [jugadores, setJugadores] = useState<IPersona[]>([])
    const [jugador, setJugador] = useState<number>(0)

    const location = useLocation(); // useLocation para acceder al estado
    const { equipo } = location.state || {}; // Accede al estado pasado

    const { dtSelect, setDtSelect, delegado1
        , setDelegado1, delegado2, setDelegado2
        , jugadores
        , file, setFile, setJugadores,
        division, setDivision } = useEquipo(equipoParam ?? equipo)

    const manejarCambio = (evento: { target: { value: SetStateAction<string>; }; }) => {
        setDivision(Number(evento.target.value));
    };

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IEquipo>()

    const onSubmit: SubmitHandler<IEquipo> = (data) => {
        insert(data)
    }

    useEffect(() => {
        reset(equipoParam ?? equipo)
        console.log(jugadores)
    }, [equipo])

    const loadOptions = async (inputValue: string) => {
        if (!inputValue) return [];

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
        );

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        const response = await fetch(appSetting.urlApi + "/laff/api.php?request=persona_sinequipo&filtro=" + inputValue, requestOptions)
        const data = await response.json()

        return data
    }

    const setSelectedOption = (e: any, combo: string) => {
        if (e === null) {
            if (combo == "dt")
                setDtSelect({ value: 0, label: "Seleccione un dt", nroDoc: "" })
            if (combo == "d1")
                setDelegado1({ value: 0, label: "Seleccione un delegado", nroDoc: "" })
            if (combo == "d2")
                setDelegado2({ value: 0, label: "Seleccione un delegado", nroDoc: "" })
            if (combo == "jugador")
                setJugador(0)
            return;
        }
        if (combo == "dt")
            setDtSelect({ value: e.value, label: e.label, nroDoc: "" })
        if (combo == "d1")
            setDelegado1({ value: e.value, label: e.label, nroDoc: "" })
        if (combo == "d2")
            setDelegado2({ value: e.value, label: e.label, nroDoc: "" })
        if (combo == "jugador")
            setJugador(e.value)
    }

    const onChangeSelectedOption = (e: any, combo: string) => {
        setSelectedOption(e, combo)
    };

    const resizeFile = (file: any) =>
        new Promise((resolve) => {
            FileResizer.imageFileResizer(
                file,
                300,
                300,
                "JPEG",
                100,
                0,
                (uri) => {
                    resolve(uri);
                },
                "base64"
            );
        });

    const onChange = async (e: any) => {
        try {
            const file = e.target.files[0];
            const image = await resizeFile(file);
            setFile(image as string)
        } catch (err) {
            console.log(err);
        }
    };

    const insert = (data: IEquipo) => {
        data.dt = dtSelect.value
        data.d1 = delegado1.value
        data.d2 = delegado2.value
        data.escudo = file
        data.jugadores = jugadores.filter(x => x.id !== 0)
        data.division = division
        callFetch("equipo", "POST", data, null)
        navigate("/equipos")
    }

    const agregarJugador = (id: number) => {

        //Validar

        if (id > 0) {
            const check = jugadores.find(i => i.id === id)

            if (check == undefined) {

                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                myHeaders.append(
                  "Authorization",
                  "Bearer " + localStorage.getItem("token")
                );
            
                const requestOptions = {
                  method: "GET",
                  headers: myHeaders,
                };

                fetch(appSetting.urlApi + "/laff/api.php?request=persona_getbyid&id=" + id, requestOptions)
                    .then((response) => response.json())
                    .then((result) => {
                        console.log(result)
                        const newJugador = { ...result[0], accion: "A", deBase: false }
                        setJugadores([...jugadores, newJugador])
                    }
                    )
                    .catch((error) => alert(error));
            }
            else {
                setJugadores((jugadores) =>
                    jugadores.map((item) =>
                        item.id === id ? { ...item, accion: "A" } : item
                    )
                );
            }
            asyncRef.current?.clearValue()
        }
    }

    const eliminar = (id: number) => {
        if (confirm('Seguro desea eliminar el jugador de la lista?')) {
            setJugadores((jugadores) =>
                jugadores.map((item) =>
                    item.id === id ? { ...item, accion: "B" } : item
                )
            );

        }
    }

    const limpiar = (combo: string) => {
        if (combo == "dt") {
            setDtSelect({ value: 0, label: "Seleccione un dt", nroDoc: "" })
        }
        if (combo == "d1") {
            setDelegado1({ value: 0, label: "Seleccione un delegado", nroDoc: "" })
        }
        if (combo == "d2") {
            setDelegado2({ value: 0, label: "Seleccione un delegado", nroDoc: "" })
        }
        return;
    }

    return (
        <section className="mt-4">
            <div className="container">
                <h3><i className="bi bi-person-fill iconNavbar"></i>{equipo == undefined ? "Nuevo" : "Editar"} Equipo</h3>
                <hr></hr>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">

                        <div className="col-xl-3">
                            <div className="mb-3 d-flex flex-column align-items-center">

                                <img className="img-max" src={file === undefined || file == "" ? blackImg : file} />
                                {file === undefined || file == "" ?
                                    <>
                                        <label htmlFor={"fileInput"} className="btn btn-primary uploadButton">Subir Escudo</label>
                                        <input type="file" id="fileInput" onChange={onChange} />
                                    </>
                                    :
                                    <button type="button" className="btn btn-danger uploadButton" onClick={() => setFile("")}>X</button>
                                }
                            </div>
                        </div>
                        <div className="col">
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <label className="col-form-label">Nombre:</label>
                                        <input className="form-control"
                                            {...register("nombre", { required: "Debe ingresar un Nombre" })} />
                                        <ErrorMessage
                                            errors={errors}
                                            name="nombre"
                                            render={({ message }) => <Requerido msg={message} />}
                                        />
                                    </div>
                                </div>
                                <div className="col-2">
                                    <div className="mb-3">
                                        <label className="col-form-label">Orden:</label>
                                        <input className="form-control"
                                            {...register("orden", { required: "" })} />
                                        <ErrorMessage
                                            errors={errors}
                                            name="orden"
                                            render={({ message }) => <Requerido msg={message} />}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="col-form-label">Detalles:</label>
                                            <input className="form-control"
                                                {...register("detalles")} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="detalles"
                                                render={({ message }) => <Requerido msg={message} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="row">
                                    <div className="col-12">
                                        <div className="mb-3">
                                            <label className="col-form-label">División:</label>
                                            <select className="form-control" value={division} onChange={manejarCambio}>
                                                <option value="0">Ninguna</option>
                                                {
                                                    divisiones.map((division) => (
                                                        <option key={division.id} value={division.id}>{division.nombre}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <label className="col-form-label">Delegado:</label>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <AsyncSelect
                                            noOptionsMessage={() => 'No se encontraron datos'}
                                            loadingMessage={() => 'Buscando . . .'}
                                            value={delegado1}
                                            loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e, "d1")} />
                                    </div>
                                </div>
                                <div className="col"><button className="btn btn-danger" type="button" onClick={() => limpiar("d1")}>X</button></div>
                            </div>
                            <label className="col-form-label">Subdelegado:</label>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <AsyncSelect
                                            noOptionsMessage={() => 'No se encontraron datos'}
                                            loadingMessage={() => 'Buscando . . .'}
                                            value={delegado2}
                                            loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e, "d2")} />
                                    </div>
                                </div>
                                <div className="col"><button className="btn btn-danger" type="button" onClick={() => limpiar("d2")}>X</button></div>
                            </div>
                            <label className="col-form-label">DT:</label>
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                        <AsyncSelect
                                            noOptionsMessage={() => 'No se encontraron datos'}
                                            loadingMessage={() => 'Buscando . . .'}
                                            value={dtSelect}
                                            loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e, "dt")} />
                                    </div>
                                </div>
                                <div className="col"><button className="btn btn-danger" type="button" onClick={() => limpiar("dt")}>X</button></div>
                            </div>
                        </div>
                    </div>

                    <hr></hr>
                    <h2>Jugadores</h2>
                    <div className="row">
                        <div className="col">
                            <AsyncSelect
                                ref={asyncRef}
                                noOptionsMessage={() => 'No se encontraron datos'}
                                loadingMessage={() => 'Buscando . . .'}
                                placeholder="Buscar jugador"
                                loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e, "jugador")} />

                        </div>
                        <div className="col">
                            <button className="btn btn-primary" type="button" onClick={() => agregarJugador(jugador)} >Agregar</button>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col">
                            <hr />
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">#</th>
                                        <th scope="col">Nombre y Apellido</th>
                                        <th scope="col">Nro. DNI</th>
                                        <th scope="col">Accion</th>
                                        <th scope="col"></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        //.filter((x) => x.accion == "A")
                                        jugadores.length < 1 ? <p>No hay jugadores</p> :
                                            jugadores.filter(x => x.id !== 0).map((j: IPersona, i: number) =>
                                            (
                                                <tr key={i}>
                                                    <td>{j.id}</td>
                                                    <td>{j.apellido}, {j.nombre}</td>
                                                    <td>{j.nroDoc}</td>
                                                    <td>{j.accion == "A" ? "Nuevo" :
                                                        j.accion == "B" ? "Eliminar" : ""}</td>
                                                    <td>
                                                        <button type="button" className="btn btn-danger float-end"
                                                            onClick={() => eliminar(j.id)}
                                                        >X</button>
                                                    </td>
                                                </tr>
                                            ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <hr></hr>
                    <div className="row">
                        <div className="col">
                            <div className="mb-3 float-end">
                                <Link to="/equipos" className="btn btn-outline-dark me-4">Cancelar</Link>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default EquipoFicha;