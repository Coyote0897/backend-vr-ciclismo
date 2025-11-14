import express from "express";
import {
  crearResultadoVelocidad200,
  obtenerResultadosVelocidad200,
  eliminarVelocidad200
} from "../controllers/velocidad200Controller.js";

import { authMiddleware, requiereRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", obtenerResultadosVelocidad200);
router.post("/velocidad200", crearResultadoVelocidad200);

router.delete(
  "/:id",
  authMiddleware,
  requiereRol(["admin"]),
  eliminarVelocidad200
);

export default router;
