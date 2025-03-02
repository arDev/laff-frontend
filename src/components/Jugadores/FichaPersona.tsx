import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import "./FichaPersona.css"
import { ErrorMessage } from "@hookform/error-message";
import Requerido from "../MsgCampos/Requerido";
import { IPersona } from "../../interfaces/IPersona";
import imagen from "../../assets/sinImagen.jpg"
import { Link, useLocation, useNavigate } from "react-router";
import useAPI from "../../customHook/useAPI";
import AsyncSelect from "react-select/async";
import { IEquipo } from "../../interfaces/IEquipo";
import Historial from "./Historial";
import Foto from "./Foto";

declare var bootstrap: any;




const FichaPersona = () => {
    const navigate = useNavigate();

    const { callFetch } = useAPI<IPersona>()

    const {
        register,
        handleSubmit,
        //watch,
        reset,
        formState: { errors },
    } = useForm<IPersona>()

    const [edita, setEdita] = useState<boolean>(false);

    const onSubmit: SubmitHandler<IPersona> = (data) => {

        if (data.id > 0) {
            Update(data)
        }
        else {
            Insert(data)
        }
    }

    const Insert = (data: IPersona) => {
        if (url !== null)
            data.foto = url

        data.equipo_id = equipo.value;

        callFetch("persona", "POST", data, null)
        navigate("/jugadores")
    }

    const Update = async (data: IPersona) => {
        if (url !== null)
            data.foto = url

        data.equipo_id = equipo.value;

        callFetch("persona", "PUT", data, null)
        navigate("/jugadores")
    }

    const location = useLocation(); // useLocation para acceder al estado
    const { persona } = location.state;
    const [url, setUrl] = useState<string | null>(null);

    useEffect(() => {
        console.log(persona)
        reset(persona)
        setEdita(persona.id !== 0);
        setUrl(imagen)
        console.log(persona.labelEquipo)
        if (persona.labelEquipo != '')
            setEquipo({ value: 0, label: persona.labelEquipo })

    }, [persona])

    const seleccion = { value: 0, label: "Sin equipo" };
    const [equipo, setEquipo] = useState(seleccion)

    const setSelectedOption = (e: any) => {
        console.log(e)
        if (e === null) {
            setEquipo(seleccion)
            return;
        }
        setEquipo({ value: e.value, label: e.label })
    }

    const onChangeSelectedOption = (e: any) => {
        setSelectedOption(e)
    };

    const { data: equipos, callFetch: callEquipos } = useAPI<IEquipo>()

    const loadOptions = async (inputValue: string) => {
        if (!inputValue) return [];

        await callEquipos("equiposselect", "GET", null, "&filtro=" + inputValue)

        return equipos;
    }

    function borrarEquipo(): void {
        setEquipo(seleccion)
    }

    function restaurarEquipo(): void {
        borrarEquipo()

        if (persona.valueEquipo > 0)
            setEquipo({ value: persona.valueEquipo, label: persona.labelEquipo })
    }

    return (
        <div className="container mt-4">
            <h3><i className="bi bi-person-fill iconNavbar"></i>{persona == undefined ? "Nuevo" : "Editar"} Jugador</h3>
            <hr></hr>
            <p className="text-danger">Ultima modif.: {persona.fechamodif} - {persona.username}</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="row">
                        <div className="col">
                            <div className="mb-3">
                                <AsyncSelect
                                    noOptionsMessage={() => 'No se encontraron datos'}
                                    loadingMessage={() => 'Buscando . . .'}
                                    value={equipo}
                                    loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e)} />
                            </div>
                        </div>

                        <div className="col">
                            {persona.labelEquipo != '' ?
                                <div className="col"><button className="btn btn-warning float-start me-2" type="button" onClick={() => restaurarEquipo()}>!</button></div>
                                : <></>
                            }
                            <div className="col"><button className="btn btn-danger float-start" type="button" onClick={() => borrarEquipo()}>X</button></div>
                        </div>


                    </div>
                    <div className="col">
                        <div className="mb-3">
                            <label className="col-form-label">Apellido:</label>
                            <input type="text" className="form-control"
                                {...register("apellido", { required: "Debe completar el nombre" })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="apellido"
                                render={({ message }) => <Requerido msg={message} />}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">Nombre:</label>
                            <input type="text" className="form-control"
                                {...register("nombre", { required: "Debe completar el nombre" })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="nombre"
                                render={({ message }) => <Requerido msg={message} />}
                            />
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="mb-3">
                                    <label className="col-form-label">NroDoc:</label>
                                    <input className="form-control" {...register("nroDoc", { required: "Debe completar el DNI" })}
                                        disabled={edita}
                                    />
                                    <ErrorMessage
                                        errors={errors}
                                        name="nroDoc"
                                        render={({ message }) => <Requerido msg={message} />}
                                    />
                                </div>
                            </div>
                            <div className="col">
                                <div className="mb-3">
                                    <label className="col-form-label">Fecha de Nacimiento:</label>
                                    <input type="date" className="form-control" {...register("fechaNacimiento", { required: "Debe completar el DNI" })} />
                                    <ErrorMessage
                                        errors={errors}
                                        name="fechaNacimiento"
                                        render={({ message }) => <Requerido msg={message} />}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">Direccion:</label>
                            <input type="text" className="form-control"
                                {...register("direccion", { required: "Debe completar el Direccion" })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="direccion"
                                render={({ message }) => <Requerido msg={message} />}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">Localidad:</label>
                            <input type="text" className="form-control"
                                {...register("localidad", { required: "Debe completar el Localidad" })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="localidad"
                                render={({ message }) => <Requerido msg={message} />}
                            />
                        </div>
                        <div className="mb-3">
                            <label className="col-form-label">Telefono:</label>
                            <input type="text" className="form-control"
                                {...register("telefono", { required: "Debe completar la telefono" })}
                            />
                            <ErrorMessage
                                errors={errors}
                                name="telefono"
                                render={({ message }) => errors.telefono?.type == "required" ?
                                    <Requerido msg={message} />
                                    : <p className="">{message}</p>}
                            />
                        </div>
                    </div>
                    <Foto url={url} setUrl={setUrl} id={persona.id} />
                </div>
                <Historial id={persona.id} />
                <hr />
                <div className="row">
                    <div className="col">
                        <div className="mb-3 float-end">
                            <Link to="/jugadores" className="btn btn-outline-dark me-4">Cancelar</Link>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default FichaPersona;