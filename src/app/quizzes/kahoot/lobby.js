'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import './lobby.css'
import Navbar from '../../navbar'
import getSessionDetails from '../../getSession'
import { SessionProvider, useSession, signIn } from 'next-auth/react'
import { socket } from '../../socket.js'
import { redirect } from 'next/navigation'
import redirectToGame from './client-redirect'

// const socket = io('http://localhost:3030')

let email = ''

export default function Home () {
  return (
    <SessionProvider>
      <LobbyPage />
    </SessionProvider>
  )
}

const LobbyPage = () => {
  const { data: session, status } = useSession()
  const [players, setPlayers] = useState([])
  const questions = [['q', ['a', 'a', 'a', 'a']], ['q', ['a', 'a', 'a', 'a']]]

  useEffect(() => {
    if (status === 'authenticated' && session) {
      email = session.user.email
    }
  })

  useEffect(() => {
    if (email !== '') {
      console.log(email)
      // get questions FIRST!!

      // socket.connect('http://localhost:3030')
      socket.on('connect', function () {
        console.log('emitting email' + email)
        socket.emit('userPresent', email)
        socket.emit('questions', JSON.stringify(questions).toString())
        console.log(JSON.stringify(questions).toString())
        socket.on('currentPlayers', function (data) {
          console.log(JSON.parse(data))
          if (players) {
            setPlayers(JSON.parse(data))
          }
        })
        console.log('connected to localhost:3000')
        socket.on('startGame', function (data) {
          redirectToGame('/quizzes/kahoot/game')
        })
      })
      console.log('emitting email' + email)
      socket.emit('userPresent', email)
      socket.emit('questions', JSON.stringify(questions).toString())
      console.log(JSON.stringify(questions).toString())
      socket.on('currentPlayers', function (data) {
        console.log(JSON.parse(data))
        if (players) {
          setPlayers(JSON.parse(data))
        }
      })
      socket.on('startGame', function (data) {
        redirectToGame()
        // router.push('/quizzes/kahoot/game')
      })
      // return () => {
      //   console.log('disconenct')
      //   socket.disconnect()
      // }
    }
  }, [email])

  const startGame = () => {
    socket.emit('startGameNow', email)
  }

  return (
    <>
    <Navbar />
    <div className="lobby-container">
      <h1 className="lobby-title">Outwit, Outplay!</h1>
      <ul className="player-list">
        {players.map((player, index) => (
          <li key={index} className="player-item">{player}</li>
        ))}
      </ul>
      {/* <Link href="/quizzes/kahoot/game" passHref> */}
        <button className="start-game-button" onClick={startGame}>Start Game</button>
      {/* </Link> */}
    </div>
    </>
  )
}

// export default LobbyPage
