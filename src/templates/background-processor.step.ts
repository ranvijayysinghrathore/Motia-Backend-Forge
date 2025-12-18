import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'BackgroundProcessor',
  description: 'Background job processing (template workflow)',
  flows: ['background-jobs'],
  subscribes: ['entity.created'],
  input: z.object({
    entityId: z.string(),
    entityType: z.string(),
    authorId: z.string(),
  }),
  emits: ['processing.complete'],
}

export const handler: Handlers['BackgroundProcessor'] = async (input, { logger, emit }) => {
  logger.info('⚙️  Background Processor - Processing entity', { 
    entityId: input.entityId,
    entityType: input.entityType,
  })

  // Simulate background processing
  // In production, this could:
  // - Optimize images
  // - Send notifications
  // - Update analytics
  // - Generate thumbnails
  
  await new Promise(resolve => setTimeout(resolve, 500))

  logger.info('✅ Background processing complete', { 
    entityId: input.entityId,
  })

  await emit({
    topic: 'processing.complete',
    data: {
      entityId: input.entityId,
      processedAt: new Date().toISOString(),
    },
  })
}
