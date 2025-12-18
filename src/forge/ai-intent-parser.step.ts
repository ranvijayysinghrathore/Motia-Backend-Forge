import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'AIIntentParser',
  description: 'Parses natural language project description into structured intent',
  flows: ['forge-backend'],
  subscribes: ['project.description.received'],
  input: z.object({
    description: z.string(),
    backendId: z.string(),
    traceId: z.string(),
  }),
  emits: ['intent.parsed'],
}

export const handler: Handlers['AIIntentParser'] = async (input, { logger, emit }) => {
  logger.info('🤖 AI Intent Parser - Processing description', { 
    description: input.description 
  })

  // TODO: In production, this would use Motia AI capabilities
  // For MVP, we'll use simple keyword matching
  const description = input.description.toLowerCase()
  
  // Extract entities (simple keyword matching)
  const entities: string[] = []
  if (description.includes('user')) entities.push('users')
  if (description.includes('post')) entities.push('posts')
  if (description.includes('comment')) entities.push('comments')
  if (description.includes('product')) entities.push('products')
  if (description.includes('order')) entities.push('orders')

  // Default to users and posts if nothing detected
  if (entities.length === 0) {
    entities.push('users', 'posts')
  }

  // Extract features
  const features: string[] = ['auth', 'crud']
  if (description.includes('background') || description.includes('job')) {
    features.push('background-jobs')
  }
  if (description.includes('schedule') || description.includes('cron')) {
    features.push('scheduled-tasks')
  }
  if (description.includes('notification') || description.includes('email')) {
    features.push('notifications')
  }

  // Determine template type
  let templateType = 'social'
  if (description.includes('shop') || description.includes('store') || description.includes('buy') || description.includes('sell') || description.includes('product') || description.includes('e-commerce') || description.includes('ecommerce')) {
    templateType = 'ecommerce'
  }

  const intent = {
    entities,
    features,
    templateType,
    originalDescription: input.description,
  }

  logger.info('✅ Intent parsed successfully', { intent })

  // Emit parsed intent
  await emit({
    topic: 'intent.parsed',
    data: {
      ...intent,
      backendId: input.backendId,
      traceId: input.traceId,
    },
  })
}
