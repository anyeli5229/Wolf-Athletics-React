import { useContext } from "react";
import { RutinasContext } from "../context/RutinaContext";

export function useRutinasContext() {
    const context = useContext(RutinasContext);

    if(!context) {
        throw new Error("useRutinasContext debe de usarse dentro de RutinasProvider");
    }

    return context; //(rutinas)
}