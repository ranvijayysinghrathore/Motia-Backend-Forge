import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'OrganizationManager',
  description: 'Manages organizations and member roles in a SaaS context',
  path: '/api/organizations',
  method: 'POST',
  bodySchema: z.object({
    action: z.enum(['create', 'delete']).optional(),
    orgName: z.string().optional(),
    name: z.string().optional(), // Alias for orgName from metadata
    tier: z.string().optional(),
    orgId: z.string().optional(),
  }),
  responseSchema: {
    200: z.object({
      success: z.boolean(),
      message: z.string(),
      data: z.any().optional(),
    }),
  },
  flows: ['saas-core'],
  emits: [],
}

export const handler: Handlers['OrganizationManager'] = async (req, { logger, state }) => {
  const action = req.body.action || 'create'
  const orgName = req.body.orgName || req.body.name
  const { tier, orgId } = req.body
  
  logger.info(`🏢 Org Manager - Action: ${action}`, { body: req.body })

  if (action === 'create') {
    const newId = `org_${Math.random().toString(36).substr(2, 9)}`
    const orgData = {
      id: newId,
      name: orgName,
      tier: tier || 'free',
      members: [],
      createdAt: new Date().toISOString(),
    }
    await state.set('orgs', newId, orgData)
    await state.set('saas', 'latest_org_id', newId) // 🚀 Track latest for easy demoing
    return {
      status: 200,
      body: {
        success: true,
        message: `Organization '${orgName}' created successfully.`,
        data: orgData,
      }
    }
  }

  return {
    status: 400,
    body: {
      success: false,
      message: 'Unsupported action',
    }
  }
}
