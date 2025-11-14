import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import resultadoRoutes from "./routes/kilometroRoutes.js";
import persecucionRoutes from "./routes/persecucionRoutes.js";
import velocidad200Routes from "./routes/velocidad200Routes.js";



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

conectarDB();

app.use("/api/resultados", resultadoRoutes);
app.use("/api/persecucion", persecucionRoutes);
app.use("/api/velocidad200", velocidad200Routes);



app.get("/", (req, res) => {
  res.send("Backend de VR Ciclismo funcionando correctamente");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
