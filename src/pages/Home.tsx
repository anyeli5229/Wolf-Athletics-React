import { useNavigate } from "react-router-dom";
import FormularioRutina from "../components/FormularioRutina";
import ListaRutinas from "../components/ListaRutinas";
import Header from "../components/ui/Header";
import Modal from "../components/ui/Modal";
import type { UseModalType } from "../hooks/useModal";
import type { RutinaFormulario } from "../types/formulario";
import { useRutinasContext } from "../hooks/useRutinasContext";

type HomeProps = {
    modal: UseModalType;

}

export default function Home({ modal }: HomeProps) {

    const rutinas = useRutinasContext();

    const navigate = useNavigate();
    function handleEntarRutina(id: string) {
        navigate(`/rutina/${id}`);
    }

    function abrirModalCrear() {
        rutinas.cancelarEdicion();
        modal.abrir();
    }

    function cerrarModal() {
        rutinas.cancelarEdicion();
        modal.cerrar();
    }

    function handleCrearRutina(datos: RutinaFormulario) {
        rutinas.crearRutina(datos);
        modal.cerrar();
    }

    function handleEditarRutina(id: string) {
        rutinas.seleccionarRutinaEditar(id);
        modal.abrir();
    }

    function handleActualizarRutina(id: string, datos: RutinaFormulario) {
        rutinas.actualizarRutina(id, datos);
        modal.cerrar();
    }

    return (
        <div className="min-h-screen text-slate-700 p-6">

            <Header
                onCrearRutina={abrirModalCrear}
                mostrarBotonCrear={true}
            />

            <main className="max-w-7xl mx-auto p-6">
                <ListaRutinas
                    rutinas={rutinas.rutinas}
                    onEntrar={handleEntarRutina}
                    onEditar={handleEditarRutina}
                    onEliminar={rutinas.eliminarRutina}
                    onCrearRutina={abrirModalCrear}
                />

                <Modal
                    isOpen={modal.isOpen}
                    onClose={cerrarModal}
                    title={rutinas.rutinaEditar ? "Editar Rutina" : "Crear Rutina"}
                >

                    <FormularioRutina
                        onCrearRutina={handleCrearRutina}
                        rutinaEditar={rutinas.rutinaEditar}
                        cancelarEdicion={cerrarModal}
                        onActualizarRutina={handleActualizarRutina}
                    />
                </Modal>
            </main>
        </div>
    )
}
