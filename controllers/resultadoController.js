// backend/controllers/resultadoController.js
import Resultado from "../models/resultadoModel.js";

export const crearResultado = async (req, res) => {
  try {
    const nuevo = await Resultado.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear resultado", error });
  }
};

export const obtenerResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find().sort({ _id: -1 });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener resultados", error });
  }
};
