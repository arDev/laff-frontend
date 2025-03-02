import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface ResponseData<T> {
  data: T[];
  callFetch: (
    _request: string,
    _method: string,
    _body: T | null,
    _param: string | null
  ) => void;
}

const useAPI = <T>(): ResponseData<T> => {
  const [data, setData] = useState<T[]>([]);
  const [method, setMethod] = useState<string>("");
  const [request, setRequest] = useState<string>("");
  const [param, setParam] = useState<string | null>("");
  const [body, setBody] = useState<T | null>();
  const navigate = useNavigate();

  const log = true;

  useEffect(() => {
    switch (method) {
      case "":
        break;
      case "Limpiar":
        limpiar();
        break;
      default:
        callAPI();
    }
  }, [method]);

  const limpiar = async () => {
    setData([]);
  };

  const callAPI = () => {
    if (log) {
      console.log("variables");
      console.log(request);
      console.log(method);
      console.log(body);
      console.log(param);
    }

    const _method = method;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append(
      "Authorization",
      "Bearer " + localStorage.getItem("token")
    );

    const requestOptions = {
      method: _method,
      headers: myHeaders,
      body: _method == "GET" ? null : JSON.stringify(body),
    };
    setMethod("");

    fetch(
      "http://localhost/laff/api.php?request=" + request + param,
      requestOptions
    )
      .then((response) => {
        if (response.status == 200) return response.json();
        else if (response.status == 401) {
          alert("No estas autorizado maquina!");
          navigate("/");
        } else {
          console.log(response.text())
          throw new Error("Paso algo!")
        }
      })
      .then((result) => {
        if (log) {
          console.log("result");
          console.log(result);
        }
        if (result !== null && _method == "GET") {
          setData(result);
        } else alert(result.msg);
        if (_method == "DELETE" && data !== null && body != null)
          setData(data.filter((x) => x != body));
      })
      .catch((error) => console.error(error));
  };

  const callFetch = (
    _request: string,
    _method: string,
    _body: T | null,
    _param: string | null
  ) => {
    setRequest(_request);
    setBody(_body);
    setParam(_param === null ? "" : _param);
    setMethod(_method);
  };

  return { data, callFetch };
};

export default useAPI;
