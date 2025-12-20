import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'
import { aiParserService } from '../services/ai-parser.service'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'ForgeBackendApi',
  description: 'Main API endpoint to generate backends from descriptions',
  flows: ['forge-backend'],
  method: 'POST',
  path: '/forge-backend',
  bodySchema: z.object({
    description: z.string().min(10, 'Description must be at least 10 characters'),
  }),
  responseSchema: {
    200: z.object({
      backendUrl: z.string(),
      endpoints: z.array(z.string()),
      endpointDetails: z.array(z.any()),
      templateType: z.string(),
      backendId: z.string(),
    }),
    400: z.object({
      error: z.string(),
    }),
  },
  emits: ['project.description.received'],
}

export const handler: Handlers['ForgeBackendApi'] = async (req, { logger, emit, traceId }) => {
  logger.info('🚀 Forge Backend API - Received request', { 
    description: req.body.description,
    traceId 
  })

  try {
    // Generate unique backend ID
    const backendId = `backend-${Date.now()}-${Math.random().toString(36).substring(7)}`

    // Detect Base URL from request headers
    const host = req.headers['host'] || ''
    const isLocal = host.includes('localhost') || host.includes('127.0.0.1')
    const protocol = req.headers['x-forwarded-proto'] || (isLocal ? 'http' : 'https')
    const baseUrl = process.env.BASE_URL || (host ? `${protocol}://${host}` : 'http://localhost:3000')

    // Emit event to start the workflow
    await emit({
      topic: 'project.description.received',
      data: {
        description: req.body.description,
        backendId,
        traceId,
        baseUrl, // Pass the detected baseUrl
      },
    })

    logger.info('✅ Emitted project.description.received event', { backendId, baseUrl })

    const deployUrl = baseUrl // In platform mode, deployed URL is the base URL

    const intent = aiParserService.parseDescription(req.body.description)
    const templateType = intent.templateType
    let endpoints = ['POST /api/users', 'POST /api/posts', 'GET /api/posts', 'PUT /api/posts/:id', 'DELETE /api/posts/:id']
    let endpointDetails: any[] = [
      { method: 'POST', path: '/api/users', description: 'Create a new user', body: { email: 'user@example.com', password: 'password123', name: 'John Doe' } },
      { method: 'POST', path: '/api/posts', description: 'Create a new post', body: { title: 'Hello Motia', content: 'This is my first post!' } },
      { method: 'GET', path: '/api/posts', description: 'List all posts', body: null },
    ]

    // 🛍️ Ecommerce
    if (templateType === 'ecommerce') {
      endpoints = ['POST /api/products', 'POST /api/orders', 'POST /api/users']
      endpointDetails = [
        { method: 'POST', path: '/api/products', description: 'Add a new product', body: { name: 'Premium Espresso', price: 15.99, description: 'High quality coffee beans', stock: 100 } },
        { method: 'POST', path: '/api/orders', description: 'Place a new order', body: { productId: 'prod_123', quantity: 2, shippingAddress: '123 Motia Lane' } },
        { method: 'POST', path: '/api/users', description: 'Register a customer', body: { email: 'customer@test.com', name: 'Jane Doe' } },
      ]
    } 
    // 🏢 SaaS Starter
    else if (templateType === 'saas') {
      endpoints = ['POST /api/organizations', 'POST /api/members', 'POST /api/usage']
      endpointDetails = [
        { method: 'POST', path: '/api/organizations', description: 'Create an organization (Note: system auto-detects the latest org for subsequent steps)', body: { name: 'Acme Corp', tier: 'pro' } },
        { method: 'POST', path: '/api/members', description: 'Add member (Uses latest org if orgId is a placeholder)', body: { orgId: 'org_placeholder', email: 'dev@acme.com', role: 'admin' } },
        { method: 'POST', path: '/api/usage', description: 'Report usage (Uses latest org if orgId is a placeholder)', body: { orgId: 'org_placeholder', feature: 'api_calls', quantity: 150 } },
      ]
    }
    // 📋 Task Management
    else if (templateType === 'task-manager') {
      endpoints = ['POST /api/projects', 'POST /api/tasks']
      endpointDetails = [
        { method: 'POST', path: '/api/projects', description: 'Create a new project board', body: { name: 'Q1 Roadmap', color: '#ff0000' } },
        { method: 'POST', path: '/api/tasks', description: 'Add task to project', body: { projectId: 'proj_77', title: 'Implement Auth', priority: 'high', dueDate: '2025-12-31' } },
      ]
    }
    // 🚀 Waitlist/Marketing
    else if (templateType === 'waitlist') {
      endpoints = ['POST /api/leads', 'GET /api/stats']
      endpointDetails = [
        { method: 'POST', path: '/api/leads', description: 'Join the waitlist', body: { email: 'earlybird@gmail.com', referralCode: 'FRIEND_22' } },
        { method: 'GET', path: '/api/stats', description: 'Get global waitlist stats', body: null },
      ]
    }

    return {
      status: 200,
      body: {
        backendUrl: deployUrl,
        endpoints,
        endpointDetails,
        templateType,
        backendId,
      },
    }
  } catch (error) {
    logger.error('❌ Error in ForgeBackendApi', { error })
    return {
      status: 400,
      body: {
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    }
  }
}
