import { useEffect, useState, type ChangeEvent, type SubmitEvent } from "react";
import Input from "../components/ui/Input";
import Button from "../components/ui/Button";
import { login } from "../services/authApi";
import { eliminarToken } from "../services/token";


export default function LoginPage() {
    useEffect(() => {
        eliminarToken();
    }, []);

    const [formulario, setFormulario] = useState({
        email: "",
        password: ""
    });

    const [error, setError] = useState("");
    const [cargando, setCargando] = useState(false);

    function manejarCambio(evento: ChangeEvent<HTMLInputElement>) {
        const { name, value } = evento.target;
        setFormulario(anterior => ({
            ...anterior,
            [name]: value
        }));
    }

    function validarFormulario() {
        if (!formulario.email.trim()) {
            return "El email es obligatorio.";
        }
        if (!formulario.password.trim()) {
            return "La contraseña es obligatoria.";
        }
        return null;
    }

    async function manejarSubmit(evento: SubmitEvent<HTMLFormElement>) {
        evento.preventDefault();

        const mensajeError = validarFormulario();
        if (mensajeError) {
            setError(mensajeError);
            return;
        }

        setError("");
        setCargando(true);

        try {
            const respuesta = await login({
                email: formulario.email.trim(),
                password: formulario.password
            });

            console.log(respuesta);

            setFormulario({ email: "", password: "" });

        } catch (err) {
            if (err instanceof Error) {
                setError(err.message);
            } else {
                setError("Ocurrió un error inesperado.");
            }
        } finally {
            setCargando(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-slate-50 p-4 font-sans text-slate-800">

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-120 h-120 bg-sky-100/60 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative w-full max-w-md bg-white border border-slate-200/80 rounded-2xl p-8 shadow-xl shadow-slate-200/50">

                <div className="mb-8 text-center space-y-2">
                    <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-100 text-emerald-600 mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.75" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25V12.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight text-slate-900">Bienvenido de nuevo</h1>
                    <p className="text-sm text-slate-500">Ingresa tus credenciales para acceder a tus rutinas</p>
                </div>

                <form onSubmit={manejarSubmit} className="space-y-5">
                    {error && (
                        <div className="p-3.5 text-xs font-medium text-red-600 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-5 h-5 shrink-0 text-red-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z" />
                            </svg>
                            <span>{error}</span>
                        </div>
                    )}

                    <div className="space-y-4">
                        <Input
                            name="email"
                            type="email"
                            label="Correo electrónico"
                            placeholder="demo@wolfathletics.com"
                            value={formulario.email}
                            onChange={manejarCambio}
                            fullWidth
                        />

                        <Input
                            name="password"
                            type="password"
                            label="Contraseña"
                            placeholder="••••••••"
                            value={formulario.password}
                            onChange={manejarCambio}
                            fullWidth
                        />
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="sm"
                        disabled={cargando}
                        className="w-full py-3 mt-2 bg-slate-900 hover:bg-slate-800 text-white font-medium rounded-xl transition-all shadow-md shadow-slate-900/10 active:scale-[0.98] disabled:opacity-50 disabled:pointer-events-none"
                    >
                        {cargando ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Cargando...
                            </span>
                        ) : (
                            "Iniciar Sesión"
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
}