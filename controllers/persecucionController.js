import Persecucion from "../models/persecucionModel.js";

export const crearPersecucion = async (req, res) => {
  try {
    const nuevo = await Persecucion.create(req.body);
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(500).json({ message: "Error al crear", error });
  }
};

export const obtenerPersecuciones = async (req, res) => {
  try {
    const datos = await Persecucion.find().sort({ createdAt: -1 });
    res.json(datos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener", error });
  }
};

export const eliminarPersecucion = async (req, res) => {
  try {
    const eliminado = await Persecucion.findByIdAndDelete(req.params.id);

    if (!eliminado) {
      return res.status(404).json({ message: "Resultado no encontrado" });
    }

    res.json({ message: "Persecución eliminada correctamente" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar", error });
  }
};
