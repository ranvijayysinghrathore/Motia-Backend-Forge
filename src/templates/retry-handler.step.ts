import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'RetryHandler',
  description: 'Retry and failure handling (template workflow)',
  flows: ['error-handling'],
  subscribes: ['task.failed'],
  input: z.object({
    taskId: z.string(),
    error: z.string(),
    retryCount: z.number().optional(),
  }),
  emits: [],
}

export const handler: Handlers['RetryHandler'] = async (input, { logger, state }) => {
  logger.info('🔄 Retry Handler - Handling failed task', { 
    taskId: input.taskId,
    retryCount: input.retryCount || 0,
  })

  const maxRetries = 3
  const retryCount = input.retryCount || 0

  if (retryCount < maxRetries) {
    // Calculate exponential backoff
    const backoffMs = Math.pow(2, retryCount) * 1000

    logger.info(`⏳ Scheduling retry ${retryCount + 1}/${maxRetries}`, { 
      backoffMs,
      taskId: input.taskId,
    })

    // In production, this would schedule a retry
    // For MVP, we'll just log it
    await state.set('retries', input.taskId, {
      retryCount: retryCount + 1,
      nextRetryAt: new Date(Date.now() + backoffMs).toISOString(),
    })
  } else {
    logger.error('❌ Max retries exceeded, marking task as permanently failed', { 
      taskId: input.taskId,
    })

    await state.set('failures', input.taskId, {
      error: input.error,
      failedAt: new Date().toISOString(),
    })
  }
}
