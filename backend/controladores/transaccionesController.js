import Transaccion from "../models/transaccion.js";
import Usuario from "../models/Usuarios.js";

const ultimasVentas = async (req, res) => {
  try {
    if (req.usuario) {
      var allTransactions = req.usuario.transacciones;
    } else {
      var allTransactions = await Transaccion.find();
    }
    const sales = allTransactions.filter((t) => t.transactionType === "sale");
    const orderedSales = sales.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
    const recentTransactions = orderedSales.slice(0, 20);
    res.status(200).send(recentTransactions);
  } catch (error) {
    res.status(404).send(error);
  }
};

const crearTransaccion = async (req, res) => {
  try {
    const transaccion = new Transaccion(req.data);
    const transaccionGuardada = await transaccion.save();
    const comprador = await Usuario.findOne({
      nombre: transaccion.actual_owner_Id,
    });
    comprador.transacciones.push(transaccion);
    await comprador.save();
    const vendedor = await Usuario.findOne({ nombre: transaccion.seller_Id });
    vendedor.transacciones.push(transaccion);
    await vendedor.save();
    res.status(200).json(transaccion);
  } catch (error) {
    res.status(400).send(error);
  }
};

export { ultimasVentas, crearTransaccion };
