import Axios from 'axios'

/**
 * Action Types
 */
const ActionTypes = {
  UPDATE_SCORE: 'UPDATE_SCORE',
  ADD_TO_NEGATIVE_SCORE: 'ADD_TO_NEGATIVE_SCORE',
  ADD_TO_POSITIVE_SCORE: 'ADD_TO_POSITIVE_SCORE',
  ADD_TO_NEUTRAL_SCORE: 'ADD_TO_NEUTRAL_SCORE'
}

/**
 * Action Creators
 */
export const updateScore = score => ({
  type: ActionTypes.UPDATE_SCORE,
  score
})

export const addToNegativeScore = value => ({
  type: ActionTypes.ADD_TO_NEGATIVE_SCORE,
  value
})

export const addToNeutralScore = value => ({
  type: ActionTypes.ADD_TO_NEUTRAL_SCORE,
  value
})

export const addToPositiveScore = value => ({
  type: ActionTypes.ADD_TO_POSITIVE_SCORE,
  value
})

/**
 * Thunks
 */

export const getScoreFromInput = input => async dispatch => {
  const {data: inputScore} = await Axios.post('/api/scoring', {input})
  dispatch(updateScore(inputScore))
}

const defaultScore = {
  positive: 0,
  negative: 0,
  neutral: 0
}

const inputScoreReducer = (state = defaultScore, action) => {
  switch (action.type) {
    case ActionTypes.UPDATE_SCORE:
      return {
        positive: state.positive + action.score.positive,
        neutral: state.neutral + action.score.neutral,
        negative: state.negative + action.score.negative
      }
    case ActionTypes.ADD_TO_POSITIVE_SCORE: {
      return {...state, positive: state.positive + action.positive}
    }
    case ActionTypes.ADD_TO_NEGATIVE_SCORE: {
      return {...state, negative: state.negative + action.negative}
    }
    case ActionTypes.ADD_TO_NEUTRAL_SCORE: {
      return {...state, neutral: state.neutral + action.neutral}
    }
    default:
      return state
  }
}

export default inputScoreReducer
