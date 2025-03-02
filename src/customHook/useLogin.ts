import { jwtDecode } from "jwt-decode";

const useLogin = () => {
  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const isTokenExpired = () => {
    const token = getToken();
    if (!token) return true;

    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000; // Tiempo actual en segundos

      if (decoded && decoded.exp && decoded.exp < currentTime) {
        if (currentTime - decoded.exp < 60) {
          //renovar();
          console.log("renovar")
        }
        return true;
      }
      return false;
    } catch (error) {
      return true; // Si el token no es válido
    }
  };
/*
  const renovar = () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      username: "admin",
      password: "admin",
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
    };

    fetch(appSetting.urlApi + "/laff/login/index.php", requestOptions)
      .then((response) => response.json())
      .then((result) => localStorage.getItem("authToken", result.token))
      .catch((error) => console.error(error));
  };
*/
  return { isTokenExpired, getToken };
};
export default useLogin;
