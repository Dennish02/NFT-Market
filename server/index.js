//Las últimas versiones estables de node permiten utilizar "import" en lugar de "requiere"
//Esto lo podemos ver en el package.json ---> "type": "module"

import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();
const app = express(); // Express Middleware 

// app.use('/ruta', ruta) Esto es para que las rutas arranquen con /ruta (es un ejemplo)

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

const PORT = process.env.PORT || 5000; // Puerto que vamos a usar
const USER = process.env.USER; // SI ACABAN DE CLONAR EL REPO TIENEN QUE CREAR SU .env CON LAS VARIABLES USER Y PASSWORD, AHÍ TIENEN QUE PONER LAS QUE TIENEN EN MONGO ATLAS
const PASSWORD = process.env.PASSWORD;
const CONNECTION_URL = `mongodb+srv://${USER}:${PASSWORD}@cluster0.fnmuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` // Conectamos con nuestro usuario de Atlas

mongoose.connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true}) // Conectamos con la DB y nos prevenimos de algunos errores
.then(() => app.listen(PORT, () => console.log(`Server running on Port: ${PORT}`))) // Nos devuelve una promesa así que hacemos un .then
.catch((error) => console.log(error.message)) // Manejo de error