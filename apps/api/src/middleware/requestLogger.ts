import type { RequestHandler } from 'express'
import { pinoHttp } from 'pino-http'
import logger from '@/utils/logger'

export const requestLogger: RequestHandler = pinoHttp({
  logger,
  serializers: {
    req: () => undefined,
    res: () => undefined,
    responseTime: () => undefined
  },
  customProps: (req, res) => {
    return {
      method: req.method,
      path: req.url,
      statusCode: res.statusCode
    }
  }
})
