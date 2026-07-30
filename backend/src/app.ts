import  express  from "express";
import  cors  from "cors";
import rutinasRoutes from "./routes/rutinas.routes";
import { errorMiddleware } from "./middlewares/error.middleware";

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
}))

app.use(express.json());

app.use("/api/rutinas", rutinasRoutes);

app.use(errorMiddleware); //Se coloca al final para que haya errores que capturar(después del controlador)

export default app;