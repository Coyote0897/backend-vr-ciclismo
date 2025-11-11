import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import conectarDB from "./config/db.js";
import resultadoRoutes from "./routes/resultadoRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

conectarDB();

app.use("/api/resultados", resultadoRoutes);

app.get("/", (req, res) => {
  res.send("🚴 Backend de VR Ciclismo funcionando correctamente");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
