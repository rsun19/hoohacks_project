'use client'
import React, { useEffect } from 'react'
import { SessionProvider, useSession, signIn } from 'next-auth/react'
import Navbar from './navbar'
import House from './home'
import { createUser, findUserByEmail } from './user-db'

export default function Home () {
  return (
    <SessionProvider>
      <HomeContent />
    </SessionProvider>
  )
}

function HomeContent () {
  const { data: session, status } = useSession()

  useEffect(() => {
    async function findUser () {
    // Redirect to sign-in page if session is not loading and not authenticated
      if (status === 'authenticated' && session) {
        console.log('User is authenticated:', session.user.email)
        const existingUser = await findUserByEmail(session.user.email)
        console.log('existing user:', existingUser)
        if (!existingUser) {
          await createUser(session.user.email)
          console.log('User created successfully.')
        } else {
          console.log('User already exists:', existingUser)
        }
      } else if (status === 'loading') {
        console.log('Loading session...')
      } else {
        signIn()
      }
    }
    findUser()
  }, [status, session])

  useEffect(() => {
    console.log('Status:', status)
    console.log('Session:', session)
    // Additional logic here
  }, [status, session])

  return (
    <>
      <Navbar />
      <House />
    </>
  )
}
