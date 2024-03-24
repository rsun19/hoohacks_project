'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import './lobby.css'
import Navbar from '../../navbar'
import getSessionDetails from '../../getSession'
import { SessionProvider, useSession, signIn } from 'next-auth/react'

const socket = io('http://localhost:3030')

const email = ''

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
      console.log(session.user.email)
      // get questions FIRST!!

      // socket.connect('http://localhost:3030')
      socket.on('connect', function () {
      // setInterval(function () {
        socket.emit('userPresent', session.user.email)
        // }, 3000)
        socket.emit('questions', JSON.stringify(questions).toString())
        console.log(JSON.stringify(questions).toString())
        socket.on('currentPlayers', function (data) {
          console.log(JSON.parse(data))
          setPlayers(JSON.parse(data))
        })
        console.log('connected to localhost:3000')
      })
    }
  }, [status, session])

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
      <Link href="/quizzes/kahoot/game" passHref>
        <button className="start-game-button">Start Game</button>
      </Link>
    </div>
    </>
  )
}

// export default LobbyPage
