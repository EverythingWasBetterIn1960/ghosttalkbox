import React from 'react'
import {connect} from 'react-redux'

const GhostResponse = props => {
  return (
    <div id="ghostresponse">
      {props.interaction ? props.interaction.response : 'Test'}
    </div>
  )
}

const mapState = state => ({
  interaction: state.CurrentInteraction
})

export default connect(mapState)(GhostResponse)
