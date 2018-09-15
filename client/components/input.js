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
            type="text"
            name="chat"
            autoFocus
            value={this.state.value}
            onChange={this.handleChange}
        />
            <input type="submit" />
        </form>
        )
    } 
}

export default Input
