import mongoose from "mongoose";

const coleccionSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    },
    creatorId:{
        type: mongoose.Schema.Types.String,
        ref: "Usuario",
    }
},{
    timestamps: true,
})

const Coleccion = mongoose.model("Coleccion", coleccionSchema)
export default Coleccion;