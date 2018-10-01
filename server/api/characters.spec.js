const {expect} = require('chai')
const request = require('supertest')
const db = require('../db/db')
const {Character} = require('../db/models')
const app = require('../index')

describe('Characters API', () => {
  beforeEach(async () => {
    //wipe the db
    await db.sync({force: true})
  })
  describe('GET Routes', () => {
    const selectedCharacter = {
      name: 'John',
      yearOfBirth: '1902',
      ageAtDeath: '31',
      causeOfDeath: 'Hit by a shoe',
      desire: 'To be a ballet dancer'
    }
    beforeEach(async () => {
      await Character.create(selectedCharacter)
    })
    it('GET character by ID', () => {
      return request(app)
        .get('/api/character/1')
        .expect(200)
        .then(res => {
          expect(res.body.name).to.equal('John')
          expect(res.body.ageAtDeath).to.equal(31)
          expect(res.body.yearOfBirth).to.equal('1902')
          expect(res.body.causeOfDeath).to.equal('Hit by a shoe')
          expect(res.body.desire).to.equal('To be a ballet dancer')
        })
    })
  })
  it('GET Character by Id throws Error if param is not a number', () => {
    try {
      const res = request(app).get('/api/character/test')
    } catch (err) {
      expect(err.message).to.equal('character Id is not a number')
    }
  })
})
