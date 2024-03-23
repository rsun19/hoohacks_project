'use server'

/*
https://next-auth.js.org/getting-started/example#frontend---add-react-hook
*/

const getSessionDetails = async () => {
  fetch('/api/auth/session')
    .then(res => {
      if (!res.ok) {
        console.log('lol rip')
      }
      return res.json()
    }).then(data => {
      console.log(data)
      console.log(data.user)
      console.log(data.user.name)
      console.log(data.user.email)
      console.log(data.user.image)
    })
}

export default getSessionDetails
