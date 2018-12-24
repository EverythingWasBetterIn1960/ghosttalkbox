import Axios from 'axios'

/**
 * Action Types
 */
const ActionTypes = {
  LOAD_PROFILE_RESPONSES: 'LOAD_PROFILE_RESPONSES',
  INCREMENT_QUESTION_ASKED: 'INCREMENT_QUESTION_ASKED',
  USE_RESPONSE: 'USE_RESPONSE'
}

/**
 * Action Creators
 */
export const gotProfileResponses = responses => ({
  type: ActionTypes.LOAD_PROFILE_RESPONSES,
  responses
})

export const incrementQuestionAsked = ruleType => ({
  type: ActionTypes.INCREMENT_QUESTION_ASKED,
  ruleType
})

export const useResponse = ruleType => ({
  type: ActionTypes.USE_RESPONSE,
  ruleType
})
/**
 * Thunks
 */

export const fetchProfileResponses = characterId => {
  return async dispatch => {
    const {data: profileReponses} = await Axios.get(
      '/api/character/profileResponses/' + characterId
    )
    let profileHash = {}
    profileReponses.forEach(responseType => {
      if (!profileHash[responseType.ruleType]) {
        profileHash[responseType.ruleType] = {
          timesAsked: 0,
          responses: responseType.responses
        }
      }
    })
    dispatch(gotProfileResponses(profileHash))
  }
}

/**
 * {
 * name: {
 *  responses: [],
 *  times
 * }
 * }
 */

const defaultProfileResponses = {
  responses: {
    Test: {responses: [], timesAsked: 0}
  }
}

const profileResponsesReducer = (
  responsesState = defaultProfileResponses,
  action
) => {
  switch (action.type) {
    case ActionTypes.INCREMENT_QUESTION_ASKED: {
      const responseMap = {...responsesState}
      responseMap[action.ruleType].timesAsked++
      return responseMap
    }
    case ActionTypes.USE_RESPONSE: {
      const responseMap = {...responsesState}
      responseMap[action.ruleType].responses.shift()
      return responseMap
    }
    case ActionTypes.LOAD_PROFILE_RESPONSES:
      return action.responses
    default:
      return responsesState
  }
}

export default profileResponsesReducer
