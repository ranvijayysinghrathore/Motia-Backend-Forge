import React from 'react'

function HomePage({ onStart }) {
  const features = [
    {
      icon: '🧠',
      title: 'Intent-Driven Logic',
      description: 'Our AI engine decodes natural language into precise Motia steps and state-driven workflows.'
    },
    {
      icon: '⚡',
      title: 'Dynamic Assembly',
      description: 'Infrastructure that builds infrastructure. Assembled, registered, and deployed in under 10 seconds.'
    },
    {
      icon: '🛡️',
      title: 'Enterprise Resilience',
      description: 'Built-in event tracking and failure notifications ensure your backend stays healthy in the wild.'
    }
  ]

  const steps = [
    { num: '01', title: 'Conceptualize', text: 'Describe your application flow, entities, and feature requirements.' },
    { num: '02', title: 'Forge', text: 'Motia Forge analyzes the intent and assembles the necessary meta-infrastructure.' },
    { num: '03', title: 'Observe', text: 'Watch as your backend is deployed live with native state management.' },
    { num: '04', title: 'Integrate', text: 'Use the generated multi-shell commands to integrate into your application.' }
  ]

  return (
    <div className="home-page fade-in">
      {/* Hero Section */}
      <section className="hero-section split-hero">
        <div className="hero-content">
          <div className="beta-badge">BUILD V1.0 - HACKATHON ACCESS</div>
          <h1 className="hero-title">
            The <span className="blue">Meta-Infrastructure</span> <br />
            Engine for <span className="pink">Motia</span>
          </h1>
          <p className="hero-subtitle">
            Describe your application and let the Forge assemble and deploy 
            your entire backend infrastructure in seconds. Premium-grade engineering, 
            powered by intent.
          </p>
          <div className="hero-cta-group">
            <button className="btn-premium" onClick={onStart}>Launch Forge ⚒️</button>
            <button className="btn-secondary-outline" onClick={() => window.scrollTo({ top: 1000, behavior: 'smooth' })}>How it Works</button>
          </div>
        </div>

        <div className="hero-visual">
          <div className="visual-grid">
            <div className="visual-item card-1">
              <img src="/motia-workflows.png" alt="Motia Workflows" />
            </div>
            <div className="visual-item card-2">
              <img src="/trace-details.png" alt="Trace Details" />
            </div>
            <div className="visual-item card-3">
              <img src="/endpoints.png" alt="Endpoints" />
            </div>
          </div>
        </div>
        <div className="glow-background"></div>
      </section>

      {/* Features Section */}
      <section className="home-section">
        <span className="section-label">🚀 What You Can Do</span>
        <h2 className="section-h2">Architected for Speed. <br/> Built for Precision.</h2>
        <div className="features-grid">
          {features.map(f => (
            <div key={f.title} className="premium-card">
              <span className="card-icon">{f.icon}</span>
              <h3>{f.title}</h3>
              <p>{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="home-section">
        <div className="glass-container" style={{ background: 'rgba(255,255,255,0.01)', padding: '120px 40px', borderRadius: '64px', border: '1px solid var(--border)' }}>
          <span className="section-label">The Process</span>
          <h2 className="section-h2">From Intent to Infrastructure</h2>
          <div className="steps-container">
            {steps.map(s => (
              <div key={s.num} className="step-item">
                <div className="step-num">{s.num}</div>
                <div className="step-content">
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="home-section cta-section">
        <h2 className="section-h2">Ready to Forge your future?</h2>
        <button className="btn-premium" onClick={onStart}>Get Started Today</button>
      </section>
    </div>
  )
}

export default HomePage
