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
  let { orgId, email, role } = req.body
  
  logger.info('🏢 Member Manager - Adding member', { orgId, email })

  let org: any = await state.get('orgs', orgId)
  
  // 💡 HACKATHON BONUS: If org not found, try to find the "latest" created org
  if (!org) {
    logger.info('🔍 Org not found by ID, checking for latest_org_id...')
    const latestId = await state.get('saas', 'latest_org_id') as string
    if (latestId) {
      logger.info(`✨ Found latest org ID: ${latestId}`)
      org = await state.get('orgs', latestId)
      orgId = latestId
    }
  }

  if (!org) {
    return {
      status: 404,
      body: { success: false, message: 'Organization not found. Please create one first.' },
    }
  }

  org.members = org.members || []
  org.members.push({ email, role: role || 'member' })
  await state.set('orgs', orgId, org)

  return {
    status: 200,
    body: {
      success: true,
      orgId,
      message: `Member ${email} added to ${org.name} (ID: ${orgId}).`,
    },
  }
}
