import { Route, Routes } from "react-router-dom";
import { useModal } from "./hooks/useModal";
import Home from "./pages/Home";
import { RutinaPage } from "./pages/RutinaPage";
import EjercicioPage from "./pages/EjercicioPage";
import LoginPage from "./pages/Loginpage";
import { RutaProtegida } from "./components/RutaProtegida";

function App() {
  const modal = useModal();

  return (
    <Routes>

      <Route path="/login" element={<LoginPage />} />

      {/* Rutas protegidas */}
      <Route element={<RutaProtegida />}>
        <Route path="/" element={<Home modal={modal} />} />
        <Route path="/rutina/:id" element={<RutinaPage />} />
        <Route path="/ejercicios" element={<EjercicioPage />} />
      </Route>
    </Routes>
  );
}

export default App;