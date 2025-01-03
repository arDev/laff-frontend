import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useEffect, useRef, useState } from "react";
import "./FichaPersona.css"
import { ErrorMessage } from "@hookform/error-message";
import Requerido from "../MsgCampos/Requerido";
import { IPersona } from "../../interfaces/IPersona";
import Webcam from "react-webcam";
import imagen from "../../assets/sinImagen.jpg"
import FormInput from "../Formulario/FormInput";

declare var bootstrap: any;

type FichaJug = {
    persona?: IPersona
}

const videoConstraints = {
    width: 400,
    height: 400,
};


const FichaPersona = ({ persona }: FichaJug) => {

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
        console.log(data)

        bootstrap.Modal.getInstance(document.getElementById('exampleModal')).hide();
    }

    const Insert = (data: IPersona) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost/laff/api.php?request=persona", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    const Update = (data: IPersona) => {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify(data);

        const requestOptions = {
            method: "PUT",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost/laff/api.php?request=persona", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        reset(persona)
        setUrl(imagen)
    }, [persona])

    const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);
    const [url, setUrl] = useState<string | null>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);
        }
        setCaptureEnable(false)
        console.log(imageSrc)
    }, [webcamRef]);

    const Comenzar = () => {
        setUrl(null)
        setCaptureEnable(true)
    }

    return (
        <div className="modal modal-xl fade" id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header borderFicha">
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Ficha Personal</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body borderFicha">
                            <div className="row">
                                <div className="col">
                                    <div className="mb-3">
                                    <FormInput
                                        label="Email"
                                        name="email"
                                        type="email"
                                        register={register}
                                        errors={errors}
                                        required={true}
                                        placeholder="Ingresa tu correo electrónico"
                                    />
                                    </div>
                                </div>
                            </div>
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
                                                <img src={url} alt="Screenshot" width={360} height={360} />
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

                        </div>
                        <div className="modal-footer borderFicha">
                            <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancelar</button>
                            <button type="submit" className="btn btn-primary">Guardar</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
export default FichaPersona;