import Axios from 'axios'

/**
 * Action Types
 */
const ActionTypes = {
  GOT_CHARACTER: 'GOT_CHARACTER'
}

/**
 * Action Creators
 */
export const gotCharacter = character => ({
  type: ActionTypes.GOT_CHARACTER,
  character
})

/**
 * Thunks
 */

export const fetchCharacter = characterId => {
  return async dispatch => {
    const {data: characterData} = await Axios.get(
      '/api/character/' + characterId
    )
    console.log(characterData)
    dispatch(gotCharacter(characterData))
  }
}

const defaultCharacter = {
  name: '',
  yearOfBirth: '',
  ageAtDeath: '',
  causeOfDeath: '',
  desire: ''
}

const characterReducer = (characterState = defaultCharacter, action) => {
  switch (action.type) {
    case ActionTypes.GOT_CHARACTER:
      return action.character
    default:
      return characterState
  }
}

export default characterReducer
