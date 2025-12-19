function InputScreen({ description, setDescription, onGenerate, error }) {
  return (
    <div className="input-screen fade-in">
      <div className="content">
        <h1 className="title">
          A New Paradigm in <br />
          <span className="gradient-text">Backend Engineering</span>
        </h1>
        <p className="subtitle">
          Describe your application and let Motia Forge assemble, 
          register, and deploy your entire backend infrastructure in seconds.
        </p>

        <div className="input-section">
          <textarea
            className="description-input"
            placeholder="e.g., A SaaS platform with organizations, or a Project Management tool with task boards..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

          <button 
            className="btn-primary btn-large"
            onClick={onGenerate}
            disabled={!description.trim()}
          >
            Forge Infrastructure
          </button>
        </div>
      </div>
    </div>
  )
}

export default InputScreen
