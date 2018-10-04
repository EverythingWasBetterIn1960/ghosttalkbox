import Axios from 'axios'

/**
 * Action Types
 */
const ActionTypes = {
  GOT_INTERACTION: 'GOT_INTERACTION',
  GOT_ROOT_INTERACTION: 'GOT_ROOT_INTERACTION'
}

/**
 * Action Creators
 */
export const gotInteraction = interaction => ({
  type: ActionTypes.GOT_INTERACTION,
  interaction
})

export const gotRootInteraction = rootInteraction => ({
  type: ActionTypes.GOT_ROOT_INTERACTION,
  interaction: rootInteraction
})

/**
 * Thunks
 */

export const fetchRootInteraction = characterId => {
  return async dispatch => {
    console.log('Root')
    const {data: rootInteraction} = await Axios.get(
      '/api/interaction/root/character/' + characterId
    )
    console.log(rootInteraction)
    dispatch(gotRootInteraction(rootInteraction))
  }
}

export const fetchInteraction = interactionId => {
  return async dispatch => {
    const {data: interactionNode} = await Axios.get(
      '/api/interaction/node/' + interactionId
    )
    dispatch(gotInteraction(interactionNode))
  }
}

/**
 * History
 */
const interactionHistory = []

const defaultInteraction = {
  response: '',
  options: [null, null, null],
  isRoot: false,
  CharacterId: null
}

const interactionReducer = (interactionState = defaultInteraction, action) => {
  switch (action.type) {
    case ActionTypes.GOT_INTERACTION: {
      interactionHistory.push(interactionState)
      return action.interaction
    }
    case ActionTypes.GOT_ROOT_INTERACTION:
      return action.interaction
    default:
      return interactionState
  }
}

export default interactionReducer
