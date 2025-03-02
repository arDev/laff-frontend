import { useEffect, useState } from "react";
import { IPersona } from "../interfaces/IPersona";
import { appSetting } from "../settings/appSettings";


    export const useJugadores = (filtro:string) => {
    
    const [jugadores, setJugadores] = useState<IPersona[]>([]);
    useEffect(() => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        
        fetch(appSetting.urlApi + "/laff/api.php?request=persona&filtro=" + filtro, requestOptions)
            .then((response) => response.json())
            .then((result) => setJugadores(result))
            .catch((error) => console.error(error));
    }, [filtro]);

    return { jugadores, setJugadores }

    }