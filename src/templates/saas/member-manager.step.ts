import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'MemberManager',
  description: 'Manages organization members and roles',
  path: '/api/members',
  method: 'POST',
  bodySchema: z.object({
    orgId: z.string(),
    email: z.string().email(),
    role: z.string().optional(),
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

export const handler: Handlers['MemberManager'] = async (req, { logger, state }) => {
  const { orgId, email, role } = req.body
  
  logger.info('🏢 Member Manager - Adding member', { orgId, email })

  const org: any = await state.get('orgs', orgId)
  if (!org) {
    return {
      status: 404,
      body: { success: false, message: 'Organization not found' },
    }
  }

  org.members = org.members || []
  org.members.push({ email, role: role || 'member' })
  await state.set('orgs', orgId, org)

  return {
    status: 200,
    body: {
      success: true,
      message: `Member ${email} added to ${org.name}.`,
    },
  }
}
