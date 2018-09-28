const router = require('express').Router();
const {Interaction, Character} = require('../db/models');

module.exports = router;

router.use('/:interactionId', async (req,res,next) => {
 try{
  //extract id from request and check that it is a number
  const interactionId = parseInt(req.params.interactionId, 10);
  if (isNaN(interactionId)) throw new Error("Interaction Id must be a number")

  Interaction.findById(interactionId)
  .then((interaction) => {
    console.log(interaction)
    res.send(interaction)
  })
 }catch(err) {
   next(err);
 }

})

