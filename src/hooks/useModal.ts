import { useState } from "react";
import type { UseModalType } from "../types/hooks";

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