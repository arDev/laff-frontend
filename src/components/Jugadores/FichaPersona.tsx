import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import "./FichaPersona.css"
import { ErrorMessage } from "@hookform/error-message";
import Requerido from "../MsgCampos/Requerido";
import { IPersona } from "../../interfaces/IPersona";
import Webcam from "react-webcam";
import imagen from "../../assets/sinImagen.jpg"
import blackImg from "../../assets/sinImagen.jpg"
import { Link, useLocation, useNavigate } from "react-router";

declare var bootstrap: any;

type FichaJug = {
    personaParam?: IPersona
}

const videoConstraints = {
    width: 400,
    height: 400,
};


const FichaPersona = ({ personaParam }: FichaJug) => {
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        //watch,
        reset,
        formState: { errors },
    } = useForm<IPersona>()

    const onSubmit: SubmitHandler<IPersona> = (data) => {

        if (data.id > 0) {
            Update(data)
        }
        else {
            Insert(data)
        }
    }

    const Insert = (data: IPersona)  => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "persona": data,
            "foto": url,
        })

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost/laff/api.php?request=persona", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                alert(result)
                navigate("/jugadores")
            })
            .catch((error) => console.error(error));
    }

    const Update = async (data: IPersona)   => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "persona": data,
            "foto": url,
        })
        console.log(url)
        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost/laff/api.php?request=persona", requestOptions)
            .then((response) => response.text())
            .then((result) => {
                alert(result)
                navigate("/jugadores")
            }
            )
            .catch((error) => console.error(error));
    }

    const location = useLocation(); // useLocation para acceder al estado
    const { persona } = location.state || {};

    useEffect(() => {
        reset(personaParam ?? persona)
        setUrl(imagen)
        cargarFoto()
    }, [persona])

const cargarFoto = () => {
    if (persona == undefined)
        return

    //hacer la magia
    const requestOptions = {
        method: "GET"
    };

    fetch("http://localhost/laff/api.php?request=foto&id=" + persona.id, requestOptions)
        .then((response) => response.json())
        .then((foto) => {
            if (foto[0].imagen != "")
                setUrl(foto[0].imagen)
        })
        .catch((error) => console.error(error));
}

const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
const webcamRef = useRef<Webcam>(null);
const [url, setUrl] = useState<string | null>(null);

const capture = useCallback(() => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (imageSrc) {
        setUrl(imageSrc);
    }
    setCaptureEnable(false)
}, [webcamRef]);

const Comenzar = () => {
    setUrl(null)
    setCaptureEnable(true)
}

return (
    <div className="container">
        <h3><i className="bi bi-person-fill iconNavbar"></i>{persona == undefined ? "Nuevo" : "Editar"} Jugador</h3>
        <hr></hr>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">

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
                                <input className="form-control" {...register("nroDoc", { required: "Debe completar el DNI" })} />
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
                        <label className="col-form-label">Provincia:</label>
                        <input type="text" className="form-control"
                            {...register("provincia", { required: "Debe completar la Provincia" })}
                        />
                        <ErrorMessage
                            errors={errors}
                            name="provincia"
                            render={({ message }) => errors.provincia?.type == "required" ?
                                <Requerido msg={message} />
                                : <p className="">{message}</p>}
                        />
                    </div>
                </div>
                <div className="col-6 text-center">
                    {url && (
                        <>
                            <div>
                                <img src={url == "" ? blackImg : url} alt="Screenshot" width={540} height={360} />
                            </div>
                        </>
                    )}
                    {isCaptureEnable && (
                        <>
                            <div>
                                <Webcam
                                    audio={false}
                                    width={540}
                                    height={360}
                                    ref={webcamRef}
                                    screenshotQuality={0.5}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                />
                            </div>
                            <button className="btn btn-primary" onClick={capture}>
                                Tomar Foto
                            </button>
                        </>
                    )}
                    {isCaptureEnable || (
                        <button className="btn btn-primary mt-2" onClick={() => Comenzar()}>Capturar</button>
                    )}
                </div>
            </div>

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