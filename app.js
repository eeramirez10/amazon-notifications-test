require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

const {SellingPartnerApiAuth} = require('@sp-api-sdk/auth'); 
const {OrdersApiClient} = require('@sp-api-sdk/orders-api-v0');
const {VendorOrdersApiClient} = require('@sp-api-sdk/vendor-orders-api-v1'); 
const {AuthorizationApiClient} = require('@sp-api-sdk/authorization-api-v1') ;



app.use(cors())
app.use(express.json())

// const SellingPartnerAPI = require('amazon-sp-api');
// console.log(process.env)

const auth = new SellingPartnerApiAuth({
    clientId: process.env.SELLING_PARTNER_APP_CLIENT_ID,
    clientSecret: process.env.SELLING_PARTNER_APP_CLIENT_SECRET,
    refreshToken: 'Atzr|IwEBIFmnAfY0c9jNBBDKhLeMUHT869SC7W8W41FzLlcyRssWdfVBvLrZ8oO9UIe66SExRlhy3OjJ-QUqUmZMMT2hnxHRKhvbCUyOE-0fd5rsV1ZrhwLrvOdi89r9V5Z4U9G5monaaRGxH9ytRvyvzsXh2B9ENEhDxpzkQ7XBKE0rMcoY2imvE4bJsfSsNWPTtgOcNoY-YCwULfyXWmXBX1m7nzuhkjSaId4SyuxdyXEq5-huNL41HoQHsfhAe7kqgQvt23_VP82d4QTj15m4ixsy-UGXvG0K9_UgOZ-rsalp8D7ziPEkYlWaXdjjkIf4hcTBOJE',
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    
    role: {
      arn: process.env.AWS_SELLING_PARTNER_ROLE,
    },
    region:'us-east-1',
    
    
})



// const client = new TokensApiClient({
//     auth,
//     region:'na',
//     sandbox:false,
    
    
// }).createRestrictedDataToken({
//     body:{
        
//         restrictedResources:
//             {
//                 method:'GET',
//                 path:'/orders/v0/orders',
              
//             }
//         ,
        
        
//     }
// }).then( resp => console.log(resp.data))
// .catch( resp => console.log(resp))

// console.log(auth.getCredentials())


// const client = new OrdersApiClient({
//     auth,
//     region: 'na',

// });

// client.getOrders({
//     marketplaceIds:['A1AM78C64UM0Y8'],
//     lastUpdatedAfter:'2022-07-01T00:00:00-07:00',
    
    
// }).then(resp => console.log(resp.data.payload))


// const client = new VendorOrdersApiClient({
//     sandbox: true,
//     auth,
    
//     region: 'na',
    
// })

// client.getPurchaseOrders().then( resp => console.log(resp.data.payload))



// (async () => {

//     try {

//         let sellingPartner = new SellingPartnerAPI({
//             region: 'na',
//             refresh_token: 'Atzr|IwEBIFmnAfY0c9jNBBDKhLeMUHT869SC7W8W41FzLlcyRssWdfVBvLrZ8oO9UIe66SExRlhy3OjJ-QUqUmZMMT2hnxHRKhvbCUyOE-0fd5rsV1ZrhwLrvOdi89r9V5Z4U9G5monaaRGxH9ytRvyvzsXh2B9ENEhDxpzkQ7XBKE0rMcoY2imvE4bJsfSsNWPTtgOcNoY-YCwULfyXWmXBX1m7nzuhkjSaId4SyuxdyXEq5-huNL41HoQHsfhAe7kqgQvt23_VP82d4QTj15m4ixsy-UGXvG0K9_UgOZ-rsalp8D7ziPEkYlWaXdjjkIf4hcTBOJE',
//             options: {
//                 only_grantless_operations: false
//             }
        
//         })


//         let res = await sellingPartner.callAPI({
//             operation:'orders.getOrders',
     
//             query:{
//               MarketplaceIds:['A1AM78C64UM0Y8'],
//               CreatedAfter:'2020-03-01T00:00:00-07:00'
//             },
            
//             options:{
//               version:'v0'
//             }
//           });

//           console.log(res)


        



//         let res = await sellingPartner.callAPI({
//             operation:'getMarketplaceParticipations',
//             endpoint:'sellers'
//           });
//           console.log(res);

//         let res = await sellingPartner.callAPI({
//             operation: 'notifications.createSubscription',

//             path:{
//                 notificationType:"ORDER_STATUS_CHANGE"
//             },

//             body: {
//                 "payloadVersion":"1.0",
//                 "destinationId":"f9b35a68-7b29-4655-884d-552753c57d8d"

//             },

//             options: {
//                 version: 'v1'
//             }
//         })

//         console.log(res)

//         let res = await sellingPartner.callAPI({
//             operation: 'notifications.getDestinations',

//             // path:{
//             //     notificationType:"ORDER_STATUS_CHANGE"
//             // },

//             options: {
//                 version: 'v1'
//             }
//         })

//         console.log(res)



//     } catch (error) {

//         console.log(error)

//     }

// })();


app.use("/amazon", require('./routes/amazon'));
app.use("/qr", require('./routes/qr'));




app.listen(process.env.PORT, () => {
    console.log('Servidor en el puerto 8080')
})


