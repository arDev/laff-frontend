
import { Link } from "react-router";
import "./Navbar.css"
import logo from "../../assets/lafflogo.png"
import "bootstrap-icons/font/bootstrap-icons.css";
import { jwtDecode } from "jwt-decode";
import { useAuthStore } from "../../Store/useAuthStore";

function Navbar() {

  const { token } = useAuthStore();

  const getUser = () => {
    try {
      const token = localStorage.getItem("token");

      if (token != null) {
        const decoded: any = jwtDecode(token);
        return decoded.name;
      }
    } catch (error) {
      console.error("Error al decodificar el token:", error);
      return null
    }

  };

  return (
    <>
      {token == null || token == "" ? <></> :
        <nav className="navbar navbar-expand-lg bg-dark bg-body-tertiary ">
          <div className="container">
            <a className="navbar-brand" href="#">
              {
                <img className="img-responsive" src={logo} alt="Logo" />
              }
              L.a.f.f</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <Link className="nav-link" to="/equipos"><i className="bi bi-people-fill iconNavbar"></i>Equipos</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/jugadores"><i className="bi bi-person-fill iconNavbar"></i>Jugadores</Link>
                </li>
                <li className="nav-item dropdown">

                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                    <i className="bi bi-person-fill iconNavbar"></i>Goleadores
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/goles"><i className="bi  bi-pencil-square iconNavbar"></i>Goles</Link></li>
                    <li><Link className="dropdown-item" to="/tabla"><i className="bi bi-list-ol iconNavbar"></i>Tabla</Link></li>
                  </ul>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sanciones"><i className="bi bi-list-stars iconNavbar"></i>Sanciones</Link>
                </li>
              </ul>
              <ul className="navbar-nav">

                <li className="nav-item dropdown">

                  <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                    <i className="bi bi-person-fill iconNavbar"></i>{getUser()}
                  </a>
                  <ul className="dropdown-menu">
                    <li><Link className="dropdown-item" to="/cambiarpass"><i className="bi bi-box-arrow-right iconNavbar"></i>Cambiar Contraseña</Link></li>
                    <li><Link className="dropdown-item" to="/logout"><i className="bi bi-box-arrow-right iconNavbar"></i>Salir</Link></li>
                  </ul>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      }
    </>
  )
}

export default Navbar;