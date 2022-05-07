import  express  from 'express';
import dotenv from 'dotenv';
import conectarCB from './config/db.js';
import router from './routes/usuarioRoutes.js';


const app = express();

dotenv.config();
conectarCB()
app.use(express.json())
//ROUTNG
app.use('/api/usuario', router)



const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server en ${PORT}`)
});