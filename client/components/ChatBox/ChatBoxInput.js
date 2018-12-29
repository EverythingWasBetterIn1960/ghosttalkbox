import React, {Component} from 'react'
import {
  fetchInteraction,
  fetchRootInteraction,
  gotFactualResponse,
  addToPositiveScore,
  addToNegativeScore,
  addToNeutralScore,
  addToAllScores,
  incrementQuestionAsked
} from '../../store'
import {useResponse} from '../../store/CurrentCharacterProfileResponses'
import {connect} from 'react-redux'
import profileRuleLookup from '../../utils/characterQuestionParser'
import axios from 'axios'

class ChatBoxInput extends Component {
  constructor(props) {
    super(props)
    this.state = {
      userInput: ''
    }
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }
  handleChange(evt) {
    this.setState({userInput: evt.target.value})
  }
  async handleSubmit(evt) {
    evt.preventDefault()

    const input = this.state.userInput

    //run rules trie
    const profileRule = profileRuleLookup(input)
    //if there's a profile rule, look up the rule in the character info
    if (profileRule) {
      //pull the responses from State
      const responseObj = this.props.responses[profileRule]
      //pull number of times ask
      if (responseObj.timesAsked > 0) {
        //Neg Score = Constant * times Asked
        const negVal = 20 * responseObj.timesAsked
        //Dispatch score update
        this.props.updateNegativeInputScore(negVal)
        this.props.incrementQuestionAskedCount(profileRule)
      }
      //check if responses array is not empty
      let questionResponse = '......'
      if (responseObj.responses.length) {
        //pull response
        questionResponse = responseObj.responses[0]
        //shift off the reponses array
        this.props.updateResponseArray(profileRule)
        this.props.incrementQuestionAskedCount(profileRule)
      }
      //update interactions
      this.props.updateInteractionWithProfileResponse(questionResponse)
    } else {
      //run score input sentiment
      const {data: sentimentScore} = await axios.post('/api/scoring', {input})
      this.props.updateAllScores({...sentimentScore})

      let optionNum
      //extract appropriate optionId based on score
      if (
        this.props.totalInputScore.postive >
        Math.max(
          this.props.totalInputScore.negative,
          this.props.totalInputScore.neutral
        )
      )
        optionNum = 0
      else if (
        this.props.totalInputScore.negative >
        Math.max(
          this.props.totalInputScore.positive,
          this.props.totalInputScore.neutral
        )
      )
        optionNum = 1
      else optionNum = 2
      this.props.getNextInteraction(this.props.interaction.options[optionNum])
    }
  }

  render() {
    return (
      <div id="chatbox-input">
        <form onSubmit={this.handleSubmit}>
          <input
            name="userInput"
            type="text"
            value={this.state.userInput}
            onChange={this.handleChange}
          />
          <button type="submit"> Submit </button>
        </form>
      </div>
    )
  }
}

//Properties brought down from the store and inserted into props
const mapState = state => ({
  interaction: state.CurrentInteraction,
  character: state.CurrentCharacter,
  responses: state.ProfileReponses,
  totalInputScore: state.TotalInputScore
})

//Methods to Dispatch Updates to Store
const mapDispatch = (dispatch, props) => ({
  getNextInteraction: optionId => {
    if (props.encounterInitialized) {
      dispatch(fetchInteraction(optionId))
    } else {
      props.initEncounter()
      dispatch(fetchRootInteraction(props.character.id))
    }
  },
  incrementQuestionAskedCount: ruleType => {
    dispatch(incrementQuestionAsked(ruleType))
  },
  updateResponseArray: ruleType => {
    dispatch(useResponse(ruleType))
  },
  updatePositiveInputScore: positiveValue => {
    //affect the total input point score
    dispatch(addToPositiveScore(positiveValue))
  },
  updateNeutralInputScore: neutralValue => {
    //affect the total input point score
    dispatch(addToNeutralScore(neutralValue))
  },
  updateNegativeInputScore: negativeValue => {
    //affect the total input point score
    dispatch(addToNegativeScore(negativeValue))
  },
  updateAllScores: scores => {
    dispatch(addToAllScores(scores))
  },
  updateInteractionWithProfileResponse: response => {
    dispatch(gotFactualResponse(response))
  }
})

export default connect(mapState, mapDispatch)(ChatBoxInput)
