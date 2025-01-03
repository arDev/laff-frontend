import { BrowserRouter, Route, Routes } from "react-router"
import Navbar from "./components/Navbar/Navbar"
import Jugadores from "./components/Jugadores/Jugadores"
import Equipos from "./components/Equipos/Equipos"
import EquipoFicha from "./components/Equipos/EquipoFicha"


function App() {
  
  return (
<BrowserRouter>
<Navbar />
<Routes>
    <Route path="/" element={<Jugadores />}/>
    <Route path="/jugadores" element={<Jugadores />}/>
    <Route path="/equipos" element={<Equipos />}/>
    <Route path="/equipos/nuevo" element={<EquipoFicha />}/>
</Routes>
</BrowserRouter>
  )
}

export default App
