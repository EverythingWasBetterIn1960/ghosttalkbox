const Sequelize = require('sequelize')
const db = require('../db')

const characterResponse = db.define('CharacterResponse', {
  Responses: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  ProfileRule: {
    type: Sequelize.STRING,
    allowNull: false
  }
})

characterResponse.prototype.AddResponse = function(response) {
  const newResponseList = [...this.Reponses, response]
  this.update({
    Responses: newResponseList
  })
}

module.exports = characterResponse
