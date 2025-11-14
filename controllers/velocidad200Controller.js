import Velocidad200 from "../models/velocidad200Model.js";

export const crearResultadoVelocidad200 = async (req, res) => {
  try {
    console.log("📥 Datos recibidos (Velocidad 200):", req.body);

    const nuevo = await Velocidad200.create(req.body);

    res.status(201).json({
      message: "Resultado de 200 metros guardado correctamente",
      data: nuevo
    });

  } catch (error) {
    console.error("❌ Error creando resultado velocidad 200:", error);
    res.status(500).json({ message: "Error al crear resultado 200m", error });
  }
};

export const obtenerResultadosVelocidad200 = async (req, res) => {
  try {
    const resultados = await Velocidad200.find().sort({ createdAt: -1 });
    res.json(resultados);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener resultados 200m", error });
  }
};
