import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'WorkflowRegistrar',
  description: 'Registers generated workflows as a new backend instance',
  flows: ['forge-backend'],
  subscribes: ['workflows.assembled'],
  input: z.object({
    workflows: z.array(z.object({
      name: z.string(),
      enabled: z.boolean(),
      customization: z.object({
        entities: z.array(z.string()),
        features: z.array(z.string()),
      }),
    })),
    endpoints: z.array(z.string()),
    endpointDetails: z.array(z.object({
      method: z.string(),
      path: z.string(),
      workflow: z.string(),
      description: z.string(),
    })),
    backendId: z.string(),
    traceId: z.string(),
  }),
  emits: ['workflows.registered'],
}

export const handler: Handlers['WorkflowRegistrar'] = async (input, { logger, emit, state }) => {
  logger.info('📝 Workflow Registrar - Registering workflows', { 
    backendId: input.backendId,
    workflowCount: input.workflows.length,
  })

  const { backendId, workflows, endpoints, endpointDetails } = input

  // Store backend metadata in state
  // In production, this would create actual workflow files and register them
  const backendMetadata = {
    id: backendId,
    workflows,
    endpoints,
    endpointDetails,
    createdAt: new Date().toISOString(),
    status: 'registered',
  }

  // Save to state (simulating registration)
  await state.set('backends', backendId, backendMetadata)

  logger.info('✅ Workflows registered', { backendId })

  // Emit registration complete
  await emit({
    topic: 'workflows.registered',
    data: {
      backendId,
      metadata: backendMetadata,
      traceId: input.traceId,
    },
  })
}
