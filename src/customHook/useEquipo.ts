import { useEffect, useState } from "react";
import { IPersona } from "../interfaces/IPersona";
import { IEquipo } from "../interfaces/IEquipo";
import { appSetting } from "../settings/appSettings";

type tCargo = {
    cargo?: string,
    value: number,
    label: string,
    nroDoc?: string
}

export const useEquipo = (equipo?: IEquipo) => {
    const [file, setFile] = useState<string>();
    const [dtSelect, setDtSelect] = useState<tCargo>({ value: 0, label: "Sin Dt, seleccione uno" })
    const [delegado1, setDelegado1] = useState<tCargo>({ value: 0, label: "Sin Delegado, seleccione uno" })
    const [delegado2, setDelegado2] = useState<tCargo>({ value: 0, label: "Sin Delegado, seleccione uno" })
    const [division, setDivision] = useState<number>(0)

    const [jugadores, setJugadores] = useState<IPersona[]>([])
   
    const cargarDelegados = () => {

        if (equipo?.id == undefined)
            return

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
          );
          console.log("token")
          console.log(localStorage.getItem("token"))
          
        const requestOptions = {
            method: "GET",
            headers: myHeaders,
        };

        fetch(appSetting.urlApi + "/laff/api.php?request=equipo_get_delegados&id=" + equipo.id, requestOptions)
            .then((response) => response.json())
            .then((delegados) => {
                delegados.map((item: tCargo) => {
                    if (item?.cargo == "dt")
                        setDtSelect({ value: item.value, label: item.label, nroDoc : item?.nroDoc })
                    if (item?.cargo == "del")
                        setDelegado1({ value: item.value, label: item.label, nroDoc : item?.nroDoc })
                    if (item?.cargo == "del2")
                        setDelegado2({ value: item.value, label: item.label, nroDoc : item?.nroDoc })
                    if (item?.cargo == "div")
                        setDivision(item.value)
                })
            })
            .catch((error) => console.error(error));
    }

    const cargarJugadores = () => {
        if (equipo == undefined)
            return

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

        fetch(appSetting.urlApi + "/laff/api.php?request=equipo_get_jugadores&id=" + equipo.id, requestOptions)
            .then((response) => response.json())
            .then((resultados) => {
                const cuantos = 37 - resultados.length
                for(let i = 0; i< cuantos; i++)
                    resultados.push({id : 0} as IPersona)
                
                    setJugadores(resultados)
                })
            .catch((error) => console.error(error));
    }

    const cargarEscudo = () => {
        if (equipo == undefined)
            return

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

        fetch(appSetting.urlApi + "/laff/api.php?request=escudo&id=" + equipo.id, requestOptions)
            .then((response) => response.json())
            .then((escudo) => {
                    setFile(escudo[0].imagen)
                })
            .catch((error) => console.error(error));
    }

    useEffect(() => {
        cargarEscudo()
        cargarDelegados()
        cargarJugadores()
    },[])

    return {dtSelect, setDtSelect, delegado1 , setDelegado1,delegado2, setDelegado2, jugadores
        , file, setFile , setJugadores, division, setDivision}
    
}