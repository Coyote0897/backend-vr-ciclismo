import mongoose from "mongoose";

const velocidad200Schema = new mongoose.Schema({
  tipoPrueba: { type: String, required: true },     // "velocidad200"
  tiempoTotal: { type: Number, required: true },    // tiempo del sprint 200m

  velocidadPromedio: { type: Number, default: 0 },  // promedio del sensor
  velocidadesSensor: { type: [Number], default: [] },

  edad: { type: Number, required: true },
  genero: { type: String, required: true },

  fecha: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Velocidad200", velocidad200Schema);
