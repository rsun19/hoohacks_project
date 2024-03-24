'use server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function findUserByEmail (email) {
  console.log("email: ", email)
  const user = await prisma.user.findUnique({
    where: {
      email: email
    }
  })
  return user
}

export const createUser = async (email, name = null) => {
  try {
    const user = await prisma.user.create({
      data: {
        email,
        name
      }
    })
    console.log('User created successfully:', user)
    return user
  } catch (error) {
    console.error('Error creating user:', error)
    throw error
  }
}
