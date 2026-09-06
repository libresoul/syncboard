import { defaultEndpointsFactory } from 'express-zod-api'
import { authMiddleware } from '@/middleware/auth.middleware'

export const authedEndpointsFactory =
  defaultEndpointsFactory.addMiddleware(authMiddleware)
