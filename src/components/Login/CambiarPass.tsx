import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../Store/useAuthStore";

const CambiarPass = () => {
    const { clearToken } = useAuthStore()
    const navigate = useNavigate();
    const [pass, setpass] = useState("");
    const [newPass, setnewPass] = useState("");
    const [newPass2, setnewPass2] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        cambiar()
        e.preventDefault();
    };

    const cambiar = () => {

        if (pass == "" || newPass == "" || newPass != newPass2) {
            alert("Complete los campos")
            return;
        }
        const myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append(
            "Authorization",
            "Bearer " + localStorage.getItem("token")
        );


        const raw = JSON.stringify({
            "pass": pass,
            "newPass": newPass
        });

        const requestOptions = {
            method: "POST",
            headers: myHeaders,
            body: raw,
        };

        fetch("http://localhost/laff/api.php?request=CambiarPass", requestOptions)
            .then((response) => {
                if (response.ok) {
                    navigate("/")
                    clearToken()
                }
                return response.text()
            }
            )
            .then((result) => {
                alert(JSON.parse(result).msg)
                setpass("")
            }
            )
            .catch((error) => console.error(error));
    }

    return (
        <>
            <div className="container pt-4">
                <legend>Cambiar Contraseña</legend>
                <hr />
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className="mb-3">
                        <label className="offset-2 form-label">Contraseña actual</label>
                        <div className="offset-2 col-8">
                            <input id="contrasena" name="contrasena" type="password" className="form-control"
                                value={pass}
                                onChange={(e) => setpass(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="offset-2 col-8">
                            <label className="form-label">Nueva Contraseña</label>

                            <input id="newPass" name="newPass" type="password" className="form-control"
                                value={newPass}
                                onChange={(e) => setnewPass(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="mb-3">
                        <div className="offset-2 col-8">
                            <label className="form-label">repetir nueva Contraseña</label>

                            <input id="newPass2" name="newPass2" type="password" className="form-control"

                                value={newPass2}
                                onChange={(e) => setnewPass2(e.target.value)} />
                        </div>
                    </div>

                    <div className="offset-2 col-8">
                        <button name="submit" type="submit" className="btn btn-primary">Cambiar</button>
                    </div>

                </form>

            </div>
        </>
    )
}

export default CambiarPass;

