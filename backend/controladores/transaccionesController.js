import Transaccion from "../models/transaccion.js";

const ultimasVentas = async (req,res) => {
    const allTransactions = await Transaccion.find()
    const sales = allTransactions.filter(t => t.transactionType === 'sale')
    const orderedSales = sales.sort((a,b) => {
        //los ordeno del más reciente al más antiguo
        return b.createdAt.getTime() - a.createdAt.getTime()
    })
    const recentTransactions = orderedSales.slice(0, 20)
    res.json(recentTransactions)

}

const crearTransaccion = async (req, res) => {
    const transaccion = new Transaccion(req.body)
    const transaccionGuardada = await transaccion.save()
    res.json(transaccionGuardada)
}

export {
    ultimasVentas,
    crearTransaccion
}