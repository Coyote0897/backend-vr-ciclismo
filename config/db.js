import mongoose from "mongoose";

const conectarDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI);
    console.log(`✅ Conectado a MongoDB Atlas: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Error de conexión a MongoDB:", error.message);
    process.exit(1);
  }
};

export default conectarDB;
