import { createContext, type ReactNode } from "react";
import { useRutinas, type UseRutinasType } from "../hooks/useRutinas";


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
