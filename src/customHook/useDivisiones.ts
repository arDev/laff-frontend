import { useEffect, useState } from "react";
import { IDivision } from "../interfaces/IDivision";
import { appSetting } from "../settings/appSettings";

export const useDivisiones = () => {
  const [divisiones, setDivisiones] = useState<IDivision[]>([]);
  
  useEffect(() => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
    };

    fetch(appSetting.urlApi +
      "/laff/api.php?request=divisiones",
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        setDivisiones(result);
      })
      .catch((error) => console.error(error));
  }, []);

  return { divisiones, setDivisiones };
};
