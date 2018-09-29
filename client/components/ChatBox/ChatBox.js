import React, {Component} from 'react'
import ChatBoxInput from './ChatBoxInput'
class ChatBox extends Component {
  constructor(props) {
    super(props)
    this.state = {
      test: "Yes"
    }
  }


  render(){
    console.log(this.state.test)
    return (
      <div id="chatbox">
        <ChatBoxInput/>
      </div>

    )
  }
}

export default ChatBox;
