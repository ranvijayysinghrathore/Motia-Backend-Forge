import React from 'react'

const AntigravityBackground = () => {
  return (
    <div className="antigravity-bg">
      <div className="float-blob blob-1"></div>
      <div className="float-blob blob-2"></div>
      
      <div className="floating-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="particle" 
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 4 + 1}px`,
              height: `${Math.random() * 4 + 1}px`,
              animationDelay: `${Math.random() * 8}s`,
              animationDuration: `${Math.random() * 10 + 10}s`
            }}
          ></div>
        ))}
      </div>
    </div>
  )
}

export default AntigravityBackground
