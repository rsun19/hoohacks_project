'use server'

import { redirect } from 'next/navigation'

const redirectToGame = async () => {
  redirect('/quizzes/kahoot/game')
}

export default redirectToGame
