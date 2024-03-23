'use server'

// const saveAnswers = async(email: string, accessToken: string) => {
//     const user = await prisma.user.update(
//         {
//             where: {
//                 email: email
//             },
//             data: {
//                 accessToken: accessToken
//             }
//         }
//     )
//     return user;
// }

// const saveQuestions = async(email: string, accessToken: string) => {
//     const user = await prisma.user.update(
//         {
//             where: {
//                 email: email
//             },
//             data: {
//                 accessToken: accessToken
//             }
//         }
//     )
//     return user;
// }

// const saveSet = async(name) => {

// }

const saveCards = async (title, cardMappings) => {
  cardMappings.forEach((value, key) => {
    console.log(`Key: ${key}, Question: ${value[0]}`)
    console.log(`Key: ${key}, Answer: ${value[1]}`)
  })
}

export default saveCards
