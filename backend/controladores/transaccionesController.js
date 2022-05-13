import Transaccion from "../models/transaccion.js";

const ultimasVentas = async (req,res) => {
    const allTransactions = await Transaccion.find()
    console.log(allTransactions)
    const sales = allTransactions.filter(t => t.transactionType === 'sale')
    const orderedSales = sales.sort((a,b) => {
        console.log(a.date)
        console.log(b.date)
        //los ordeno del más reciente al más antiguo
        return b.date.getTime() - a.date.getTime()
    })
    const recentTransactions = orderedSales.slice(0, 19)
    res.json(recentTransactions)

}

const crearTransaccion = async (req, res) => {
    console.log(req.body)
    const transaccion = new Transaccion(req.body)
    console.log(transaccion)
    await transaccion.save()
}

export {
    ultimasVentas,
    crearTransaccion
}