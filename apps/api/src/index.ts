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

app.listen(PORT, () => {
  logger.info(`Server is running on http://localhost:${PORT}`)
})
