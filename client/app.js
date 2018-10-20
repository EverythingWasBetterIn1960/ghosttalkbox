import React, {Component} from 'react'
import {ChatBox, GhostResponse} from './components/'
import {connect} from 'react-redux'
import {fetchCharacter, fetchRootInteraction} from './store'

// import Routes from './routes'  - Unsure if I will need routes yet

class App extends Component {
  constructor() {
    super()
    this.state = {
      encounterInitialized: false
    }
    this.initEncounter = this.initEncounter.bind(this)
  }

  componentDidMount() {
    this.props.load()
  }

  initEncounter() {
    this.setState({encounterInitialized: true})
  }

  render() {
    console.log(this.props)
    return (
      <div id="main">
        <h1> Ghost Talk Box</h1>
        <GhostResponse />
        <ChatBox
          character={this.props.character}
          initEncounter={this.initEncounter}
          encounterInitialized={this.state.encounterInitialized}
        />
      </div>
    )
  }
}

const mapState = state => ({
  character: state.CurrentCharacter
})

const mapDispatch = dispatch => ({
  load: () => {
    const characterId = 1
    dispatch(fetchCharacter(characterId))
  }
})

export default connect(mapState, mapDispatch)(App)
