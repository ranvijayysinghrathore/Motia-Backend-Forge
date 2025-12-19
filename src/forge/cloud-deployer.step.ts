import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'CloudDeployer',
  description: 'Deploys generated backend to Motia Cloud',
  flows: ['forge-backend'],
  subscribes: ['workflows.registered'],
  input: z.object({
    backendId: z.string(),
    metadata: z.object({
      id: z.string(),
      workflows: z.array(z.any()),
      endpoints: z.array(z.string()),
      endpointDetails: z.array(z.any()),
      createdAt: z.string(),
      status: z.string(),
      baseUrl: z.string(), // Added
    }),
    traceId: z.string(),
  }),
  emits: ['backend.deployed'],
}

export const handler: Handlers['CloudDeployer'] = async (input, { logger, emit, state }) => {
  logger.info('☁️  Cloud Deployer - Deploying to Motia Cloud', { 
    backendId: input.backendId,
  })

  const { backendId, metadata } = input

  // Use the baseUrl carried through the workflow
  const deployedUrl = metadata.baseUrl

  // Simulate "deployment" time (registration overhead)
  await new Promise(resolve => setTimeout(resolve, 1500))

  // Update backend metadata
  const updatedMetadata = {
    ...metadata,
    status: 'deployed',
    deployedUrl,
    deployedAt: new Date().toISOString(),
  }

  await state.set('backends', backendId, updatedMetadata)

  logger.info('✅ Backend deployed successfully (Platform Mode)', { 
    backendId,
    url: deployedUrl,
    environment: process.env.NODE_ENV || 'development'
  })

  // Emit deployment complete
  await emit({
    topic: 'backend.deployed',
    data: {
      backendId,
      backendUrl: deployedUrl,
      endpoints: metadata.endpoints,
      traceId: input.traceId,
    },
  })
}
