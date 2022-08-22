const { SellingPartnerApiAuth } = require('@sp-api-sdk/auth');
const { OrdersApiClient } = require('@sp-api-sdk/orders-api-v0');
const { db } = require('../config/firebase');


//Autoautorizacion para acceder a los endpoints
const auth = new SellingPartnerApiAuth({
    clientId: process.env.SELLING_PARTNER_APP_CLIENT_ID,
    clientSecret: process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
    refreshToken: 'Atzr|IwEBINojVQz6dI-yYTRnXK1jws-5YMWxBKb5YECsu8hJcgsGF_PGn3ErVdNPvkURSMIEBfTsVVOTPgAHf00UE7qdtY7peeONGo6wr17JsfTKNKuL7GzHmrLKzIRENbkJ2RXacyZesFTjFGQbgG5c-lpxv1SNQnaOriYZthqGkyU78ltidVapeISwilcmlCrhUaYsVyZvbGBRI7nadtu0amu7v3OZwdKtpRG5hAz8y9E7SpCrXqB7B8fECMEVGfX50bvpVLr_Qr_uyR5fDEyTeAgT_nWiNCmcr8946rUIs1kuSfFRubEyFidnJR8h4QrUkpszFaU',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,

    role: {
        arn: process.env.AWS_SELLING_PARTNER_ROLE,
    },
    region: 'us-east-1',


})


// Fecha Inicial en formato 2022-08-01T00:00:00-07:00

const insertaOrdenesFirebase = async (fechaInicial, resultadosPorPagina = 100 ) => {
    

    const ordersAPI = new OrdersApiClient({
        auth,
        region: 'na',
        rateLimiting: {
            retry: true,
            onRetry: (retryInfo) => console.log(retryInfo)
        },

    });

    const arrayOrders = [];

    let isNextoken = true;

    let nextToken = '';

    while (isNextoken) {

        //Endpoint donde obtiene las ordenes
        const resp = await ordersAPI.getOrders({
            marketplaceIds: ['A1AM78C64UM0Y8'],
            createdAfter: fechaInicial,
            maxResultsPerPage: resultadosPorPagina,
            nextToken


        });


        for (let order of resp.data.payload.Orders) {
            //Endpoint donde obtiene el detalle de las ordenes
            const item = await ordersAPI.getOrderItems({ orderId: order.AmazonOrderId });

            arrayOrders.push({ ...order, ...item.data.payload })
        }

        //Guarda en nextoken siguente pagina
        nextToken = resp.data.payload?.NextToken;

        //Si hay token true si no false
        isNextoken = !!nextToken;
    }

    let collectionAmazon = db.collection('ordenesAmazon');

    let insertados = 0;

    let actualizados = 0;

    for (let orden of arrayOrders) {

        let collectionRefAmazon = collectionAmazon.doc(orden.AmazonOrderId);

        const doc = await collectionRefAmazon.get();


        //Si la orden existe
        if (doc.exists) {

            // Si estan cancelados o entregados ya no actualiza ya que ya no cambiara el status 
            if (orden.OrderStatus === "Canceled" || orden.OrderStatus === "Shipped") continue;

            await collectionAmazon.doc(orden.AmazonOrderId).update(orden)

            actualizados += 1

            continue;
        }

        //Si son nuevos 
        //order.estatus = 1;
        await collectionAmazon.doc(orden.AmazonOrderId).set(
            {   ...orden,
                shippment: {},
                estatus: 1,
                costoProveedor: 0,
                proveedor: "",
                seleccionado: false,
                totalDeposito: 0,
                utilidad: 0,
                utilidadPromedio: 0,
                fleteIva: 0,
                envioCorreo: false,
                alertaRoja: false,
                atroz: false,
                guia: false,
            })

        insertados += 1;

    }

    console.log('Ordenes Actualizados',actualizados)
    console.log('Ordenes nuevos',insertados)


}




module.exports = {

    insertaOrdenesFirebase

}