//const __ = require(./)
const Character = require('./character')
const Interaction = require('./interaction')
const CharacterResponse = require('./characterResponse')

Interaction.belongsTo(Character)
Character.hasMany(Interaction)
Character.hasMany(CharacterResponse)
CharacterResponse.belongsTo(CharacterResponse)

module.exports = {Character, Interaction, CharacterResponse}
