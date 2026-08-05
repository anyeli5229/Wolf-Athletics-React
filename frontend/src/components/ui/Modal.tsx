import { useEffect, type ReactNode } from "react";

type ModalProps = {
    isOpen: boolean;
    title: string;
    children: ReactNode;
    onClose: () => void;
}

export default function Modal({ isOpen, title, children, onClose }: ModalProps) {

    function cerrarModal(event: KeyboardEvent) {
        if (event.key === "Escape") {
            onClose();
        }
    }

    function detenerPropagacion(event: React.MouseEvent<HTMLDivElement>) {
        event.stopPropagation();
    }

    // Bloquea el scroll del fondo de la pantalla al abrir el modal
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', cerrarModal);
        }

        return () => window.removeEventListener("keydown", cerrarModal);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div onClick={onClose}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 overflow-hidden animate-fade-in"
        >
            <div
                onClick={detenerPropagacion} //Se detiene la propagación del click para que no cierre el modal al hacer click dentro de este div
                className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-lg max-h-[85vh] flex flex-col"
            >
                <header className="text-center text-sky-600 mb-3">
                    {title && <h3 className="text-lg font-semibold">{title}</h3>}
                </header>

                {/* estilos para la barra de scroll */}
                <section className="flex-1 overflow-y-auto pr-2 space-y-4 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-slate-200 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-slate-300">
                    {children}
                </section>
            </div>
        </div>
    )
}
