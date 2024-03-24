'use server'

import { redirect } from 'next/navigation'

const startFutureRound = async (currentQuestionIndex) => {
  console.log(currentQuestionIndex)
  redirect('/quizzes/kahoot/game?next=1')
}

export default startFutureRound
