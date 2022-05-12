import mongoose from "mongoose";

const conectarCB = async () => {
  try {
    const connecton = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    const url = `${connecton.connection.host}:${connecton.connection.port}`;
    console.log(`MongoDB Conectado en: ${url}`);
  } catch (error) {
    console.log(`error: ${error.message}`);
    process.exit(1); //terminar procesos
  }
};
export default conectarCB;
