import type express from 'express'
import { createConfig } from 'express-zod-api'
import { corsMiddleware } from '../middleware/cors.middleware'

export const commonApiConfig = {
  accessLogger: null,
  cors: corsMiddleware,
  startupLogo: false
}

export const apiConfig = (app: ReturnType<typeof express>) => {
  return createConfig({
    app,
    ...commonApiConfig
  })
}
