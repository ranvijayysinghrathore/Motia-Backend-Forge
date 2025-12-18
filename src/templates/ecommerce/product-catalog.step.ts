import { ApiRouteConfig, Handlers } from 'motia'
import { z } from 'zod'

export const config: ApiRouteConfig = {
  type: 'api',
  name: 'ProductCatalog',
  description: 'Manage product inventory (ecommerce template)',
  flows: ['ecommerce-core'],
  method: 'POST', // Supporting GET and POST via logic routing or separate steps. Motia api steps are per-method usually.
  // Wait, I should make this POST for creation. I'll make a separate one for GET or just reuse the file with multiple exports if Motia supported it? Motia is 1 file = 1 step.
  // I'll make this CreateProduct.
  path: '/api/products',
  bodySchema: z.object({
    name: z.string().min(1),
    price: z.number().positive(),
    description: z.string(),
    stock: z.number().int().min(0),
  }),
  responseSchema: {
    201: z.object({
      id: z.string(),
      name: z.string(),
      price: z.number(),
    }),
  },
  emits: ['product.created'],
}

export const handler: Handlers['ProductCatalog'] = async (req, { logger, emit, state }) => {
  logger.info('📦 Product Catalog - Adding new product', { name: req.body.name })
  
  const productId = `prod-${Date.now()}`
  const product = { ...req.body, id: productId, createdAt: new Date().toISOString() }
  
  await state.set('products', productId, product)
  
  await emit({
    topic: 'product.created',
    data: { productId, name: product.name }
  })
  
  return {
    status: 201,
    body: product,
  }
}
