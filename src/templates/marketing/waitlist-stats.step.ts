import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'WaitlistStats',
  description: 'Retrieves global waitlist metrics',
  path: '/api/stats',
  method: 'GET',
  bodySchema: z.any().optional(),
  responseSchema: {
    200: z.object({
      success: z.boolean(),
      totalLeads: z.number(),
      message: z.string(),
    }),
  },
  flows: ['marketing-core'],
  emits: [],
}

export const handler: Handlers['WaitlistStats'] = async (_req, { logger, state }) => {
  logger.info('🚀 Waitlist Stats - Fetching global metrics')

  const totalLeads = await state.get('global', 'total_leads') || 0

  return {
    status: 200,
    body: {
      success: true,
      totalLeads: totalLeads as number,
      message: `Current waitlist size: ${totalLeads} members.`,
    },
  }
}
