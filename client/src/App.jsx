import React from 'react'
import {io} from 'socket.io-client'

const App = () => {


  //just because the two urls are different then it is blocked by cors
  const socket = io("http://localhost:3000")
  

  return (
    <div>App</div>
  )
}

export default App