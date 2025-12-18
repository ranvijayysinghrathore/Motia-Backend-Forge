import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'OrderProcessing',
  description: 'Process customer orders (ecommerce template)',
  flows: ['ecommerce-core'],
  method: 'POST',
  path: '/api/orders',
  bodySchema: z.object({
    items: z.array(z.object({
      productId: z.string(),
      quantity: z.number().positive(),
    })),
    customerId: z.string(),
  }),
  responseSchema: {
    201: z.object({
      orderId: z.string(),
      status: z.string(),
      total: z.number(),
    }),
  },
  emits: ['order.placed'],
}

export const handler: Handlers['OrderProcessing'] = async (req, { logger, emit, state }) => {
  logger.info('🛒 Order Processing - Receiving new order', { customerId: req.body.customerId })
  
  const orderId = `order-${Date.now()}`
  // Mock total calculation
  const total = req.body.items.length * 99.99 
  
  const order = {
    id: orderId,
    customerId: req.body.customerId,
    items: req.body.items,
    total,
    status: 'pending',
    createdAt: new Date().toISOString()
  }
  
  await state.set('orders', orderId, order)
  
  await emit({
    topic: 'order.placed',
    data: { orderId, total }
  })
  
  return {
    status: 201,
    body: { orderId, status: 'pending', total }
  }
}
