import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'WelcomeStep',
  description: 'Welcome message and status for the Motia Backend Forge',
  path: '/',
  method: 'GET',
  responseSchema: {
    200: z.object({
      name: z.string(),
      status: z.string(),
      version: z.string(),
      message: z.string(),
      links: z.object({
        forge: z.string(),
        docs: z.string()
      })
    }),
  },
  flows: ['utility'],
  emits: [],
}

export const handler: Handlers['WelcomeStep'] = async (_req, { logger }) => {
  logger.info('👋 Root Welcome - Serving status')
  
  return {
    status: 200,
    body: {
      name: 'Motia Backend Forge',
      status: 'active',
      version: '1.0.0-hackathon',
      message: 'The meta-backend is live. Use the Forge UI or /forge-backend API to generate your infrastructure.',
      links: {
        forge: 'http://localhost:5173',
        docs: 'http://localhost:5173/docs'
      }
    },
  }
}
