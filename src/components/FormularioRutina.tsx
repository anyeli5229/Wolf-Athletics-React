import { useEffect, useState } from "react";
import type { RutinaFormulario } from "../types/formulario";
import type { Rutina } from "../types/rutina";
import Input from "./ui/Input";
import Button from "./ui/Button";

type FormularioRutinaProps = {
  onCrearRutina: (rutina: RutinaFormulario) => void;
  onActualizarRutina: (id: string, datosActualizados: RutinaFormulario) => void;
  cancelarEdicion: () => void;
  rutinaEditar: Rutina | null;
};;

function FormularioRutina({ onCrearRutina, onActualizarRutina, cancelarEdicion, rutinaEditar }: FormularioRutinaProps) {

  const [formulario, setFormulario] = useState({
    nombre: "",
    intensidad: "Media",
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
        intensidad: "Media",
        duracion: ""
      })
    }
    setError("");
  }, [rutinaEditar])


  function manejarCambio(evento: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = evento.target;
    setFormulario((anterior) => ({
      ...anterior,//Conserva el formulario anterior, cambia solo el campo que el usuario cambió
      [name]: value
    }));
  }

  function validarFormulario() {
    if (!formulario.nombre.trim()) {
      return "El nombre de la rutina es obligatorio.";
    }
    if (!formulario.duracion || Number(formulario.duracion) <= 0) {
      return "Ingresa una duración válida mayor a 0 minutos.";
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

    const datosEnvio = {
      nombre: formulario.nombre.trim(),
      intensidad: formulario.intensidad,
      duracion: +formulario.duracion
    };

    if (rutinaEditar) {
      onActualizarRutina(rutinaEditar.id, datosEnvio);
    } else {
      onCrearRutina(datosEnvio);
    }

    cancelarEdicion();

    setFormulario({
      nombre: "",
      intensidad: "Media",
      duracion: ""
    });

  }

  return (
    <form onSubmit={manejarSubmit} className="space-y-4">

      {error && (
        <div className="p-3 text-xs font-medium text-red-400 bg-red-500/10 border border-red-500 rounded-xl flex items-center gap-2">
          <span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="size-6">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
            </svg>
          </span>

          <span>{error}</span>
        </div>
      )}

      <Input
        name="nombre"
        label="Nombre de la rutina"
        placeholder="Ej. Pierna completa, Espalda & Biceps"
        value={formulario.nombre}
        onChange={manejarCambio}
        fullWidth
      />

      <div>
        <label className="mb-1.5 block text-sm font-medium text-slate-700">
          Intensidad
        </label>
        <div className="relative">
          <select
            name="intensidad"
            value={formulario.intensidad}
            onChange={manejarCambio}
            className="w-full px-3.5 py-2.5 bg-white border border-slate-400 rounded-xl text-slate-700 text-sm focus:border-sky-500 focus:ring-2 focus:ring-sky-500/20 outline-none transition-all duration-200"
          >
            <option value="Baja" className="text-slate-700">Baja 🟢</option>
            <option value="Media" className="text-slate-700">Media 🟡</option>
            <option value="Alta" className="text-slate-700">Alta 🔴</option>
          </select>
        </div>
      </div>

      <Input
        name="duracion"
        type="number"
        label="Duración (minutos)"
        placeholder="Ej. 60"
        value={formulario.duracion}
        onChange={manejarCambio}
        fullWidth
      />


      <div className="flex items-center justify-end gap-2 pt-4 mt-6">
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={cancelarEdicion}
        >
          Cancelar
        </Button>

        <Button type="submit" variant="primary" size="sm">
          {rutinaEditar ? "Guardar cambios" : "Crear rutina"}
        </Button>
      </div>

    </form>
  );
}

export default FormularioRutina;