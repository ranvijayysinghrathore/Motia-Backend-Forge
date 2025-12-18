function InputScreen({ description, setDescription, onGenerate, error }) {
  return (
    <div className="input-screen">
      <div className="content">
        <div className="header">
          <h1 className="title">
            <span className="gradient-text">Motia Backend Forge</span>
          </h1>
          <p className="subtitle">
            Describe your app and get a running backend instantly
          </p>
        </div>

        <div className="input-section">
          <textarea
            className="description-input"
            placeholder="Example: A simple app with users, posts, and comments"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          
          {error && <p className="error-message">{error}</p>}

          <button 
            className="btn-primary btn-large"
            onClick={onGenerate}
            disabled={!description.trim()}
          >
            Generate Backend
          </button>
        </div>

        <div className="features">
          <div className="feature">
            <span className="feature-icon">⚡</span>
            <span>Instant Deployment</span>
          </div>
          <div className="feature">
            <span className="feature-icon">🔄</span>
            <span>Background Jobs</span>
          </div>
          <div className="feature">
            <span className="feature-icon">📊</span>
            <span>Scheduled Tasks</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputScreen
