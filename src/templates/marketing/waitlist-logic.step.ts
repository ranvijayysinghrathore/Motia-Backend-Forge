import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'WaitlistLogic',
  description: 'Manages viral waitlist signups and referral tracking',
  path: '/api/leads',
  method: 'POST',
  bodySchema: z.object({
    email: z.string(),
    referralCode: z.string().optional(),
  }),
  responseSchema: {
    200: z.object({
      success: z.boolean(),
      position: z.number().optional(),
      referralLink: z.string().optional(),
      message: z.string(),
    }),
  },
  flows: ['marketing-core'],
  emits: [],
}

export const handler: Handlers['WaitlistLogic'] = async (req, { logger, state }) => {
  const { email, referralCode } = req.body
  
  logger.info('🚀 Waitlist - New signup', { email, referralCode })

  const currentCount = (await state.get('global', 'total_leads') as number || 0) + 1
  await state.set('global', 'total_leads', currentCount)

  // In a real app, we'd store the lead and track the referral hierarchy here
  const myReferralCode = `REF_${Math.random().toString(36).substr(2, 6).toUpperCase()}`

  return {
    status: 200,
    body: {
      success: true,
      message: `Welcome to the waitlist! You are position #${currentCount}.`,
      position: currentCount,
      referralLink: `https://my-app.com/?ref=${myReferralCode}`,
    }
  }
}
