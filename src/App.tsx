import { useEffect, useState } from "react";
import FormularioRutina from "./components/FormularioRutina";
import type { Rutina } from "./types/rutina";
import type { EjercicioFormulario, RutinaFormulario } from "./types/formulario";
import ListaRutinas from "./components/ListaRutinas";
import DetalleRutina from "./components/DetalleRutina";
import type { Ejercicio } from "./types/ejercicio";
import Modal from "./components/ui/Modal";
import Button from "./components/ui/Button";

function App() {

  const [rutinas, setRutinas] = useState<Rutina[]>(() => {
    const rutinasGuardadas = localStorage.getItem("rutinas");
    return rutinasGuardadas ? JSON.parse(rutinasGuardadas) : [];
  });

  useEffect(() => {
    localStorage.setItem("rutinas", JSON.stringify(rutinas));
  }, [rutinas]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [rutinaSeleccionadaId, setRutinaSeleccionadaId] = useState<string | null>(null);
  const rutinaSeleccionada = rutinas.find((rutina) => rutina.id === rutinaSeleccionadaId);//Sirve para poder ver la rutina

  const [rutinaEditar, setRutinaEditar] = useState<Rutina | null>(null);

  function abrirModalCrear() {
    setRutinaEditar(null);
    setIsModalOpen(true);
  }

  function obtenerRutinaEditar(id: string) {
    const rutinaEncontrada = rutinas.find(rutina => rutina.id === id);
    if (rutinaEncontrada) {
      setRutinaEditar(rutinaEncontrada);
      setIsModalOpen(true);
    }
  }

  function cerrarModal() {
    setIsModalOpen(false);
    setRutinaEditar(null);
  }

  // Operaciones CRUD Rutinas
  function crearRutina(rutinaNueva: RutinaFormulario) {
    const rutina = {
      id: crypto.randomUUID(),
      ...rutinaNueva,
      ejercicios: [],
    };
    setRutinas(anteriores => [...anteriores, rutina]);
    cerrarModal();
  }

  function actualizarRutina(id: string, datosActualizados: RutinaFormulario) {
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === id ? { ...rutina, ...datosActualizados } : rutina
      )
    );
    cerrarModal();
  }

  function eliminarRutina(id: string) {
    setRutinas((prev) => prev.filter((rutina) => rutina.id !== id));
  }

  function entrarRutina(id: string) {
    setRutinaSeleccionadaId(id);
  }

  function volver() {
    setRutinaSeleccionadaId(null);
  }

  // Métodos de Ejercicios
  function agregarEjercicio(rutinaId: string, ejercicioNuevo: EjercicioFormulario) {
    const ejercicio = { id: crypto.randomUUID(), ...ejercicioNuevo };
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === rutinaId
          ? { ...rutina, ejercicios: [...rutina.ejercicios, ejercicio] }
          : rutina
      )
    );
  }

  const [ejercicioEditar, setEjercicioEditar] = useState<Ejercicio | null>(null);

  function obtenerEjercicioEditar(ejercicioId: string) {
    if (rutinaSeleccionada) {
      const ejercicioEncontrado = rutinaSeleccionada.ejercicios.find(
        (e) => e.id === ejercicioId
      );
      if (ejercicioEncontrado) setEjercicioEditar(ejercicioEncontrado);
    }
  }

  function cancelarEdicionEjercicio() {
    setEjercicioEditar(null);
  }

  function actualizaEjercicio(
    rutinaId: string,
    ejercicioId: string,
    datosActualizados: EjercicioFormulario
  ) {
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === rutinaId
          ? {
              ...rutina,
              ejercicios: rutina.ejercicios.map((e) =>
                e.id === ejercicioId ? { ...e, ...datosActualizados } : e
              ),
            }
          : rutina
      )
    );
  }

  function eliminarEjercicio(rutinaId: string, ejercicioId: string) {
    setRutinas((anteriores) =>
      anteriores.map((rutina) =>
        rutina.id === rutinaId
          ? {
              ...rutina,
              ejercicios: rutina.ejercicios.filter((e) => e.id !== ejercicioId),
            }
          : rutina
      )
    );
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
            onCrearEjercicio={agregarEjercicio}
            onEditar={obtenerEjercicioEditar}
            ejercicioEditar={ejercicioEditar}
            onActualizaEjercicio={actualizaEjercicio}
            cancelarEdicionEjercicio={cancelarEdicionEjercicio}
            onEliminarEjercicio={eliminarEjercicio}
            onVolver={volver}
          />
        ) : (
          <ListaRutinas
            rutinas={rutinas}
            onEntrar={entrarRutina}
            onEditar={obtenerRutinaEditar}
            onEliminar={eliminarRutina}
            onCrearRutina={abrirModalCrear}
          />
        )}
      </main>

      <Modal
        isOpen={isModalOpen}
        onClose={cerrarModal}
        title={rutinaEditar ? "Editar Rutina" : "Crear Nueva Rutina"}
      >
        <FormularioRutina
          onCrearRutina={crearRutina}
          rutinaEditar={rutinaEditar}
          cancelarEdicion={cerrarModal}
          onActualizarRutina={actualizarRutina}
        />
      </Modal>
    </div>
  );
}

export default App;