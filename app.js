require('dotenv').config()
const express = require('express');
const app = express();
const cors = require('cors');

const { sellingPartner } = require('./config/amazon-seller');


app.use(cors())
app.use(express.json())

// console.log(process.env)


// (async () => {

//     try {
      



//         let res = await sellingPartner.callAPI({
//             operation:'getMarketplaceParticipations',
//             endpoint:'sellers'
//           });
//           console.log(res);

//         let res = await sellingPartner.callAPI({
//             operation: 'notifications.createDestination',

//             body: {
//                 resourceSpecification: {
//                     eventBridge: {
//                         accountId: '943202111128',
//                         region: 'us-east-1'
//                     }
//                 },
//                 name: 'notifications'

//             },

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




app.listen(8080, () => {
    console.log('Servidor en el puerto 8080')
})


