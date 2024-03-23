'use client'
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import io from 'socket.io-client'
import './lobby.css'

const socket = io(process.env.NEXT_PUBLIC_SOCKET_IO_SERVER_URL, { autoConnect: false })

const LobbyPage = () => {
  const [players, setPlayers] = useState(['Player 1', 'Player 2'])

  useEffect(() => {
    socket.connect()

    socket.on('connect', () => {
      console.log('Connected to socket.io server')
    })

    socket.on('lobbyUpdate', (updatedPlayers) => {
      setPlayers(updatedPlayers)
    })

    return () => {
      socket.disconnect()
    }
  }, [])

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">Welcome to the Arena</h1>
      <ul className="player-list">
        {players.map((player, index) => (
          <li key={index} className="player-item">{player}</li>
        ))}
      </ul>
      <Link href="/kahoot/game" passHref>
        <button className="start-game-button">Start Game</button>
      </Link>
    </div>
  )
}

export default LobbyPage
