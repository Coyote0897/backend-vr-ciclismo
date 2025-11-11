import express from "express";
import { crearResultado, obtenerResultados } from "../controllers/resultadoController.js";

const router = express.Router();

router.route("/")
  .get(obtenerResultados)
  .post(crearResultado);

export default router;
