import Axios from 'axios'

/**
 * Action Types
 */
const ActionTypes = {
  UPDATE_SCORE: 'UPDATE_SCORE'
}

/**
 * Action Creators
 */
export const updateScore = score => ({
  type: ActionTypes.UPDATE_SCORE,
  score
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
    default:
      return state
  }
}

export default inputScoreReducer
