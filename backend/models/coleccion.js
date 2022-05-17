import mongoose from "mongoose";

const coleccionSchema = mongoose.Schema(
  {
    creator: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      unique: true,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Coleccion = mongoose.model("Coleccion", coleccionSchema);
export default Coleccion;
