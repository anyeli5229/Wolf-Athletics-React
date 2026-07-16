import { useState } from "react";
import type { RutinaFormulario } from "../types/formulario";

type FormularioRutinaProps = {
  onCrearRutina: (rutina: RutinaFormulario) => void;
};;

function FormularioRutina({ onCrearRutina }: FormularioRutinaProps) {

  const [formulario, setFormulario] = useState({
    nombre: "",
    intensidad: "",
    duracion: 0
  });


  function manejarCambio(evento: React.ChangeEvent<HTMLInputElement>) {

    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,
      [name]: name === "duracion" ? Number(value) : value
    }));

  }


  function manejarSubmit( evento: React.SubmitEvent<HTMLFormElement>) {

    evento.preventDefault();

    onCrearRutina(formulario);

    setFormulario({
      nombre: "",
      intensidad: "",
      duracion: 0
    });

  }


  return (
    <form onSubmit={manejarSubmit}>

      <input
        name="nombre"
        value={formulario.nombre}
        onChange={manejarCambio}
        placeholder="Nombre de rutina"
      />


      <input
        name="intensidad"
        value={formulario.intensidad}
        onChange={manejarCambio}
        placeholder="Intensidad"
      />


      <input
        name="duracion"
        type="number"
        value={formulario.duracion}
        onChange={manejarCambio}
        placeholder="Duración"
      />


      <button type="submit">
        Crear rutina
      </button>

    </form>
  );
}

export default FormularioRutina;