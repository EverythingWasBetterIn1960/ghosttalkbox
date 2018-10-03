import Axios from 'axios'
import configureMockStore from 'redux-mock-store'
import thunkMidWare from 'redux-thunk'
import {expect} from 'chai'
import inputScoreReducer, {getScoreFromInput} from './TotalInputScore'
import MockAdapter from 'axios-mock-adapter'

const middlewares = [thunkMidWare]
const mockStore = configureMockStore(middlewares)

describe('Total Input Score', () => {
  let initState = {
    positive: 0,
    negative: 0,
    neutral: 0
  }
  let fakeScore = {
    positive: 50,
    negative: 20,
    neutral: 30
  }
  describe('Thunks', () => {
    let store
    let mockAxios

    beforeEach(() => {
      mockAxios = new MockAdapter(Axios)
      store = mockStore(initState)
    })
    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    it('dispatches the UPDATE_SCORE action', async () => {
      mockAxios
        .onPost('/api/scoring', {input: 'HelloWorld'})
        .replyOnce(200, fakeScore)
      await store.dispatch(getScoreFromInput('HelloWorld'))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('UPDATE_SCORE')
      expect(actions[0].score).to.be.deep.equal(fakeScore)
    })
  })
  describe('reducer', () => {
    it('begins with all scores at 0', () => {
      const state = inputScoreReducer(initState, '@@init')

      expect(state.positive).to.be.equal(0)
      expect(state.neutral).to.be.equal(0)
      expect(state.negative).to.be.equal(0)
    })
    it('adds to the reducer by the value of the action.score', () => {
      const state = inputScoreReducer(initState, {
        type: 'UPDATE_SCORE',
        score: fakeScore
      })
      expect(state.positive).to.be.equal(50)
      expect(state.neutral).to.be.equal(30)
      expect(state.negative).to.be.equal(20)
    })
  })
})
