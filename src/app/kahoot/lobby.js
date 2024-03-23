import React, { useState, useEffect } from 'react'

const Lobby = () => {
  const [players, setPlayers] = useState([])

  useEffect(() => {
    // Placeholder: Simulate fetching player names
    const fakePlayers = ['Player 1', 'Player 2', 'Player 3']
    setPlayers(fakePlayers)

    // In a real app, you'd fetch this data from your server
  }, [])

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl mb-6">Game Lobby</h1>
      <ul className="list-disc mb-6">
        {players.map((player, index) => (
          <li key={index}>{player}</li>
        ))}
      </ul>
      {players.length > 0 && (
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Start Game
        </button>
      )}
    </div>
  )
}

export default Lobby
