const router = require("express").Router();


router.post('/notificaciones', (req,res) => {

    console.log(req.body)

    return res.json({
        msg:'notificaciones',
        ok:true
    })

})


module.exports = router;
