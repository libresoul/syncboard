import type express from 'express'
import { createConfig } from 'express-zod-api'

export const apiConfig = (app: ReturnType<typeof express>) => {
  createConfig({
    app,
    cors: false
  })
}
