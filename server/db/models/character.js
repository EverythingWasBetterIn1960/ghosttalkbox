const Sequelize = require('sequelize');
const db = require('../db')


const Character  = db.define('Character', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  yearOfBirth: Sequelize.STRING,
  ageAtDeath: Sequelize.INTEGER,
  causeOfDeath: {
    type: Sequelize.STRING
  },
  desire:{
    type: Sequelize.STRING
  }
})

module.exports = Character;
