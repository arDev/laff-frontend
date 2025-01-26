import { SubmitHandler, useForm } from "react-hook-form"
import { IEquipo } from "../../interfaces/IEquipo"
//import { ErrorMessage } from "@hookform/error-message";
//import Requerido from "../MsgCampos/Requerido";
import { useEffect, useState } from "react";
import "./FichaEquipo.css"
import AsyncSelect from "react-select/async";
//import escudo from "../../assets/sinImagen.jpg"
import FileResizer from "react-image-file-resizer";
import { ErrorMessage } from "@hookform/error-message";
import Requerido from "../MsgCampos/Requerido";
//import { IPersona } from "../../interfaces/IPersona";
declare var bootstrap: any;

type FichaEquip = {
    equipo?: IEquipo
}

const FichaEquipo = ({ equipo }: FichaEquip) => {
    const [file, setFile] = useState<string>();


    const [dataEquipo, setDataEquipo] = useState<IEquipo | null>(null);
    const [dt, setDt] = useState<number>(0)
    const [delegado1, setDelegado1] = useState<number>(0)
    const [delegado2, setDelegado2] = useState<number>(0)

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<IEquipo>()

    const onSubmit: SubmitHandler<IEquipo> = (data) => {

        setDataEquipo(data)
        if (data.id > 0) {
            alert("Updae")
            //Update(data)
        }
        else {
            insert()
            //Insert(data)
        }



        bootstrap.Modal.getInstance(document.getElementById('equipoModal')).hide();
    }

    useEffect(() => {
        reset(equipo)
    }, [equipo])


    const loadOptions = async (inputValue: string) => {
        if (!inputValue) return [];

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        const response = await fetch("http://localhost/laff/api.php?request=persona&filtro=" + inputValue, requestOptions)
        const data = await response.json()

        return data
    }


    const setSelectedOption = (e: any, combo: string) => {
        if (e === null) {
            if (combo == "dt")
                setDt(0)
            if (combo == "d1")
                setDelegado1(0)
            if (combo == "d2")
                setDelegado2(0)
            return;
        }
        const selectedOption = e.value;
        if (combo == "dt")
            setDt(selectedOption)
        if (combo == "d1")
            setDelegado1(selectedOption)
        if (combo == "d2")
            setDelegado2(selectedOption)
    }

    const onChangeSelectedOption = (e: any, combo:string) => {
        setSelectedOption(e,combo)
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


    const insert = () => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "equipo": dataEquipo,
            "dt": dt,
            "del1": delegado1,
            "del2": delegado2,
            "escudo": file
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        };

        fetch("http://localhost/laff/api.php?request=equipo", requestOptions)
            .then((response) => response.text())
            .then((result) => console.log(result))
            .catch((error) => console.error(error));

    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="modal" id="equipoModal">
                    <div className="modal-dialog modal-lg">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h4 className="modal-title">Equipo</h4>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-hidden="true"></button>
                            </div><div className="container"></div>
                            <div className="modal-body">
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="col-form-label">Nombre:</label>
                                            <input className="form-control"
                                                {...register("nombre", { required: "Algo" })} />
                                            <ErrorMessage
                                                errors={errors}
                                                name="nombre"
                                                render={({ message }) => <Requerido msg={message} />}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="col-form-label">Escudo:</label>
                                            <input type="file" onChange={onChange} />
                                            <img src={file} />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="col-form-label">Nombre:</label>
                                            <AsyncSelect
                                                noOptionsMessage={() => 'No se encontraron datos'}
                                                loadingMessage={() => 'Buscando . . .'}
                                                isClearable={true}
                                                placeholder="Buscar Dt"
                                                loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e,"dt")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="col-form-label">Delegado:</label>
                                            <AsyncSelect
                                                noOptionsMessage={() => 'No se encontraron datos'}
                                                loadingMessage={() => 'Buscando . . .'}
                                                isClearable={true}
                                                placeholder="Buscar delegado"
                                                loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e,"d1")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col">
                                        <div className="mb-3">
                                            <label className="col-form-label">Delegado 2:</label>
                                            <AsyncSelect
                                                noOptionsMessage={() => 'No se encontraron datos'}
                                                loadingMessage={() => 'Buscando . . .'}
                                                placeholder="Buscar delegado"
                                                isClearable={true}
                                                loadOptions={(e) => loadOptions(e)} onChange={(e) => onChangeSelectedOption(e,"d2")} className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="modal-footer">
                                <a href="#" data-bs-dismiss="modal" className="btn btn-outline-dark">Close</a>
                                <button type="submit" className="btn btn-primary">Guardar</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </>
    )
}

export default FichaEquipo