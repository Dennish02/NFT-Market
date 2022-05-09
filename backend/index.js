import  express  from 'express';
import dotenv from 'dotenv';
import conectarCB from './config/db.js';
import router from './routes/usuarioRoutes.js';
import nft from './routes/nftRoutes.js'
import cors from 'cors';

const app = express();



dotenv.config();
conectarCB()
app.use(express.json())
//cors
const whiteList =['http://localhost:3000'];

const corsOptions = {
    origin: function (origin, callback){
        if(whiteList.includes(origin)){
            //consulta api
            callback(null, true)
        }else{
            //no permite el request
            callback(new Error('error de cors'))
        }
    }
}
app.use(cors(corsOptions))
//ROUTNG
app.use('/api/usuario', router)
app.use('/api/nft', nft)



const PORT = process.env.PORT || 3001

app.listen(PORT, ()=>{
    console.log(`Server en ${PORT}`)
});