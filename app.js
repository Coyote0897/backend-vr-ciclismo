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

// Seguridad recomendada
app.use(helmet());

// CORS - Permitir FRONTEND Y UNITY
app.use(
  cors({
    origin: "*",     // 👉 Acceso libre como antes
    credentials: false
  })
);

app.use(express.json());
app.use(cookieParser());

// Rate limit solo para LOGIN
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 20,
  message: "Demasiados intentos de login. Intenta más tarde.",
});

// 👉 SOLO LOGIN protegido
app.use("/api/auth", authLimiter, authRoutes);


app.use("/api/resultados", resultadoRoutes);     
app.use("/api/persecucion", persecucionRoutes);  
app.use("/api/velocidad200", velocidad200Routes); 

app.get("/", (req, res) => {
  res.send("Backend VR Ciclismo funcionando correctamente.");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
