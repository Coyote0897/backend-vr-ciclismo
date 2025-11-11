import mongoose from "mongoose";

const resultadoSchema = new mongoose.Schema({
  tipo_prueba: { type: String, required: true },
  vueltas: { type: Number, required: true },
  tiempo_total: { type: Number, required: true },
  fecha: { type: String, required: true },
});

export default mongoose.model("Resultado", resultadoSchema);
