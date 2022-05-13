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

app.listen(PORT, () => {
  console.log(`Server en ${PORT}`);
});
