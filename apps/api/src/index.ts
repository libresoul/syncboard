import express, { type Request, type Response } from 'express'
import { pinoHttp } from 'pino-http'
import logger from './utils/logger'

const app = express()
const PORT = process.env.PORT || 3000

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

async function startServer() {
  try {
    const srv = app.listen(PORT, () => {
      logger.info(`Server is running on http://localhost:${PORT}`)
    })

    srv.on('error', (err) => {
      logger.error(err, 'Failed to start server')
      process.exit(1)
    })
  } catch (err) {
    logger.error(err, 'Failed to start server')
    process.exit(1)
  }
}

process.on('SIGINT', () => {
  logger.info('Recieved SIGINT, shutting down...')
  process.exit(0)
})

process.on('SIGTERM', () => {
  logger.info('Recieved SIGTERM, shutting down...')
  process.exit(0)
})

startServer()
