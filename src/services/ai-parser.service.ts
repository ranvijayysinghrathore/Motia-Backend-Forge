import { BackendIntent } from '../types/forge'

export class AIParserService {
  /**
   * Parses a natural language description into a structured intent.
   * In a production environment, this would call an LLM (OpenAI, Anthropic, etc.)
   */
  public parseDescription(description: string): BackendIntent {
    const d = description.toLowerCase()
    
    // Extract entities
    const entities: string[] = []
    if (d.includes('user')) entities.push('users')
    if (d.includes('post') || d.includes('blog') || d.includes('tweet')) entities.push('posts')
    if (d.includes('comment')) entities.push('comments')
    if (d.includes('product') || d.includes('item')) entities.push('products')
    if (d.includes('order') || d.includes('purchase')) entities.push('orders')
    if (d.includes('org') || d.includes('company') || d.includes('team')) entities.push('organizations')
    if (d.includes('task') || d.includes('todo') || d.includes('project')) entities.push('tasks')
    if (d.includes('lead') || d.includes('signup') || d.includes('waitlist')) entities.push('leads')

    // Default to users and posts
    if (entities.length === 0) {
      entities.push('users', 'posts')
    }

    // Extract features
    const features: string[] = ['auth', 'crud']
    if (d.includes('background') || d.includes('job') || d.includes('async')) {
      features.push('background-jobs')
    }
    if (d.includes('schedule') || d.includes('cron') || d.includes('recurring')) {
      features.push('scheduled-tasks')
    }
    if (d.includes('notification') || d.includes('email') || d.includes('push')) {
      features.push('notifications')
    }

    // Determine template type
    let templateType = 'social'
    const ecommerceKeywords = ['shop', 'store', 'buy', 'sell', 'ecommerce', 'checkout', 'product']
    const saasKeywords = ['saas', 'subscription', 'billing', 'organization', 'org', 'multi-tenant']
    const pmKeywords = ['task', 'project', 'todo', 'management', 'kanban', 'board']
    const marketingKeywords = ['waitlist', 'launch', 'marketing', 'referral', 'viral']

    if (ecommerceKeywords.some(kw => d.includes(kw))) {
      templateType = 'ecommerce'
    } else if (saasKeywords.some(kw => d.includes(kw))) {
      templateType = 'saas'
    } else if (pmKeywords.some(kw => d.includes(kw))) {
      templateType = 'task-manager'
    } else if (marketingKeywords.some(kw => d.includes(kw))) {
      templateType = 'waitlist'
    }

    return {
      entities,
      features,
      templateType,
      originalDescription: description,
    }
  }
}

export const aiParserService = new AIParserService()
