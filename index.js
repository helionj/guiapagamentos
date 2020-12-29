const express = require('express');
const MercadoPago = require('mercadopago');

const app = express();

MercadoPago.configure({
    sandbox: true,
    access_token: "TEST-1715245730601227-122813-0cd0d877d9c9012e519cc5f334319acd-46494753"
});

app.get('/', (req,res) => {
    res.send("Olá mundo!");
});

app.get('/pagar', async (req,res) => {

    var id = ""+Date.now();
    var dados={
        items: [
            item={
                id: id,
                title: "Camisa social de algodão",
                quantity: 1,
                currency_id: "BRL",
                unit_price: parseFloat(151,20)
            }
        ],
        payer: {
            email:"helionporto@hotmail.com"
        },
        external_reference: id 

    }

    try {
        var payment = await MercadoPago.preferences.create(dados);
        console.log(payment);
        return res.redirect(payment.body.init_point);
    } catch (error) {
        return res.send(error.message);
    }

   
});

app.post('/not', (req,res) => {
    console.log(req.query);
    res.send('OK');
});

app.listen(80,(req, res) =>{
    console.log("Servidor rodando!");
});