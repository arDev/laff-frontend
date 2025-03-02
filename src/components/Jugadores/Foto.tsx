import { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { IFoto } from "../../interfaces/IFoto";
import useAPI from "../../customHook/useAPI";
import blackImg from "../../assets/sinImagen.jpg"

type props = {
    id: number
    url: string | null
    setUrl: React.Dispatch<React.SetStateAction<string | null>>
}

const Foto = ({id, url, setUrl} : props) =>
{
    const { data: imagenData, callFetch: callImagen } = useAPI<IFoto>()

    const videoConstraints = {
        width: 400,
        height: 400,
    };

    const Comenzar = () => {
        setUrl(null)
        setCaptureEnable(true)
    }

    const cargarFoto = () => {
        if (id == undefined)
            return

        callImagen("foto", "GET", null, "&id=" + id)
    }

    const [isCaptureEnable, setCaptureEnable] = useState<boolean>(false);
    const webcamRef = useRef<Webcam>(null);

    const capture = useCallback(() => {
        const imageSrc = webcamRef.current?.getScreenshot();
        if (imageSrc) {
            setUrl(imageSrc);
        }
        setCaptureEnable(false)
    }, [webcamRef]);

    useEffect(() => {

        if (imagenData != null && imagenData?.length == 1 && imagenData[0].imagen !== "")
            setUrl(imagenData[0].imagen)
    }
        , [imagenData])

        
    useEffect(() => {
        cargarFoto()
    },[])

    return (<>
<div className="col-6 text-center">
                        {url && (
                            <>
                                <div>
                                    <img src={url == "" ? blackImg : url} alt="Screenshot" width={400} height={400} />
                                </div>
                            </>
                        )}
                        {isCaptureEnable && (
                            <>
                                <div>
                                    <Webcam
                                        audio={false}
                                        width={400}
                                        height={400}
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
    </>)
}

export default Foto;