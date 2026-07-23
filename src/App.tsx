import { useRutinas } from "./hooks/useRutinas";
import { useModal } from "./hooks/useModal";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { RutinaPage } from "./pages/RutinaPage";


function App() {

  const rutinas = useRutinas();
  const modal = useModal();

  return (
    // <div className="min-h-screen text-slate-700 p-6">


    //   <main className="max-w-7xl mx-auto">
    //     {rutinaSeleccionada ? (
    //       <DetalleRutina
    //         rutina={rutinaSeleccionada}
    //         onEditar={obtenerEjercicioEditar}
    //         onCrearEjercicio={agregarEjercicio}
    //         ejercicioEditar={ejercicioEditar}
    //         onActualizaEjercicio={actualizarEjercicio}
    //         cancelarEdicionEjercicio={cancelarEdicionEjercicio}
    //         onEliminarEjercicio={eliminarEjercicio}
    //         onVolver={volver}
    //       />
    //     ) : (

    //     )}
    //   </main>
    // </div>

    <Routes>
      <Route
        path="/"
        element={
          <Home
            rutinas={rutinas}
            modal={modal}
          />
        }
      />

      <Route
        path="/rutina/:id"
        element={
          <RutinaPage
            rutinas={rutinas}
          />
        }
      />
    </Routes>
  );
}

export default App;