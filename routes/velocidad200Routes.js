import express from "express";
import {
  crearResultadoVelocidad200,
  obtenerResultadosVelocidad200
} from "../controllers/velocidad200Controller.js";

const router = express.Router();

// Obtener todos los resultados 200m
router.get("/", obtenerResultadosVelocidad200);

// Ruta para Unity
router.post("/velocidad200", crearResultadoVelocidad200);

export default router;
