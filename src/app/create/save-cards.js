'use server'
import { getSession } from 'next-auth/react'
import { findUserByEmail } from '../user-db.js'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Function to insert the title into the 'sets' table and return its ID
async function insertSetTitleAndGetId (title, email) {
  // get user stuff
  console.log('Attempting to find user with email: ', email)
  const existingUser = await findUserByEmail(email)
  const set = await prisma.set.create({
    data: {
      name: title,
      subject: '7', // Include the subject in the data object
      userId: existingUser.id
    }
  })
  return set.id
}

// Function to insert a question into the 'questions' table with the setId, and return its ID
async function insertQuestionAndGetId (setId, questionText) {
  const question = await prisma.question.create({
    data: {
      question: questionText,
      setId // Assuming 'setId' is the correct field name in your schema
    }
  })
  return question.id
}

// Function to insert an answer into the 'answers' table with the questionId and isCorrect flag
async function insertAnswer (questionId, answerText, isCorrect) {
  await prisma.answer.create({
    data: {
      answer: answerText,
      questionId,
      isCorrect // Assuming 'isCorrect' is a boolean field in your schema
    }
  })
}

// Main function to handle the saving of cards
export const saveCards = async (title, cardMappings) => {
  try {
    // First, insert the title as a new set and get its ID
    const setId = await insertSetTitleAndGetId(title)

    // Then, iterate over each card mapping
    for (const [key, value] of cardMappings) {
      const [questionText, answersText] = value

      console.log(`Key: ${key}, Question: ${questionText}`)

      // Insert the question and get its ID
      const questionId = await insertQuestionAndGetId(setId, questionText)

      // Split the string of answers into an array
      const answers = answersText.split(',')

      for (let i = 0; i < answers.length; i++) {
        // The first answer is marked as correct (isCorrect = true), the rest as incorrect (isCorrect = false)
        await insertAnswer(questionId, answers[i].trim(), i === 0)
      }

      console.log(`Key: ${key}, Answers: ${answersText}`)
    }
  } catch (error) {
    console.error('Error saving cards:', error)
    throw error
  }
}
