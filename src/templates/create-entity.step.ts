import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'CreateEntity',
  description: 'Generic entity creation endpoint (template workflow)',
  flows: ['entity-management'],
  method: 'POST',
  path: '/posts',
  bodySchema: z.object({
    title: z.string().min(1),
    content: z.string().min(1),
    authorId: z.string(),
  }),
  responseSchema: {
    201: z.object({
      id: z.string(),
      title: z.string(),
      content: z.string(),
      authorId: z.string(),
      createdAt: z.string(),
    }),
    400: z.object({
      error: z.string(),
    }),
  },
  emits: ['entity.created'],
}

export const handler: Handlers['CreateEntity'] = async (req, { logger, emit, state }) => {
  logger.info('📝 Create Entity - Creating new post', { 
    title: req.body.title,
    authorId: req.body.authorId,
  })

  try {
    const entityId = `post-${Date.now()}-${Math.random().toString(36).substring(7)}`

    const entity = {
      id: entityId,
      title: req.body.title,
      content: req.body.content,
      authorId: req.body.authorId,
      createdAt: new Date().toISOString(),
    }

    // Store entity in state
    await state.set('entities', entityId, entity)

    // Emit entity created event for background processing
    await emit({
      topic: 'entity.created',
      data: {
        entityId,
        entityType: 'post',
        authorId: entity.authorId,
      },
    })

    logger.info('✅ Entity created successfully', { entityId })

    return {
      status: 201,
      body: entity,
    }
  } catch (error) {
    logger.error('❌ Error creating entity', { error })
    return {
      status: 400,
      body: {
        error: error instanceof Error ? error.message : 'Failed to create entity',
      },
    }
  }
}
