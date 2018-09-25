'use strict'
const characters = require('./characters.json')
const interactions = require('./interactions.json')
const db = require('../server/db')
const {Character, Interaction} = require("../server/db/models")

async function seed() {
  await db.sync({force: true})

  await Character.bulkCreate(characters);
  await Interaction.bulkCreate(interactions)

  console.log('db synced!')
  console.log(`seeded successfully`)
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

// Execute the `seed` function, IF we ran this module directly (`node seed`)
if (module === require.main) {
  runSeed()
}

module.exports = seed
