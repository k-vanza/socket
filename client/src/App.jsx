//import { useEffect } from 'react'
import React, {useEffect, useState, useMemo} from 'react'
import {io} from 'socket.io-client'
import {Button, Container, TextField, Typography} from '@mui/material'

const App = () => {


  //just because the two urls are different then it is blocked by cors
  const socket = useMemo(() => io("http://localhost:3000"), [])

  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', message)
    setMessage('')
  }


  //below are the listners to the emit in server 
  useEffect(() => {
      socket.on("connect", () => {
        console.log("connected", socket.id)
      })
      //here welcome is the event which is in the app.js and the data to be passed is called using an object which is s
      socket.on("welcome", (s) => {
        console.log(s)
      })

      socket.on('receive-message', (data) => {
        console.log(data)
      })

      return () => {
        socket.disconnect()
      }
  }, [])
  
  

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        welcome to socket io
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)} 
          id='outlined-basic' 
          label='Outlined' 
          variant='outlined' />

        <Button type='submit' variant='contained' color='primary'>
          Send
        </Button>
        
      </form>
    </Container>
  )
}

export default App