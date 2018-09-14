'use strict'

const db = require('../server/db')

async function seed() {
  await db.sync({force: true})
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
