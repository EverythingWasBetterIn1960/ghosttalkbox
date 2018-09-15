import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Input} from './components/index'

const baseComponent = () => (
  <div>
    <h1> Base Component </h1>
  </div>
)

class Routes extends Component {
  componentDidMount() {
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

export default Routes