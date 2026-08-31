import type express from 'express'
import { createConfig } from 'express-zod-api'

export const commonApiConfig = {
  accessLogger: null,
  cors: true,
  startupLogo: false
}

export const apiConfig = (app: ReturnType<typeof express>) => {
  return createConfig({
    app,
    accessLogger: null,
    cors: true,
    startupLogo: false
  })
}
