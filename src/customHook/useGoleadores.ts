import { useEffect, useState } from "react";
import { IGoleadores } from "../interfaces/IGoleadores";
import { appSetting } from "../settings/appSettings";


    export const useGoleadores = (filtro:string) => {
    
    const [goleadores, setGoleadores] = useState<IGoleadores[]>([]);
    
    function CargarGoleadores() {
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
    
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        
        fetch(appSetting.urlApi + "/laff/api.php?request=goles&filtro=" + filtro, requestOptions)
            .then((response) => response.json())
            .then((result) => setGoleadores(result))
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        CargarGoleadores()
    }, [filtro]);

    return { goleadores, setGoleadores }

    }


