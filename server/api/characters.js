const router = require('express').Router()
const {Character} = require('../db/models')

module.exports = router

router.get('/:characterId', async (req, res, next) => {
  try {
    //Check that characterID is a number
    const characterID = parseInt(req.params.characterId, 10)

    //make sure that the character id is an int
    if (isNaN(characterID)) {
      throw new Error('character Id is not a number')
    }
    const selectedCharacter = await Character.findById(characterID)
    res.send(selectedCharacter)
  } catch (err) {
    next(err)
  }
})
