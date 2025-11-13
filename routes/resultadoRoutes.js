import express from "express";
import {
  crearResultadoKilometro,
  obtenerResultados
} from "../controllers/resultadoController.js";

const router = express.Router();

// Obtener todos los resultados
router.get("/", obtenerResultados);

// Nuevo endpoint especial para Unity
router.post("/kilometro", crearResultadoKilometro);

export default router;
