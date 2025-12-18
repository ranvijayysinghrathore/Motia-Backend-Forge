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

  // Determine Base URL (Production Platform Strategy)
  // If running in production (e.g. strict Motia Cloud), use provided base URL
  // Otherwise default to localhost for local platform testing
  const baseUrl = process.env.BASE_URL || 'http://localhost:3000'
  
  // In our Platform model, the generated backend is hosted on the main platform
  // The URL is simply the base URL (since we share the global router in this MVP)
  // In a full multi-tenant version, this might be `${baseUrl}/backends/${backendId}`
  const deployedUrl = baseUrl

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
