import FormularioRutina from "./components/FormularioRutina";
import ListaRutinas from "./components/ListaRutinas";
import DetalleRutina from "./components/DetalleRutina";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";
import { useRutinas } from "./hooks/userRutinas";
import type { RutinaFormulario } from "./types/formulario";
import { useModal } from "./hooks/useModal";


function App() {

  const { rutinas, rutinaSeleccionada, rutinaEditar, crearRutina, actualizarRutina, eliminarRutina, entrarRutina, volver, seleccionarRutinaEditar, cancelarEdicion, ejercicioEditar, agregarEjercicio, obtenerEjercicioEditar, cancelarEdicionEjercicio, actualizarEjercicio, eliminarEjercicio } = useRutinas();

  const modalRutina = useModal();

  function abrirModalCrear() {
    cancelarEdicion();
    modalRutina.abrir();
  }

  function cerrarModal() {
    cancelarEdicion();
    modalRutina.cerrar();
  }

  function handleEditarRutina(id: string) {
    seleccionarRutinaEditar(id);
    modalRutina.abrir();
  }

  function handleCrearRutina(datos: RutinaFormulario) {
    crearRutina(datos);
    modalRutina.cerrar();
  }

  function handleActualizarRutina(id: string, datos: RutinaFormulario) {
    actualizarRutina(id, datos);
    modalRutina.cerrar();
  }


  return (
    <div className="min-h-screen text-slate-700 p-6">

      <header className="flex items-center justify-between mb-8 max-w-7xl mx-auto">
        <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
          <span>🐺</span> Wolf Athletics
        </h1>

        {!rutinaSeleccionada && (
          <Button variant="primary" onClick={abrirModalCrear}>
            + Crear rutina
          </Button>
        )}
      </header>

      <main className="max-w-7xl mx-auto">
        {rutinaSeleccionada ? (
          <DetalleRutina
            rutina={rutinaSeleccionada}
            onEditar={obtenerEjercicioEditar}
            onCrearEjercicio={agregarEjercicio}
            ejercicioEditar={ejercicioEditar}
            onActualizaEjercicio={actualizarEjercicio}
            cancelarEdicionEjercicio={cancelarEdicionEjercicio}
            onEliminarEjercicio={eliminarEjercicio}
            onVolver={volver}
          />
        ) : (
          <ListaRutinas
            rutinas={rutinas}
            onEntrar={entrarRutina}
            onEditar={handleEditarRutina}
            onEliminar={eliminarRutina}
            onCrearRutina={abrirModalCrear}
          />
        )}
      </main>

      <Modal
        isOpen={modalRutina.isOpen}
        onClose={cerrarModal}
        title={rutinaEditar ? "Editar Rutina" : "Crear Nueva Rutina"}
      >
        <FormularioRutina
          onCrearRutina={handleCrearRutina}
          rutinaEditar={rutinaEditar}
          cancelarEdicion={cerrarModal}
          onActualizarRutina={handleActualizarRutina}
        />
      </Modal>
    </div>
  );
}

export default App;