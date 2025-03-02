import { SubmitHandler, useForm } from "react-hook-form";
import { IGol } from "../../interfaces/IGol";
import AsyncSelect from "react-select/async";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import Requerido from "../MsgCampos/Requerido";
import { ErrorMessage } from "@hookform/error-message";
import { appSetting } from "../../settings/appSettings";

type tCargo = {
    cargo?: string,
    value: number,
    label: string,
    nroDoc?: string
}

const AnotarGol = () => {
    const [jugador, setJugador] = useState<tCargo>({ value: 0, label: "seleccione un jugador" })
    const [jugadorInvalido, setJugadorInvalido] = useState<boolean>(false)
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IGol>()


    const onSubmit: SubmitHandler<IGol> = (data) => {
        setJugadorInvalido(jugador.value == 0)
        if(jugador.value > 0)
            Insert(data)
    }
    function Insert(data: IGol) {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const gol : IGol = {
            persona_id : jugador.value,
            goles : data.goles,
            fecha : data.fecha
        }

        const raw = JSON.stringify(gol)

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch(appSetting.urlApi + "/laff/api.php?request=goles", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                alert(result.msg)
                navigate("/goleadores")
            })
            .catch((error) => console.error(error));
    }

    const loadOptions = async (inputValue: string) => {
        if (!inputValue) return [];

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        const response = await fetch(appSetting.urlApi + "/laff/api.php?request=persona&filtro=" + inputValue, requestOptions)
        const data = await response.json()

        return data
    }

    const onChangeSelectedOption = (e: any) => {
        setJugador({ value: e.value, label: e.label, nroDoc : "" })
    };


    function limpiar(): void {
        setJugador({ value: 0, label: "Seleccione un jugador" , nroDoc :""})
    }

    useEffect(
        () => {
            var now = new Date();


            console.log(now)
            
            reset({
                fecha: now,
                goles : 1
            } )
        },[]
    )

    return (
        <div className="container mt-4">
            <h3><i className="bi bi-bar-chart-fill iconNavbar"></i>Anotar Gol</h3>
            <hr></hr>
            <form onSubmit={handleSubmit(onSubmit)}>

                <label className="col-form-label">Jugador</label>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                            <AsyncSelect
                                noOptionsMessage={() => 'No se encontraron datos'}
                                loadingMessage={() => 'Buscando . . .'}
                                value={jugador}
                                loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e)} />
                        </div>
                        { jugadorInvalido ? <Requerido msg={"Debe seleccionar un jugador"} /> : <></>}
                    </div>
                    <div className="col"><button className="btn btn-danger" type="button" onClick={() => limpiar()}>X</button></div>
                </div>
                <div className="row">
                    <div className="col">
                        <div className="mb-3">
                        <label className="col-form-label">Gol/es</label>
                        <input type="number" className="form-control" {...register("goles", { required: "Debe ser mayor a 0", min: 1, max: 99 })} />
                        <ErrorMessage
                                    errors={errors}
                                    name="goles"
                                    render={() => <Requerido msg={ "Debe ser mayor a 0"} />}
                                />
                        </div>
                    </div>
                </div>
                <div className="col">
                            <div className="mb-3">
                                <label className="col-form-label">Fecha</label>
                                <input type="date" className="form-control" {...register("fecha", { required: "Debe completar la fecha" })} />
                                <ErrorMessage
                                    errors={errors}
                                    name="fecha"
                                    render={({ message }) => <Requerido msg={message} />}
                                />
                            </div>
                        </div>
                <hr></hr>
                <div className="row">
                    <div className="col">
                        <div className="mb-3 float-end">
                            <Link to="/goleadores" className="btn btn-outline-dark me-4">Cancelar</Link>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>

            </form>
        </div>
    )
}
export default AnotarGol;


