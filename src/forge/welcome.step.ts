import { ApiRouteConfig, Handlers } from 'motia'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'ForgeWelcome',
  description: 'Welcome endpoint for Motia Backend Forge',
  flows: ['forge-backend'],
  method: 'GET',
  path: '/',
  emits: [],
}

export const handler: Handlers[any] = async (req, { logger }) => {
  logger.info('👋 Welcome step triggered')
  return {
    status: 200,
    body: {
      message: '🔥 Welcome to Motia Backend Forge!',
      status: 'Online',
      endpoints: {
        forge: 'POST /forge-backend',
        users: 'POST /api/users',
        posts: 'GET /api/posts',
      },
      version: '1.0.0',
    },
  }
}
