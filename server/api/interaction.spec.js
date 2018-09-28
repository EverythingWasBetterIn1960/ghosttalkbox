const {expect} = require('chai');
const request = require('supertest')
const {Interaction} = require('../db/models')
const app = require('..')
const db = require('../db')




describe.only('Interaction API', () => {
  beforeEach(async() => {
    await db.sync({force:true})
  })
  describe('Get Route', () => {
    const testInteractionData = {
      response: 'A Test Response',
      isRoot: true,
      options: [1,2,3]
    }

    beforeEach(async () => {
      await Interaction.create(testInteractionData)
    })

  it('GET /:interactionId', () => {
    return request(app)
    .get('/api/interaction/1')
    .expect(200)
    .then((res) => {
      expect(res.body.response).to.equal('A Test Response');
      expect(res.body.options).to.be.an("Array");
      expect(res.body.options.length).to.equal(3);
      expect(res.body.options[0]).to.equal(1)
      expect(res.body.isRoot).to.equal(true);

    })
  })
  xit('GET Interaction from Character Root', () => {
  })
  })




})
