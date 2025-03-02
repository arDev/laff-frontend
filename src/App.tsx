import { BrowserRouter, Route, Routes } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Jugadores from "./components/Jugadores/Jugadores"
import Equipos from "./components/Equipos/Equipos"
import EquipoFicha from "./components/Equipos/EquipoFicha"
import FichaPersona from "./components/Jugadores/FichaPersona"
import Carnet from "./components/PDF/Carnet"
import ListadoJugadores from "./components/ListadoJugadores/ListadoJugadores"
import Login from "./components/Login/Login"
import ProtectedRoute from "./components/ProtectedRoute"
import { Logout } from "./components/Login/Logout"
import { FalsoLogin } from "./components/Login/FalsoLogin"
import AnotarGol from "./components/Goleadores/AnotarGol"
import Tabla from "./components/Goleadores/Tabla"
import Goles from "./components/Goleadores/Goles"
import CambiarPass from "./components/Login/CambiarPass"


function App() {

  return (
    <BrowserRouter>      
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/falsologin" element={<FalsoLogin />} />
        <Route element={<ProtectedRoute />}>
        <Route path="/cambiarpass" element={<CambiarPass/>} />
          <Route path="/equipos" element={<Equipos />} />
          <Route path="/jugadores" element={<Jugadores />} />
          <Route path="/goles" element={<Goles />} />
          <Route path="/tabla" element={<Tabla />} />
          <Route path="/goleadores/anotargol" element={<AnotarGol />} />

          <Route path="/equipos/nuevo" element={<EquipoFicha />} />
          <Route path="/jugadores/nuevo" element={<FichaPersona />} />
          <Route path="/carnet" element={<Carnet />} />
          <Route path="/listadojugadores" element={<ListadoJugadores />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
