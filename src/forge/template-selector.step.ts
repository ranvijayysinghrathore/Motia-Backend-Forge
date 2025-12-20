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
    baseUrl: z.string(), // Added
  }),
  emits: ['template.selected'],
}

export const handler: Handlers['TemplateSelector'] = async (input, { logger, emit }) => {
  logger.info('📋 Template Selector - Selecting template', { 
    templateType: input.templateType,
    entities: input.entities,
    features: input.features,
  })

  try {
    // For MVP, we only support the 'social' template
    const templateType = input.templateType

    // Load template configuration
    let templateConfig = {
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

    if (templateType === 'ecommerce') {
      templateConfig = {
        name: 'ecommerce',
        workflows: ['ProductCatalog', 'OrderProcessing', 'UserSignupFlow', 'BackgroundProcessingFlow'],
        endpoints: [
          { method: 'POST', path: '/api/products', workflow: 'ProductCatalog', description: 'Add a new product' },
          { method: 'POST', path: '/api/orders', workflow: 'OrderProcessing', description: 'Place a new order' },
          { method: 'POST', path: '/api/users', workflow: 'UserSignupFlow', description: 'Register a customer' },
        ],
      }
    } else if (templateType === 'saas') {
      templateConfig = {
        name: 'saas',
        workflows: ['OrganizationManager', 'UserSignupFlow', 'BillingSync', 'UsageTracker'],
        endpoints: [
          { method: 'POST', path: '/api/organizations', workflow: 'OrganizationManager', description: 'Create organization' },
          { method: 'POST', path: '/api/members', workflow: 'OrganizationManager', description: 'Add member' },
          { method: 'POST', path: '/api/usage', workflow: 'UsageTracker', description: 'Report usage' },
        ],
      }
    } else if (templateType === 'task-manager') {
      templateConfig = {
        name: 'task-manager',
        workflows: ['ProjectLogic', 'TaskHandler', 'UserSignupFlow'],
        endpoints: [
          { method: 'POST', path: '/api/projects', workflow: 'ProjectLogic', description: 'Create project' },
          { method: 'POST', path: '/api/tasks', workflow: 'TaskHandler', description: 'Add task' },
        ],
      }
    } else if (templateType === 'waitlist') {
      templateConfig = {
        name: 'waitlist',
        workflows: ['WaitlistLogic', 'ReferralEngine', 'ScheduledAnalyticsFlow'],
        endpoints: [
          { method: 'POST', path: '/api/leads', workflow: 'WaitlistLogic', description: 'Join waitlist' },
          { method: 'GET', path: '/api/stats', workflow: 'WaitlistLogic', description: 'Get stats' },
        ],
      }
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
        baseUrl: input.baseUrl, // Pass along
      },
    })
  } catch (error) {
    logger.error('❌ Template Selector Error', { error })
    await emit({
      topic: 'workflow.failed',
      data: {
        backendId: input.backendId,
        stepName: 'TemplateSelector',
        error: error instanceof Error ? error.message : 'Unknown error',
        traceId: input.traceId,
      },
    })
  }
}
