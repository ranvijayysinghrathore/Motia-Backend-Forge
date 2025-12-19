import { useState } from 'react'

const DOCS_CONTENT = {
  'getting-started': {
    title: 'Getting Started',
    content: (
      <>
        <p>Welcome to the <strong>Motia Backend Forge</strong>. This platform allows you to generate enterprise-grade backends from simple natural language descriptions.</p>
        <h2>How it works</h2>
        <p>When you provide a description, our Forge analyzes your requirements and assembles a collection of <strong>Motia Steps</strong> into a functional meta-workflow.</p>
        <p>Each "Forged" backend includes:</p>
        <ul>
          <li><strong>API Endpoints:</strong> RESTful routes for your entities.</li>
          <li><strong>Background Jobs:</strong> Automatic retry and failure handling.</li>
          <li><strong>Scheduled Tasks:</strong> Periodic cleanup and analytics.</li>
          <li><strong>State Persistence:</strong> Built-in Motia state management.</li>
        </ul>
      </>
    )
  },
  'api-saas': {
    title: 'SaaS Starter API',
    content: (
      <>
        <p>The SaaS template provides multi-tenancy support with organizations and usage tracking.</p>
        <h2>POST /api/organizations</h2>
        <div className="code-block">
          <div className="code-header">Example Body</div>
          <pre>{JSON.stringify({ "name": "Acme Corp", "tier": "pro" }, null, 2)}</pre>
        </div>
        <h2>POST /api/members</h2>
        <div className="code-block">
          <div className="code-header">Example Body</div>
          <pre>{JSON.stringify({ "orgId": "org_123", "email": "dev@acme.com", "role": "admin" }, null, 2)}</pre>
        </div>
        <h2>POST /api/usage</h2>
        <div className="code-block">
          <div className="code-header">Example Body</div>
          <pre>{JSON.stringify({ "orgId": "org_123", "feature": "api_calls", "quantity": 100 }, null, 2)}</pre>
        </div>
      </>
    )
  },
  'api-pm': {
    title: 'Task Management API',
    content: (
      <>
        <p>Build productivity tools with project boards and task lifecycles.</p>
        <h2>POST /api/projects</h2>
        <div className="code-block">
          <div className="code-header">Example Body</div>
          <pre>{JSON.stringify({ "name": "Mobile App Development", "color": "#0080ff" }, null, 2)}</pre>
        </div>
        <h2>POST /api/tasks</h2>
        <div className="code-block">
          <div className="code-header">Example Body</div>
          <pre>{JSON.stringify({ "projectId": "proj_abc", "title": "Buy Domain", "priority": "high" }, null, 2)}</pre>
        </div>
      </>
    )
  },
  'api-marketing': {
    title: 'Waitlist & Marketing API',
    content: (
      <>
        <p>Viral waitlist with referral tracking for new product launches.</p>
        <h2>POST /api/leads</h2>
        <div className="code-block">
          <div className="code-header">Example Body</div>
          <pre>{JSON.stringify({ "email": "early-bird@startup.io", "referralCode": "FRIEND_5" }, null, 2)}</pre>
        </div>
        <h2>GET /api/stats</h2>
        <p>Returns global waitlist size and viral metrics.</p>
      </>
    )
  },
  'api-social': {
    title: 'Social Template API',
    content: (
      <>
        <p>The social template provides a full set of endpoints for community platforms.</p>
        <h2>POST /api/users</h2>
        <div className="code-block"><pre>{JSON.stringify({ "email": "user@test.com", "name": "John" }, null, 2)}</pre></div>
        <h2>POST /api/posts</h2>
        <div className="code-block"><pre>{JSON.stringify({ "title": "My Post", "content": "Hello world" }, null, 2)}</pre></div>
        <h2>GET /api/posts</h2>
        <p>Retrieve all community posts from the state.</p>
      </>
    )
  },
  'api-ecommerce': {
    title: 'Ecommerce Template API',
    content: (
      <>
        <p>The ecommerce template handles catalogs and secure order processing.</p>
        <h2>POST /api/products</h2>
        <div className="code-block"><pre>{JSON.stringify({ "name": "Coffee", "price": 10, "stock": 100 }, null, 2)}</pre></div>
        <h2>POST /api/orders</h2>
        <div className="code-block"><pre>{JSON.stringify({ "productId": "p1", "quantity": 1 }, null, 2)}</pre></div>
      </>
    )
  }
}

function DocsScreen() {
  const [activeTab, setActiveTab] = useState('getting-started')

  return (
    <div className="docs-screen fade-in">
      <aside className="docs-sidebar">
        <span className="sidebar-title">Getting Started</span>
        <button className={`sidebar-link ${activeTab === 'getting-started' ? 'active' : ''}`} onClick={() => setActiveTab('getting-started')}>Introduction</button>
        
        <span className="sidebar-title" style={{ marginTop: '24px' }}>Templates Reference</span>
        <div className="sidebar-nav">
          <button className={`sidebar-link ${activeTab === 'api-saas' ? 'active' : ''}`} onClick={() => setActiveTab('api-saas')}>SaaS Starter</button>
          <button className={`sidebar-link ${activeTab === 'api-pm' ? 'active' : ''}`} onClick={() => setActiveTab('api-pm')}>Task Management</button>
          <button className={`sidebar-link ${activeTab === 'api-marketing' ? 'active' : ''}`} onClick={() => setActiveTab('api-marketing')}>Waitlist Pro</button>
          <button className={`sidebar-link ${activeTab === 'api-ecommerce' ? 'active' : ''}`} onClick={() => setActiveTab('api-ecommerce')}>E-commerce</button>
          <button className={`sidebar-link ${activeTab === 'api-social' ? 'active' : ''}`} onClick={() => setActiveTab('api-social')}>Social App</button>
        </div>
      </aside>

      <div className="docs-content">
        <h1>{DOCS_CONTENT[activeTab].title}</h1>
        {DOCS_CONTENT[activeTab].content}
      </div>
    </div>
  )
}

export default DocsScreen
