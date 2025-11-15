import mongoose from "mongoose";

const pruebaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },        // Nombre del ciclista
  categoria: { type: String, required: true },     // Sub-17, Elite, etc.
  genero: { type: String, required: true },        // Masculino / Femenino
  tipoPrueba: { type: String, required: true },    // 200m, KM, Persecución...
  tiempo: { type: Number, required: true },        // Tiempo final
  fecha: { type: String, required: true }          // Fecha ISO o string
}, { timestamps: true });

export default mongoose.model("Prueba", pruebaSchema);
