//const __ = require(./)
const Character = require('./character');
const Interaction  = require('./interaction')

Interaction.belongsTo(Character);
Character.hasMany(Interaction)


module.exports = {Character, Interaction}
