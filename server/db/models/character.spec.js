const {expect} = require('chai');
const db = require('../db')
const Character = require('./character');


describe('Character Model', () => {
  beforeEach(() => {
    return db.sync({force: true})
  })
  it('requires name not to be null', async () => {
    try{
      await Character.create();
      throw new Error('Character was created without a name')
    } catch(err){
      expect(err.message).to.equal('notNull Violation: Character.name cannot be null')
    }
  })


})
