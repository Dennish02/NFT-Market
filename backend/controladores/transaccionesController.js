import Transaccion from "../models/transaccion.js";

const ultimasVentas = async (req,res) => {
    try{
        const allTransactions = await Transaccion.find()
        const sales = allTransactions.filter(t => t.transactionType === 'sale')
        const orderedSales = sales.sort((a,b) => {
            //los ordeno del más reciente al más antiguo
            return b.createdAt.getTime() - a.createdAt.getTime()
        })
        const recentTransactions = orderedSales.slice(0, 20)
        res.status(200).send(recentTransactions)
    } catch (error){
        res.status(404).send(error)
    }
}

const crearTransaccion = async (req, res) => {
    try{
        const transaccion = new Transaccion(req.body)
        const transaccionGuardada = await transaccion.save()
        res.status(200).send(transaccionGuardada)
    } catch (error) {
        res.status(400).send(error)
    }
}

export {
    ultimasVentas,
    crearTransaccion
}