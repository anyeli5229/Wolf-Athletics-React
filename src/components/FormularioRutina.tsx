import { useEffect, useState } from "react";
import type { RutinaFormulario } from "../types/formulario";
import type { Rutina } from "../types/rutina";
import Input from "./ui/Input";

type FormularioRutinaProps = {
  onCrearRutina: (rutina: RutinaFormulario) => void;
  onActualizarRutina: (id: string, datosActualizados: RutinaFormulario) => void;
  cancelarEdicion: () => void;
  rutinaEditar: Rutina | null;
};;

function FormularioRutina({ onCrearRutina, onActualizarRutina, cancelarEdicion, rutinaEditar }: FormularioRutinaProps) {

  const [formulario, setFormulario] = useState({
    nombre: "",
    intensidad: "",
    duracion: ""
  });

  const [error, setError] = useState("")

  useEffect(() => {
    if (rutinaEditar) {
      setFormulario({
        nombre: rutinaEditar.nombre,
        intensidad: rutinaEditar.intensidad,
        duracion: rutinaEditar.duracion.toString(),
      })
    } else {
      setFormulario({
        nombre: "",
        intensidad: "",
        duracion: ""
      })
    }
    setError("");
  }, [rutinaEditar])


  function manejarCambio(evento: React.ChangeEvent<HTMLInputElement>) {

    const { name, value } = evento.target;

    setFormulario((anterior) => ({
      ...anterior,//"Conserva el formulario anterior y cambia solamente el campo que modificó el usuario"
      [name]: name === "duracion" ? +value : value
    }));

  }

  function validarFormulario() {

    if (formulario.nombre.trim() === "") {
      return "El nombre es obligatorio";
    }


    if (formulario.intensidad.trim() === "") {
      return "La intensidad es obligatoria";
    }


    if (+formulario.duracion <= 0) {
      return "La duración debe ser mayor a 0";
    }


    return null;

  }


  function manejarSubmit(evento: React.SubmitEvent<HTMLFormElement>) {

    evento.preventDefault();

    const mensajeError = validarFormulario();

    if (mensajeError) {
      setError(mensajeError);
      return;
    }


    setError("");

    if (rutinaEditar) {
      onActualizarRutina(rutinaEditar.id, formulario);
    } else {
      onCrearRutina(formulario);
    }


    cancelarEdicion();

    setFormulario({
      nombre: "",
      intensidad: "",
      duracion: ""
    });

  }

  return (
    <form onSubmit={manejarSubmit}>

<Input
    label="Nombre"
    placeholder="Rutina"
    helperText="Máximo 30 caracteres"
/>

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
        {rutinaEditar ? "Guardar cambios" : "Crear rutina"}
      </button>

      {rutinaEditar && (
        <button
          type="button"
          onClick={cancelarEdicion}
        >
          Cancelar
        </button>
      )}

      {error && (
        <p>
          {error}
        </p>
      )}

    </form>
  );
}

export default FormularioRutina;