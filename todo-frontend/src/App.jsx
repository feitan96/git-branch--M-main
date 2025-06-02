import React, { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [welcomeMessage, setWelcomeMessage] = useState('Loading...')
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchWelcomeMessage = async () => {
      try {
        const response = await fetch('http://localhost:8080/welcome')
        if (!response.ok) {
          throw new Error('Failed to fetch welcome message')
        }
        const data = await response.text()
        console.log(data)
        setWelcomeMessage(data)
      } catch (error) {
        console.error(error)
        setError(error.message)
      }
    }

    fetchWelcomeMessage()
  }, [])

  console.log(welcomeMessage)

  return (
    <>
      <p className="read-the-docs">
          {error ? (
            <>
              {welcomeMessage}
              <br />
              <small style={{ color: 'red' }}>({error})</small>
            </>
          ) : (
            welcomeMessage
          )}
        </p>
    </>
  )
}

export default App
