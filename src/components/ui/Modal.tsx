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

    useEffect(() => {
        if (isOpen) {
            window.addEventListener('keydown', cerrarModal);
        }

        return () => window.removeEventListener("keydown", cerrarModal);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div onClick={onClose}
            className="fixed inset-0 flex items-center justify-center bg-black/55 backdrop-blur-sm p-4 animate-fade-in"
        >
            <div
                onClick={detenerPropagacion} //Se detiene la propagación del click para que no cierre el modal al hacer click dentro de este div
                className="bg-white rounded-2xl p-6 shadow-lg w-full max-w-lg">
                <header className="">
                    {title && <h3 className="text-lg font-semibold">{title}</h3>}
                </header>

                <section>
                    {children}
                </section>
            </div>
        </div>
    )
}
