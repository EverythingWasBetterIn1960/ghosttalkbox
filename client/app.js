import React from 'react'
import {ChatBox, GhostResponse} from './components/'
// import Routes from './routes'  - Unsure if I will need routes yet

const App = () => {
  console.log("HEllo world");
  return (
    <div id="main">
      <h1> Ghost Talk Box</h1>
      <GhostResponse />
      <ChatBox />
    </div>
  )
}

export default App
