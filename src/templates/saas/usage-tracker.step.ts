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
  let { orgId, feature, quantity } = req.body
  
  logger.info('📊 Usage Tracker - Reporting usage', { orgId, feature, quantity })

  // 💡 HACKATHON BONUS: If org not found, try to find the "latest" created org
  const orgExists = await state.get('orgs', orgId)
  if (!orgExists) {
    logger.info('🔍 Org ID not found, checking for latest_org_id...')
    const latestId = await state.get('saas', 'latest_org_id') as string
    if (latestId) {
      logger.info(`✨ Usage resolved to latest org: ${latestId}`)
      orgId = latestId
    }
  }

  const usageKey = `usage:${orgId}:${feature}`
  const currentUsage = (await state.get('usage', usageKey) as number || 0) + quantity
  await state.set('usage', usageKey, currentUsage)

  return {
    status: 200,
    body: {
      success: true,
      orgId,
      message: `Usage reported for ${feature} (Org ID: ${orgId}). Total: ${currentUsage}`,
    },
  }
}
