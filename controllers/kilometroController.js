import Resultado from "../models/kilometroModel.js";

export const crearResultadoKilometro = async (req, res) => {
  try {
    const nuevo = await Resultado.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear", error });
  }
};

export const obtenerResultados = async (req, res) => {
  try {
    const resultados = await Resultado.find().sort({ createdAt: -1 });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener", error });
  }
};

export const eliminarResultadoKilometro = async (req, res) => {
  try {
    const eliminado = await Resultado.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ message: "Resultado no encontrado" });
    }

    res.json({ message: "Resultado eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};
