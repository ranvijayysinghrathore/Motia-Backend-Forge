import { useEffect, useState } from 'react'

const loadingMessages = [
  'Analyzing your description...',
  'Selecting backend template...',
  'Assembling workflows...',
  'Deploying to Motia Cloud...',
]

function LoadingScreen() {
  const [messageIndex, setMessageIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % loadingMessages.length)
    }, 1500)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="loading-screen">
      <div className="loading-content">
        <div className="spinner"></div>
        <h2 className="loading-title">Generating Backend</h2>
        <p className="loading-message">{loadingMessages[messageIndex]}</p>
      </div>
    </div>
  )
}

export default LoadingScreen
