import  express  from "express";
import rutinasRoutes from "./routes/rutinas.routes";

const app = express();

app.use(express.json());

app.use("/api/rutinas", rutinasRoutes);

export default app;