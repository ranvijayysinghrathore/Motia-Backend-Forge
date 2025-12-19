import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'OrganizationManager',
  description: 'Manages organizations and member roles in a SaaS context',
  path: '/api/organizations',
  method: 'POST',
  bodySchema: z.object({
    action: z.enum(['create', 'add_member', 'remove_member']),
    orgName: z.string().optional(),
    tier: z.string().optional(),
    email: z.string().optional(),
    role: z.string().optional(),
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
  const { action, orgName, tier, email, role, orgId } = req.body
  
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
    return {
      status: 200,
      body: {
        success: true,
        message: `Organization '${orgName}' created successfully.`,
        data: orgData,
      }
    }
  }

  if (action === 'add_member') {
    if (!orgId) return { status: 400, body: { success: false, message: 'orgId is required' } }
    const org: any = await state.get('orgs', orgId)
    if (!org) return { status: 404, body: { success: false, message: 'Organization not found' } }
    
    org.members.push({ email, role: role || 'member' })
    await state.set('orgs', orgId, org)
    
    return {
      status: 200,
      body: {
        success: true,
        message: `Member ${email} added to ${org.name}.`,
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
