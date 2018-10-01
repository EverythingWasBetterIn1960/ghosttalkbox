import {expect} from 'chai'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'
import characterReducer, {
  fetchCharacter,
  gotCharacter
} from './CurrentCharacter'
import configureMockStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('CurrentCharacter Reducer and Thunks', () => {
  describe('Reducer', () => {
    it('Initial State includes name, ageOfDeat, yearOfBirth, desire and causeOfDeath', () => {
      const state = characterReducer(undefined, '@@INIT')
      expect(state.name).to.equal('')
      expect(state.yearOfBirth).to.equal('')
      expect(state.ageAtDeath).to.equal('')
      expect(state.causeOfDeath).to.equal('')
      expect(state.desire).to.equal('')
    })
    it('sets characterState to on GOT_CHARACTER action', () => {
      const character = {
        id: 1,
        name: 'Test',
        yearOfBirth: '2018',
        ageAtDeath: '100',
        causeOfDeath: 'Shoes',
        desire: 'Dancing'
      }
      const state = characterReducer({}, gotCharacter(character))
      expect(state.name).to.equal('Test')
      expect(state.yearOfBirth).to.equal('2018')
      expect(state.ageAtDeath).to.equal('100')
      expect(state.causeOfDeath).to.equal('Shoes')
      expect(state.desire).to.equal('Dancing')
    })
    it('if no action types are met, will return the current state by default', () => {
      const currentCharacter = {message: 'HelloWorld'}
      const state = characterReducer(currentCharacter, {type: 'Nothing'})
      expect(state.name).to.equal(undefined)
      expect(state.message).to.equal('HelloWorld')
    })
  })
  describe('Thunk Creators', () => {
    let store
    let mockAxios
    let initialState = {
      id: 0,
      name: '',
      yearOfBirth: '',
      ageAtDeath: '',
      causeOfDeath: '',
      desire: ''
    }
    let fakeCharacter = {
      id: 1,
      name: 'Test',
      yearOfBirth: '2018',
      ageAtDeath: '100',
      causeOfDeath: 'Testing Redux',
      desire: 'For Tests To Pass'
    }
    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initialState)
    })

    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })

    it('dispatches the GOT_CHARACTER action', async () => {
      mockAxios.onGet('/api/character/1').replyOnce(200, fakeCharacter)
      await store.dispatch(fetchCharacter(1))
      const actions = store.getActions()
      expect(actions[0].type).to.be.equal('GOT_CHARACTER')
      expect(actions[0].character).to.be.deep.equal(fakeCharacter)
    })
  })
})
