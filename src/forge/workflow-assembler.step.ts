import { EventConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: EventConfig = {
  type: 'event',
  name: 'WorkflowAssembler',
  description: 'Assembles workflow steps based on selected template',
  flows: ['forge-backend'],
  subscribes: ['template.selected'],
  input: z.object({
    template: z.object({
      name: z.string(),
      workflows: z.array(z.string()),
      endpoints: z.array(z.object({
        method: z.string(),
        path: z.string(),
        workflow: z.string(),
        description: z.string(),
      })),
    }),
    entities: z.array(z.string()),
    features: z.array(z.string()),
    backendId: z.string(),
    traceId: z.string(),
  }),
  emits: ['workflows.assembled'],
}

export const handler: Handlers['WorkflowAssembler'] = async (input, { logger, emit }) => {
  logger.info('🔧 Workflow Assembler - Assembling workflows', { 
    template: input.template.name,
    workflows: input.template.workflows,
  })

  const { template, entities, features, backendId } = input

  // Assemble workflow configuration
  const assembledWorkflows = template.workflows.map(workflowName => ({
    name: workflowName,
    enabled: true,
    customization: {
      entities,
      features,
    },
  }))

  // Generate endpoint list for response
  const endpointList = template.endpoints.map(ep => 
    `${ep.method} ${ep.path}`
  )

  logger.info('✅ Workflows assembled', { 
    count: assembledWorkflows.length,
    endpoints: endpointList,
  })

  // Emit assembled workflows
  await emit({
    topic: 'workflows.assembled',
    data: {
      workflows: assembledWorkflows,
      endpoints: endpointList,
      endpointDetails: template.endpoints,
      backendId,
      traceId: input.traceId,
    },
  })
}
