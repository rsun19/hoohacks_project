/* eslint-disable react/prop-types */
'use client'
import React, { useState } from 'react'
import Navbar from '../navbar'
import { saveCards } from './save-cards'

const cardMapping = new Map()
cardMapping.set(0, ['', ''])
let cardNum = 0
const cardList = []

const Create = () => {
  function handleQuestionChange (id, value) {
    if (id === 0) {
      const mapping = cardMapping.get(0)
      mapping[0] = value
      cardMapping.set(0, mapping)
    } else {
      cardList.forEach(card => {
        if (card.props.id === id.toString()) {
          const mapping = cardMapping.get(Number(card.props.id))
          mapping[0] = value
          cardMapping.set(Number(card.props.id), mapping)
        }
      })
    }
  }

  function handleAnswerChange (id, value) {
    if (id === 0) {
      const mapping = cardMapping.get(0)
      mapping[1] = value
      cardMapping.set(0, mapping)
    } else {
      cardList.forEach(card => {
        if (card.props.id === id.toString()) {
          const mapping = cardMapping.get(Number(card.props.id))
          mapping[1] = value
          cardMapping.set(Number(card.props.id), mapping)
        }
      })
    }
  }

  const Card = (id) => {
    return (
        <div className='m-3'>
          <div className='flex gap-6'>
              <textarea
              type="text"
              id={ `${id}-question` }
              placeholder="Question"
              onChange={(e) => {
                handleQuestionChange(Number(id.id), document.getElementById(`${id}-question`).value)
              }}
              className= 'flex-auto block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'/>

              <textarea
              type="text"
              id={ `${id}-answer` }
              onChange={(e) => handleAnswerChange(Number(id.id), document.getElementById(`${id}-answer`).value)}
              placeholder="Answer"
              className= 'flex-auto block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'/>
          </div>
        </div>
    )
  }

  const [cards, setCards] = useState([<Card key={0} id={'0'} />])

  const addCards = () => {
    cardNum += 1
    setCards([...cards, <Card key={cardNum} id={cardNum.toString()} />])
    cardMapping.set(cardNum, ['', ''])
    cardList.push(<Card key={cardNum} id={cardNum.toString()} />)
  }

  //   const removeCard = (keyToRemove) => {
  //     const updatedCards = cards.filter(card => card.key !== keyToRemove)
  //     setCards(updatedCards)
  //   }

  return (
    <>
      <Navbar />
      <div className='m-3'>
        <input type="text" id="setName" placeholder="Name your set" className= 'block rounded-lg py-2 px-3 border border-gray-300 bg-gray-50'/>
      </div>
      <h3 className='ml-3 mb-3'>Cards</h3>
      <div>
        {cards.map((card, index) => (
          <div key={index}>
            {card}
          </div>
        ))}
      </div>
      <div className='my-3 text-center flex items-center justify-center'>
        <div className='py-2 px-4 bg-teal-700 rounded-xl cursor-pointer' onClick={() => { addCards() }}>
          Add a card
        </div>
      </div>
      <div className='my-3 text-center flex items-center justify-center'>
        <div className='py-2 px-4 bg-teal-700 rounded-xl cursor-pointer' onClick={() => {
          saveCards(document.getElementById('setName').value, cardMapping)
        }}>
          Submit
        </div>
      </div>
    </>
  )
}

export default Create
