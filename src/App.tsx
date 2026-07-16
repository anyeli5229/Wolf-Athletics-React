import { useEffect, useState } from "react";
import FormularioRutina from "./components/FormularioRutina";
import type { Rutina } from "./types/rutina";
import type { RutinaFormulario } from "./types/formulario";
import ListaRutinas from "./components/ListaRutinas";


function App() {

  const [rutinas, setRutinas] = useState<Rutina[]>(() => {
    const rutinasGuardadas = localStorage.getItem('rutinas');
    if(rutinasGuardadas) {
      return JSON.parse(rutinasGuardadas);
    }

    return[];
  });

  useEffect(() => {
    localStorage.setItem('rutinas', JSON.stringify(rutinas));
  }, [rutinas])
  const [rutinaEditar, setRutinaEditar] = useState<Rutina | null>(null);

  function crearRutina(rutinaNueva: RutinaFormulario) {

    const rutina = {
      id: crypto.randomUUID(),
      ...rutinaNueva,
      ejercicios: []
    };


    setRutinas((anteriores) => [
      ...anteriores,
      rutina
    ]);

  }

  function obtenerRutinaEditar(id: string) {
    const rutinaEditar = rutinas.find((prevRutinas => prevRutinas.id === id));
    if (rutinaEditar) {
      setRutinaEditar(rutinaEditar);
    }
  }

  function actualizarRutina(id: string, datosActualizados: RutinaFormulario) {
    setRutinas(anteriores => anteriores.map(rutina => {
      if (rutina.id === id) {
        return {
          ...rutina,
          ...datosActualizados
        }
      }
      return rutina;
    })
    )
  }

  function cancelarEdicion() {
    setRutinaEditar(null);
  }

  function eliminarRutina(id: string) {
    setRutinas((prevRutinas) => prevRutinas.filter(rutinas => rutinas.id !== id))
  }

  return (
    <>

      <h1>🐺 Wolf Athletics</h1>

      <FormularioRutina
        onCrearRutina={crearRutina}
        rutinaEditar={rutinaEditar}//estado 
        cancelarEdicion={cancelarEdicion}
        onActualizarRutina={actualizarRutina}
      />

      <ListaRutinas
        rutinas={rutinas}
        onEliminar={eliminarRutina}
        onEditar={obtenerRutinaEditar}
      />

    </>
  );
}

export default App;