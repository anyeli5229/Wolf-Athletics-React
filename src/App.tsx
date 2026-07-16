import { useState } from "react";
import RutinaCard from "./components/RutinaCard";
import FormularioRutina from "./components/FormularioRutina";
import type { Rutina } from "./types/rutina";
import type { RutinaFormulario } from "./types/formulario";


function App() {
  const [rutinas, setRutinas] = useState<Rutina[]>([]);

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

  function eliminarRutina(id: string) {
    setRutinas((prevRutinas) => prevRutinas.filter(rutinas => rutinas.id !== id))
  }

  return (
    <>

      <h1>🐺 Wolf Athletics</h1>

      <FormularioRutina
        onCrearRutina={crearRutina}
      />

      {rutinas.map(rutina => (
        <RutinaCard
          key={rutina.id}
          rutina={rutina}
          onEliminar={eliminarRutina}
        />
      ))}

    </>
  );
}

export default App;