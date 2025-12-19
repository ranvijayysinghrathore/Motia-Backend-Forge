import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'UsageTracker',
  description: 'Tracks feature usage for organization billing',
  path: '/api/usage',
  method: 'POST',
  bodySchema: z.object({
    orgId: z.string(),
    feature: z.string(),
    quantity: z.number().int().positive(),
  }),
  responseSchema: {
    200: z.object({
      success: z.boolean(),
      message: z.string(),
    }),
  },
  flows: ['saas-core'],
  emits: [],
}

export const handler: Handlers['UsageTracker'] = async (req, { logger, state }) => {
  const { orgId, feature, quantity } = req.body
  
  logger.info('📊 Usage Tracker - Reporting usage', { orgId, feature, quantity })

  const usageKey = `usage:${orgId}:${feature}`
  const currentUsage = (await state.get('usage', usageKey) as number || 0) + quantity
  await state.set('usage', usageKey, currentUsage)

  return {
    status: 200,
    body: {
      success: true,
      message: `Usage reported for ${feature}. Total: ${currentUsage}`,
    },
  }
}
