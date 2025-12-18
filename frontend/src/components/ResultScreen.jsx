import { useState } from 'react'

function ResultScreen({ result, onReset }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(result.backendUrl)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="result-screen">
      <div className="result-content">
        <div className="success-header">
          <div className="success-icon">✅</div>
          <h1 className="success-title">Backend Ready!</h1>
        </div>

        <div className="backend-url-section">
          <p className="section-label">Your backend is running at:</p>
          <div className="url-box">
            <code className="backend-url">{result.backendUrl}</code>
            <button 
              className="btn-copy"
              onClick={handleCopy}
              title="Copy URL"
            >
              {copied ? '✓' : '📋'}
            </button>
          </div>
        </div>

        <div className="endpoints-section">
          <p className="section-label">Available APIs:</p>
          <div className="endpoints-list">
            {result.endpoints.map((endpoint, index) => (
              <div key={index} className="endpoint-item">
                <code>{endpoint}</code>
              </div>
            ))}
          </div>
        </div>

        <div className="actions">
          <button className="btn-primary" onClick={onReset}>
            Generate Another Backend
          </button>
        </div>

        <div className="info-box">
          <p>
            <strong>Backend ID:</strong> <code>{result.backendId}</code>
          </p>
          <p className="info-note">
            💡 Your backend includes authentication, CRUD operations, background jobs, 
            retry logic, and scheduled tasks - all ready to use!
          </p>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
