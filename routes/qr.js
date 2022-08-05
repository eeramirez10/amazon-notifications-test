const router = require("express").Router();



router.get('/', (req, res)=>{

    var vCardsJS = require('vcards-js');

    vCard = vCardsJS();
 
    //set properties
    vCard.firstName = 'Eric';
    vCard.middleName = 'J';
    vCard.lastName = 'Nesser';
    vCard.organization = 'ACME Corporation';
 
    //set content-type and disposition including desired filename
    res.set('Content-Type', 'text/vcard; name="enesser.vcf"');
    res.set('Content-Disposition', 'inline; filename="enesser.vcf"');
 
    //send the response
    res.send(vCard.getFormattedString());

})



module.exports = router