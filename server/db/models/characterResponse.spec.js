const {expect} = require('chai')
const db = require('../db')
const characterResponse = require('./characterResponse')

describe.only('character responses', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  it('requires profile rule not to be null', async () => {
    try {
      await characterResponse.create({Responses: []})
    } catch (err) {
      expect(err.message).to.equal(
        'notNull Violation CharacterResponse.ProfileRule cannot be null'
      )
    }
  })
  it('creates a list of responses for a rule type', async () => {
    const responses = ['One', 'Two', 'Three']
    const rule = 'TestRule'
    const testResponse = characterResponse.create({
      Response: responses,
      ProfileRule: rule
    })

    expect(testResponse.Responses[0]).to.equal('One')
    expect(testResponse.ProfileRule).to.equal('TestRule')
  })
})
