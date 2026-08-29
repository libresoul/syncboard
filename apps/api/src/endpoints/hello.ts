import { defaultEndpointsFactory } from 'express-zod-api'
import z from 'zod'

export const helloEndpoint = defaultEndpointsFactory.build({
  output: z.object({ message: z.string() }),
  handler: async () => ({ message: 'Hello Syncboard' })
})
