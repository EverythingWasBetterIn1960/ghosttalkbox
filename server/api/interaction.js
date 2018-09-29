const router = require('express').Router();
const {Interaction, Character} = require('../db/models');

module.exports = router;

/**
 * Interactions can either be found by root or node.
 * If root, the request is for the root interaction in a character's conversation.
 * If node, the request is for a node in the interaction tree. Node requests still utilize direct lookup by interaction id.
 */


router.use('/root/character/:characterID', async (req, res, next) => {
  try{
  const reqCharacterID = parseInt(req.params.characterID, 10)
  console.log("\n\nCharId",req.params.characterID, reqCharacterID)
  //make sure id is a number
  if (isNaN(reqCharacterID)) throw new Error('Character Id must be a number');
  const rootInteraction = await Interaction.findOne({where: {
    CharacterId: reqCharacterID,
    isRoot: true}
  , include: [{model:Character}]})
  /*If rootInteraction is null, throw an error.
    Because characters are static, there should not be case where a character has a root
  */
 if (!rootInteraction) throw new Error('rootInteraction must not be null')
  res.send(rootInteraction)
  } catch(err){
    next(err)
  }
})


router.use('/node/:interactionId', async (req,res,next) => {
 try{
  //extract id from request and check that it is a number
  const interactionId = parseInt(req.params.interactionId, 10);
  if (isNaN(interactionId)) throw new Error("Interaction Id must be a number")

  Interaction.findById(interactionId)
  .then((interaction) => {
    res.send(interaction)
  })
 }catch(err) {
   next(err);
 }

})



