import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import conectarDB from "./config/db.js";

import resultadoRoutes from "./routes/kilometroRoutes.js";
import persecucionRoutes from "./routes/persecucionRoutes.js";
import velocidad200Routes from "./routes/velocidad200Routes.js";
import authRoutes from "./routes/authRoutes.js";

dotenv.config();
const app = express();

conectarDB();

// Seguridad básica
app.use(helmet());

// Si tu frontend está en otro dominio, por ejemplo http://localhost:5173:
app.use(
  cors({
    origin: "http://localhost:5173", // cambia según tu frontend
    credentials: true, // para enviar cookies
  })
);

app.use(express.json());
app.use(cookieParser());

// Rate limit sólo para /api/auth (proteger login de fuerza bruta)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 20, // máximo 20 intentos
  message: "Demasiados intentos, inténtalo más tarde.",
});

app.use("/api/auth", authLimiter, authRoutes);

app.use("/api/resultados", resultadoRoutes);
app.use("/api/persecucion", persecucionRoutes);
app.use("/api/velocidad200", velocidad200Routes);

app.get("/", (req, res) => {
  res.send("Ciclismo");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
