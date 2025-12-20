import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'
import { aiParserService } from '../services/ai-parser.service'

export const config: EventConfig = {
  type: 'event',
  name: 'AIIntentParser',
  description: 'Parses natural language project description into structured intent',
  flows: ['forge-backend'],
  subscribes: ['project.description.received'],
  input: z.object({
    description: z.string(),
    backendId: z.string(),
    traceId: z.string(),
    baseUrl: z.string(), 
  }),
  emits: ['intent.parsed'],
}

export const handler: Handlers['AIIntentParser'] = async (input, { logger, emit }) => {
  logger.info('🤖 AI Intent Parser - Processing description', { 
    description: input.description 
  })

  try {
    // Use the dedicated service for parsing
    const intent = aiParserService.parseDescription(input.description)

    logger.info('✅ Intent parsed successfully', { intent })

    // Emit parsed intent
    await emit({
      topic: 'intent.parsed',
      data: {
        ...intent,
        backendId: input.backendId,
        traceId: input.traceId,
        baseUrl: input.baseUrl, // Pass along
      },
    })
  } catch (error) {
    logger.error('❌ AI Intent Parser Error', { error })
    await emit({
      topic: 'workflow.failed',
      data: {
        backendId: input.backendId,
        stepName: 'AIIntentParser',
        error: error instanceof Error ? error.message : 'Unknown error',
        traceId: input.traceId,
      },
    })
  }
}
