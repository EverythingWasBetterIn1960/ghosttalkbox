import React, {Component} from 'react'
import {
  fetchInteraction,
  fetchRootInteraction
} from '../../store/CurrentInteraction'
import {connect} from 'react-redux'

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
  handleSubmit(evt) {
    evt.preventDefault()
    this.props.getNextInteraction(this.state.userInput)
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

const mapDispatch = (dispatch, props) => ({
  getNextInteraction: userInput => {
    console.log('Fetch Inter', props)
    if (props.encounterInitialized) {
      dispatch(fetchInteraction(1))
    } else {
      props.initEncounter()
      dispatch(fetchRootInteraction(props.character.id))
    }
  }
})

export default connect(null, mapDispatch)(ChatBoxInput)
