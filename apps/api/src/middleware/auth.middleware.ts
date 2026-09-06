import { Middleware } from 'express-zod-api'
import createHttpError from 'http-errors'
import { z } from 'zod'
import { auth } from '@/config/auth.config'

export const authMiddleware = new Middleware({
  security: {
    type: 'header',
    name: 'authorization'
  },
  statusCode: 401,
  input: z.object({}),
  handler: async ({ request }) => {
    const session = await auth.api.getSession({
      headers: request.headers as unknown as Headers
    })
    if (!session) {
      throw createHttpError(401, 'Unauthorized')
    }
    return { session }
  }
})
