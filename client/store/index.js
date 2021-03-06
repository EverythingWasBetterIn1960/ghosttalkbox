import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import user from './user'
import CurrentCharacter from './CurrentCharacter'
import CurrentInteraction from './CurrentInteraction'
import TotalInputScore from './TotalInputScore'
import ProfileReponses from './CurrentCharacterProfileResponses'

const reducer = combineReducers({
  user,
  CurrentCharacter,
  CurrentInteraction,
  TotalInputScore,
  ProfileReponses
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({collapsed: true}))
)
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './CurrentCharacter'
export * from './CurrentInteraction'
export * from './TotalInputScore'
export * from './CurrentCharacterProfileResponses'
