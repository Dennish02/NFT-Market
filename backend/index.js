import express from "express";
import dotenv from "dotenv";
import conectarCB from "./config/db.js";
import router from "./routes/usuarioRoutes.js";
import nft from "./routes/nftRoutes.js";
import transacciones from "./routes/transaccionesRoutes.js";
import cors from "cors";
import fileUpload from "express-fileupload";

const app = express();

dotenv.config();
conectarCB();
app.use(express.json());
app.use(
  fileUpload({
    tempFileDir: "./upload",
    useTempFiles: true,
  })
);

//cors

app.use(cors());
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//ROUTNG
app.use("/api/usuario", router);
app.use("/api/nft", nft);
app.use("/api/transacciones", transacciones)

const PORT = process.env.PORT || 3001;

 const servidor = app.listen(PORT, () => {
  console.log(`Server en ${PORT}`);
});

//socket io

import { Server } from 'socket.io';

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors:{
    origin: process.env.FRONTEND_URL,
  }
})

io.on("connection",(socket)=>{
   //definir la conexion
  //on define que es lo que pasa cuando el evento ocurre
  socket.on("Actualizar", (room)=>{
    socket.join(room);
  })
  socket.on("NftCreado", ()=>{
    socket.to('http://localhost:3000/home').emit('nftAgregado')
  })

  //enviar respuesta al front 
  socket.on("ponerEnVenta", ()=>{
    socket.to('http://localhost:3000/home').emit('nftDisponile')
  })
  socket.on("editarPrecio", ()=>{
    socket.to('http://localhost:3000/home').emit('nftModificado')
  })
  socket.on("ventaNFT", ()=>{
    socket.to('http://localhost:3000/home').emit('nftVendido')
  })
 
  socket.on("balanceUser", ()=>{
    socket.to('http://localhost:3000/home').emit('balance')
  })

  socket.on("portfolio", (room)=>{
    socket.join(room);
  })
  socket.on("update", ()=>{
    socket.to('http://localhost:3000/home/usuario/porfolio').emit('nftUser')
  })
})
