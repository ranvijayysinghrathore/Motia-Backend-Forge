import { useState } from 'react'
import InputScreen from './components/InputScreen'
import LoadingScreen from './components/LoadingScreen'
import ResultScreen from './components/ResultScreen'
import './App.css'

const API_BASE_URL = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3000'

function App() {
  const [state, setState] = useState('idle') // idle, loading, success, error
  const [description, setDescription] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)

  const handleGenerate = async () => {
    if (!description.trim() || description.length < 10) {
      setError('Please provide a description of at least 10 characters')
      return
    }

    setState('loading')
    setError(null)

    try {
      const response = await fetch(`${API_BASE_URL}/forge-backend`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ description }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate backend')
      }

      setResult(data)
      setState('success')
    } catch (err) {
      console.error('Error generating backend:', err)
      setError(err.message || 'Failed to generate backend. Please try again.')
      setState('error')
    }
  }

  const handleReset = () => {
    setState('idle')
    setDescription('')
    setResult(null)
    setError(null)
  }

  return (
    <div className="app">
      {state === 'idle' && (
        <InputScreen
          description={description}
          setDescription={setDescription}
          onGenerate={handleGenerate}
          error={error}
        />
      )}
      
      {state === 'loading' && <LoadingScreen />}
      
      {state === 'success' && result && (
        <ResultScreen result={result} onReset={handleReset} />
      )}
      
      {state === 'error' && (
        <div className="error-screen">
          <div className="error-content">
            <h1>❌ Error</h1>
            <p>{error}</p>
            <button onClick={handleReset} className="btn-primary">
              Try Again
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
