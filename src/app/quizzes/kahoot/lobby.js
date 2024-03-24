'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import './lobby.css'

const socket = io('http://localhost:3030')

const LobbyPage = () => {
  const [players, setPlayers] = useState([])
  const questions = [['q', ['a', 'a', 'a', 'a']], ['q', ['a', 'a', 'a', 'a']]]

  useEffect(() => {
    // get questions FIRST!!

    // socket.connect('http://localhost:3030')
    socket.on('connect', function () {
      // setInterval(function () {
      socket.emit('userPresent', 'user1')
      socket.emit('userPresent', 'user2')
      // }, 3000)
      socket.emit('questions', JSON.stringify(questions).toString())
      console.log(JSON.stringify(questions).toString())
      socket.on('currentPlayers', function (data) {
        console.log(JSON.parse(data))
        setPlayers(JSON.parse(data))
      })
      console.log('connected to localhost:3000')
    })
  }, [])

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">Welcome to the Arena</h1>
      <ul className="player-list">
        {players.map((player, index) => (
          <li key={index} className="player-item">{player}</li>
        ))}
      </ul>
      <Link href="/quizzes/kahoot/game" passHref>
        <button className="start-game-button">Start Game</button>
      </Link>
    </div>
  )
}

export default LobbyPage
