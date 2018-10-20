import React, {Component} from 'react'
import {
  fetchInteraction,
  fetchRootInteraction
} from '../../store/CurrentInteraction'
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
    if (profileRule) {
      console.log('Prof', profileRule)
    } //lookup Bio Response

    //score input sentiment
    const {data: sentimentScore} = await axios.post('/api/scoring', {input})
    console.log('Score', sentimentScore)
    let optionNum
    //extract appropriate optionId based on score
    if (
      sentimentScore.postive >
      Math.max(sentimentScore.negative, sentimentScore.neutral)
    )
      optionNum = 0
    else if (
      sentimentScore.negative >
      Math.max(sentimentScore.positive, sentimentScore.neutral)
    )
      optionNum = 1
    else optionNum = 2

    console.log('Num', optionNum, this.props.interaction.options[optionNum])
    this.props.getNextInteraction(this.props.interaction.options[optionNum])
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

const mapState = state => ({
  interaction: state.CurrentInteraction
})

const mapDispatch = (dispatch, props) => ({
  getNextInteraction: optionId => {
    if (props.encounterInitialized) {
      dispatch(fetchInteraction(optionId))
    } else {
      props.initEncounter()
      dispatch(fetchRootInteraction(props.character.id))
    }
  }
})

export default connect(mapState, mapDispatch)(ChatBoxInput)
