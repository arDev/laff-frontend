import { BrowserRouter, Route, Routes } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Jugadores from "./components/Jugadores/Jugadores"
import Equipos from "./components/Equipos/Equipos"
import EquipoFicha from "./components/Equipos/EquipoFicha"
import FichaPersona from "./components/Jugadores/FichaPersona"
import Carnet from "./components/PDF/Carnet"


function App() {
  
  return (
<BrowserRouter>
<Navbar />
<Routes>
    <Route path="/" element={<Jugadores />}/>
    <Route path="/jugadores" element={<Jugadores />}/>
    <Route path="/equipos" element={<Equipos />}/>
    <Route path="/equipos/nuevo" element={<EquipoFicha />}/>
    <Route path="/jugadores/nuevo" element={<FichaPersona />}/>
    <Route path="/carnet" element={<Carnet />}/>
</Routes>
</BrowserRouter>
  )
}

export default App
