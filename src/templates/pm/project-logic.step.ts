import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'ProjectLogic',
  description: 'Manages project boards and workspaces',
  path: '/api/projects',
  method: 'POST',
  bodySchema: z.object({
    name: z.string().min(1),
    color: z.string().optional(),
    description: z.string().optional(),
  }),
  responseSchema: {
    200: z.object({
      success: z.boolean(),
      projectId: z.string(),
      message: z.string(),
    }),
  },
  flows: ['pm-core'],
  emits: [],
}

export const handler: Handlers['ProjectLogic'] = async (req, { logger, state }) => {
  const { name, color } = req.body
  
  logger.info('📋 Project Logic - Creating new project', { name, color })

  const projectId = `proj_${Math.random().toString(36).substr(2, 9)}`
  const projectData = {
    id: projectId,
    name,
    color: color || '#000000',
    createdAt: new Date().toISOString(),
  }

  await state.set('projects', projectId, projectData)

  return {
    status: 200,
    body: {
      success: true,
      projectId,
      message: `Project '${name}' created successfully.`,
    },
  }
}
