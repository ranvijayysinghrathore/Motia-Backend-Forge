import { useState } from 'react'

function ResultScreen({ result, onReset }) {
  const [copied, setCopied] = useState(null)
  const [shell, setShell] = useState('curl') // curl, powershell

  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text)
    setCopied(id)
    setTimeout(() => setCopied(null), 2000)
  }

  const getPowerShellCmd = (ep) => {
    const bodyStr = ep.body ? `-Body '${JSON.stringify(ep.body)}'` : ''
    return `Invoke-RestMethod -Method ${ep.method} -Uri "${result.backendUrl}${ep.path}" \`
  -Headers @{"Content-Type"="application/json"} ${bodyStr}`
  }

  const getCurlCmd = (ep) => {
    return `curl -X ${ep.method} ${result.backendUrl}${ep.path} \\
  -H "Content-Type: application/json" ${ep.body ? `\\
  -d '${JSON.stringify(ep.body)}'` : ''}`
  }

  return (
    <div className="result-screen fade-in">
      <div className="success-header">
        <span className="success-icon">✨</span>
        <h1 className="success-title">Forge Complete!</h1>
        <p className="subtitle">
          Your infrastructure is live. Deployment ID: {result.backendId}
        </p>
      </div>

      <div className="result-content">
        <div className="backend-url-section">
          <p className="section-label">Central API Gateway</p>
          <div className="url-box">
            <a 
              href={result.backendUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="backend-url-link"
            >
              {result.backendUrl}
            </a>
            <button 
              className="btn-copy"
              onClick={() => handleCopy(result.backendUrl, 'main')}
            >
              {copied === 'main' ? '✓ Copied' : '📋 Copy'}
            </button>
          </div>
        </div>

        <div className="endpoints-section">
          <div className="section-header">
            <p className="section-label">Active Endpoints & Usage</p>
            <div className="shell-toggle">
              <button 
                className={`toggle-btn ${shell === 'curl' ? 'active' : ''}`}
                onClick={() => setShell('curl')}
              >
                cURL
              </button>
              <button 
                className={`toggle-btn ${shell === 'powershell' ? 'active' : ''}`}
                onClick={() => setShell('powershell')}
              >
                PowerShell
              </button>
            </div>
          </div>

          <div className="endpoints-list">
            {result.endpointDetails.map((ep, index) => {
              const cmd = shell === 'curl' ? getCurlCmd(ep) : getPowerShellCmd(ep)
              const id = `ep-${index}`
              
              return (
                <div key={index} className="endpoint-card">
                  <div className="endpoint-info">
                    <div className="endpoint-title">
                      <span className={`method method-${ep.method.toLowerCase()}`}>{ep.method}</span>
                      <span className="path">{ep.path}</span>
                    </div>
                    <p className="desc">{ep.description}</p>
                  </div>

                  <div className="code-block-wrapper">
                    <div className="code-block">
                      <div className="code-header">
                        <span>{shell === 'curl' ? 'cURL Command' : 'PowerShell (Invoke-RestMethod)'}</span>
                        <button 
                          className="btn-copy-mini"
                          onClick={() => handleCopy(cmd, id)}
                        >
                          {copied === id ? '✓' : 'Copy'}
                        </button>
                      </div>
                      <pre>{cmd}</pre>
                    </div>
                  </div>

                  {ep.body && (
                    <div className="code-block-wrapper" style={{ marginTop: '12px' }}>
                      <div className="code-block secondary">
                        <div className="code-header">Example Payload</div>
                        <pre>{JSON.stringify(ep.body, null, 2)}</pre>
                      </div>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        </div>

        <div className="actions" style={{ textAlign: 'center', marginTop: '40px' }}>
          <button className="btn-primary" onClick={onReset}>
            Forge New Instance
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen
