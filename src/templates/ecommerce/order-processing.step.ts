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
    productId: z.string(),
    quantity: z.number().positive(),
    customerId: z.string().optional(),
    shippingAddress: z.string().optional(),
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
  logger.info('🛒 Order Processing - Receiving new order', { productId: req.body.productId })
  
  const orderId = `order-${Date.now()}`
  // Mock total calculation (100 per unit for simplicity)
  const total = req.body.quantity * 100 
  
  const order = {
    id: orderId,
    productId: req.body.productId,
    quantity: req.body.quantity,
    customerId: req.body.customerId || 'anonymous',
    shippingAddress: req.body.shippingAddress || 'N/A',
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
