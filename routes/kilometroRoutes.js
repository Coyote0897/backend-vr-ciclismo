import express from "express";
import {
  crearResultadoKilometro,
  obtenerResultados,
  eliminarResultadoKilometro
} from "../controllers/kilometroController.js";

import { authMiddleware, requiereRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", obtenerResultados);
router.post("/kilometro", crearResultadoKilometro);

// SOLO ADMIN puede eliminar
router.delete(
  "/:id",
  authMiddleware,
  requiereRol(["admin"]),
  eliminarResultadoKilometro
);

export default router;
