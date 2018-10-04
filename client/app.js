import React, {Component} from 'react'
import {ChatBox, GhostResponse} from './components/'
import {connect} from 'react-redux'
import {fetchCharacter, fetchRootInteraction} from './store'

// import Routes from './routes'  - Unsure if I will need routes yet

class App extends Component {
  componentDidMount() {
    this.props.load()
  }
  render() {
    return (
      <div id="main">
        <h1> Ghost Talk Box</h1>
        <GhostResponse />
        <ChatBox />
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  load: () => {
    console.log('Server Data')
    const characterId = 1
    dispatch(fetchCharacter(characterId))
    dispatch(fetchRootInteraction(characterId))
  }
})

export default connect(null, mapDispatch)(App)
