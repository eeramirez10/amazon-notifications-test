const router = require("express").Router();



router.get('/', (req, res)=>{

    var vCardsJS = require('vcards-js');

    vCard = vCardsJS();
 
    //set properties
    vCard.firstName = 'German';
   
    vCard.lastName = 'Barranco';
    vCard.organization = 'Tuvansa';
    vCard.workPhone = '55 7904 4897';
    vCard.title = 'Gerente de Sistemas';
 
    //set content-type and disposition including desired filename
    res.set('Content-Type', 'text/vcard; name="enesser.vcf"');
    res.set('Content-Disposition', 'inline; filename="enesser.vcf"');
 
    //send the response
    res.send(vCard.getFormattedString());

})



module.exports = router