const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv')

dotenv.config();
const app = express(); // Express Middleware 

// app.use('/ruta', ruta) Esto es para que las rutas arranquen con /ruta (es un ejemplo)

app.use(bodyParser.json({ limit: "30mb", extended: true}));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true}));
app.use(cors());

const DB_PORT = process.env.DB_PORT || 5000; // Puerto que vamos a usar
const DB_USER = process.env.DB_USER; // SI ACABAN DE CLONAR EL REPO TIENEN QUE CREAR SU .env CON LAS VARIABLES USER Y PASSWORD, AHÍ TIENEN QUE PONER LAS QUE TIENEN EN MONGO ATLAS
const DB_PASSWORD = process.env.DB_PASSWORD;
const CONNECTION_URL = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.fnmuo.mongodb.net/myFirstDatabase?retryWrites=true&w=majority` // Conectamos con nuestro usuario de Atlas

mongoose.connection.on('connecting', _ => {
    console.log('\x1b[33m%s\x1b[0m', 'Connecting to the Database') // Avisamos que nos estamos conectando a la DB
})

mongoose.connect(CONNECTION_URL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true,
}) // Conectamos con la DB y nos prevenimos de algunos errores utilizando los modulos que mongoose nos recomienda
.then(() => app.listen(DB_PORT, () => console.log('\x1b[36m%s\x1b[0m', `Server running on Port: ${DB_PORT}`))) // Nos devuelve una promesa así que hacemos un .then
.catch((error) => console.log('\x1b[31m%s\x1b[0m', error.message)) // Manejo de error



mongoose.connection.once('open', _ => {
    console.log('\x1b[35m%s\x1b[0m', 'Database is connected') // Avisamos por consola cuando nos hayamos conectado a la base de datos
})

mongoose.connection.on('error', error => {
    console.log('\x1b[31m%s\x1b[0m', error) // Avisamos cuando hay un error una vez que la DB ya se haya conectado
})

mongoose.connection.once('close', _ => {
    console.log('\x1b[32m%s\x1b[0m', 'Database connection succesfully close') // Avisamos cuando nos desconectamos de la DB sin errores
})

mongoose.connection.on('reconnected', _ => {
    console.log('\x1b[32m%s\x1b[0m', 'Database successfully reconnected') // Avisamos cuando nos reconectamos a la DB luego de haber perdido la conexión
})