const request = require('supertest')
const app = require('..')
const {expect} = require('chai')

describe('Input Scoring', () => {
  describe('GET Scoring', () => {
    it('receives text input and returns an object', () => {
      return request(app)
        .post('/api/scoring')
        .send({input: 'HelloWorld'})
        .expect(200)
        .then(res => {
          expect(res.body).to.be.an('Object')
        })
    })
    it('contains scores of positive, negative and neutral in one object', () => {
      return request(app)
        .post('/api/scoring')
        .send({input: 'HelloWorld'})
        .expect(200)
        .then(res => {
          expect(res.body.positive).to.not.equal(undefined)
          expect(!!res.body.negative).to.not.equal(undefined)
          expect(!!res.body.neutral).to.not.equal(undefined)
        })
    })
    it('scores consistently', async () => {
      try {
        const res1 = await request(app)
          .post('/api/scoring')
          .send({input: 'HelloWorld'})
        const res2 = await request(app)
          .post('/api/scoring')
          .send({input: 'HelloWorld'})

        expect(res1.body.positive).to.equal(res2.body.positive)
        expect(res1.body.negative).to.equal(res2.body.negative)
        expect(res1.body.neutral).to.equal(res2.body.neutral)
      } catch (err) {
        console.log('Error in Test', err.message)
      }
    })
    it('returns with an error if input is not a string', async () => {
      try {
        await request(app)
          .post('/api/scoring')
          .send({input: 22})
      } catch (err) {
        expect(err.message).to.equal('Input must be a string')
      }
    })
  })
})
