import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Route, Switch} from 'react-router-dom'

const baseComponent = () => (
  <div>
    <h1> Base Component </h1>
  </div>
)

class Routes extends Component {
  componentDidMount() {
    console.log('testing')
    this.props.load()
  }

  render() {
    return (
      <Switch>
        <Route path="/" component={baseComponent} />
      </Switch>
    )
  }
}

const mapDispatch = dispatch => ({
  load: () => console.log('I will fetch initial data from the server')
})

export default connect(null, mapDispatch)(Routes)
