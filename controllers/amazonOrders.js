const { SellingPartnerApiAuth } = require('@sp-api-sdk/auth');
const { OrdersApiClient } = require('@sp-api-sdk/orders-api-v0');
const { TokensApiClient } = require('@sp-api-sdk/tokens-api-2021-03-01');
const { insertaOrdenesFirebase } = require('../helpers/amazon');




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


const getOrders = async (req, res) => {
    var fechahoy = new Date();
    const restardias = fechahoy.setDate(fechahoy.getDate() - 15)
    var fechafinal = new Date(restardias).toISOString();
    const fechaInicial = req.query?.fechaInicial || fechafinal;
    const resultados = req.query?.resultados || 10;

    const ordersAPI = new OrdersApiClient({
        auth,

        region: 'na',
        rateLimiting: {
            retry: true,
            onRetry: (retryInfo) => console.log(retryInfo)
        },

    });

    try {

        console.log(fechaInicial);

        const { data } = await ordersAPI.getOrders({
            marketplaceIds: ['A1AM78C64UM0Y8'],
            createdAfter: fechaInicial,
            maxResultsPerPage: resultados,
           
        });

        const { Orders } = data.payload;

       
        //Ordena de manera descendente
        const sortArrOrders = Orders.sort((a, b) => new Date(b.PurchaseDate).getTime() - new Date(a.PurchaseDate).getTime());

        await insertaOrdenesFirebase(fechaInicial)

        return res.json({
            ok: true,
            data: sortArrOrders
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }


}



const getOrderItemsBuyerInfo = async (req, res) => {

    const ordersAPI = new OrdersApiClient({
        auth,
        region: 'na',
        rateLimiting: {
            retry: true,
            onRetry: (retryInfo) => console.log(retryInfo)
        },

    });

    const resp = await ordersAPI.getOrderItemsBuyerInfo({
        orderId: '701-0318327-2898666'
    })

    const data = resp.data.payload;

    return res.json({
        ok: true,
        data
    })

}

const RDT = async (req, res) => {

    const tokenAPI = new TokensApiClient({
        auth,
        region: 'na',

    })

    const rdt = await tokenAPI.createRestrictedDataToken({
        body: {
            restrictedResources: [
                {
                    method: 'GET',
                    path: '/orders/v0/orders',


                },


            ],
            targetApplication: 'amzn1.sp.solution.962c3d23-9210-476f-98ab-e5d4a4159c6afdfdfd'



        }
    })

    const { restrictedDataToken } = rdt.data;

    return res.json({
        ok: true,
        restrictedDataToken
    })

}


module.exports = {
    getOrders,
    getOrderItemsBuyerInfo,
    RDT
}
