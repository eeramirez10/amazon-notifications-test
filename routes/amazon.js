const router = require("express").Router();

const SellingPartnerAPI = require('amazon-sp-api');

const { getOrders, getOrdersVendorDirectFulFillment, getOrderItemsBuyerInfo, RDT } = require("../controllers/amazonOrders");

let sellingPartner = new SellingPartnerAPI({
    region: 'na',
    refresh_token: 'Atzr|IwEBINojVQz6dI-yYTRnXK1jws-5YMWxBKb5YECsu8hJcgsGF_PGn3ErVdNPvkURSMIEBfTsVVOTPgAHf00UE7qdtY7peeONGo6wr17JsfTKNKuL7GzHmrLKzIRENbkJ2RXacyZesFTjFGQbgG5c-lpxv1SNQnaOriYZthqGkyU78ltidVapeISwilcmlCrhUaYsVyZvbGBRI7nadtu0amu7v3OZwdKtpRG5hAz8y9E7SpCrXqB7B8fECMEVGfX50bvpVLr_Qr_uyR5fDEyTeAgT_nWiNCmcr8946rUIs1kuSfFRubEyFidnJR8h4QrUkpszFaU',
    options: {
        only_grantless_operations: false
    },
    
    
})


router.post('/notificaciones', (req,res) => {

    console.log(req.body)

    return res.json({
        msg:'notificaciones',
        ok:true
    })

})

router.get('/orders', getOrders)
// router.get('/ordersVendorsFul', getOrdersVendorDirectFulFillment);

// router.get('/order/buyerInfo', getOrderItemsBuyerInfo);

router.get('/rdt', RDT)

// router.get('/orders', async (req, res) => {


//     try {

//         let resp = await sellingPartner.callAPI({
//             operation:'orders.getOrders',
            
//             query:{
//               MarketplaceIds:['A1AM78C64UM0Y8'],
//               CreatedAfter:'2022-07-01T00:00:00-07:00',
//                 OrderStatuses:'Shipped',
                

//             },
           
            
            
//             options:{
//               version:'v0',
              
//             }
//           })

    
//         res.json({
//             ok:true,
//             orders: resp
//         })
        
//     } catch (error) {

//         console.error(error)

//         res.status(500).json({
//             ok: false,
//             msg:error
//         })
        
//     }


// });

router.get('/order',  async (req, res) => {

    try {


        let resp = await sellingPartner.callAPI({
            operation:'orders.getOrder',

            path:{
                orderId:'702-9291608-7468203'
            },
     
            query:{
              MarketplaceIds:['A1AM78C64UM0Y8'],
              CreatedAfter:'2022-07-01T00:00:00-07:00',
                
            },
            
            options:{
              version:'v0'
            }
          });

          res.json({
            ok:true,
            orders: resp
        })



        
    } catch (error) {

        console.error(error)

        res.status(500).json({
            ok: false,
            msg:error
        })
        
        
    }


})

router.get('/order/items',  async (req, res) => {

    try {


        let resp = await sellingPartner.callAPI({
            operation:'orders.getOrderItems',

            path:{
                orderId:'702-7375094-8322632'
            },
     
            query:{
              MarketplaceIds:['A1AM78C64UM0Y8'],
              CreatedAfter:'2022-07-01T00:00:00-07:00',
         
            },
            
            options:{
              version:'v0',
              
            }
          });

          res.json({
            ok:true,
            orders: resp
        })



        
    } catch (error) {

        console.error(error)

        res.status(500).json({
            ok: false,
            msg:error
        })
        
        
    }


})


router.get('/order/address',  async (req, res) => {

    try {


        let resp = await sellingPartner.callAPI({
            operation:'orders.getOrderAddress',

            path:{
                orderId:'702-9291608-7468203'
            },
     
            query:{
              MarketplaceIds:['A1AM78C64UM0Y8'],
              CreatedAfter:'2022-07-01T00:00:00-07:00',
         
            },
            
            options:{
              version:'v0'
            }
          });

          res.json({
            ok:true,
            orders: resp
        })



        
    } catch (error) {

        console.error(error)

        res.status(500).json({
            ok: false,
            msg:error
        })
        
        
    }


})


router.get('/order/regulatedInfo',  async (req, res) => {

    try {


        let resp = await sellingPartner.callAPI({
            operation:'orders.getOrderRegulatedInfo',

            path:{
                orderId:'702-9291608-7468203'
            },
     
            query:{
              MarketplaceIds:['A1AM78C64UM0Y8'],
              CreatedAfter:'2022-07-01T00:00:00-07:00',
         
            },
            
            options:{
              version:'v0'
            }
          });

          res.json({
            ok:true,
            orders: resp
        })



        
    } catch (error) {

        console.error(error)

        res.status(500).json({
            ok: false,
            msg:error
        })
        
        
    }


})

router.get('/shipping',  async (req, res) => {

    try {


        let resp = await sellingPartner.callAPI({
            operation:'shipping.getShipment',

            path:{
                shipmentId:'702-9291608-7468203'
            },
     
            query:{
              MarketplaceIds:['A1AM78C64UM0Y8'],
              CreatedAfter:'2022-07-01T00:00:00-07:00',
         
            },
            
            options:{
              version:'v1'
            }
          });

          res.json({
            ok:true,
            orders: resp
        })



        
    } catch (error) {

        console.error(error)

        res.status(500).json({
            ok: false,
            msg:error
        })
        
        
    }


})


module.exports = router;
