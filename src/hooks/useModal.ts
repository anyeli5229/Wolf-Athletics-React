import { useState } from "react";

export function useModal() {

    const [isOpen, setIsOpen] = useState(false);


    const abrir = () => {
        setIsOpen(true);
    }

    const cerrar = () => {
        setIsOpen(false);
    }

    return {
        abrir,
        cerrar,
        isOpen
    }
}