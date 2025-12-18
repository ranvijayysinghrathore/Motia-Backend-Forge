import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

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

    // Emit event to start the workflow
    await emit({
      topic: 'project.description.received',
      data: {
        description: req.body.description,
        backendId,
        traceId,
      },
    })

    logger.info('✅ Emitted project.description.received event', { backendId })

    // For now, return the platform URL (since we host it)
    const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
    const deployUrl = baseUrl // In platform mode, deployed URL is the base URL

    const d = req.body.description.toLowerCase()
    let endpoints = [
      'POST /api/users',
      'POST /api/posts',
      'GET /api/posts',
      'PUT /api/posts/:id',
      'DELETE /api/posts/:id',
    ]

    if (d.includes('shop') || d.includes('store') || d.includes('buy') || d.includes('sell') || d.includes('product') || d.includes('e-commerce') || d.includes('ecommerce')) {
      endpoints = [
        'POST /api/products',
        'POST /api/orders',
        'POST /api/users',
      ]
    }

    return {
      status: 200,
      body: {
        backendUrl: deployUrl,
        endpoints,
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
