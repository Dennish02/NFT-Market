import mongoose from "mongoose";

const CategoriasSchema = mongoose.Schema({
    name:{
        type: String,
        trim: true,
        required: true,
    }
},{
    timestamps: true,
})

const Categorias = mongoose.model("Categorias", CategoriasSchema)
export default Categorias;