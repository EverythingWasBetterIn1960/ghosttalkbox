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
        <form onSubmit={this.handleSubmit}>
            <input
            id="userChat"
            type="text"
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
