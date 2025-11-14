import express from "express";
import {
  crearPersecucion,
  obtenerPersecuciones,
  eliminarPersecucion
} from "../controllers/persecucionController.js";

import { authMiddleware, requiereRol } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", obtenerPersecuciones);
router.post("/", crearPersecucion);

// PROTEGIDO PARA ADMIN
router.delete(
  "/:id",
  authMiddleware,
  requiereRol(["admin"]),
  eliminarPersecucion
);

export default router;
