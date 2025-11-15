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
import adminPruebaRoutes from "./routes/adminPruebaRoutes.js";


dotenv.config();

const app = express();

// Necesario para evitar error X-Forwarded-For en Render
app.set("trust proxy", 1);

// Conexión a MongoDB
conectarDB();

// Seguridad recomendada
app.use(helmet());

// CORS — público (para React, Unity, web)
app.use(
  cors({
    origin: "*",   // acceso libre
    credentials: false,
  })
);

// Middleware útiles
app.use(express.json());
app.use(cookieParser());

// Rate limit SOLO en login (evita fuerza bruta)
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,   // 15 minutos
  max: 20,                     // máximo 20 intentos
  standardHeaders: true,       // respuestas en headers estándar
  legacyHeaders: false,        // oculta X-RateLimit headers viejos
  message: {
    message: "Demasiados intentos de login. Intenta más tarde."
  }
});

// Endpoints protegidos SOLO para auth
app.use("/api/auth", authLimiter, authRoutes);

// Endpoints de pruebas — ⚠️ PÚBLICOS (como antes)
app.use("/api/resultados", resultadoRoutes);
app.use("/api/persecucion", persecucionRoutes);
app.use("/api/velocidad200", velocidad200Routes);
app.use("/api/admin/pruebas", adminPruebaRoutes);

// Endpoint raíz
app.get("/", (req, res) => {
  res.send("Backend VR Ciclismo funcionando correctamente.");
});

// Servidor
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
