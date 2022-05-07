import  express  from 'express';
import dotenv from 'dotenv';
import conectarCB from './config/db.js';
import router from './routes/usuarioRoutes.js';
import nft from './routes/nftRoutes.js'

const app = express();

dotenv.config();
conectarCB()
app.use(express.json())
//ROUTNG
app.use('/api/usuario', router)
app.use('/api/nft', nft)



const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server en ${PORT}`)
});