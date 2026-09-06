import cors from 'cors'
import env from '@/config/env'

export const corsMiddleware = cors({
  origin: env.CORS_ORIGINS,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
})
