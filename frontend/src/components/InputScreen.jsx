function InputScreen({ description, setDescription, onGenerate, error }) {
  const examples = [
    { label: 'Social App', text: 'A social media platform for developers with user profiles and tech posts' },
    { label: 'SaaS Platform', text: 'A startup SaaS for managing remote teams with organizations and billing' },
    { label: 'E-commerce', text: 'An e-commerce store with a product catalog and order processing' }
  ]

  return (
    <div className="input-screen fade-in">
      <div className="content">
        <div className="beta-badge">BUILD V1.0 - BETA ACCESS</div>
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
            placeholder="Describe your backend needs..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          
          {error && <p style={{ color: '#ef4444', marginBottom: '16px', fontSize: '0.9rem' }}>{error}</p>}

          <button 
            className="btn-primary btn-large"
            onClick={onGenerate}
            disabled={!description.trim() || description.length < 10}
          >
            Forge Infrastructure
          </button>

          <div className="example-tags">
            {examples.map((ex) => (
              <button 
                key={ex.label}
                className="example-tag"
                onClick={() => setDescription(ex.text)}
              >
                + {ex.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default InputScreen
