
import { Link } from "react-router";
import "./Navbar.css"
import logo from "../../assets/lafflogo.png"
import "bootstrap-icons/font/bootstrap-icons.css";

function Navbar() {

  return (
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
            <li className="nav-item">
              <a className="nav-link" aria-disabled="true">Reportes</a>
            </li>


          </ul>
          <ul className="navbar-nav">

            <li className="nav-item dropdown">

              <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">

                <i className="bi bi-person-fill iconNavbar"></i>Usuario
              </a>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#"><i className="bi bi-box-arrow-right iconNavbar"></i>Salir</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>

  )
}

export default Navbar;