import mercadopago  from "mercadopago";

const mercadoPago=(req, res) => {
    //console.log({body: req.body, usuario: req.usuario});
    mercadopago.configurations.setAccessToken(process.env.ACCESS_TOKEN_MP);
    const payment_data = {
        transaction_amount: req.body.transaction_amount,
        token: req.body.token,
        description: req.body.description,
        installments: Number(req.body.installments),
        payment_method_id: req.body.paymentMethodId,
        issuer_id: req.body.issuer,
        payer: {
            email: req.body.payer.email,
            identification: {
                type: req.body.payer.docType,
                number: req.body.payer.docNumber,
            },
        },
    };

    mercadopago.payment
        .save(payment_data)
        .then((response) => {
            const coinss = Number(req.usuario.coins) + Number(req.body.transaction_amount)
           req.usuario.coins = coinss
            req.usuario.save()
            
            return res.status(response.status).json({
                status: response.body.status,
                status_detail: response.body.status_detail,
                id: response.body.id,
            });
        })
        .catch((err) => {
            console.log(err);
            return res.status(500).send(err);
        });
}
export {
    mercadoPago
}