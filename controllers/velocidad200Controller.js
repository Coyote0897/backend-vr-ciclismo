import Velocidad200 from "../models/velocidad200Model.js";

export const crearResultadoVelocidad200 = async (req, res) => {
  try {
    const nuevo = await Velocidad200.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear", error });
  }
};

export const obtenerResultadosVelocidad200 = async (req, res) => {
  try {
    const datos = await Velocidad200.find().sort({ createdAt: -1 });
    res.json(datos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener", error });
  }
};

export const eliminarVelocidad200 = async (req, res) => {
  try {
    const eliminado = await Velocidad200.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ message: "Resultado no encontrado" });
    }

    res.json({ message: "Resultado 200m eliminado correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};
