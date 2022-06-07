import express from "express";
import dotenv from "dotenv";
import conectarCB from "./config/db.js";
import router from "./routes/usuarioRoutes.js";
import nft from "./routes/nftRoutes.js";
import transacciones from "./routes/transaccionesRoutes.js";
import mercadoPago from "./routes/mercadoPago.js";
import coleccion from "./routes/coleccionRoutes.js";
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

app.use("/api/transacciones", transacciones);
app.use("/process-payment", mercadoPago);

app.use("/api/coleccion", coleccion);

const PORT = process.env.PORT || 3001;

const servidor = app.listen(PORT, () => {
  console.log(`Server en ${PORT}`);
});

//socket io

import { Server } from "socket.io";

const io = new Server(servidor, {
  pingTimeout: 60000,
  cors: {
    origin: process.env.FRONTEND_URL,
  },
});

io.on("connection", (socket) => {
  //definir la conexion
  //on define que es lo que pasa cuando el evento ocurre
  socket.on("Actualizar", (room) => {
    socket.join(room);
  });
  socket.on("renderHome", () => {
    socket.to(`${process.env.FRONTEND_URL}/home`).emit("homeUpdate");
  });
  socket.on("changelike", () => {
    socket.to(`${process.env.FRONTEND_URL}/home`).emit("changelikeicon");
  });
  
  socket.on("balanceUser", () => {
    socket.to(`${process.env.FRONTEND_URL}/home`).emit("balance");
  });

  socket.on("Portfolio", (room) => {
    socket.join(room);
  });
  socket.on("update", () => {
    socket
      .to(`${process.env.FRONTEND_URL}/home/usuario/portfolio`)
      .emit("nftUser");
  });
  socket.on("updateCollections", () => {
    socket
      .to(`${process.env.FRONTEND_URL}/home/usuario/portfolio`)
      .emit("colectionUser");
  });
//chat
socket.on('chat', (mensaje)=>{
  io.emit("chatmenaje", mensaje);
})


/*fin chat*/
  socket.on("Settings", (room) => {
    socket.join(room);
  });
  socket.on("update2", () => {
    socket
      .to(`${process.env.FRONTEND_URL}/home/usuario/setting`)
      .emit("nftUser2");
  });

  socket.on("Navegar", (room) => {
    socket.join(room);
  });

  socket.on("Redireccion", (ruta) => {
    socket
      .to(`${process.env.FRONTEND_URL}/home/usuario/wallet`)
      .emit("redicreccion", ruta);
  });

  socket.on("Transferencia", (ruta) => {
    socket
      .to(`${process.env.FRONTEND_URL}/home/usuario/wallet`)
      .emit("TransferenciaOk", ruta);
  });
  //favoritos
  socket.on("RenderFav", (room) => {
    socket.join(room);
  });

  socket.on("Render", () => {
    socket
      .to(`${process.env.FRONTEND_URL}/usuario/favoritos`)
      .emit("updatefav");
  });

  socket.on("Trades", (room) => {
    socket.join(room);
  });

  socket.on("updateTrades", () => {
    socket
      .to(`${process.env.FRONTEND_URL}/home/usuario/trades`)
      .emit("update5");
  });
});
