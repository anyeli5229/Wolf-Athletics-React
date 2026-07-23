import { useState } from "react";

export type UseModalType = {
    isOpen: boolean;
    abrir: () => void;
    cerrar: () => void;
}

export function useModal() : UseModalType {

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