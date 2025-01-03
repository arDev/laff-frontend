import { useEffect, useState } from "react";
import { IPersona } from "../interfaces/IPersona";


    export const useJugadores = (filtro:string) => {
    
    const [jugadores, setJugadores] = useState<IPersona[]>([]);
    useEffect(() => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };
        
        fetch("http://localhost/laff/api.php?request=persona&filtro=" + filtro, requestOptions)
            .then((response) => response.json())
            .then((result) => setJugadores(result))
            .catch((error) => console.error(error));
    }, [filtro]);

    return { jugadores }

    }