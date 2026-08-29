import type { Routing } from 'express-zod-api'
import { helloEndpoint } from './endpoints/hello'

export const routing: Routing = {
  '/': helloEndpoint
}
