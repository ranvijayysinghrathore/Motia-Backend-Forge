import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'GetEntities',
  description: 'Get all entities endpoint (template workflow)',
  flows: ['entity-management'],
  method: 'GET',
  path: '/api/posts',
  responseSchema: {
    200: z.object({
      posts: z.array(z.object({
        id: z.string(),
        title: z.string(),
        content: z.string(),
        authorId: z.string(),
        createdAt: z.string(),
      })),
      count: z.number(),
    }),
  },
  emits: [],
}

export const handler: Handlers['GetEntities'] = async (req, { logger, state }) => {
  logger.info('📋 Get Entities - Fetching all posts')

  try {
    // In production, this would query a database
    // For MVP, we'll return a mock response
    const posts = [
      {
        id: 'post-demo-1',
        title: 'Welcome to your generated backend!',
        content: 'This is a demo post from your Motia-generated backend.',
        authorId: 'user-demo-1',
        createdAt: new Date().toISOString(),
      },
    ]

    logger.info('✅ Entities fetched successfully', { count: posts.length })

    return {
      status: 200,
      body: {
        posts,
        count: posts.length,
      },
    }
  } catch (error) {
    logger.error('❌ Error fetching entities', { error })
    return {
      status: 200,
      body: {
        posts: [],
        count: 0,
      },
    }
  }
}
