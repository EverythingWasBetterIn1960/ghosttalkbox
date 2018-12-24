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

router.get('/profileResponses/:characterId', async (req, res, next) => {
  try {
    //Check that characterID is a number
    const characterID = parseInt(req.params.characterId, 10)

    //make sure that the character id is an int
    if (isNaN(characterID)) {
      throw new Error('character Id is not a number')
    }
    let response = placeHolder()
    console.log(response)
    res.send(response)
  } catch (err) {
    next(err)
  }
})

/**
 *
 * For Profile Responses
 * Get all profile repsonses where Character ID == id
 * Reponse:
 *      RuleType,
 *      Response Array
 *
 */

function placeHolder() {
  return [
    {
      ruleType: 'AT_PEACE',
      responses: ['AT_PEACE', 'AT_PEACE2']
    },
    {
      ruleType: 'HEAVEN',
      responses: ['HEAVEN 1', 'HEAVEN 2']
    },
    {
      ruleType: 'HOMETOWN',
      responses: ['HOMETOWN 1', 'HOMETOWN 2']
    },
    {
      ruleType: 'CAUSE_OF_DEATH',
      responses: ['CAUSE 1', 'CAUSE 2']
    }
  ]
}
