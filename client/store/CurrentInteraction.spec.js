import interactionReducer, {
  fetchInteraction,
  fetchRootInteraction,
  gotInteraction,
  gotRootInteraction
} from './CurrentInteraction'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import configureMockStore from 'redux-mock-store'
import {expect} from 'chai'
import thunkMiddleware from 'redux-thunk'

const middlewares = [thunkMiddleware]
const mockStore = configureMockStore(middlewares)

describe('Current Interaction', () => {
  describe('reducer', () => {
    const defaultInteraction = {
      response: '',
      options: [null, null, null],
      isRoot: false,
      CharacterId: null
    }
    const testInteraction = {
      response: 'Test',
      options: [2, 1, 3],
      isRoot: true,
      CharacterId: 1
    }
    it('begins with a default state', () => {
      const state = interactionReducer(undefined, '@@init')
      expect(state.response).to.equal('')
      expect(state.isRoot).to.equal(false)
      expect(state.CharacterId).to.equal(null)
      expect(state.options).to.be.an('Array')
      expect(state.options[0]).to.equal(null)
    })
    it('sets interactionState on GOT_INTERACTION', () => {
      const state = interactionReducer(
        defaultInteraction,
        gotInteraction(testInteraction)
      )
      expect(state.response).to.equal('Test')
      expect(state.isRoot).to.equal(true)
      expect(state.CharacterId).to.equal(1)
      expect(state.options).to.be.an('Array')
      expect(state.options[0]).to.equal(2)
      expect(state.options[1]).to.equal(1)
      expect(state.options[2]).to.equal(3)
    })
    it('sets interactionState on GOT_ROOT_INTERACTION', () => {
      const state = interactionReducer(
        defaultInteraction,
        gotRootInteraction(testInteraction)
      )
      expect(state.response).to.equal('Test')
      expect(state.isRoot).to.equal(true)
      expect(state.CharacterId).to.equal(1)
      expect(state.options).to.be.an('Array')
      expect(state.options[0]).to.equal(2)
      expect(state.options[1]).to.equal(1)
      expect(state.options[2]).to.equal(3)
    })
  })

  describe('thunks', () => {
    let store
    let mockAxios
    let initState = {
      id: 0,
      response: '',
      options: [null, null, null],
      isRoot: false
    }
    let fakeResponses = [
      {
        id: 1,
        response: "I'm the root response",
        options: [2, null, null],
        isRoot: true,
        CharacterId: 1
      },
      {
        id: 2,
        response: "I'm the next response",
        options: [],
        isRoot: false,
        CharacterId: 1
      }
    ]
    beforeEach(() => {
      mockAxios = new MockAdapter(axios)
      store = mockStore(initState)
    })
    afterEach(() => {
      mockAxios.restore()
      store.clearActions()
    })
    it('gets a interaction by id', async () => {
      mockAxios
        .onGet('/api/interactions/node/2')
        .replyOnce(200, fakeResponses[1])
      console.log('Test')
      await store.dispatch(fetchInteraction(2))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('GOT_INTERACTION')
      expect(actions[0].interaction).to.deep.equal({
        id: 2,
        response: "I'm the next response",
        options: [],
        isRoot: false,
        CharacterId: 1
      })
    })
    it('gets a interaction by root', async () => {
      mockAxios
        .onGet('/api/interactions/root/1')
        .replyOnce(200, fakeResponses[0])
      await store.dispatch(fetchRootInteraction(1))
      const actions = store.getActions()
      expect(actions[0].type).to.equal('GOT_ROOT_INTERACTION')
      expect(actions[0].interaction).to.deep.equal({
        id: 1,
        response: "I'm the root response",
        options: [2, null, null],
        isRoot: true,
        CharacterId: 1
      })
    })
    it('can pull the id of the next interaction from options', async () => {
      //get the first interaction
      mockAxios
        .onGet('/api/interactions/root/1')
        .replyOnce(200, fakeResponses[0])
      await store.dispatch(fetchRootInteraction(1))
      let actions = store.getActions()
      const nextId = actions[0].interaction.options[0]
      //Find the followup interaction with nextId
      mockAxios
        .onGet('/api/interactions/node/2')
        .replyOnce(200, fakeResponses[1])
      await store.dispatch(fetchInteraction(nextId))
      actions = store.getActions()
      expect(actions[1].type).to.equal('GOT_INTERACTION')
      expect(actions[1].interaction).to.deep.equal(fakeResponses[1])
    })
  })
})
