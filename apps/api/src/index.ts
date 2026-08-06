import express, { type Request, type Response } from 'express'
import pino from 'pino'
import { pinoHttp } from 'pino-http'

const app = express()
const PORT = process.env.PORT || 3000
const logger = pino({
  level: 'info',
  transport: {
    target: 'pino-pretty',
    options: {
      colorize: true,
      levelFirst: true,
      translateTime: 'HH:MM:ss'
    }
  }
})

app.use(
  pinoHttp({
    logger,
    serializers: {
      req: () => undefined,
      res: () => undefined,
      responseTime: () => undefined
    },
    customProps: (req, res) => {
      return {
        method: req.method,
        path: req.path,
        statusCode: res.statusCode
      }
    }
  })
)
app.use(express.json())

app.get('/', (_: Request, res: Response) => {
  res.json({ message: 'Hello Syncboard' })
})

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
