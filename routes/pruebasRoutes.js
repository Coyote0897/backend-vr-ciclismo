import express from "express";
import {
  crearPrueba,
  obtenerPruebas,
  obtenerPrueba,
  actualizarPrueba,
  eliminarPrueba
} from "../controllers/pruebasController.js";

import { authMiddleware, requiereRol } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🟢 RUTAS PÚBLICAS
router.get("/", obtenerPruebas);
router.get("/:id", obtenerPrueba);

// 🔐 SOLO ADMIN
router.post(
  "/",
  authMiddleware,
  requiereRol(["admin"]),
  crearPrueba
);

router.put(
  "/:id",
  authMiddleware,
  requiereRol(["admin"]),
  actualizarPrueba
);

router.delete(
  "/:id",
  authMiddleware,
  requiereRol(["admin"]),
  eliminarPrueba
);

export default router;
