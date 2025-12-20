import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'TaskHandler',
  description: 'Manages task lifecycle and priority in project management',
  path: '/api/tasks',
  method: 'POST',
  bodySchema: z.object({
    action: z.enum(['create_task', 'update_status', 'assign']).optional(),
    projectId: z.string(),
    title: z.string().optional(),
    description: z.string().optional(),
    priority: z.string().optional(),
    taskId: z.string().optional(),
    status: z.string().optional(),
  }),
  responseSchema: {
    200: z.object({
      success: z.boolean(),
      taskId: z.string().optional(),
      message: z.string(),
    }),
  },
  flows: ['pm-core'],
  emits: [],
}

export const handler: Handlers['TaskHandler'] = async (req, { logger, state }) => {
  const action = req.body.action || 'create_task'
  const { projectId, title, taskId, status } = req.body
  
  logger.info(`📋 Task Handler - Action: ${action}`, { projectId, taskId })

  if (action === 'create_task') {
    const newTaskId = `task_${Math.random().toString(36).substr(2, 9)}`
    const taskData = {
      id: newTaskId,
      projectId,
      title,
      status: 'todo',
      createdAt: new Date().toISOString(),
    }
    await state.set('tasks', newTaskId, taskData)
    return {
      status: 200,
      body: {
        success: true,
        taskId: newTaskId,
        message: `Task '${title}' created.`,
      }
    }
  }

  if (action === 'update_status') {
    if (!taskId) return { status: 400, body: { success: false, message: 'taskId is required' } }
    const task: any = await state.get('tasks', taskId)
    if (!task) return { status: 404, body: { success: false, message: 'Task not found' } }
    
    task.status = status
    await state.set('tasks', taskId, task)
    
    return {
      status: 200,
      body: {
        success: true,
        message: `Task status updated to ${status}.`,
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
