import { useRef, useState } from "react";
import { useNavigate } from "react-router";
import "./Login.css"
import { useAuthStore } from "../../Store/useAuthStore";
import logo from "../../assets/lafflogo.png"

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const inputPassword = useRef<HTMLInputElement | null>(null);

    const { setToken } = useAuthStore();

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {

        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        const raw = JSON.stringify({
            "user": username,
            "pass": password
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw
        };

        fetch("http://localhost/laff/login.php", requestOptions)
            .then((response) => response.json())
            .then((result) => {
                console.log(result)
                localStorage.setItem("token", result.token)
                setToken(result.token)
                navigate("/equipos")
            })
            .catch((error) => console.error(error));


        e.preventDefault();
    };

    const verPass = () => {
        if (inputPassword.current) {
            inputPassword.current.type = "text"
        }
    }

    const NoPass = () => {
        if (inputPassword.current) {
            inputPassword.current.type = "password"
        }
    }

    //useEffect(() => {

    //const berallogin: string | null = window.localStorage.getItem('berallogin')

    //const user = berallogin == null ? null : JSON.parse(berallogin)
    //if (user !== null) {
    //setUser(user)
    //navigate("/equipos")
    //}
    //}, [])

    return (
        <div className="centered-container">
            <div className="container-box wrapper">
                <div className="row">
                    <div className="col logo">
                    <img  className="img-responseive" src={logo} alt="Logo" />
                    </div>
                </div>
                <hr/>
                <div className="row ">          
                    <div className="col-12">
                        <form onSubmit={(e) => handleSubmit(e)}>
                            <div className="">
                                <label className="form-label">Usuario</label>
                                <input
                                    name="username"
                                    type="text"
                                    className="form-control"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="">
                                <label className="form-label">Contraseña</label>
                                <div className="my-class">
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        ref={inputPassword}
                                        required
                                    />

                                    <i className="bi bi-eye marginEye fa-lg"
                                        onMouseDown={verPass}
                                        onMouseUp={NoPass}
                                        onMouseOut={NoPass}
                                    ></i>
                                </div>

                            </div>
                            <div className="d-flex justify-content-center mt-4">
                                <button className="boton-iniciar" type="submit">
                                    Iniciar sesión
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;