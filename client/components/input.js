import React from 'react'

class Input extends React.Component {
    constructor() {
        super()
        this.state = {
            value: ''
        }
    }

    handleSubmit = evt => {
    evt.preventDefault()
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    }

    render() {
        return (
        <form id="userChat" onSubmit={this.handleSubmit}>
            <input
            id="userChatInput"
            type="textarea"
            name="chat"
            autoFocus
            value={this.state.value}
            onChange={this.handleChange}
        />
        </form>
        )
    } 
}

export default Input
