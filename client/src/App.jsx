//import { useEffect } from 'react'
import React, {useEffect, useState, useMemo} from 'react'
import {io} from 'socket.io-client'
import {Button, Container, Stack, TextField, Typography} from '@mui/material'

const App = () => {


  //just because the two urls are different then it is blocked by cors
  const socket = useMemo(() => io("http://localhost:3000"), [])

  const [message, setMessage] = useState('')
  const [room, setRoom] = useState('')
  const [socketID, setSocketID] = useState('')

  //this is to display the messag eon the web page
  const [messages, setMessages] = useState([])

  console.log(messages)

  const handleSubmit = (e) => {
    e.preventDefault()
    socket.emit('message', {message, room})
    setMessage('')
    setRoom('')
  }


  //below are the listners to the emit in server 
  useEffect(() => {
      socket.on("connect", () => {
        setSocketID(socket.id)
        console.log("connected", socket.id)
      })
      //here welcome is the event which is in the app.js and the data to be passed is called using an object which is s
      socket.on("welcome", (s) => {
        console.log(s)
      })

      socket.on('receive-message', (data) => {
        console.log(data)

        //this basically spreads the existing message to a new array which is declared in the useState above
        //messages will map the message into an array
        setMessages((messages) => [...messages, data])
      })

      return () => {
        socket.disconnect()
      }
  }, [])
  
  

  return (
    <Container maxWidth='sm'>
      <Typography variant='h4' gutterBottom>
        {socketID}
      </Typography>

      <form onSubmit={handleSubmit}>
        <TextField
          value={message}
          onChange={(e) => setMessage(e.target.value)} 
          id='outlined-basic' 
          label='Message' 
          variant='outlined' />

        <TextField
          value={room}
          onChange={(e) => setRoom(e.target.value)} 
          id='outlined-basic' 
          label='enter room-id on which you want to send message' 
          variant='outlined' />

        <Button type='submit' variant='contained' color='primary'>
          Send
        </Button>
        
      </form>

      <Stack>
        {messages.map((m,i) => (
          <Typography key={i} variant='h4' component="div" gutterBottom>
            {m}
          </Typography>
        ))}
      </Stack>
    </Container>
  )
}

export default App