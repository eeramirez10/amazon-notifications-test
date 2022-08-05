const { SellingPartnerApiAuth } = require('@sp-api-sdk/auth');
const { OrdersApiClient } = require('@sp-api-sdk/orders-api-v0');
const { VendorDirectFulfillmentOrdersApiClient } = require('@sp-api-sdk/vendor-direct-fulfillment-orders-api-v1');
const {TokensApiClient} =  require('@sp-api-sdk/tokens-api-2021-03-01');
const { db } = require('../config/firebase');



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

    const ordersAPI = new OrdersApiClient({
        auth,
        
        region: 'na',
        rateLimiting: {
            retry: true,
            onRetry: (retryInfo) => console.log(retryInfo)
        },
       
    });

    try {

        // const resp = await ordersAPI.getOrders({
        //     marketplaceIds: ['A1AM78C64UM0Y8'],
        //     createdAfter: '2022-07-01T00:00:00-07:00',
        //     maxResultsPerPage: 1,
           

        // });





        
        const arrayOrders = [];

        let isNextoken = true;

        let nextToken = '';

        while( isNextoken){

            const resp = await ordersAPI.getOrders({
                marketplaceIds: ['A1AM78C64UM0Y8'],
                createdAfter: '2022-07-01T00:00:00-07:00',
                maxResultsPerPage: 100,
                nextToken
                
    
            });


            for (let order of resp.data.payload.Orders) {

                const item = await ordersAPI.getOrderItems({ orderId: order.AmazonOrderId });
    
                arrayOrders.push({ ...order, ...item.data.payload })
            }
    

            nextToken = resp.data.payload?.NextToken;

            isNextoken = !!nextToken;
        }

        console.log(arrayOrders.length)

      

        const sortArrOrders = arrayOrders.sort( (a,b) =>  new Date( b.PurchaseDate).getTime() - new Date( a.PurchaseDate).getTime())

            let collectionAmazon = db.collection('ordenesAmazon');

            for ( let orden of sortArrOrders ){

                let collectionRefAmazon = collectionAmazon.doc(orden.AmazonOrderId);
                
                const doc = await collectionRefAmazon.get();
        
                if(doc.exists){

                    console.log('continue')

                    continue;
        
                    collectionAmazon.doc(orden.AmazonOrderId).update(orden)
                }

                console.log('nevo')
        
                collectionAmazon.doc(orden.AmazonOrderId).set(orden);


            }



        return res.json({
            ok: true,
            data:[]
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Hubo un error'
        })
    }


}

const getOrdersVendorDirectFulFillment = async (req, res) => {

   

    // const orderAPI = new VendorDirectFulfillmentOrdersApiClient({
    //     auth,
    //     region: 'na',
    //     rateLimiting: {
    //         retry: true,
    //         onRetry: (retryInfo) => console.log(retryInfo)
    //     },
    //     sandbox: true
    // });

    // const tokenAPI = new TokensApiClient({
    //     auth,
    //     region: 'na',
    //     rateLimiting: {
    //         retry: true,
    //         onRetry: (retryInfo) => console.log(retryInfo)
    //     }
    // })

    // const rdt = await tokenAPI.createRestrictedDataToken({
    //     body:{
    //         restrictedResources:{
    //             method:'GET',
    //             path:" /vendor/directFulfillment/orders/v1/purchaseOrders"
    //         }
    //     }
    // })

    // const { restrictedDataToken } = rdt.data;

    

    // const resp = await orderAPI.getOrders({ 
    //     createdAfter: '2022-07-01T00:00:00-07:00', 
    //     createdBefore:'2022-07-10T00:00:00-07:00' 
    // });
    // const data = resp.data.payload()

    

    // return res.json({
    //     ok: true,
    //     token: auth.accessToken,
    //     credentials: await auth.getCredentials()
    // })

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
        orderId:'701-0318327-2898666'
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
        body:{
            restrictedResources:[
                {
                    method:'GET',
                    path:'/orders/v0/orders',
                    
                    
                },
                
                
            ],
            targetApplication:'amzn1.sp.solution.962c3d23-9210-476f-98ab-e5d4a4159c6afdfdfd'
            
            
            
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
    getOrdersVendorDirectFulFillment,
    getOrderItemsBuyerInfo,
    RDT
}
