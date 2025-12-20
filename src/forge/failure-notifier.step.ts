import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'FailureNotifier',
  description: 'Notifies developer via mock email if a forge workflow fails',
  flows: ['forge-backend', 'error-handling'],
  subscribes: ['workflow.failed'],
  input: z.object({
    backendId: z.string(),
    stepName: z.string(),
    error: z.string(),
    traceId: z.string(),
  }),
  emits: [],
}

export const handler: Handlers['FailureNotifier'] = async (input, { logger }) => {
  const { backendId, stepName, error, traceId } = input

  logger.error('🚨 [FAILURE NOTIFIER] Workflow error detected!', {
    backendId,
    stepName,
    traceId,
    error,
  })

  // Simulate email sending
  logger.info('📧 ==========================================')
  logger.info('📧 CLOUD NOTIFICATION: WORKFLOW FAILURE ALERT')
  logger.info('📧 ==========================================')
  logger.info(`📧 To: developer@motia.dev`)
  logger.info(`📧 Subject: [CRITICAL] Forge Workflow Failed - ${backendId}`)
  logger.info(`📧 Body:`)
  logger.info(`📧 The Backend Forge workflow failed at step: ${stepName}`)
  logger.info(`📧 Error Details: ${error}`)
  logger.info(`📧 Trace ID: ${traceId}`)
  logger.info('📧 ==========================================')
}
