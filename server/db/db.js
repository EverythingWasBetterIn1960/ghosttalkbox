const Sequelize = require('sequelize')
const pkg = require('../../package.json')

//if in testing mode, use an alternative db named "test"
const dbName = pkg.name + (process.env.NODE_ENV === 'test' ? '-test' : '')

const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost:5432/${dbName}`,
  {logging: false}
)
module.exports = db

if (process.env.NODE_ENV === 'test') {
  after('close database connection', () => db.close())
}
