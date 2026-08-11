import { createContext, type ReactNode } from "react";
import { useRutinas } from "../hooks/useRutinas";
import type { UseRutinasType } from "../types/hooks";


export const RutinasContext = createContext<UseRutinasType | null>(null);

type RutinasProviderProps = {
    children: ReactNode;
};

export function RutinasProvider({children} : RutinasProviderProps){
    const rutinas = useRutinas();

    return (
        <RutinasContext.Provider value={rutinas}>
            {children}
        </RutinasContext.Provider>
    )
}
