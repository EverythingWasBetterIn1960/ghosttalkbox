const Sequelize = require('sequelize');
const db = require('../db')


/*
* Interaction Model -
* The interaction model represents one point of conversation between the user and a character
*/

const Interaction = db.define('interaction', {
  //A string response to the users prompt
  response: {
    type: Sequelize.STRING,
    allowNull: false,
    isEmpty: false
  },
  /*Options for the next response based on the score of a users input
  * There are 3 options listed, each references the id of another interaction node.
  * If the user prompt scores positive, the first node is select, if neutral, the second node is selected, and if negative, the third
  */
  options: Sequelize.ARRAY(Sequelize.INTEGER),
  /**isRoot is a boolean property that identifies the interaction node as the root node in a character's conversation path */
  isRoot: Sequelize.BOOLEAN
})

/**
 * findRoot is a class method on Interaction that finds the instance that belongs to the specified CharacterID and where isRoot is true
 */

Interaction.findRoot = async function(CharacterId){
  const rootInteraction = await Interaction.findOne({where: {
    CharacterId,
    isRoot: true
  }})
  return rootInteraction;
}

module.exports = Interaction;
