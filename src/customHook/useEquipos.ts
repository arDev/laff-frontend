import { useEffect, useState } from "react";
import { IEquipo } from "../interfaces/IEquipo";

export const useEquipos = (filtro: string) => {
  const [equipos, setEquipos] = useState<IEquipo[]>([]);
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(
      "http://localhost/laff/api.php?request=equipo&filtro=" + filtro,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setEquipos(result);
      })
      .catch((error) => console.error(error));
  }, [filtro]);

  return { equipos };
};
