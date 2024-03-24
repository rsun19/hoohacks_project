// pages/api/testEmailHandling.js
import { getSession } from "next-auth/react"
import { insertSetTitleAndGetId } from "/save-cards" // Adjust the import path

export default async function handler(req, res) {
  // Ensure this is a POST request
  if (req.method !== "POST") {
    return res.status(405).end() // Method Not Allowed
  }

  // Try to get the session
  const session = await getSession({ req })
  if (!session || !session.user.email) {
    return res.status(401).json({ message: "Not authenticated or email is missing" })
  }

  try {
    // Assuming insertSetTitleAndGetId takes a title and an email
    const title = "Test Title" // Example title
    const email = session.user.email // Extract the email from session
    const setId = await insertSetTitleAndGetId(title, email)

    // Send success response
    res.status(200).json({ setId })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Internal server error" })
  }
}
