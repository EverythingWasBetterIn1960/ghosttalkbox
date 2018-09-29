const {expect} = require('chai');
const request = require('supertest')
const {Interaction, Character} = require('../db/models')
const app = require('..')
const db = require('../db')




describe('Interaction API', () => {
  beforeEach(async() => {
    await db.sync({force:true})
  })
  describe('Get Route', () => {
    const testInteractionData = {
      response: 'A Test Response',
      isRoot: true,
      options: [1,2,3],
    }
    const testCharacterData = {
      name: 'Test Character'
    }

    beforeEach(async () => {
      const testInteraction = await Interaction.create(testInteractionData)
      const testCharacter = await Character.create(testCharacterData)
      await testCharacter.addInteraction(testInteraction);
    })

  it('GET /:interactionId', () => {
    return request(app)
    .get('/api/interaction/node/1')
    .expect(200)
    .then((res) => {
      expect(res.body.response).to.equal('A Test Response');
      expect(res.body.options).to.be.an("Array");
      expect(res.body.options.length).to.equal(3);
      expect(res.body.options[0]).to.equal(1)
      expect(res.body.isRoot).to.equal(true);

    })
  })
  it('GET /:interactionId throws error if id is not a number', () => {
    try{
    const res = request(app)
    .get('/api/interaction/node')
    } catch(err){
      expect(err.message).to.equal('Interaction Id must be a number')
    }
  })


  it('GET Interaction from Character Root', () => {
    return request(app)
    .get('/api/interaction/root/character/1')
    .expect(200)
    .then((res) => {
      expect(res.body.response).to.equal('A Test Response');
      expect(res.body.options).to.be.an("Array");
      expect(res.body.options.length).to.equal(3);
      expect(res.body.options[0]).to.equal(1)
      expect(res.body.isRoot).to.equal(true);
    })
  })
  it('GET root should throw error if root cannot be found', () => {
    try{
      const res = request(app)
      .get('/api/interaction/root/character/2')
      } catch(err){
        expect(err.message).to.equal('Character Id must be a number')
      }

  })
  it('GET root interaction throws error if id is not a number', () => {
    try{
    const res = request(app)
    .get('/api/interaction/root/character/test')
    } catch(err){
      expect(err.message).to.equal('Character Id must be a number')
    }
  })
  })




})
