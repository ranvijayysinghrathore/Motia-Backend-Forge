import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'UserSignup',
  description: 'User registration endpoint (template workflow)',
  flows: ['user-management'],
  method: 'POST',
  path: '/users',
  bodySchema: z.object({
    email: z.string().email(),
    password: z.string().min(8),
    name: z.string().min(2),
  }),
  responseSchema: {
    201: z.object({
      id: z.string(),
      email: z.string(),
      name: z.string(),
      createdAt: z.string(),
    }),
    400: z.object({
      error: z.string(),
    }),
  },
  emits: ['user.created'],
}

export const handler: Handlers['UserSignup'] = async (req, { logger, emit, state }) => {
  logger.info('👤 User Signup - Creating new user', { 
    email: req.body.email,
    name: req.body.name,
  })

  try {
    // Generate user ID
    const userId = `user-${Date.now()}-${Math.random().toString(36).substring(7)}`

    // In production, this would:
    // 1. Hash password
    // 2. Store in database
    // 3. Send verification email
    
    const user = {
      id: userId,
      email: req.body.email,
      name: req.body.name,
      createdAt: new Date().toISOString(),
    }

    // Store user in state
    await state.set('users', userId, user)

    // Emit user created event for background processing
    await emit({
      topic: 'user.created',
      data: {
        userId,
        email: user.email,
        name: user.name,
      },
    })

    logger.info('✅ User created successfully', { userId })

    return {
      status: 201,
      body: user,
    }
  } catch (error) {
    logger.error('❌ Error creating user', { error })
    return {
      status: 400,
      body: {
        error: error instanceof Error ? error.message : 'Failed to create user',
      },
    }
  }
}
