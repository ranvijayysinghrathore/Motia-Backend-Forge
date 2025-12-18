import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'TemplateSelector',
  description: 'Selects appropriate backend template based on parsed intent',
  flows: ['forge-backend'],
  subscribes: ['intent.parsed'],
  input: z.object({
    entities: z.array(z.string()),
    features: z.array(z.string()),
    templateType: z.string(),
    originalDescription: z.string(),
    backendId: z.string(),
    traceId: z.string(),
  }),
  emits: ['template.selected'],
}

export const handler: Handlers['TemplateSelector'] = async (input, { logger, emit }) => {
  logger.info('📋 Template Selector - Selecting template', { 
    templateType: input.templateType,
    entities: input.entities,
    features: input.features,
  })

  // For MVP, we only support the 'social' template
  const templateType = input.templateType

  // Load template configuration
  const templateConfig = {
    name: 'social',
    workflows: [
      'UserSignupFlow',
      'CreateEntityFlow',
      'UpdateEntityFlow',
      'DeleteEntityFlow',
      'GetEntitiesFlow',
      'BackgroundProcessingFlow',
      'RetryAndFailureHandlingFlow',
      'ScheduledAnalyticsFlow',
    ],
    endpoints: [
      { method: 'POST', path: '/api/users', workflow: 'UserSignupFlow', description: 'Create a new user' },
      { method: 'POST', path: '/api/posts', workflow: 'CreateEntityFlow', description: 'Create a new post' },
      { method: 'GET', path: '/api/posts', workflow: 'GetEntitiesFlow', description: 'Get all posts' },
      { method: 'PUT', path: '/api/posts/:id', workflow: 'UpdateEntityFlow', description: 'Update a post' },
      { method: 'DELETE', path: '/api/posts/:id', workflow: 'DeleteEntityFlow', description: 'Delete a post' },
    ],
  }

  logger.info('✅ Template selected', { template: templateConfig.name })

  // Emit template selection
  await emit({
    topic: 'template.selected',
    data: {
      template: templateConfig,
      entities: input.entities,
      features: input.features,
      backendId: input.backendId,
      traceId: input.traceId,
    },
  })
}
