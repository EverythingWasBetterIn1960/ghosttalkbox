import React from 'react'

import Input from './components/input'
import GhostChatBox from './components/ghost-chat-box'
const App = () => {
  return (
    <div id="userChatBox">
      <Input />
      <GhostChatBox />
    </div>
  )
}

export default App
