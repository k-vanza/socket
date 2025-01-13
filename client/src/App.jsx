//import { useEffect } from 'react'
import React, {useEffect} from 'react'
import {io} from 'socket.io-client'
import {Container, Typography} from '@mui/material'

const App = () => {


  //just because the two urls are different then it is blocked by cors
  const socket = io("http://localhost:3000")

  useEffect(() => {
      socket.on("connect", () => {
        console.log("connected", socket.id)
      })
      //here welcome is the event which is in the app.js and the data to be passed is called using an object which is s
      socket.on("welcome", (s) => {
        console.log(s)
      })

      return () => {
        socket.disconnect()
      }
  }, [])
  
  

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4'>
        welcome to socket io
      </Typography>
    </Container>
  )
}

export default App