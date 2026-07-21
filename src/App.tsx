import { useEffect, useState } from "react";
import FormularioRutina from "./components/FormularioRutina";
import type { Rutina } from "./types/rutina";
import type { EjercicioFormulario, RutinaFormulario } from "./types/formulario";
import ListaRutinas from "./components/ListaRutinas";
import DetalleRutina from "./components/DetalleRutina";
import type { Ejercicio } from "./types/ejercicio";


function App() {


  const [rutinas, setRutinas] = useState<Rutina[]>(() => {
    const rutinasGuardadas = localStorage.getItem('rutinas');
    if (rutinasGuardadas) {
      return JSON.parse(rutinasGuardadas);
    }

    return [];
  });

  useEffect(() => {
    localStorage.setItem('rutinas', JSON.stringify(rutinas));
  }, [rutinas])

  const [rutinaSeleccionadaId, setRutinaSeleccionadaId] = useState<string | null>(null);

  // Esta constante se calcula cada vez que React se renderiza
  const rutinaSeleccionada = rutinas.find(rutina => rutina.id === rutinaSeleccionadaId);

  function entrarRutina(id: string) {
    setRutinaSeleccionadaId(id);
  }

  function volver() {
    setRutinaSeleccionadaId(null);
  }
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



  function agregarEjercicio(rutinaId: string, ejercicioNuevo: EjercicioFormulario) {

    const ejercicio = {
      id: crypto.randomUUID(),
      ...ejercicioNuevo
    }

    setRutinas((anteriores) => anteriores.map(rutina => {
      if (rutina.id === rutinaId) {
        return {
          ...rutina,
          ejercicios: [
            ...rutina.ejercicios,
            ejercicio
          ]
        }
      }
      return rutina;
    }))
  }

  const [ejercicioEditar, setEjercicioEditar] = useState<Ejercicio | null>(null)

  function obtenerEjercicioEditar(ejercicioId: string) {
    if (rutinaSeleccionada) {
      const ejercicioEncontrado = rutinaSeleccionada.ejercicios.find(
        ejercicio => ejercicio.id === ejercicioId
      );

      if (ejercicioEncontrado) {
        setEjercicioEditar(ejercicioEncontrado);
      }
    }
  }

  function cancelarEdicionEjercicio() {
    setEjercicioEditar(null);
  }

  function actualizaEjercicio(rutinaId: string, ejercicioId: string, datosActualizados: EjercicioFormulario) {
    setRutinas((anteriores) => anteriores.map(rutina => {
      if (rutina.id === rutinaId) {
        return {
          ...rutina,
          ejercicios: rutina.ejercicios.map((ejercicio) => {
            if (ejercicio.id === ejercicioId) {
              return {
                ...ejercicio,
                ...datosActualizados
              }
            }
            return ejercicio;
          })
        }
      }
      return rutina;
    }))
  }

  function eliminarEjercicio(rutinaId: string, ejercicioId: string) {
    setRutinas((anteriores) => anteriores.map(rutina => {
      if (rutina.id === rutinaId) {
        return {
          ...rutina,
          ejercicios: rutina.ejercicios.filter(ejercicio => ejercicio.id !== ejercicioId)
        }
      }
      return rutina;
    }))
  }


  return (
    <>

      <h1 className="">🐺 Wolf Athletics</h1>


      {rutinaSeleccionada ? (
        <DetalleRutina
          rutina={rutinaSeleccionada}
          onCrearEjercicio={agregarEjercicio}
          onEditar={obtenerEjercicioEditar}
          ejercicioEditar={ejercicioEditar}//estado
          onActualizaEjercicio={actualizaEjercicio}
          cancelarEdicionEjercicio={cancelarEdicionEjercicio}
          onEliminarEjercicio={eliminarEjercicio}
          onVolver={volver}
        />
      ) : (
        <>
          <FormularioRutina
            onCrearRutina={crearRutina}
            rutinaEditar={rutinaEditar}//estado 
            cancelarEdicion={cancelarEdicion}
            onActualizarRutina={actualizarRutina}
          />

          <ListaRutinas
            rutinas={rutinas}
            onEntrar={entrarRutina}
            onEditar={obtenerRutinaEditar}
            onEliminar={eliminarRutina}
            onCrearRutina={() => {}}
          />
        </>
      )}

    </>
  );
}

export default App;