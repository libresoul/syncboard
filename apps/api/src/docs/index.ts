import { Documentation } from 'express-zod-api/documentation'
import { commonApiConfig } from '@/config/api.config'
import env from '@/config/env'
import { routing } from '@/routing'

export const documentation = new Documentation({
  routing,
  config: commonApiConfig,
  info: { title: 'Syncboard API', version: '0.0.0' },
  hasHeadMethod: false,
  server: `http://localhost:${env.PORT || 3000}`
})
